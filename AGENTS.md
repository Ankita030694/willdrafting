<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mandatory Technical SEO & Screaming Frog Audit Compliance

Before creating or modifying any page, blog post, location guide, service page, tool, or template in this repository, you **MUST** read and enforce every rule in [`SEO_AUDIT_RULES.md`](./SEO_AUDIT_RULES.md):

1. **Page `<title>`:** Must be **30–60 characters** and **≤ 561 pixels**. Always use `title: { absolute: "..." }` so root `layout.tsx` does not append a duplicate `| WillDrafting.in`.
2. **Meta Description:** Must be **70–154 characters** and **≤ 985 pixels** (aim for 135–152 characters).
3. **Heading Hierarchy (`H1` → `H2` → `H3` → `H4`):**
   - Exactly **1 `<h1>`** (**≤ 70 characters**) and **1 `<h2>`** (**≤ 70 characters**, unique across pages) per indexable page. Render all subsequent section headings as `<h3>` (preserving visual classes/styles) so Screaming Frog never flags `H2: Multiple`.
   - Never place `<h2>`, `<h3>`, or `<h4>` before `<h1>`, and never place `<h3>` or `<h4>` between `<h1>` and the single `<h2>`.
   - Shared components (`CallToActionBanner`, `FAQSection`, `TestimonialsSection`, `MapSection`, `PoweredByAma`, `GlobalPopup`, interactive calculators) must use `<h3>` or `<div>` instead of `<h2>`.
4. **Links:**
   - Zero internal `404` or `308` redirect links (always use `/services/...` plural and `/about-us`).
   - Never render icon-only `<Link>`/`<a>` without descriptive text or `<span className="sr-only">`.
   - Keep external outlinks ≤ 10 per page and only link to live `200 OK` HTTPS URLs.
5. **Hreflang:** All pages in a multi-language cluster (`/templates/will-format-*`) must share the exact same reciprocal `alternates.languages` map.
6. **Images:** Always include explicit `width` and `height` attributes (avoid `<Image fill />` without explicit dimensions), keep `alt` text **≤ 100 characters**, and ensure every raster image in `public/` and `blog_images` is **≤ 100 kB (`≤ 100,000` bytes)**.
7. **Content Readability (Flesch Reading Ease ≥ 50.0):** Every indexable page must maintain a Flesch Reading Ease score **≥ 50.0** (aim for **≥ 55.0**, zero `Very Hard` or `Hard` pages) by using concise sentences and plain 1–2 syllable words alongside statutory terms.
8. **Automated Verification:** Run `node scripts/seo-audit-check.mjs` before committing new or modified pages.

