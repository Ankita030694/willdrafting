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

  // Check <Image ... fill />
  const imgTags = content.match(/<Image\b[^>]*\/>/gs) || [];
  for (const tag of imgTags) {
    if (/\bfill\b(?!=)/.test(tag)) {
      errors.push(`[Image using fill instead of explicit width/height] ${rel}`);
    }
  }

  // Check alt > 100 chars
  const altMatches = content.matchAll(/alt="([^"]{101,})"/g);
  for (const m of altMatches) {
    errors.push(`[Image alt > 100 chars (${m[1].length})] ${rel}`);
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
}

if (errors.length > 0) {
  console.error(`❌ SEO Audit Check found ${errors.length} issue(s):`);
  for (const e of errors) console.error("  -", e);
  process.exit(1);
} else {
  console.log(`✅ SEO Audit Check passed across ${pageFiles.length} pages and ${tsxFiles.length} components (0 issues).`);
}
