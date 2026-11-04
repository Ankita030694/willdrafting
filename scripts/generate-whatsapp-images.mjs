#!/usr/bin/env node
/**
 * Generates the header images for the WhatsApp templates in docs/whatsapp-templates.md.
 *
 * Each image is a hand-drawn style illustration (wobbly ink lines, risograph-like grainy fills
 * printed slightly off-register) with a short caption, in English and Hindi.
 * Output: public/images/whatsapp/<template>-<lang>.jpg, 1200x628 (1.91:1), each <= 100 kB.
 *
 * Usage: node scripts/generate-whatsapp-images.mjs
 * Needs Google Chrome installed (rendered with puppeteer-core) and network access for Google Fonts.
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/images/whatsapp");
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MAX_BYTES = 100_000;
const W = 1200;
const H = 628;

const C = {
  navy: "#172228",
  slate: "#49585F",
  rose: "#C65378",
  roseLight: "#EFC3CF",
  sage: "#5F7E75",
  sageLight: "#BFD3C9",
  mustard: "#E3B04B",
  mustardLight: "#F3DDA6",
  paper: "#FFFDF8",
  cream: "#FAF7F0",
};

const THEMES = {
  account: { blob: C.sageLight, accent: C.sage },
  draft: { blob: C.roseLight, accent: C.rose },
  payment: { blob: C.mustardLight, accent: "#A9761A" },
  will: { blob: C.roseLight, accent: C.rose },
  lawyer: { blob: C.sageLight, accent: C.sage },
};

const sparkle = (x, y, s, color) =>
  `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s} Z" fill="${color}"/>`;

const lines = (x, y, widths, gap = 18) =>
  widths.map((w, i) => `<path d="M${x},${y + i * gap} L${x + w},${y + i * gap}"/>`).join("");

const check = (d) => `<path d="${d}" stroke-width="7"/>`;

const RECEIPT_EDGE = (x, y, w) => {
  const teeth = 6;
  const step = w / (teeth * 2);
  let d = "";
  for (let i = teeth * 2 - 1; i >= 0; i--) d += ` L${x + i * step},${y + (i % 2 === 0 ? 0 : 12)}`;
  return d;
};

/** Each illustration lives in a 480x480 box: `fills` print off-register, `ink` is the line art. */
const ILLUSTRATIONS = {
  optin_confirmation: {
    fills: `
      <rect x="150" y="50" width="180" height="330" rx="30" fill="${C.paper}"/>
      <rect x="168" y="96" width="144" height="240" rx="10" fill="${C.sageLight}"/>
      <rect x="182" y="120" width="104" height="40" rx="14" fill="${C.paper}"/>
      <rect x="200" y="176" width="98" height="40" rx="14" fill="${C.roseLight}"/>
      <rect x="182" y="232" width="80" height="40" rx="14" fill="${C.paper}"/>
      <circle cx="334" cy="334" r="50" fill="${C.mustard}"/>`,
    ink: `
      <rect x="150" y="50" width="180" height="330" rx="30"/>
      <rect x="168" y="96" width="144" height="240" rx="10"/>
      <path d="M220,74 L260,74"/>
      <rect x="182" y="120" width="104" height="40" rx="14"/>
      ${lines(196, 134, [62, 40], 12)}
      <rect x="200" y="176" width="98" height="40" rx="14"/>
      ${lines(214, 190, [58, 34], 12)}
      <rect x="182" y="232" width="80" height="40" rx="14"/>
      ${lines(196, 246, [44, 26], 12)}
      <circle cx="334" cy="334" r="50"/>
      ${check("M310,336 L327,353 L358,318")}
      <path d="M372,120 q16,14 0,30 M392,108 q28,28 0,54"/>`,
    accents: sparkle(96, 130, 16, C.rose) + sparkle(400, 60, 11, C.sage) + sparkle(110, 360, 9, C.mustard),
  },
  account_setup_steps: {
    fills: `
      <rect x="120" y="60" width="240" height="340" rx="18" fill="${C.mustard}"/>
      <rect x="142" y="98" width="196" height="282" rx="6" fill="${C.paper}"/>
      <rect x="200" y="42" width="80" height="38" rx="9" fill="${C.sage}"/>
      <rect x="160" y="140" width="30" height="30" rx="6" fill="${C.roseLight}"/>
      <rect x="160" y="212" width="30" height="30" rx="6" fill="${C.roseLight}"/>
      <rect x="160" y="284" width="30" height="30" rx="6" fill="${C.roseLight}"/>
      <g transform="rotate(32 392 300)">
        <rect x="378" y="190" width="30" height="150" rx="4" fill="${C.rose}"/>
        <path d="M378,340 L408,340 L393,374 Z" fill="${C.mustardLight}"/>
      </g>`,
    ink: `
      <rect x="120" y="60" width="240" height="340" rx="18"/>
      <rect x="142" y="98" width="196" height="282" rx="6"/>
      <rect x="200" y="42" width="80" height="38" rx="9"/>
      <rect x="160" y="140" width="30" height="30" rx="6"/>
      <rect x="160" y="212" width="30" height="30" rx="6"/>
      <rect x="160" y="284" width="30" height="30" rx="6"/>
      ${check("M166,154 L174,163 L188,144")}
      ${check("M166,226 L174,235 L188,216")}
      ${lines(206, 150, [108, 70], 14)}
      ${lines(206, 222, [96, 62], 14)}
      ${lines(206, 294, [104, 54], 14)}
      <g transform="rotate(32 392 300)">
        <rect x="378" y="190" width="30" height="150" rx="4"/>
        <path d="M378,340 L408,340 L393,374 Z"/>
        <path d="M378,214 L408,214"/>
      </g>`,
    accents: sparkle(84, 110, 14, C.rose) + sparkle(420, 120, 10, C.sage) + sparkle(96, 380, 10, C.rose),
  },
  draft_progress_saved: {
    fills: `
      <path d="M120,60 H300 L350,110 V410 H120 Z" fill="${C.paper}"/>
      <path d="M300,60 V110 H350 Z" fill="${C.roseLight}"/>
      <path d="M160,60 V134 L178,120 L196,134 V60 Z" fill="${C.rose}"/>
      <rect x="148" y="340" width="176" height="18" rx="9" fill="${C.sageLight}"/>
      <rect x="148" y="340" width="108" height="18" rx="9" fill="${C.sage}"/>
      <path d="M348,206 a28,28 0 0 1 8,-54 a36,36 0 0 1 68,-6 a26,26 0 0 1 10,60 Z" fill="${C.mustard}"/>`,
    ink: `
      <path d="M120,60 H300 L350,110 V410 H120 Z"/>
      <path d="M300,60 V110 H350"/>
      <path d="M160,60 V134 L178,120 L196,134 V60"/>
      ${lines(148, 172, [150, 170, 120, 160, 96, 140], 24)}
      <rect x="148" y="340" width="176" height="18" rx="9"/>
      <path d="M348,206 a28,28 0 0 1 8,-54 a36,36 0 0 1 68,-6 a26,26 0 0 1 10,60 Z"/>
      ${check("M370,180 L386,194 L410,166")}`,
    accents: sparkle(80, 150, 14, C.sage) + sparkle(420, 300, 12, C.rose) + sparkle(400, 410, 8, C.mustard),
  },
  payment_pending: {
    fills: `
      <path d="M100,70 H290 V360 ${RECEIPT_EDGE(100, 360, 190)} Z" fill="${C.paper}"/>
      <rect x="100" y="70" width="190" height="54" fill="${C.sageLight}"/>
      <rect x="300" y="196" width="124" height="16" rx="7" fill="${C.rose}"/>
      <rect x="300" y="384" width="124" height="16" rx="7" fill="${C.rose}"/>
      <path d="M318,212 C318,270 360,280 360,298 C360,316 318,326 318,384 H406 C406,326 364,316 364,298 C364,280 406,270 406,212 Z" fill="${C.paper}"/>
      <path d="M332,238 H392 C388,260 368,276 362,284 C356,276 336,260 332,238 Z" fill="${C.mustard}"/>
      <path d="M326,382 C334,352 350,342 362,340 C374,342 390,352 398,382 Z" fill="${C.mustard}"/>`,
    ink: `
      <path d="M100,70 H290 V360 ${RECEIPT_EDGE(100, 360, 190)} Z"/>
      <path d="M100,124 H290"/>
      <text x="122" y="208" font-family="Fraunces, Georgia, serif" font-size="46" font-weight="600" fill="${C.navy}" stroke="none">₹</text>
      ${lines(160, 192, [96, 64], 18)}
      ${lines(122, 256, [146, 120, 146, 90], 22)}
      <rect x="300" y="196" width="124" height="16" rx="7"/>
      <rect x="300" y="384" width="124" height="16" rx="7"/>
      <path d="M318,212 C318,270 360,280 360,298 C360,316 318,326 318,384 M406,212 C406,270 364,280 364,298 C364,316 406,326 406,384"/>
      <path d="M362,290 L362,336" stroke-dasharray="2 9"/>`,
    accents: sparkle(70, 120, 13, C.rose) + sparkle(440, 150, 10, C.sage) + sparkle(250, 430, 9, C.rose),
  },
  payment_failed: {
    fills: `
      <rect x="70" y="130" width="280" height="176" rx="18" fill="${C.sage}"/>
      <rect x="70" y="166" width="280" height="34" fill="${C.navy}"/>
      <rect x="100" y="224" width="46" height="34" rx="6" fill="${C.mustard}"/>
      <circle cx="344" cy="132" r="46" fill="${C.rose}"/>
      <circle cx="330" cy="370" r="54" fill="${C.mustardLight}"/>`,
    ink: `
      <rect x="70" y="130" width="280" height="176" rx="18"/>
      <rect x="100" y="224" width="46" height="34" rx="6"/>
      <path d="M100,241 H146 M123,224 V258"/>
      <path d="M170,236 H260 M170,280 H200 M214,280 H244 M258,280 H288"/>
      <circle cx="344" cy="132" r="46"/>
      <path d="M326,114 L362,150 M362,114 L326,150" stroke-width="7"/>
      <path d="M296,368 A36,36 0 1 1 314,400"/>
      <path d="M282,350 L296,370 L318,360"/>`,
    accents: sparkle(84, 90, 13, C.mustard) + sparkle(430, 260, 11, C.sage) + sparkle(150, 400, 10, C.rose),
  },
  payment_receipt: {
    fills: `
      <path d="M110,56 H300 V380 ${RECEIPT_EDGE(110, 380, 190)} Z" fill="${C.paper}"/>
      <rect x="110" y="56" width="190" height="54" fill="${C.mustard}"/>
      <g transform="rotate(-14 330 300)"><circle cx="330" cy="300" r="66" fill="${C.roseLight}"/></g>`,
    ink: `
      <path d="M110,56 H300 V380 ${RECEIPT_EDGE(110, 380, 190)} Z"/>
      <path d="M110,110 H300"/>
      <text x="132" y="190" font-family="Fraunces, Georgia, serif" font-size="46" font-weight="600" fill="${C.navy}" stroke="none">₹</text>
      ${lines(170, 174, [96, 60], 18)}
      ${lines(132, 238, [140, 110, 146], 22)}
      <path d="M132,318 H230" stroke-dasharray="3 8"/>
      <g transform="rotate(-14 330 300)" stroke="${C.rose}">
        <circle cx="330" cy="300" r="66"/>
        <circle cx="330" cy="300" r="54" stroke-dasharray="6 6"/>
        ${check("M302,302 L322,322 L360,280")}
      </g>`,
    accents: sparkle(70, 110, 14, C.sage) + sparkle(430, 140, 12, C.mustard) + sparkle(420, 420, 9, C.rose),
  },
  will_ready_to_verify: {
    fills: `
      <rect x="100" y="50" width="220" height="296" rx="10" fill="${C.paper}"/>
      <rect x="124" y="170" width="150" height="20" fill="${C.mustardLight}"/>
      <rect x="110" y="376" width="50" height="60" rx="10" fill="${C.sageLight}"/>
      <rect x="174" y="376" width="50" height="60" rx="10" fill="${C.sageLight}"/>
      <rect x="238" y="376" width="50" height="60" rx="10" fill="${C.sageLight}"/>
      <rect x="302" y="376" width="50" height="60" rx="10" fill="${C.sageLight}"/>
      <circle cx="330" cy="200" r="64" fill="${C.roseLight}"/>
      <g transform="rotate(42 400 280)"><rect x="390" y="250" width="24" height="96" rx="10" fill="${C.rose}"/></g>`,
    ink: `
      <rect x="100" y="50" width="220" height="296" rx="10"/>
      ${lines(124, 92, [170, 140, 160], 22)}
      ${lines(124, 180, [150], 22)}
      ${lines(124, 226, [170, 120, 150, 80], 22)}
      <rect x="110" y="376" width="50" height="60" rx="10"/>
      <rect x="174" y="376" width="50" height="60" rx="10"/>
      <rect x="238" y="376" width="50" height="60" rx="10"/>
      <rect x="302" y="376" width="50" height="60" rx="10"/>
      <circle cx="135" cy="406" r="6" fill="${C.navy}"/>
      <circle cx="199" cy="406" r="6" fill="${C.navy}"/>
      <circle cx="263" cy="406" r="6" fill="${C.navy}"/>
      <path d="M318,418 L336,418"/>
      <circle cx="330" cy="200" r="64"/>
      <path d="M298,176 q14,-18 36,-14"/>
      <g transform="rotate(42 400 280)"><rect x="390" y="250" width="24" height="96" rx="10"/></g>`,
    accents: sparkle(70, 90, 13, C.rose) + sparkle(440, 90, 11, C.mustard) + sparkle(420, 380, 9, C.sage),
  },
  will_verified_download: {
    fills: `
      <rect x="140" y="46" width="214" height="290" rx="8" fill="${C.paper}"/>
      <path d="M290,312 L276,382 L298,368 L314,390 L322,322 Z" fill="${C.rose}"/>
      <path d="M318,322 L332,388 L344,366 L366,374 L346,312 Z" fill="${C.rose}"/>
      <circle cx="318" cy="292" r="42" fill="${C.rose}"/>
      <circle cx="110" cy="372" r="48" fill="${C.mustard}"/>
      <g transform="rotate(-28 410 380)"><rect x="350" y="370" width="130" height="18" rx="9" fill="${C.sage}"/></g>
      <g transform="rotate(22 400 420)"><rect x="340" y="412" width="124" height="18" rx="9" fill="${C.navy}"/></g>`,
    ink: `
      <rect x="140" y="46" width="214" height="290" rx="8"/>
      <path d="M190,84 H304" stroke-width="5"/>
      ${lines(164, 122, [166, 140, 166, 120, 150], 22)}
      <path d="M166,262 c10,-24 18,18 28,-2 s18,-22 28,0 s14,10 26,-8"/>
      <circle cx="318" cy="292" r="42"/>
      <circle cx="318" cy="292" r="28" stroke="${C.paper}"/>
      <circle cx="110" cy="372" r="48"/>
      <path d="M110,346 V394 M92,378 L110,396 L128,378" stroke-width="6"/>
      <g transform="rotate(-28 410 380)"><rect x="350" y="370" width="130" height="18" rx="9"/></g>
      <g transform="rotate(22 400 420)"><rect x="340" y="412" width="124" height="18" rx="9"/></g>`,
    accents: sparkle(90, 90, 14, C.sage) + sparkle(430, 90, 12, C.mustard) + sparkle(78, 250, 9, C.rose),
  },
  lawyer_review_update: {
    fills: `
      <rect x="90" y="96" width="214" height="300" rx="10" fill="${C.paper}"/>
      <rect x="112" y="200" width="150" height="20" fill="${C.mustardLight}"/>
      <path d="M262,52 H414 a22,22 0 0 1 22,22 V148 a22,22 0 0 1 -22,22 H316 L290,196 L294,170 H262 a22,22 0 0 1 -22,-22 V74 a22,22 0 0 1 22,-22 Z" fill="${C.sageLight}"/>
      <circle cx="314" cy="366" r="36" fill="${C.roseLight}"/>
      <circle cx="398" cy="366" r="36" fill="${C.roseLight}"/>`,
    ink: `
      <rect x="90" y="96" width="214" height="300" rx="10"/>
      ${lines(112, 136, [160, 130], 22)}
      ${lines(112, 210, [150], 22)}
      ${lines(112, 256, [170, 120, 150, 90], 22)}
      <path d="M262,52 H414 a22,22 0 0 1 22,22 V148 a22,22 0 0 1 -22,22 H316 L290,196 L294,170 H262 a22,22 0 0 1 -22,-22 V74 a22,22 0 0 1 22,-22 Z"/>
      ${lines(268, 92, [138, 110, 70], 24)}
      <circle cx="314" cy="366" r="36"/>
      <circle cx="398" cy="366" r="36"/>
      <path d="M350,362 Q356,350 362,362 M278,358 L246,340 M434,358 L456,340"/>`,
    accents: sparkle(60, 120, 13, C.rose) + sparkle(450, 250, 10, C.mustard) + sparkle(200, 440, 9, C.sage),
  },
  consultation_confirmed: {
    fills: `
      <rect x="90" y="86" width="260" height="256" rx="18" fill="${C.paper}"/>
      <path d="M108,86 H332 a18,18 0 0 1 18,18 V148 H90 V104 a18,18 0 0 1 18,-18 Z" fill="${C.rose}"/>
      <circle cx="262" cy="248" r="22" fill="${C.mustard}"/>
      <circle cx="356" cy="344" r="62" fill="${C.sageLight}"/>`,
    ink: `
      <rect x="90" y="86" width="260" height="256" rx="18"/>
      <path d="M90,148 H350"/>
      <path d="M150,66 V108 M290,66 V108" stroke-width="7"/>
      ${[0, 1, 2, 3, 4].map((c) => [0, 1, 2].map((r) => `<rect x="${118 + c * 48}" y="${180 + r * 48}" width="16" height="16" rx="3"/>`).join("")).join("")}
      <circle cx="262" cy="248" r="22"/>
      <circle cx="356" cy="344" r="62"/>
      <path d="M356,344 V306 M356,344 L382,360" stroke-width="6"/>
      <circle cx="356" cy="344" r="4" fill="${C.navy}"/>`,
    accents: sparkle(60, 100, 13, C.sage) + sparkle(430, 100, 12, C.mustard) + sparkle(110, 410, 10, C.rose),
  },
};

