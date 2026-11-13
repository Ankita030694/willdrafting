/**
 * WhatsApp reminder consent. The exact wording shown to the user is stored with each consent
 * (DPDP: consent must be specific and provable), so bump the version whenever the text changes.
 */
export const WHATSAPP_CONSENT_VERSION = "2026-11-13-v1";
export const WHATSAPP_CONSENT_TEXT = "Send me reminders and updates about my will on WhatsApp";

/** Fields to `$set` on a lead / user when they tick the WhatsApp consent box. */
export function consentPatch(source: string): Record<string, unknown> {
  return {
    marketingConsent: true,
    marketingConsentAt: new Date(),
    marketingConsentSource: source,
    marketingConsentVersion: WHATSAPP_CONSENT_VERSION,
  };
}
