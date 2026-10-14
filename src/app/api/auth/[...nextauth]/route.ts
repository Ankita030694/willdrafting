import type { NextRequest } from "next/server";
import { handlers } from "@/auth";
import { isLocalhostUrl, withPublicOriginRequest } from "@/lib/http";

function sanitizeProdAuthEnv() {
  if (process.env.NODE_ENV === "production") {
    if (isLocalhostUrl(process.env.NEXTAUTH_URL)) delete process.env.NEXTAUTH_URL;
    if (isLocalhostUrl(process.env.AUTH_URL)) delete process.env.AUTH_URL;
  }
}

export async function GET(request: NextRequest) {
  sanitizeProdAuthEnv();
  return handlers.GET(withPublicOriginRequest(request));
}

export async function POST(request: NextRequest) {
  sanitizeProdAuthEnv();
  return handlers.POST(withPublicOriginRequest(request));
}

