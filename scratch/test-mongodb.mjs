import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, "../.env.local");
let uri = process.env.MONGODB_URI;

if (!uri && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("MONGODB_URI=")) {
      uri = trimmed.substring("MONGODB_URI=".length).replace(/^["']|["']$/g, "");
      break;
    }
  }
}

if (!uri) {
  console.error("❌ MONGODB_URI is not set in .env.local");
  process.exit(1);
}

console.log("Connecting to MongoDB Atlas at URI:", uri.replace(/:([^:@]+)@/, ":****@"));
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 8000,
  socketTimeoutMS: 45000,
});

async function runTest() {
  try {
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");

    const db = client.db("willdrafting");
    
    // 1. Test Contacts Collection
    console.log("\n--- Testing 'contacts' collection ---");
    const testContact = {
      name: "Automated Test User",
      phone: "9876543210",
      email: "test.contact@willdrafting.in",
      helpTopic: "Test Topic - Will Drafting",
      message: "This is a test message to verify database persistence.",
      agreeDisclaimer: true,
      source: "test_suite",
      status: "test",
      ipAddress: "127.0.0.1",
      userAgent: "TestAgent/1.0",
      createdAt: new Date(),
    };

    const contactResult = await db.collection("contacts").insertOne(testContact);
    console.log("✅ Inserted test contact record with ID:", contactResult.insertedId.toString());

    const fetchedContact = await db.collection("contacts").findOne({ _id: contactResult.insertedId });
    console.log("✅ Fetched contact from DB:", fetchedContact?.name, "|", fetchedContact?.email);

    // Clean up test contact
    await db.collection("contacts").deleteOne({ _id: contactResult.insertedId });
    console.log("✅ Cleaned up test contact record.");

    // 2. Test Leads Collection
    console.log("\n--- Testing 'leads' collection ---");
    const testLead = {
      fullName: "Automated Test Lead",
      phone: "9876543211",
      email: "test.lead@willdrafting.in",
      state: "Maharashtra",
      source: "global_popup_test",
      status: "test",
      ipAddress: "127.0.0.1",
      userAgent: "TestAgent/1.0",
      createdAt: new Date(),
    };

    const leadResult = await db.collection("leads").insertOne(testLead);
    console.log("✅ Inserted test lead record with ID:", leadResult.insertedId.toString());

    const fetchedLead = await db.collection("leads").findOne({ _id: leadResult.insertedId });
    console.log("✅ Fetched lead from DB:", fetchedLead?.fullName, "|", fetchedLead?.state);

    // Clean up test lead
    await db.collection("leads").deleteOne({ _id: leadResult.insertedId });
    console.log("✅ Cleaned up test lead record.");

    console.log("\n🎉 All MongoDB tests passed successfully! Database is ready and operational.");
  } catch (err) {
    console.error("❌ MongoDB connection or query failed:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

runTest();
