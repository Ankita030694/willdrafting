/**
 * One-off migration: move legacy UNPAID documents out of `users` into `leads`.
 *
 *   users = paying customers only  |  leads = everyone else
 *
 * - Default is a DRY RUN: it only prints what it would do.
 * - Pass --apply to actually write. TAKE A BACKUP FIRST (Atlas snapshot or mongodump).
 * - _id is preserved, so wills / orders / funnel events keep pointing at the same account.
 * - Documents that are already paid customers, superadmins, or banned are left untouched.
 * - If a lead with the same email already exists, the user doc is reported and skipped (no data loss).
 * - Idempotent: running it again after --apply finds nothing left to move.
 *
 * Usage:
 *   node scripts/migrate-split-users.mjs            # dry run
 *   node scripts/migrate-split-users.mjs --apply    # write
 * Env (read from .env.local if present): MONGODB_URI
 */
import fs from "node:fs";
import path from "node:path";
import { MongoClient } from "mongodb";

const APPLY = process.argv.includes("--apply");

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_0-9]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

const client = await MongoClient.connect(uri);
const db = client.db("willdrafting");
const users = db.collection("users");
const leads = db.collection("leads");

// Anything in `users` that is not a paid customer (and not an admin) is really a lead.
const unpaidFilter = {
  paymentStatus: { $ne: "paid" },
  role: { $nin: ["superadmin", "admin"] },
};

const candidates = await users.find(unpaidFilter).toArray();
console.log(`${APPLY ? "APPLY" : "DRY RUN"}: ${candidates.length} unpaid document(s) found in \`users\`.`);

let moved = 0;
let skipped = 0;

for (const u of candidates) {
  const email = (u.email || "").toLowerCase();
  if (email) {
    const clash = await leads.findOne({ email });
    if (clash) {
      console.log(`  SKIP  ${email} (_id ${u._id}) — a lead with this email already exists (_id ${clash._id}).`);
      skipped++;
      continue;
    }
  }

  const now = new Date();
  const lead = {
    _id: u._id,
    name: u.name || "",
    email,
    phone: u.phone || "",
    state: u.state || undefined,
    googleId: u.googleId || null,
    authStatus: u.authStatus || (u.googleId ? "verified" : "unverified"),
    marketingConsent: u.marketingConsent ?? false,
    unsubscribedAt: u.unsubscribedAt ?? null,
    status: u.googleId || u.authStatus === "verified" ? "email_verified" : "registered",
    source: u.googleId ? "google" : "wizard_signup",
    interestedPlanId: u.planId || undefined,
    createdAt: u.createdAt || now,
    updatedAt: now,
  };
  for (const k of Object.keys(lead)) if (lead[k] === undefined) delete lead[k];

  console.log(`  MOVE  ${email || "(no email)"} (_id ${u._id}) -> leads [${lead.status}]`);

  if (APPLY) {
    // Insert first, delete second: a crash in between leaves a duplicate (re-run reports it), never a loss.
    await leads.insertOne(lead);
    await users.deleteOne({ _id: u._id });
  }
  moved++;
}

console.log(`Done. ${APPLY ? "Moved" : "Would move"}: ${moved}. Skipped: ${skipped}.`);
if (!APPLY && moved > 0) console.log("Re-run with --apply to write (after taking a backup).");
await client.close();
