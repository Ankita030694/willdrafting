/**
 * One-off schema simplification migration. Dry run by default; pass --apply to write.
 *
 *  1. orders: baseAmountPaise/discountPaise/amountPaise (integer paise)  ->  baseAmount/discount/amount (rupees)
 *  2. payment_events -> embedded into orders.events[]   (then the collection is dropped)
 *  3. contacts       -> merged into leads (source "contact_form", message kept)  (then dropped)
 *  4. login_otps     -> dropped (codes are short-lived; they now live on the account document)
 *
 * A JSON backup of every touched collection is written to ./backups/ before --apply changes anything.
 * Idempotent: safe to re-run.
 */
import fs from "node:fs";
import path from "node:path";
import { MongoClient, ObjectId } from "mongodb";

const APPLY = process.argv.includes("--apply");
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_0-9]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) throw new Error("MONGODB_URI is not set.");

const client = await MongoClient.connect(uri);
const db = client.db("willdrafting");
const names = new Set((await db.listCollections().toArray()).map((c) => c.name));
const log = (...a) => console.log(APPLY ? "[apply]" : "[dry-run]", ...a);

// ---- backup ----
if (APPLY) {
  const dir = path.resolve(process.cwd(), "backups", new Date().toISOString().replace(/[:.]/g, "-"));
  fs.mkdirSync(dir, { recursive: true });
  for (const n of ["orders", "payment_events", "contacts", "login_otps", "leads"]) {
    if (!names.has(n)) continue;
    fs.writeFileSync(path.join(dir, `${n}.json`), JSON.stringify(await db.collection(n).find().toArray(), null, 2));
  }
  log("backup written to", dir);
}

// ---- 1. orders: paise -> rupees ----
const orders = db.collection("orders");
const legacyOrders = await orders.countDocuments({ amountPaise: { $exists: true } });
log(`orders to convert paise -> rupees: ${legacyOrders}`);
if (APPLY && legacyOrders) {
  await orders.updateMany({ amountPaise: { $exists: true } }, [
    {
      $set: {
        baseAmount: { $divide: ["$baseAmountPaise", 100] },
        discount: { $divide: [{ $ifNull: ["$discountPaise", 0] }, 100] },
        amount: { $divide: ["$amountPaise", 100] },
      },
    },
    { $unset: ["baseAmountPaise", "discountPaise", "amountPaise"] },
  ]);
}

// ---- 2. payment_events -> orders.events ----
if (names.has("payment_events")) {
  const events = await db.collection("payment_events").find().sort({ createdAt: 1 }).toArray();
  log(`payment_events to embed: ${events.length}`);
  if (APPLY) {
    for (const e of events) {
      await orders.updateOne(
        { txnId: e.txnId, "events.eventId": { $ne: e.eventId } },
        {
          $push: {
            events: {
              $each: [{ eventId: e.eventId, source: e.source, status: e.status, payload: e.payload, createdAt: e.createdAt }],
              $slice: -25,
            },
          },
        }
      );
    }
    await db.collection("payment_events").drop();
    log("dropped payment_events");
  }
}

// ---- 3. contacts -> leads ----
if (names.has("contacts")) {
  const contacts = await db.collection("contacts").find().sort({ createdAt: 1 }).toArray();
  log(`contacts to merge into leads: ${contacts.length}`);
  const leads = db.collection("leads");
  const users = db.collection("users");
  for (const c of contacts) {
    const email = (c.email || "").trim().toLowerCase();
    if (email && (await users.findOne({ email }, { projection: { _id: 1 } }))) {
      log(`  skip ${email}: already a paying customer`);
      continue;
    }
    const existing = email ? await leads.findOne({ email }) : null;
    log(`  ${existing ? "update" : "create"} lead for ${email || c.phone || "(no contact)"}`);
    if (!APPLY) continue;
    if (existing) {
      await leads.updateOne(
        { _id: existing._id },
        {
          $set: {
            message: c.message || existing.message,
            name: existing.name || c.name || "",
            phone: existing.phone || c.phone || "",
            state: existing.state || c.state,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      await leads.insertOne({
        _id: new ObjectId(),
        name: c.name || "",
        email,
        phone: c.phone || "",
        state: c.state || undefined,
        authStatus: "unverified",
        status: "captured",
        source: "contact_form",
        message: c.message || undefined,
        marketingConsent: false,
        createdAt: c.createdAt || new Date(),
        updatedAt: new Date(),
      });
    }
  }
  if (APPLY) {
    await db.collection("contacts").drop();
    log("dropped contacts");
  }
}

// ---- 4. login_otps ----
if (names.has("login_otps")) {
  log(`login_otps: ${await db.collection("login_otps").countDocuments()} pending code(s) will be discarded`);
  if (APPLY) {
    await db.collection("login_otps").drop();
    log("dropped login_otps");
  }
}

if (!APPLY) console.log("Dry run only. Re-run with --apply to write.");
await client.close();
