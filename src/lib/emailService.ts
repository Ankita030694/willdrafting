function getAppBaseUrl(): string {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/+$/, "");
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXTAUTH_URL || "https://www.willdrafting.in";
}

const DEFAULT_FROM = "notify@amalegalsolutions.com";
const FROM_NAME = "WillDrafting.in";

function fromAddress(): string {
  return process.env.MAIL_FROM || DEFAULT_FROM;
}

function zeptoAuthHeader(): string | null {
  const raw = (process.env.ZEPTO_API_KEY || "").trim().replace(/^"|"$/g, "");
  if (!raw) return null;
  // Accept the token with or without ZeptoMail's "Zoho-enczapikey " prefix.
  return /^zoho-enczapikey\s/i.test(raw) ? raw : `Zoho-enczapikey ${raw}`;
}

interface MailInput {
  to: string;
  subject: string;
  text: string;
  html: string;
}

function devConsoleMail(mail: MailInput, reason: string) {
  console.log("\n=================================================================");
  console.log(`📧 [EMAIL - DEV CONSOLE] ${reason}`);
  console.log(`To: ${mail.to}`);
  console.log(`Subject: ${mail.subject}`);
  console.log(mail.text);
  console.log("=================================================================\n");
}

/**
 * Sends through the ZeptoMail API (transactional mail from notify@amalegalsolutions.com).
 * In development, a missing key or a failed send prints the mail to the server console instead,
 * so sign-in stays testable; production always throws so a broken setup is never silent.
 */
async function sendMail(mail: MailInput): Promise<void> {
  const auth = zeptoAuthHeader();
  if (!auth) {
    if (process.env.NODE_ENV === "production") throw new Error("ZEPTO_API_KEY is not configured.");
    devConsoleMail(mail, "ZEPTO_API_KEY not set, printing instead of sending");
    return;
  }

  try {
    const host = (process.env.ZEPTO_HOST || "api.zeptomail.in").replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const res = await fetch(`https://${host}/v1.1/email`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: auth },
      body: JSON.stringify({
        from: { address: fromAddress(), name: FROM_NAME },
        to: [{ email_address: { address: mail.to } }],
        subject: mail.subject,
        textbody: mail.text,
        htmlbody: mail.html,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 400);
      throw new Error(`ZeptoMail HTTP ${res.status}: ${detail}`);
    }
  } catch (err) {
    if (process.env.NODE_ENV === "production") throw err;
    console.error("[email] ZeptoMail send failed (dev fallback to console):", (err as Error).message);
    devConsoleMail(mail, "send failed, printing instead");
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function shell(title: string, bodyHtml: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1f2937">
<h2 style="margin:0 0 16px;color:#111827">${escapeHtml(title)}</h2>${bodyHtml}
<p style="margin-top:24px;font-size:12px;color:#6b7280">WillDrafting.in</p></div>`;
}

export async function sendLoginOtpEmail(email: string, code: string, name?: string): Promise<void> {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  await sendMail({
    to: email,
    subject: `${code} is your WillDrafting.in login code`,
    text: `Your WillDrafting.in login code is ${code}. It expires in 10 minutes. If you did not request it, you can ignore this email.`,
    html: shell(
      "Your login code",
      `<p>${greeting}</p>
<p>Use this code to sign in to WillDrafting.in:</p>
<p style="font-size:32px;letter-spacing:8px;font-weight:700;margin:16px 0">${escapeHtml(code)}</p>
<p style="font-size:13px;color:#6b7280">It expires in 10 minutes. If you did not request it, you can safely ignore this email.</p>`
    ),
  });
}

export async function sendWillVerificationOtpEmail(email: string, code: string, name?: string): Promise<void> {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  await sendMail({
    to: email,
    subject: `${code} is your Will Verification & Download Code`,
    text: `Your WillDrafting.in verification code is ${code}. It expires in 10 minutes. Enter this code to verify your Will details and unlock the final court-ready document for download.`,
    html: shell(
      "Verify Your Will Details & Unlock Download",
      `<p>${greeting}</p>
<p>You requested to verify all details of your Last Will and Testament to unlock the court-ready document download on WillDrafting.in.</p>
<p>Your one-time 6-digit verification code is:</p>
<p style="font-size:32px;letter-spacing:8px;font-weight:700;margin:16px 0;color:#C65378">${escapeHtml(code)}</p>
<p style="font-size:13px;color:#6b7280">This code expires in 10 minutes. Once entered, your details will be certified and your Will document will be unlocked for printing and PDF saving.</p>
<p style="font-size:12px;color:#9ca3af;margin-top:16px;">Protected under bank-grade encryption in accordance with the Indian Succession Act, 1925.</p>`
    ),
  });
}

export async function sendAdminInviteEmail(email: string, name?: string): Promise<void> {
  const loginUrl = `${getAppBaseUrl()}/login`;
  await sendMail({
    to: email,
    subject: "Your WillDrafting.in account is ready",
    text: `An account has been created for you on WillDrafting.in. Sign in with your email at ${loginUrl} - we will email you a one-time code.`,
    html: shell(
      "Your account is ready",
      `<p>${name ? `Hi ${escapeHtml(name)},` : "Hi,"}</p>
<p>An account has been created for you on WillDrafting.in. Sign in with this email address and we will send you a one-time code.</p>
<p><a href="${loginUrl}" style="display:inline-block;padding:10px 18px;background:#111827;color:#fff;border-radius:8px;text-decoration:none">Go to sign in</a></p>`
    ),
  });
}

export async function sendPaymentReceiptEmail(input: {
  email: string;
  name?: string;
  planName: string;
  amountRupees: string;
  txnId: string;
  invoiceNo?: string | null;
}): Promise<void> {
  const ref = input.invoiceNo ? `Invoice ${input.invoiceNo}` : `Reference ${input.txnId}`;
  await sendMail({
    to: input.email,
    subject: `Payment received - ${input.planName} (${ref})`,
    text: `Thank you${input.name ? `, ${input.name}` : ""}! We received Rs. ${input.amountRupees} for ${input.planName}. ${ref}. Transaction ID: ${input.txnId}. No GST has been charged. Sign in at ${getAppBaseUrl()}/login to continue with your Will.`,
    html: shell(
      "Payment received",
      `<p>${input.name ? `Hi ${escapeHtml(input.name)},` : "Hi,"}</p>
<p>Thank you! We have received your payment.</p>
<table style="font-size:14px;border-collapse:collapse">
<tr><td style="padding:4px 12px 4px 0;color:#6b7280">Plan</td><td>${escapeHtml(input.planName)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;color:#6b7280">Amount</td><td>&#8377;${escapeHtml(input.amountRupees)} (no GST charged)</td></tr>
<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${input.invoiceNo ? "Invoice" : "Reference"}</td><td>${escapeHtml(input.invoiceNo || input.txnId)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;color:#6b7280">Transaction ID</td><td>${escapeHtml(input.txnId)}</td></tr>
</table>
<p><a href="${getAppBaseUrl()}/start/dashboard" style="display:inline-block;padding:10px 18px;background:#111827;color:#fff;border-radius:8px;text-decoration:none">Continue to your Will</a></p>`
    ),
  });
}