const TEMPLATES = [
  {
    name: "optin_confirmation",
    theme: "account",
    en: { kicker: "WhatsApp updates", title: "Updates are on", sub: "Only about your will, payments and reviews" },
    hi: { kicker: "WhatsApp अपडेट", title: "अपडेट चालू हैं", sub: "सिर्फ़ आपकी वसीयत, भुगतान और समीक्षा के बारे में" },
  },
  {
    name: "account_setup_steps",
    theme: "account",
    en: { kicker: "Your account", title: "Your account is ready", sub: "Three things to keep handy" },
    hi: { kicker: "आपका खाता", title: "आपका खाता तैयार है", sub: "ये तीन चीज़ें पास रखें" },
  },
  {
    name: "draft_progress_saved",
    theme: "draft",
    en: { kicker: "Your draft", title: "Your draft is saved", sub: "Continue from the same step any time" },
    hi: { kicker: "आपका ड्राफ़्ट", title: "आपका ड्राफ़्ट सेव है", sub: "जब चाहें उसी चरण से आगे भरें" },
  },
  {
    name: "payment_pending",
    theme: "payment",
    en: { kicker: "Payment", title: "Payment pending", sub: "Your order is waiting for payment" },
    hi: { kicker: "भुगतान", title: "भुगतान बाक़ी है", sub: "आपका ऑर्डर भुगतान का इंतज़ार कर रहा है" },
  },
  {
    name: "payment_failed",
    theme: "payment",
    en: { kicker: "Payment", title: "Payment didn’t go through", sub: "You can try again" },
    hi: { kicker: "भुगतान", title: "भुगतान नहीं हो पाया", sub: "आप फिर से कोशिश कर सकते हैं" },
  },
  {
    name: "payment_receipt",
    theme: "payment",
    en: { kicker: "Payment", title: "Payment received", sub: "Your receipt and next step" },
    hi: { kicker: "भुगतान", title: "भुगतान मिल गया", sub: "आपकी रसीद और अगला चरण" },
  },
  {
    name: "will_ready_to_verify",
    theme: "will",
    en: { kicker: "Your will", title: "Ready to verify", sub: "One last check before download" },
    hi: { kicker: "आपकी वसीयत", title: "पुष्टि के लिए तैयार", sub: "डाउनलोड से पहले आख़िरी जाँच" },
  },
  {
    name: "will_verified_download",
    theme: "will",
    en: { kicker: "Your will", title: "Your will is ready", sub: "Sign it in front of two witnesses" },
    hi: { kicker: "आपकी वसीयत", title: "आपकी वसीयत तैयार है", sub: "दो गवाहों के सामने हस्ताक्षर करें" },
  },
  {
    name: "lawyer_review_update",
    theme: "lawyer",
    en: { kicker: "Lawyer review", title: "An update from your lawyer", sub: "See the review on your account" },
    hi: { kicker: "वकील की समीक्षा", title: "वकील की ओर से अपडेट", sub: "अपने खाते में समीक्षा देखें" },
  },
  {
    name: "consultation_confirmed",
    theme: "lawyer",
    en: { kicker: "Consultation", title: "Your call is booked", sub: "Keep your will draft open" },
    hi: { kicker: "परामर्श", title: "आपकी कॉल तय है", sub: "अपनी वसीयत का ड्राफ़्ट खुला रखें" },
  },
];

