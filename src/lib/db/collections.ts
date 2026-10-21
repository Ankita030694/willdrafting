import type { Collection, Db } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import type {
  BlogDoc,
  BlogImageDoc,
  FunnelEventDoc,
  LeadDoc,
  OrderDoc,
  PromptProfileDoc,
  UserDoc,
  WillDoc,
} from "@/lib/db/types";

declare global {
  // eslint-disable-next-line no-var
  var _wdIndexesPromise: Promise<void> | undefined;
  // eslint-disable-next-line no-var
  var _wdIndexesSig: string | undefined;
}

/** Bump whenever an index is added/changed so a long-running dev server re-applies the list. */
const INDEX_SIGNATURE = "2026-10-21-blogs-images-prompts-v4";

/**
 * Partial unique indexes: legacy / stub documents hold "" for email or phone, which must not
 * collide with each other, so only non-empty strings take part in the uniqueness check.
 */
const NON_EMPTY_EMAIL = { email: { $gt: "" } };

async function createIndexes(db: Db): Promise<void> {
  const tasks: Array<{ label: string; run: () => Promise<unknown> }> = [
    {
      label: "users.email unique",
      run: () =>
        db
          .collection("users")
          .createIndex({ email: 1 }, { unique: true, partialFilterExpression: NON_EMPTY_EMAIL }),
    },
    { label: "users.phone", run: () => db.collection("users").createIndex({ phone: 1 }) },
    {
      label: "leads.email unique",
      run: () =>
        db
          .collection("leads")
          .createIndex({ email: 1 }, { unique: true, partialFilterExpression: NON_EMPTY_EMAIL }),
    },
    { label: "leads.phone", run: () => db.collection("leads").createIndex({ phone: 1 }) },
    {
      label: "leads.status+updatedAt",
      run: () => db.collection("leads").createIndex({ status: 1, updatedAt: -1 }),
    },
    {
      label: "orders.txnId unique",
      run: () => db.collection("orders").createIndex({ txnId: 1 }, { unique: true }),
    },
    {
      label: "orders.account",
      run: () => db.collection("orders").createIndex({ accountId: 1, createdAt: -1 }),
    },
    {
      label: "funnel_events.account",
      run: () => db.collection("funnel_events").createIndex({ accountId: 1, createdAt: -1 }),
    },
    {
      label: "wills.userId unique (partial)",
      run: async () => {
        try {
          const list = await db.collection("wills").indexes();
          const legacy = list.find((i) => i.name === "userId_1" && !i.partialFilterExpression);
          if (legacy) {
            await db.collection("wills").dropIndex("userId_1");
          }
        } catch {
          // ignore if already dropped or missing
        }
        return db.collection("wills").createIndex(
          { userId: 1 },
          { unique: true, partialFilterExpression: { userId: { $exists: true } } }
        );
      },
    },
    {
      label: "wills.sessionId unique (partial)",
      run: () =>
        db.collection("wills").createIndex(
          { sessionId: 1 },
          { unique: true, partialFilterExpression: { sessionId: { $exists: true } } }
        ),
    },
    {
      label: "wills.expiresAt TTL",
      run: () =>
        db.collection("wills").createIndex(
          { expiresAt: 1 },
          { expireAfterSeconds: 0 }
        ),
    },
    {
      label: "rate_limits TTL",
      run: () => db.collection("rate_limits").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    },
    {
      label: "blogs.slug unique",
      run: () => db.collection("blogs").createIndex({ slug: 1 }, { unique: true }),
    },
    {
      label: "blogs.status+createdAt",
      run: () => db.collection("blogs").createIndex({ status: 1, createdAt: -1 }),
    },
    {
      label: "blog_images.createdAt",
      run: () => db.collection("blog_images").createIndex({ createdAt: -1 }),
    },
    {
      label: "prompts.isDefault+createdAt",
      run: () => db.collection("prompts").createIndex({ isDefault: -1, createdAt: -1 }),
    },
  ];

  // One failing index (e.g. pre-existing duplicate data) must not take the whole API down.
  for (const task of tasks) {
    try {
      await task.run();
    } catch (err) {
      console.error(`[db] Failed to create index "${task.label}":`, err);
    }
  }
}

/** Connects and (once per process) ensures every index exists. */
export async function getDb(): Promise<Db> {
  const { db } = await connectToDatabase();
  if (!global._wdIndexesPromise || global._wdIndexesSig !== INDEX_SIGNATURE) {
    global._wdIndexesSig = INDEX_SIGNATURE;
    global._wdIndexesPromise = createIndexes(db).catch((err) => {
      global._wdIndexesPromise = undefined;
      console.error("[db] Index creation failed:", err);
    });
  }
  await global._wdIndexesPromise;
  return db;
}

export async function leadsCol(): Promise<Collection<LeadDoc>> {
  return (await getDb()).collection<LeadDoc>("leads");
}
export async function usersCol(): Promise<Collection<UserDoc>> {
  return (await getDb()).collection<UserDoc>("users");
}
export async function ordersCol(): Promise<Collection<OrderDoc>> {
  return (await getDb()).collection<OrderDoc>("orders");
}
export async function funnelEventsCol(): Promise<Collection<FunnelEventDoc>> {
  return (await getDb()).collection<FunnelEventDoc>("funnel_events");
}
export async function willsCol(): Promise<Collection<WillDoc>> {
  return (await getDb()).collection<WillDoc>("wills");
}
export async function blogsCol(): Promise<Collection<BlogDoc>> {
  return (await getDb()).collection<BlogDoc>("blogs");
}
export async function blogImagesCol(): Promise<Collection<BlogImageDoc>> {
  return (await getDb()).collection<BlogImageDoc>("blog_images");
}
export async function promptsCol(): Promise<Collection<PromptProfileDoc>> {
  return (await getDb()).collection<PromptProfileDoc>("prompts");
}

