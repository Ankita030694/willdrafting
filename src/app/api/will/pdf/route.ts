import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { auth } from "@/auth";
import { logFunnelEvent } from "@/lib/accounts";
import { jsonError } from "@/lib/http";
import { mintPdfToken } from "@/lib/pdfToken";
import { checkRateLimit } from "@/lib/rateLimit";
import { authorizeDownload, resolveSessionAccount } from "@/lib/wills";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const LOCAL_CHROME_PATHS = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean) as string[];

const BROWSER_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-accelerated-2d-canvas",
  "--disable-gpu",
  "--no-first-run",
];

async function launchBrowser() {
  const puppeteer = (await import("puppeteer-core")).default;
  const local = process.env.NODE_ENV !== "production" ? LOCAL_CHROME_PATHS.find((p) => fs.existsSync(p)) : undefined;
  if (local) {
    return puppeteer.launch({ executablePath: local, headless: true, args: BROWSER_ARGS });
  }
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: BROWSER_ARGS });
  }
  const chromium = (await import("@sparticuz/chromium")).default;
  return puppeteer.launch({
    args: [...chromium.args, ...BROWSER_ARGS],
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

/**
 * Server-rendered PDF of the user's VERIFIED Will. Gate: owner of a paid, verified, unchanged Will
 * (same check as /api/will/download). The PDF is generated from the database copy, never from
 * anything the browser sends.
 */
export async function POST(request: NextRequest) {
  let browser: Awaited<ReturnType<typeof launchBrowser>> | undefined;
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role === "superadmin") return jsonError("Please sign in.", 401);
    const me = await resolveSessionAccount(session.user.id);
    if (!me) return jsonError("Please sign in.", 401);

    const limit = await checkRateLimit(`will_pdf_${me.userId.toString()}`, 20, 60 * 60 * 1000);
    if (!limit.allowed) return jsonError("Too many download attempts. Please try later.", 429);

    const check = await authorizeDownload(me);
    if (!check.ok) return jsonError(check.error, check.status);

    // Render via the same server (loopback) so it works behind proxies/serverless URLs.
    const origin = process.env.PDF_RENDER_ORIGIN || request.nextUrl.origin;
    const url = `${origin}/print/will?t=${encodeURIComponent(mintPdfToken(me.userId.toString()))}`;

    browser = await launchBrowser();
    const page = await browser.newPage();

    // Speed optimization: Block resource-heavy external calls that the printable document does not require
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      if (["image", "media", "font", "websocket"].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Fast DOM load + wait for data-ready selector instead of sluggish networkidle0
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
    await page.waitForSelector("#printable-final-will[data-ready='1']", { timeout: 10_000 });

    // Keep only the will itself (drop site chrome / popups injected by the root layout).
    await page.evaluate(() => {
      const el = document.getElementById("printable-final-will");
      if (el) document.body.replaceChildren(el);
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="width:100%;font-size:9px;font-family:Times New Roman,serif;color:#000;text-align:center">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    });

    void logFunnelEvent(me.userId, me.email, "will_downloaded", { version: check.will.version, format: "pdf" });

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Last-Will-and-Testament.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("POST /api/will/pdf error:", error);
    return jsonError("Could not generate the PDF. Please try again.", 500);
  } finally {
    if (browser) await browser.close().catch(() => undefined);
  }
}
