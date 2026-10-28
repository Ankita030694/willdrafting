# WillDrafting.in — Mandatory Technical SEO & Screaming Frog Audit Rules

Every new page, component, blog post, location guide, legal tool, and template created in this repository **MUST** strictly comply with the following rules before being committed or deployed.

---

## 1. Page Titles (`<title>`)
- **Character Limit:** Rendered `<title>` MUST be **30 to 60 characters** (inclusive). Never exceed 60 characters.
- **Pixel Width Limit:** Rendered `<title>` MUST be **≤ 561 pixels** (aim for ≤ 55 chars when using wide uppercase characters or pipes).
- **Avoid Double Brand Suffix:** Root [`src/app/layout.tsx`](file:///Users/amalegalsolutions/Desktop/AMAWORK/willdrafting/src/app/layout.tsx) defines `template: "%s | WillDrafting.in"` (+18 characters).
  - Always use `title: { absolute: "..." }` when defining a full title in `metadata` so Next.js does not append a duplicate `| WillDrafting.in` suffix.
- **Uniqueness:** Every indexable URL must have a 100% unique `<title>`.

---

## 2. Meta Descriptions (`<meta name="description">`)
- **Character Limit:** Meta description MUST be **70 to 154 characters** (never > 155 characters).
- **Pixel Width Limit:** Meta description MUST be **≤ 985 pixels** (aim for **135–152 characters** to stay safely under 985px).
- **Uniqueness:** Every indexable URL must have a 100% unique `description`.

---

## 3. Heading Hierarchy (`<h1>`, `<h2>`, `<h3>`, `<h4>`)
- **Single `<h1>`:** Every page MUST have **exactly 1 `<h1>` tag**, and its text MUST be **≤ 70 characters**.
- **Single `<h2>` per Page (`H2: Multiple` Prevention):** Every indexable page MUST have **exactly 1 `<h2>` tag** (**≤ 70 characters** and unique across all pages).
  - Keep only the first primary section heading on each page as `<h2>` (placed after `<h1>` and before any `<h3>` or `<h4>`).
  - Render all subsequent section headings on the page as `<h3>` (preserving visual typography classes/styles) and subsection headings as `<h4>`.
  - Shared components (`CallToActionBanner`, `FAQSection`, `TestimonialsSection`, `MapSection`, `PoweredByAma`, `GlobalPopup`, interactive calculators, etc.) MUST use `<h3>` or `<div>` instead of `<h2>` so they never introduce multiple `<h2>` tags on any page.
- **Strict Sequential Hierarchy (`H1` → `H2` → `H3` → `H4`):**
  - Never place an `<h2>`, `<h3>`, or `<h4>` *before* the page's `<h1>`.
  - Never place an `<h3>` or `<h4>` between the `<h1>` and the single `<h2>` (e.g., in hero summary cards, sidebars, or table-of-contents headers that render before the main article body). Use `<div>`, `<p>`, or `<span>` for non-heading UI badges/labels before the `<h2>`.
- **No Duplicate `<h2>` Across Pages:**
  - The single `<h2>` heading on every page MUST be unique to that specific page/topic and **≤ 70 characters**.
  - Never use generic repeated `<h2>` tags like `<h2>The short version</h2>` across multiple pages (use a styled `<div>` for repeated UI box labels, or include the specific page topic/city in the `<h2>` text, e.g., `1. Will Drafting & Legal Framework in Ahmedabad`).

---

## 4. Internal Links (`200 OK` Only — Zero `404` or `3xx` Redirects)
- **No Broken Internal Links (`404`):** Every internal `<Link href="...">` or `<a href="...">` MUST resolve to an existing route (`HTTP 200`).
- **No Redirecting Internal Links (`308`/`301`):**
  - Always link to `/services/...` (plural), NEVER `/service/...` (singular).
  - Always link to `/about-us`, NEVER `/aboutus`.
- **Every Link Must Have Descriptive Anchor Text:**
  - Never create icon-only `<Link href="..."><ArrowUpRight /></Link>` without text. Always include either visible text or a screen-reader span (`<span className="sr-only">Read {title}</span>`) inside the link.

---

## 5. External Outlinks
- **Maximum External Links per Page:** Keep external outlinks reasonable (≤ 10 external links per page) to avoid triggering `Links: Pages With High External Outlinks`.
- **Verified Live `200 OK` HTTPS Targets Only:**
  - Never link to dead, timed-out, HTTP-only, or redirecting external domains:
    - Use `https://www.sci.gov.in/` (NOT `https://main.sci.gov.in/`)
    - Use `https://www.indiacode.nic.in/` (avoid deep DSpace `/handle/123456789/...` URLs that time out)
    - Use `https://www.incometax.gov.in/iec/foportal/` (NOT `https://incometaxindia.gov.in/` or bare `https://www.incometax.gov.in/`)
    - Use `https://upbhulekh.gov.in/` (HTTPS, NOT `http://upbhulekh.gov.in/` or `http://vaad.up.nic.in/`)
    - Use `https://igrpunjab.gov.in/` (NOT `https://ngdrs.punjab.gov.in/`)
    - Use `https://registration.telangana.gov.in/` (NOT `https://dharani.telangana.gov.in/`)
    - Use `https://www.nsdl.co.in/` (NOT `https://nsdl.co.in/`)

---

## 6. Hreflang & Canonical Tags
- **Self-Referencing Canonical:** Every indexable page MUST declare `alternates.canonical` matching its exact canonical URL.
- **Reciprocal Hreflang Return Links:**
  - For single-language English pages, set `alternates.languages` to point `"en-IN"` and `"x-default"` to the page's own canonical URL.
  - For multi-language template clusters (e.g., `/templates/will-format-*`), **every page in the cluster MUST include the exact same complete `alternates.languages` map** so all return links are 100% reciprocal.

---

## 7. Images (`width`, `height`, and `alt` Text)
- **Explicit Size Attributes:** Every rendered `<img>` MUST have explicit `width` and `height` HTML attributes (avoid `<Image fill />` without explicit dimensions; use `width={1200} height={675}` with `className="w-full h-full object-cover"` or `className="absolute inset-0 w-full h-full object-cover"`).
- **Alt Text Limit:** Every image `alt` attribute MUST be descriptive, non-empty, and **≤ 100 characters** (aim for 40–90 characters).

---

## 8. Security Headers
- Managed globally in [`next.config.ts`](file:///Users/amalegalsolutions/Desktop/AMAWORK/willdrafting/next.config.ts) across all routes (`/:path*`):
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: SAMEORIGIN`
  - `Content-Security-Policy`
