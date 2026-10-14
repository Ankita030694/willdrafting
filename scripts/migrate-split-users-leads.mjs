/**
 * One-off migration: split the legacy `users` collection into the new model.
 *   users = paying customers only, leads = everyone else.
 *
 * DRY RUN by default (prints what it would do, changes nothing).
 *   node --env-file=.env --env-file=.env.local scripts/migrate-split-users-leads.mjs
 * Apply for real (take an Atlas backup / snapshot first!):
 *   node --env-file=.env --env-file=.env.local scripts/migrate-split-users-leads.mjs --apply
 *
 * Idempotent: running it again after --apply finds nothing left to move.
 */
import { MongoClient, ObjectId } from "mongodb";

const APPLY = process.argv.includes("--apply");
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

const LEGACY_FIELDS = [
  "passwordHash",
  "password",
  "verificationToken",
  "verificationTokenExpires",
  "emailVerificationToken",
  "emailVerificationExpires",
  "resetToken",
  "resetTokenExpires",
  "passwordResetToken",
  "passwordResetExpires",
  "isPaid",
  "paymentCompleted",
];

const client = new MongoClient(uri);
await client.connect();
const db = client.db("willdrafting");
const users = db.collection("users");
const leads = db.collection("leads");

const counts = { keptPaid: 0, movedToLeads: 0, mergedIntoExistingLead: 0, skippedAdmin: 0, skippedNoContact: 0 };

for await (const u of users.find({})) {
  if (u.role === "superadmin" || u.role === "admin") {
    counts.skippedAdmin++;
    continue;
  }

  const email = typeof u.email === "string" ? u.email.trim().toLowerCase() : "";
  const phone = typeof u.phone === "string" ? u.phone : "";
  const paid = u.paymentStatus === "paid";

  if (paid) {
    counts.keptPaid++;
    console.log(`[keep ] paid user ${email || u._id}`);
    if (APPLY) {
      const unset = Object.fromEntries(LEGACY_FIELDS.map((f) => [f, ""]));
      await users.updateOne(
        { _id: u._id },
        {
          $set: {
            email,
            role: "user",
            paymentStatus: "paid",
            funnelStage: "customer",
            planId: u.planId || "essential",
            willCredits: typeof u.willCredits === "number" ? u.willCredits : 1,
            authStatus: u.authStatus === "verified" ? "verified" : "unverified",
            paidAt: u.paidAt || u.updatedAt || u.createdAt || new Date(),
            updatedAt: new Date(),
          },
          $unset: unset,
        }
      );
    }
    continue;
  }

  if (!email && !phone) {
    counts.skippedNoContact++;
    console.log(`[skip ] unpaid user ${u._id} has no email or phone; deleting`);
    if (APPLY) await users.deleteOne({ _id: u._id });
    continue;
  }

  const existing = email ? await leads.findOne({ email }) : null;
  if (existing) {
    counts.mergedIntoExistingLead++;
    console.log(`[merge] unpaid user ${email} already has a lead; dropping the legacy user row`);
  } else {
    counts.movedToLeads++;
    console.log(`[lead ] unpaid user ${email || phone} -> leads`);
    if (APPLY) {
      await leads.insertOne({
        _id: u._id instanceof ObjectId ? u._id : new ObjectId(),
        name: u.name || "",
        email,
        phone,
        state: u.state,
        googleId: u.googleId || null,
        authStatus: u.authStatus === "verified" ? "verified" : "unverified",
        status: u.authStatus === "verified" ? "email_verified" : email ? "registered" : "captured",
        source: u.googleId ? "google" : "login_signup",
        marketingConsent: false,
        createdAt: u.createdAt || new Date(),
        updatedAt: new Date(),
      });
    }
  }
  if (APPLY) await users.deleteOne({ _id: u._id });
}

console.log(`\n${APPLY ? "APPLIED" : "DRY RUN (no changes made)"}:`, counts);
await client.close();
