#!/usr/bin/env node
/**
 * Screaming Frog SEO Audit Compliance Validator
 * Enforces all rules documented in SEO_AUDIT_RULES.md across the codebase.
 * Run with: node scripts/seo-audit-check.mjs
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC_APP = path.join(ROOT, "src/app");

function walk(dir, filterFn) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full, filterFn));
    } else if (!filterFn || filterFn(full)) {
      results.push(full);
    }
  }
  return results;
}

let errors = [];

// 1. Check all public page.tsx metadata (Title <= 60 chars, Description <= 155 chars)
const pageFiles = walk(SRC_APP, (f) => f.endsWith("page.tsx") && !f.includes("/authority/") && !f.includes("/start/") && !f.includes("/login") && !f.includes("/signup") && !f.includes("/complete-profile"));

for (const file of pageFiles) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");

  // Check absolute or plain title
  const absMatch = content.match(/title:\s*\{\s*absolute:\s*"([^"]+)"/s);
  const plainMatch = content.match(/export const metadata[^{]*\{\s*title:\s*"([^"]+)"/s);
  if (absMatch) {
    const t = absMatch[1];
    if (t.length > 60) {
      errors.push(`[Title > 60 chars (${t.length})] ${rel}: "${t}"`);
    }
  } else if (plainMatch) {
    const t = plainMatch[1];
    const effectiveLen = t.length + " | WillDrafting.in".length;
    if (effectiveLen > 60) {
      errors.push(`[Template Title > 60 chars (${effectiveLen})] ${rel}: "${t} | WillDrafting.in"`);
    }
  }

  // Check meta description
  const descMatch = content.match(/export const metadata[\s\S]*?description:\s*"([^"]+)"/);
  if (descMatch) {
    const d = descMatch[1];
    if (d.length > 155) {
      errors.push(`[Meta Description > 155 chars (${d.length})] ${rel}: "${d}"`);
    }
  }
}

// 2. Check all .tsx files for H2 > 70, Non-Sequential H3/H4 before H2, <Image fill />, Alt > 100, and broken /service/ links
const tsxFiles = walk(path.join(ROOT, "src"), (f) => f.endsWith(".tsx") && !f.includes("/authority/") && !f.includes("/start/"));

for (const file of tsxFiles) {
  const rel = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");

  // Check /service/ singular internal links
  if (/href=["']\/service\//.test(content)) {
    errors.push(`[Redirecting /service/ link] ${rel}`);
  }

  // Check timed-out India Code DSpace handle / sam_handle URLs
  if (/["']https?:\/\/(?:www\.)?indiacode\.nic\.in\/(?:handle\/|bitstream\/|\?sam_handle=)/i.test(content)) {
    errors.push(`[Timed-out India Code handle URL] ${rel}`);
  }

  // Check <Image ... fill />
  const imgTags = content.match(/<Image\b[^>]*\/>/gs) || [];
  for (const tag of imgTags) {
    if (/\bfill\b(?!=)/.test(tag)) {
      errors.push(`[Image using fill instead of explicit width/height] ${rel}`);
    }
  }

  // Check alt > 100 chars (static double/single-quoted alt=, openGraph alt:, and string literals inside JSX alt={...})
  const altMatches = content.matchAll(/\balt\s*[:=]\s*(["'])((?:\\.|(?!\1)[\s\S])*?)\1/g);
  for (const m of altMatches) {
    if (m[2].length > 100) {
      errors.push(`[Image alt > 100 chars (${m[2].length})] ${rel}`);
    }
  }
  const jsxAltStarts = content.matchAll(/\balt\s*=\s*\{/g);
  for (const m of jsxAltStarts) {
    let idx = m.index + m[0].length;
    let depth = 1;
    let quote = null;
    while (idx < content.length && depth > 0) {
      const ch = content[idx];
      if (quote) {
        if (ch === "\\") idx++;
        else if (ch === quote) quote = null;
      } else {
        if (ch === '"' || ch === "'" || ch === "`") quote = ch;
        else if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      idx++;
    }
    const expr = content.slice(m.index + m[0].length, idx - 1);
    for (const lit of expr.matchAll(/(["'])((?:\\.|(?!\1)[\s\S])*?)\1/g)) {
      if (lit[2].length > 100) {
        errors.push(`[JSX Image alt literal > 100 chars (${lit[2].length})] ${rel}`);
      }
    }
  }

  // Check non-sequential H3/H4 between H1 and first H2
  const h1Match = content.match(/<h1[\s>]/);
  const h2Match = content.match(/<h2[\s>]/);
  if (h1Match && h2Match && h1Match.index < h2Match.index) {
    const between = content.slice(h1Match.index, h2Match.index);
    if (/<h[34][\s>]/.test(between)) {
      errors.push(`[Non-sequential H3/H4 before first H2] ${rel}`);
    }
  }

  // Enforce single <h2> per indexable route file (excluding dynamic [slug] which enforces single H2 at runtime/idx===0)
  const isNonIndexableRoute =
    rel.includes("/dashboard/") ||
    rel.includes("/nullify/") ||
    rel.includes("/thank-you/") ||
    rel.includes("/print/") ||
    rel.includes("/login/") ||
    rel.includes("/complete-profile/");

  if (rel.startsWith("src/app/") && !isNonIndexableRoute && !rel.includes("[slug]")) {
    const h2Matches = [...content.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)];
    if (h2Matches.length > 1) {
      errors.push(`[H2: Multiple (${h2Matches.length} <h2> tags found, max 1 allowed)] ${rel}`);
    }
    for (const m of h2Matches) {
      const plainH2 = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (plainH2.length > 70) {
        errors.push(`[H2 > 70 chars (${plainH2.length})] ${rel}: "${plainH2}"`);
      }
    }
  }
}

// 3. Check Security Headers in next.config.ts, proxy, and public route handlers
const securityHeaderFiles = [
  "next.config.ts",
  "src/app/sitemap.xml/route.ts",
  "src/app/api/rss/route.ts",
  "src/app/api/blog-images/[id]/route.ts",
  "src/proxy.ts",
  "src/lib/http.ts",
];
for (const rel of securityHeaderFiles) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) continue;
  const content = fs.readFileSync(full, "utf8");
  for (const requiredHeader of [
    "X-Content-Type-Options",
    "Referrer-Policy",
    "X-Frame-Options",
    "Content-Security-Policy",
    "Strict-Transport-Security",
  ]) {
    if (!content.includes(requiredHeader)) {
      errors.push(`[Missing Security Header ${requiredHeader}] ${rel}`);
    }
  }
}

const proxyContent = fs.readFileSync(path.join(ROOT, "src/proxy.ts"), "utf8");
if (!proxyContent.includes('"/:path*"')) {
  errors.push(`[Proxy matcher missing global "/:path*" coverage] src/proxy.ts`);
}

// 4. Check Content Readability (Flesch Reading Ease >= 30.0 — Zero "Very Hard" Pages)
function countSyllables(word) {
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const vowels = w.match(/[aeiouy]{1,2}/g);
  return Math.max(1, vowels ? vowels.length : 1);
}

function computeFleschScore(filePaths) {
  const textParts = [];
  for (const fp of filePaths) {
    if (!fs.existsSync(fp)) continue;
    const c = fs.readFileSync(fp, "utf8");
    let idx = c.indexOf("const INITIAL_CHECKLIST");
    if (idx < 0) idx = c.indexOf("const FAQS");
    if (idx < 0) idx = c.indexOf("export default");
    const body = idx > 0 ? c.slice(idx) : c;
    for (const m of body.matchAll(/>([^<>{}]+)</g)) {
      const t = m[1].trim();
      if (t && !t.startsWith("&&")) textParts.push(t);
    }
    for (const m of body.matchAll(/(?:label|detail|q|a|desc|note|summary|text|step|role|rule|benefit|answer|question|description):\s*"([^"]+)"/g)) {
      textParts.push(m[1]);
    }
  }
  const full = textParts.join(". ");
  const sentences = full.split(/[.!?]+/).filter((s) => /[a-zA-Z]/.test(s));
  const words = full.match(/[a-zA-Z]+/g) || [];
  if (words.length < 100) return 100;
  let syllables = 0;
  for (const w of words) syllables += countSyllables(w);
  const wps = words.length / Math.max(1, sentences.length);
  const spw = syllables / Math.max(1, words.length);
  return 206.835 - 1.015 * wps - 84.6 * spw;
}

const readabilityTargets = [
  ["/sitemap", [path.join(ROOT, "src/app/sitemap/SitemapClient.tsx"), path.join(ROOT, "src/data/sitemapData.ts")]],
  ...fs
    .readdirSync(path.join(SRC_APP, "locations"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = path.join(SRC_APP, "locations", d.name);
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx")).map((f) => path.join(dir, f));
      return [`/locations/${d.name}`, files];
    }),
];

for (const [routeLabel, files] of readabilityTargets) {
  const flesch = computeFleschScore(files);
  if (flesch < 30.0) {
    errors.push(`[Content Readability Very Difficult (Flesch ${flesch.toFixed(2)} < 30.0)] ${routeLabel}`);
  }
}

if (errors.length > 0) {
  console.error(`❌ SEO Audit Check found ${errors.length} issue(s):`);
  for (const e of errors) console.error("  -", e);
  process.exit(1);
} else {
  console.log(`✅ SEO Audit Check passed across ${pageFiles.length} pages and ${tsxFiles.length} components (0 issues).`);
}
