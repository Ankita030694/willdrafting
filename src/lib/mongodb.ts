import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.warn("⚠️ Warning: MONGODB_URI environment variable is not defined in environment.");
}

interface MongoConnectionCache {
  client: MongoClient;
  promise: Promise<MongoClient>;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientCache: MongoConnectionCache | undefined;
}

let cached = global._mongoClientCache;

if (!cached) {
  cached = global._mongoClientCache = {
    client: null as unknown as MongoClient,
    promise: null as unknown as Promise<MongoClient>,
  };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  if (cached!.client) {
    return {
      client: cached!.client,
      db: cached!.client.db("willdrafting"),
    };
  }

  if (!cached!.promise) {
    const opts = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    };

    const client = new MongoClient(uri, opts);
    cached!.promise = client.connect().then((connectedClient) => {
      cached!.client = connectedClient;
      return connectedClient;
    });
  }

  try {
    const client = await cached!.promise;
    const db = client.db("willdrafting");
    return { client, db };
  } catch (error) {
    cached!.promise = null as unknown as Promise<MongoClient>;
    cached!.client = null as unknown as MongoClient;
    throw error;
  }
}

export default connectToDatabase;
