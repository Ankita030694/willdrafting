import { MongoClient, Db, MongoClientOptions } from "mongodb";

interface MongoConnectionCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientCache: MongoConnectionCache | undefined;
}

let cached = global._mongoClientCache;

if (!cached) {
  cached = global._mongoClientCache = {
    client: null,
    promise: null,
  };
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  // If already connected and client is active, reuse it
  if (cached?.client) {
    try {
      const db = cached.client.db("willdrafting");
      return { client: cached.client, db };
    } catch {
      // In case cached client is disconnected, invalidate and reconnect
      cached.client = null;
      cached.promise = null;
    }
  }

  if (!cached?.promise) {
    const opts: MongoClientOptions = {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
    };

    const client = new MongoClient(uri, opts);
    cached!.promise = client
      .connect()
      .then((connectedClient) => {
        cached!.client = connectedClient;
        return connectedClient;
      })
      .catch((err) => {
        cached!.promise = null;
        cached!.client = null;
        throw err;
      });
  }

  try {
    const client = await cached!.promise;
    const db = client.db("willdrafting");
    return { client, db };
  } catch (error) {
    cached!.promise = null;
    cached!.client = null;
    console.error("Failed to establish MongoDB connection:", error);
    throw error;
  }
}

export default connectToDatabase;
