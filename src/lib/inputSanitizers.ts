// src/lib/inputSanitizers.ts
// Shared helpers for restricting what a user can type (onChange filters) and for
// normalising the casing of free text (applied centrally whenever will state is saved).
//
// NOTE: tsconfig target is ES2017 — avoid `\p{..}` regexes and the `u` flag.

import type { WillDraftingState } from "./willDraftingStore";

/* ------------------------------------------------------------------ */
/* Live onChange filters                                               */
/* ------------------------------------------------------------------ */

export function digitsOnly(value: string | number | undefined | null, maxLen?: number): string {
  const d = String(value ?? "").replace(/\D/g, "");
  return typeof maxLen === "number" ? d.slice(0, maxLen) : d;
}

/** Aadhaar: digits only, at most 12 digits (unformatted). */
export function sanitizeAadhaar(value: string): string {
  return digitsOnly(value, 12);
}

/** Aadhaar formatted as "XXXX XXXX XXXX" (partial input supported). */
export function formatAadhaar(value: string): string {
  const d = sanitizeAadhaar(value);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function isValidAadhaar(value: string | undefined | null): boolean {
  return sanitizeAadhaar(value || "").length === 12;
}

export const AADHAAR_ERROR_MSG = "Aadhaar number must contain exactly 12 digits.";

export function sanitizePhone10(value: string): string {
  return digitsOnly(value, 10);
}

export function sanitizePincode(value: string): string {
  return digitsOnly(value, 6);
}

/** Strip characters that never belong in a person's name (digits and symbols) and apply live Name Case. */
export function sanitizeNameInput(value: string): string {
  const cleaned = value.replace(/[\d!@#$%^&*()_+=\[\]{};:"\\|,<>\/?~`]/g, "");
  return toNameCase(cleaned, false);
}

/** PAN: enforce positional Indian PAN format (5 letters A-Z, 4 digits 0-9, 1 letter A-Z) on change. */
export function sanitizePan(value: string): string {
  const raw = (value || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  let out = "";
  for (let i = 0; i < raw.length && out.length < 10; i++) {
    const ch = raw[i];
    const pos = out.length;
    if (pos < 5 || pos === 9) {
      if (/[A-Z]/.test(ch)) out += ch;
    } else {
      if (/[0-9]/.test(ch)) out += ch;
    }
  }
  return out;
}

/** Indian digit grouping: 1234567 -> "12,34,567". */
export function formatIndianNumber(value: number | string | undefined | null): string {
  const raw = digitsOnly(typeof value === "number" ? Math.floor(Math.abs(value)) : value, 15);
  if (!raw) return "";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(parseInt(raw, 10));
}

/** "12,34,567" -> 1234567. Non-digits are ignored. */
export function parseIndianNumber(value: string | number | undefined | null): number {
  const d = digitsOnly(value, 15);
  return d ? parseInt(d, 10) : 0;
}

/** Integer 0..100 (digits only, no leading zeros). Returns "" when empty. */
export function sanitizePercent(value: string): string {
  const d = digitsOnly(value, 3).replace(/^0+(?=\d)/, "");
  if (!d) return "";
  return String(Math.min(100, parseInt(d, 10)));
}

/* ------------------------------------------------------------------ */
/* Casing normalisers                                                  */
/* ------------------------------------------------------------------ */

const LATIN_WORD = /[A-Za-z]+/g;

/** "rohit  SRIVASTAVA" -> "Rohit Srivastava". Every word is capitalised. */
export function toNameCase(value: string, final = false): string {
  if (!value) return value;
  let out = value.replace(LATIN_WORD, (w, offset: number, str: string) => {
    // possessive / contraction tail: Singh's, don't
    if (w.length === 1 && offset > 0 && (str[offset - 1] === "'" || str[offset - 1] === "\u2019")) {
      return w.toLowerCase();
    }
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });
  out = out.replace(/ {2,}/g, " ");
  return final ? out.trim() : out;
}

const KEEP_UPPER = new Set([
  "HDFC", "SBI", "ICICI", "LIC", "IIT", "IIM", "DLF", "PNB", "NPS", "PPF", "FD", "RD", "SIP", "EPF",
  "PF", "UPI", "ATM", "IDBI", "UCO", "BOB", "BOI", "KVP", "NSC", "ELSS", "ULIP", "HUF", "LLP",
  "NRI", "NRE", "NRO", "BSE", "NSE", "IRDA", "GST", "PAN", "ID", "UK", "USA", "UAE", "UP", "MP",
  "AP", "HP", "J&K", "NCR", "DDA", "MDA", "BHK", "RBI", "AXIS", "IDFC", "TCS", "ONGC", "NTPC",
  "BHEL", "SAIL", "HAL", "BEL", "CSB", "PVT", "LTD", "OPC", "II", "III", "IV", "VI", "VII", "VIII",
]);
const SMALL_WORDS = new Set(["of", "and", "the", "in", "at", "for", "to", "on", "by", "or", "a", "an", "near", "opp"]);
const ORDINAL = /^\d+(st|nd|rd|th)$/i;

/**
 * Title-cases free text such as addresses, institutions and asset names.
 * Acronyms (HDFC, SBI, ...), tokens with digits (3BHK, 12B) are kept/uppercased,
 * ordinals (2nd) are lowercased.
 */
export function toTitleCaseText(value: string, final = false): string {
  if (!value) return value;
  const hasLower = /[a-z]/.test(value);
  const parts = value.split(/([\s,()\-\/&]+)/);
  let wordIndex = 0;
  const mapped = parts.map((tok) => {
    if (!tok || /^[\s,()\-\/&]+$/.test(tok)) return tok;
    const idx = wordIndex++;
    if (/\d/.test(tok)) {
      return ORDINAL.test(tok) ? tok.toLowerCase() : tok.toUpperCase();
    }
    const upper = tok.toUpperCase();
    if (KEEP_UPPER.has(upper) && (tok === upper || !hasLower)) return upper;
    const isAllCaps = tok === upper && tok.length > 1;
    if (isAllCaps && hasLower && tok.length <= 5) return tok; // acronym inside a normal sentence
    const hasInnerUpper = /[a-z]/.test(tok) && /[A-Z]/.test(tok.slice(1));
    if (hasInnerUpper) return tok.charAt(0).toUpperCase() + tok.slice(1); // McDonald, DLF-style mixes
    const lower = tok.toLowerCase();
    if (idx > 0 && SMALL_WORDS.has(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
  const out = mapped.join("").replace(/ {2,}/g, " ");
  return final ? out.trim() : out;
}

/** Capitalise the first letter of each sentence; standalone "i" -> "I". Never lowercases. */
export function toSentenceCase(value: string, final = false): string {
  if (!value) return value;
  let out = value.replace(/(^|[.!?]\s+|\n\s*)([a-z])/g, (_m, p1: string, p2: string) => p1 + p2.toUpperCase());
  out = out.replace(/\bi\b(?![.])/g, "I");
  return final ? out.trim() : out;
}

export function normalizeEmail(value: string): string {
  return (value || "").replace(/\s+/g, "").toLowerCase();
}

export function normalizeIdCode(value: string): string {
  return (value || "").replace(/\s+/g, "").toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Whole-state normaliser                                              */
/* ------------------------------------------------------------------ */

const isStr = (v: unknown): v is string => typeof v === "string";

function mapField<T extends Record<string, any>>(obj: T, key: keyof T, fn: (s: string) => string): T {
  const v = obj?.[key];
  if (!isStr(v) || v === "") return obj;
  const next = fn(v);
  return next === v ? obj : { ...obj, [key]: next };
}

function applyFields<T extends Record<string, any>>(obj: T, keys: (keyof T)[], fn: (s: string) => string): T {
  let cur = obj;
  for (const k of keys) cur = mapField(cur, k, fn);
  return cur;
}

/**
 * Applies casing rules to every free-text field in the will state.
 * Idempotent; safe to call on every save. `final=true` additionally trims whitespace.
 * Relationship codes and enum-like fields are deliberately left untouched.
 */
export function normalizeWillState(state: WillDraftingState, final = false): WillDraftingState {
  if (!state) return state;
  const name = (s: string) => toNameCase(s, final);
  const text = (s: string) => toTitleCaseText(s, final);
  const sentence = (s: string) => toSentenceCase(s, final);

  let s: WillDraftingState = state;

  if (s.testator) {
    let t = s.testator;
    t = applyFields(t, ["fullName", "fatherOrMotherName", "city"], name);
    t = applyFields(t, ["address", "workplace"], text);
    t = mapField(t, "pan", normalizeIdCode);
    t = mapField(t, "email", normalizeEmail);
    if (t !== s.testator) s = { ...s, testator: t };
  }

  if (Array.isArray(s.familyMembers)) {
    let changed = false;
    const members = s.familyMembers.map((m) => {
      let n = m;
      n = mapField(n, "name", name);
      n = mapField(n, "customRelationship", text);
      n = mapField(n, "pan", normalizeIdCode);
      n = mapField(n, "email", normalizeEmail);
      n = mapField(n, "notes", sentence);
      if (isStr(n.address) && !/^same as/i.test(n.address.trim())) n = mapField(n, "address", text);
      if (n !== m) changed = true;
      return n;
    });
    if (changed) s = { ...s, familyMembers: members };
  }

  if (Array.isArray(s.assets)) {
    let changed = false;
    const assets = s.assets.map((a) => {
      let n = a;
      if (
        n.ownership === "joint" &&
        isStr(n.jointOwnerName) &&
        n.jointOwnerName.trim() &&
        (!isStr(n.jointOwnerRelationship) || !n.jointOwnerRelationship.trim())
      ) {
        const rawJoint = n.jointOwnerName.trim();
        const parenMatch = rawJoint.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
        const wordMatch = rawJoint.match(
          /^(.+?)\s+(wife|husband|spouse|brother|sister|father|mother|son|daughter|partner)$/i
        );
        if (parenMatch) {
          n = { ...n, jointOwnerName: parenMatch[1].trim(), jointOwnerRelationship: parenMatch[2].trim() };
        } else if (wordMatch) {
          n = { ...n, jointOwnerName: wordMatch[1].trim(), jointOwnerRelationship: wordMatch[2].trim() };
        }
      }
      n = applyFields(n, ["name", "typeDetails", "addressOrInstitution", "insuranceCompany", "customCategoryName"], text);
      n = applyFields(n, ["identifier", "policyNumber"], normalizeIdCode);
      n = applyFields(n, ["nomineeName", "jointOwnerName"], name);
      n = mapField(n, "jointOwnerRelationship", text);
      n = applyFields(n, ["loanDetails", "specialInstructions"], sentence);
      if (n !== a) changed = true;
      return n;
    });
    if (changed) s = { ...s, assets };
  }

  if (Array.isArray(s.allocations)) {
    let changed = false;
    const allocations = s.allocations.map((a) => {
      const n = mapField(a, "beneficiaryName", name);
      if (n !== a) changed = true;
      return n;
    });
    if (changed) s = { ...s, allocations };
  }

  s = applyFields(
    s,
    [
      "residuaryBeneficiaryName",
      "residuaryAlternateName",
      "residuaryPrimary01Name",
      "residuaryPrimary02Name",
      "residuaryBackup01Name",
      "residuaryBackup02Name",
    ] as (keyof WillDraftingState)[],
    name
  );

  const contactKeys = ["executorPrimary", "executorAlternate", "guardianPrimary", "guardianAlternate"] as const;
  for (const key of contactKeys) {
    const c = s[key];
    if (!c) continue;
    let n = c;
    n = mapField(n, "name", name);
    n = mapField(n, "relationship", name);
    n = mapField(n, "address", text);
    n = mapField(n, "email", normalizeEmail);
    if (n !== c) s = { ...s, [key]: n };
  }

  s = applyFields(s, ["guardianSpecialInstructions", "emotionalReason"] as (keyof WillDraftingState)[], sentence);

  if (s.specialWishes) {
    const w = applyFields(
      s.specialWishes,
      [
        "jewelleryInstructions",
        "personalBelongings",
        "petsCare",
        "charitableGifts",
        "digitalAccounts",
        "funeralCeremonyWishes",
        "personalMessageToFamily",
      ],
      sentence
    );
    if (w !== s.specialWishes) s = { ...s, specialWishes: w };
  }

  return s;
}