function svgFilters(seed) {
  return `
    <filter id="ink" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="${seed}" result="w"/>
      <feDisplacementMap in="SourceGraphic" in2="w" scale="3.4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="riso" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="${seed + 3}" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.15" result="a"/>
      <feComposite in="SourceGraphic" in2="a" operator="in" result="t"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="${seed + 7}" result="w"/>
      <feDisplacementMap in="t" in2="w" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>`;
}

function page(t, lang, seed) {
  const copy = t[lang];
  const theme = THEMES[t.theme];
  const ill = ILLUSTRATIONS[t.name];
  const isHi = lang === "hi";
  const titleFont = isHi ? "'Tiro Devanagari Hindi', serif" : "'Fraunces', Georgia, serif";
  const bodyFont = isHi ? "'Mukta', sans-serif" : "'DM Sans', sans-serif";
  const blobRotate = (seed * 37) % 360;

  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600&family=Mukta:wght@400;600&family=Tiro+Devanagari+Hindi&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${W}px; height: ${H}px; background: ${C.cream}; position: relative; overflow: hidden; font-family: ${bodyFont}; color: ${C.navy}; }
  .layer { position: absolute; inset: 0; }
  .brand { position: absolute; left: 76px; top: 64px; font: 600 22px 'DM Sans', sans-serif; letter-spacing: 0.01em; display: flex; align-items: center; gap: 10px; }
  .brand i { width: 12px; height: 12px; border-radius: 50%; background: ${C.rose}; display: inline-block; }
  .copy { position: absolute; left: 76px; top: 0; bottom: 0; width: 540px; display: flex; flex-direction: column; justify-content: center; }
  .kicker { font: 600 ${isHi ? 22 : 17}px ${bodyFont}; letter-spacing: ${isHi ? "0" : "0.14em"}; text-transform: uppercase; color: ${theme.accent}; margin-bottom: 18px; }
  h1 { font-family: ${titleFont}; font-weight: ${isHi ? 400 : 600}; font-size: ${isHi ? 60 : 62}px; line-height: ${isHi ? 1.35 : 1.06}; letter-spacing: ${isHi ? "0" : "-0.015em"}; }
  .squiggle { display: block; margin: ${isHi ? 4 : 14}px 0 22px; }
  .sub { font-size: ${isHi ? 28 : 27}px; line-height: 1.35; color: ${C.slate}; max-width: 500px; }
  .art { position: absolute; left: 676px; top: 70px; width: 480px; height: 480px; }
