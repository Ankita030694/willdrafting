import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { normalizeEmail, isValidEmail } from "@/lib/authValidation";
import {
  ADMIN_SESSION_SECONDS,
  CLAIMS_REFRESH_SECONDS,
  AppRole,
  AuthStatus,
  FunnelStage,
  PaymentStatus,
} from "@/lib/authTypes";
import {
  claimsFor,
  findAccountByEmail,
  findAccountById,
  findOrCreateVerifiedAccount,
  type Account,
} from "@/lib/accounts";
import { verifyLoginOtp } from "@/lib/otp";

const providers = [];

// Optional Google Provider (only initialized if client credentials exist in environment)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

function isBanned(account: Account | null): boolean {
  return account?.kind === "user" && Boolean(account.doc.isBanned);
}

function toAuthUser(account: Account) {
  const claims = claimsFor(account);
  return {
    id: account.doc._id.toString(),
    email: account.doc.email,
    name: claims.name,
    phone: claims.phone,
    role: "user" as AppRole,
    authStatus: claims.authStatus,
    paymentStatus: claims.paymentStatus,
    funnelStage: claims.funnelStage,
    needsPhone: claims.needsPhone,
  };
}

// Customer sign-in: email + one-time code emailed to the user (no passwords).
providers.push(
  Credentials({
    id: "email-otp",
    name: "Email OTP",
    credentials: {
      email: { label: "Email", type: "email" },
      otp: { label: "One-time code", type: "text" },
    },
    authorize: async (credentials) => {
      const email = normalizeEmail(credentials?.email);
      const otp = String(credentials?.otp ?? "").trim();
      if (!email || !isValidEmail(email) || !otp) return null;

      const result = await verifyLoginOtp(email, otp);
      if (!result.ok) return null;

      const account = await findOrCreateVerifiedAccount({
        email,
        source: "login_signup",
      });
      if (isBanned(account)) return null;

      return toAuthUser(account);
    },
  })
);

// Superadmin sign-in (env credentials only, used by the hidden admin login page).
providers.push(
  Credentials({
    id: "credentials",
    name: "Admin",
    credentials: {
      identifier: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
      isAdmin: { label: "Is Admin Login", type: "text" },
    },
    authorize: async (credentials) => {
      const identifier = String(credentials?.identifier ?? "").trim();
      const password = String(credentials?.password ?? "");
      if (!identifier || !password) return null;

      const adminEmail = process.env.SUPERADMIN_EMAIL?.trim().toLowerCase();
      const adminHash = process.env.SUPERADMIN_PASSWORD_HASH?.trim();
      if (!adminEmail || !adminHash || identifier.toLowerCase() !== adminEmail) return null;

      const adminPwValid = await bcrypt.compare(password, adminHash);
      if (!adminPwValid) return null;

      return {
        id: "superadmin_env",
        email: adminEmail,
        name: "Superadmin",
        role: "superadmin" as AppRole,
        authStatus: "verified" as const,
        paymentStatus: "paid" as const,
        funnelStage: "customer" as const,
        adminIssuedAt: Math.floor(Date.now() / 1000),
      };
    },
  })
);

import { isLocalhostUrl } from "@/lib/http";

// Guard against a leftover `NEXTAUTH_URL=http://localhost:3000` in production environments,
// which would otherwise cause NextAuth's `reqWithEnvURL` to rewrite OAuth redirects to localhost.
if (process.env.NODE_ENV === "production") {
  if (isLocalhostUrl(process.env.NEXTAUTH_URL)) {
    delete process.env.NEXTAUTH_URL;
  }
  if (isLocalhostUrl(process.env.AUTH_URL)) {
    delete process.env.AUTH_URL;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const effectiveBase =
        process.env.NODE_ENV === "production" && isLocalhostUrl(baseUrl)
          ? "https://www.willdrafting.in"
          : baseUrl;

      if (url.startsWith("/")) return `${effectiveBase}${url}`;

      try {
        const parsed = new URL(url);
        if (process.env.NODE_ENV === "production" && isLocalhostUrl(parsed.origin)) {
          return `${effectiveBase}${parsed.pathname}${parsed.search}${parsed.hash}`;
        }
        if (parsed.origin === new URL(effectiveBase).origin) return url;
      } catch {
        // Fallback to effectiveBase below
      }
      return effectiveBase;
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = normalizeEmail(user.email || profile?.email);
        if (!email || !isValidEmail(email)) return false;
        // Only trust Google if it asserts the email is verified.
        if (profile && profile.email_verified === false) return false;

        const existing = await findAccountByEmail(email);
        if (isBanned(existing)) return false;

        const resolved = await findOrCreateVerifiedAccount({
          email,
          name: user.name || undefined,
          googleId: profile?.sub || account.providerAccountId,
          source: "google",
        });

        Object.assign(user, toAuthUser(resolved));
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      const nowSeconds = Math.floor(Date.now() / 1000);

      // Initial sign-in: copy user claims into JWT
      if (user) {
        token.sub = user.id;
        token.role = user.role || "user";
        token.phone = user.phone || null;
        token.authStatus = user.authStatus || "unverified";
        token.paymentStatus = user.paymentStatus || "unpaid";
        token.funnelStage = user.funnelStage || "registered";
        token.needsPhone = user.needsPhone ?? !user.phone;
        token.refreshedAt = nowSeconds;

        if (user.role === "superadmin") {
          token.adminIssuedAt = user.adminIssuedAt || nowSeconds;
        }
      }

      // Superadmin 8-hour session expiration
      if (token.role === "superadmin") {
        const adminIssued = typeof token.adminIssuedAt === "number" ? token.adminIssuedAt : 0;
        if (adminIssued && nowSeconds - adminIssued > ADMIN_SESSION_SECONDS) {
          return null; // Force session logout
        }
        return token;
      }

      const forced = trigger === "update" || (session && typeof session === "object");
      const lastRefreshed = typeof token.refreshedAt === "number" ? token.refreshedAt : 0;
      const isUnpaid = token.paymentStatus !== "paid";
      // If user is unpaid, refresh immediately (max 2 seconds cache) so successful checkout is picked up instantly
      const stale = isUnpaid ? (nowSeconds - lastRefreshed > 2) : (nowSeconds - lastRefreshed > CLAIMS_REFRESH_SECONDS);

      // Re-read claims after payment / profile changes (update()) and periodically, so a
      // payment, ban or verification is reflected without waiting for a new login.
      if ((forced || stale) && token.sub) {
        try {
          const account = await findAccountById(token.sub);
          if (!account || isBanned(account)) return null; // deleted or banned: end session
          const claims = claimsFor(account);
          token.authStatus = claims.authStatus;
          token.paymentStatus = claims.paymentStatus;
          token.funnelStage = claims.funnelStage;
          token.phone = claims.phone;
          token.needsPhone = claims.needsPhone;
          token.name = claims.name || token.name;
          token.refreshedAt = nowSeconds;
        } catch (err) {
          console.error("Failed to refresh user claims:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        session.user.role = (token.role as AppRole) || "user";
        session.user.phone = (token.phone as string | null) || null;
        session.user.authStatus = (token.authStatus as AuthStatus) || "unverified";
        session.user.paymentStatus = (token.paymentStatus as PaymentStatus) || "unpaid";
        session.user.funnelStage = (token.funnelStage as FunnelStage) || "registered";
        session.user.needsPhone = Boolean(token.needsPhone);
      }
      return session;
    },
  },
});
