import { AppRole, AuthStatus, PaymentStatus, FunnelStage } from "@/lib/authTypes";

declare module "@auth/core/jwt" {
  interface JWT {
    role?: AppRole;
    phone?: string | null;
    authStatus?: AuthStatus;
    paymentStatus?: PaymentStatus;
    funnelStage?: FunnelStage;
    needsPhone?: boolean;
    refreshedAt?: number;
    adminIssuedAt?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: AppRole;
    phone?: string | null;
    authStatus?: AuthStatus;
    paymentStatus?: PaymentStatus;
    funnelStage?: FunnelStage;
    needsPhone?: boolean;
    refreshedAt?: number;
    adminIssuedAt?: number;
  }
}

declare module "next-auth" {
  interface User {
    id?: string;
    role?: AppRole;
    phone?: string | null;
    authStatus?: AuthStatus;
    paymentStatus?: PaymentStatus;
    funnelStage?: FunnelStage;
    needsPhone?: boolean;
    adminIssuedAt?: number;
  }

  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: AppRole;
      phone?: string | null;
      authStatus?: AuthStatus;
      paymentStatus?: PaymentStatus;
      funnelStage?: FunnelStage;
      needsPhone?: boolean;
    };
  }
}