</style></head><body>
  <svg class="layer" width="${W}" height="${H}">
    <defs>${svgFilters(seed)}
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="${seed}"/><feColorMatrix type="matrix" values="0 0 0 0 0.09  0 0 0 0 0.13  0 0 0 0 0.16  0 0 0 0.07 0"/></filter>
    </defs>
    <g filter="url(#riso)" transform="translate(676 70) rotate(${blobRotate} 240 240)">
      <path d="M240,30 C350,20 452,100 455,222 C460,342 380,452 248,455 C118,460 30,380 28,250 C26,122 128,40 240,30 Z" fill="${theme.blob}"/>
    </g>
    <g fill="${C.navy}" opacity="0.18">
      ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) => `<circle cx="${1110 + c * 14}" cy="${470 + r * 14}" r="2.2"/>`).join("")).join("")}
    </g>
  </svg>
  <div class="brand"><i></i>WillDrafting.in</div>
  <div class="copy">
    <div class="kicker">${copy.kicker}</div>
    <h1>${copy.title}</h1>
    <svg class="squiggle" width="230" height="20" viewBox="0 0 230 20"><defs>${svgFilters(seed + 11)}</defs>
      <path d="M4,12 C40,4 70,18 108,10 S180,4 226,12" fill="none" stroke="${C.rose}" stroke-width="5" stroke-linecap="round" filter="url(#ink)"/>
    </svg>
    <div class="sub">${copy.sub}</div>
  </div>
  <svg class="art" viewBox="0 0 480 480" width="480" height="480">
    <defs>${svgFilters(seed + 5)}</defs>
    <g filter="url(#riso)" transform="translate(6 5)">${ill.fills}</g>
    <g filter="url(#ink)" fill="none" stroke="${C.navy}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${ill.ink}</g>
    <g filter="url(#riso)">${ill.accents}</g>
  </svg>
  <svg class="layer" width="${W}" height="${H}" style="mix-blend-mode:multiply"><rect width="100%" height="100%" filter="url(#grain)"/></svg>
</body></html>`;
}

async function toJpeg(png) {
  for (let q = 84; q >= 50; q -= 4) {
    const buf = await sharp(png).flatten({ background: C.cream }).jpeg({ quality: q, mozjpeg: true }).toBuffer();
    if (buf.length <= MAX_BYTES) return { buf, q };
  }
  throw new Error("Could not compress image under 100 kB");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  try {
    const tab = await browser.newPage();
    await tab.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    let seed = 2;
    for (const t of TEMPLATES) {
      seed += 1;
      for (const lang of ["en", "hi"]) {
        await tab.setContent(page(t, lang, seed), { waitUntil: "load", timeout: 90_000 });
        await tab.evaluate(() => document.fonts.ready);
        await new Promise((r) => setTimeout(r, 300));
        const png = await tab.screenshot({ type: "png", clip: { x: 0, y: 0, width: W, height: H } });
        const { buf, q } = await toJpeg(png);
        const file = path.join(OUT_DIR, `${t.name}-${lang}.jpg`);
        fs.writeFileSync(file, buf);
        console.log(`${path.relative(process.cwd(), file)}  ${(buf.length / 1000).toFixed(1)} kB  q${q}`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
