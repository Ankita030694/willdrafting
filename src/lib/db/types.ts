import type { ObjectId } from "mongodb";
import type { AuthStatus, PlanId } from "@/lib/authTypes";
import type { WillDraftingState } from "@/lib/willDraftingStore";

/**
 * Data model
 * ----------
 * leads  : everyone who has not paid yet (form captures, unpaid signups, Google sign-ins).
 * users  : ONLY paying customers. A lead becomes a user at payment time, keeping the SAME _id,
 *          and the lead document is deleted in the same transaction.
 * orders / funnel_events : payment (incl. embedded gateway events) + analytics trail that survives lead deletion.
 */

export type LeadStatus =
  | "captured" // only submitted a form (no password yet)
  | "registered" // created a password, email not verified yet
  | "email_verified" // verified email, has not started checkout
  | "checkout_started" // created a payment order
  | "payment_failed"; // last payment attempt failed / was abandoned

export type LeadSource =
  | "intake_popup"
  | "contact_form"
  | "wizard_signup"
  | "login_signup"
  | "google"
  | "admin";

/** Fields shared by lead and user documents (so identity code can treat them alike). */
export interface AccountBase {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  state?: string;
  /** Set when the account signed in with Google (Google asserts the email is verified). */
  googleId?: string | null;
  /** Login is passwordless (email OTP / Google); "verified" means email ownership was proven. */
  authStatus: AuthStatus;
  /** Needed before any marketing / retargeting campaign messages. */
  marketingConsent?: boolean;
  unsubscribedAt?: Date | null;
  /** Active email-login code (one per account). Cleared on successful use. */
  loginOtp?: OtpState | null;
  /** Active will-verification code (separate so the two flows never overwrite each other). */
  willOtp?: OtpState | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadDoc extends AccountBase {
  status: LeadStatus;
  source: LeadSource;
  /** Free text from the contact form or similar. */
  message?: string;
  /** Plan the lead was looking at when they signed up / started checkout. */
  interestedPlanId?: PlanId;
  lastCheckoutAt?: Date | null;
  /** Campaign bookkeeping (Phase 8): how many retargeting messages were sent and when. */
  campaignSentCount?: number;
  lastCampaignAt?: Date | null;
}

export interface UserDoc extends AccountBase {
  role: "user";
  paymentStatus: "paid";
  funnelStage: "customer";
  planId: PlanId;
  /** Wills the customer can still create. +1 for every paid order. */
  willCredits: number;
  isBanned?: boolean;
  paidAt: Date;
  lastOrderId?: ObjectId | null;
  /** Attribution carried over from the lead before it was deleted. */
  leadSource?: LeadSource | null;
  leadCreatedAt?: Date | null;
}

export type OrderStatus = "created" | "pending" | "paid" | "failed" | "abandoned";
export type OrderKind = "first_purchase" | "extra_credit" | "plan_upgrade";

export interface OrderDoc {
  _id: ObjectId;
  /** Public payment txnid sent to PayU (unique). */
  txnId: string;
  accountId: ObjectId;
  accountKind: "lead" | "user";
  email: string;
  planId: PlanId;
  kind: OrderKind;
  /** All money values are rupees (max 2 decimals). */
  baseAmount: number;
  discount: number;
  amount: number;
  couponCode?: string | null;
  status: OrderStatus;
  gateway: "payu" | "admin_grant";
  gatewayPaymentId?: string | null;
  failureReason?: string | null;
  invoiceNo?: string | null;
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date | null;
  /**
   * Gateway notifications for this order (redirect / webhook / verify API), newest last, capped.
   * `eventId` makes a repeated delivery of the same notification a no-op.
   */
  events?: PaymentEventEntry[];
}

export interface PaymentEventEntry {
  eventId: string;
  source: "redirect" | "webhook" | "verify_api";
  status: string;
  payload: Record<string, unknown>;
  createdAt: Date;
}

export type FunnelEventType =
  | "lead_captured"
  | "signup"
  | "email_verified"
  | "checkout_started"
  | "payment_failed"
  | "payment_succeeded"
  | "lead_converted"
  | "will_verified"
  | "will_unlocked"
  | "will_downloaded";

/**
 * One will per account. `userId` is the account `_id`, which stays the same when a lead becomes a
 * paying user, so the will survives conversion untouched.
 * `detailsVerified` / `lockedAt` are written ONLY by the server (OTP verification), never by the client.
 */
export interface WillDoc {
  _id: ObjectId;
  /** Present when the user is authenticated (lead or user). Undefined for anonymous guests. */
  userId?: ObjectId;
  /** Cryptographic guest session UUID (present for anonymous drafts). */
  sessionId?: string;
  /** Flag to distinguish guest drafts from registered user wills. */
  isGuest?: boolean;
  /** Optional email (guests may not have provided an email yet). */
  email?: string;
  state: WillDraftingState;
  /** Incremented on every accepted save. */
  version: number;
  detailsVerified: boolean;
  detailsVerifiedAt?: Date | null;
  /** While set, the will is immutable: every write route refuses to change `state`. */
  lockedAt?: Date | null;
  /** SHA-256 of `state` at verification time, re-checked before every download. */
  verifiedHash?: string | null;
  unlockCount?: number;
  downloadCount?: number;
  lastDownloadedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  /** TTL index field: Abandoned guest drafts auto-delete after 30 days. Unset on user registration. */
  expiresAt?: Date | null;
}

export interface FunnelEventDoc {
  _id: ObjectId;
  accountId: ObjectId;
  email: string;
  type: FunnelEventType;
  meta?: Record<string, unknown>;
  createdAt: Date;
}

/** A single one-time code stored directly on the account document (leads / users). */
export interface OtpState {
  /** HMAC-SHA256 of the 6-digit code, never the code itself. */
  codeHash: string;
  attempts: number;
  /** Used for the resend cooldown. */
  lastSentAt: Date;
  expiresAt: Date;
}

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogReviewItem {
  name: string;
  rating: number;
  review: string;
  location?: string;
}

export interface BlogReferenceItem {
  title: string;
  url: string;
}

export interface BlogDoc {
  _id: ObjectId;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  /** Permanent link to the cover image (e.g., `/api/blog-images/<id>`) */
  image: string;
  /** Optional MongoDB `blog_images` document ID for the cover image */
  imageId?: string | null;
  /** Permanent link to the mid-article topic infographic (e.g., `/api/blog-images/<id>`) */
  infographic?: string | null;
  /** Optional MongoDB `blog_images` document ID for the infographic */
  infographicId?: string | null;
  /** Full semantic HTML body */
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  /** Bullet takeaways shown in "The short version" sidebar card */
  shortVersion?: string[];
  /** Actionable checklist steps shown in "What to do next" card */
  actionSteps?: string[];
  author: string;
  authorRole?: string;
  status: "PUBLISHED" | "DRAFT";
  faqs: BlogFAQItem[];
  reviews: BlogReviewItem[];
  references?: BlogReferenceItem[];
  disclaimer?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogImageDoc {
  _id: ObjectId;
  kind: "cover" | "infographic" | "inline";
  filename: string;
  mimeType: string;
  /** Raw base64 payload (without `data:...;base64,` prefix) stored in MongoDB */
  base64: string;
  size: number;
  prompt?: string | null;
  blogSlug?: string | null;
  createdAt: Date;
}

export interface PromptProfileDoc {
  _id: ObjectId;
  name: string;
  description: string;
  coreInstructions: string;
  targetWordCount: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

