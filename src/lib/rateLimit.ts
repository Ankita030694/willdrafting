/**
 * Rate limiter for authentication / sensitive endpoints.
 * Protects against brute-force attacks on login, OTP and download endpoints.
 *
 * Counters live in MongoDB (`rate_limits`, TTL-cleaned) so limits hold across serverless instances and
 * restarts. If the database is unreachable we fall back to a per-process in-memory sliding window.
 */
import { getDb } from "@/lib/db/collections";

interface RateLimitRecord {
  timestamps: number[];
}

const store = new Map<string, RateLimitRecord>();

// Clean up stale entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 15 * 60 * 1000);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

export type RateLimitResult = { allowed: boolean; remaining: number; retryAfterSeconds: number };

/** Shared (MongoDB) fixed-window limiter; falls back to memory if the DB call fails. */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  try {
    const db = await getDb();
    const doc = await db.collection<{ _id: string; count: number; resetAt: number; expiresAt: Date }>("rate_limits").findOneAndUpdate(
      { _id: key },
      [
        {
          $set: {
            expired: { $lte: [{ $ifNull: ["$resetAt", 0] }, now] },
          },
        },
        {
          $set: {
            count: { $cond: ["$expired", 1, { $add: [{ $ifNull: ["$count", 0] }, 1] }] },
            resetAt: { $cond: ["$expired", now + windowMs, "$resetAt"] },
          },
        },
        { $set: { expiresAt: { $toDate: "$resetAt" } } },
        { $unset: "expired" },
      ] as never,
      { upsert: true, returnDocument: "after" }
    );
    if (!doc) return checkRateLimitMemory(key, maxRequests, windowMs);
    if (doc.count > maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, Math.ceil((doc.resetAt - now) / 1000)),
      };
    }
    return { allowed: true, remaining: maxRequests - doc.count, retryAfterSeconds: 0 };
  } catch (err) {
    console.error("[rateLimit] DB limiter failed, using memory fallback:", err);
    return checkRateLimitMemory(key, maxRequests, windowMs);
  }
}

/**
 * Per-process sliding window (fallback).
 * @param key Unique key (e.g. IP address or identifier + action)
 * @param maxRequests Maximum requests allowed within the window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimitMemory(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  let record = store.get(key);

  if (!record) {
    record = { timestamps: [] };
    store.set(key, record);
  }

  // Filter timestamps within window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0];
    const retryAfterSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, retryAfterSeconds),
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    retryAfterSeconds: 0,
  };
}
