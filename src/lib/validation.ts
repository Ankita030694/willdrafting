/**
 * Validation helpers for Indian legal documents and forms
 */

/**
 * Validates that a mobile number contains strictly 10 numeric digits.
 * Rejects spaces, "+91", letters, or numbers of length != 10.
 */
export function isValidMobile(phone: string | undefined | null): boolean {
  if (!phone) return false;
  // Strictly 10 digits only
  return /^\d{10}$/.test(phone.trim());
}

/**
 * Strips non-digits and truncates to 10 digits.
 */
export function sanitizeMobileInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}

export const MOBILE_ERROR_MSG = "Mobile number must contain exactly 10 digits.";
export const MOBILE_ERROR_MSG_HI = "मोबाइल नंबर में ठीक 10 अंक होने चाहिए।";
