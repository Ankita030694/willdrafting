#!/usr/bin/env node
/**
 * Root-Level Daily SEO Blog Automation CLI for WillDrafting.in
 *
 * Usage:
 *   node --env-file=.env --env-file=.env.local scripts/publish-daily-blog.mjs --status
 *   node --env-file=.env --env-file=.env.local scripts/publish-daily-blog.mjs --next
 *   node --env-file=.env --env-file=.env.local scripts/publish-daily-blog.mjs --publish /tmp/daily-blog-payload.json
 *   node --env-file=.env --env-file=.env.local scripts/publish-daily-blog.mjs --sync-prompts
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient, ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PLAN_PATH = path.join(ROOT_DIR, "docs/seo/30_DAY_BLOG_AUTOMATION_PLAN.json");
const SITEMAP_DATA_PATH = path.join(ROOT_DIR, "src/data/sitemapData.ts");

function loadEnvIfNeeded() {
  for (const envFile of [".env", ".env.local"]) {
    const fullPath = path.join(ROOT_DIR, envFile);
    if (!fs.existsSync(fullPath)) continue;
    const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnvIfNeeded();

function getIstDateString() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

function stripEmDashes(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/\s*—\s*/g, " - ")
    .replace(/&mdash;/gi, " - ")
    .replace(/&#8212;/g, " - ")
    .replace(/&#x2014;/gi, " - ");
}

function stripHtmlTags(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/(p|li|h1|h2|h3|h4|tr|blockquote|div)>/gi, ". ")
    .replace(/<br\s*\/?>/gi, ". ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
}

function countSyllables(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  if (clean.length <= 3) return 1;
  const trimmed = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const matches = trimmed.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

function analyzeReadability(html) {
  const text = stripHtmlTags(html);
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 2);
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const syllableCount = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const avgWordsPerSentence = +(wordCount / sentenceCount).toFixed(1);
  const avgSyllablesPerWord = +(syllableCount / Math.max(1, wordCount)).toFixed(2);
  const fleschScore = +(
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / Math.max(1, wordCount))
  ).toFixed(1);
  const readingTimeMinutes = Math.max(5, Math.ceil(wordCount / 210));
  return {
    wordCount,
    sentenceCount,
    avgWordsPerSentence,
    avgSyllablesPerWord,
    fleschScore,
    readingTime: `${readingTimeMinutes} min read`,
  };
}

function ensureInfographicSlot(html) {
  if (html.includes('data-infographic-slot="1"')) return html;
  let count = 0;
  const updated = html.replace(/<\/h2>/gi, (match) => {
    count++;
    if (count === 2) {
      return `${match}\n<div data-infographic-slot="1"></div>`;
    }
    return match;
  });
  if (updated.includes('data-infographic-slot="1"')) return updated;
  return `${html}\n<div data-infographic-slot="1"></div>`;
}

function buildFallbackSvg({ title, subtitle, kind, steps = [] }) {
  const safeTitle = (title || "Will Drafting Guide").replace(/[<>&"']/g, "");
  const safeSubtitle = (subtitle || "Plain-English Indian Estate & NRI Succession Guide").replace(/[<>&"']/g, "");
  if (kind === "infographic") {
    const defaultSteps = steps.length >= 4 ? steps.slice(0, 4) : [
      "1. List All Indian Flats, Bank Accounts, Demat & Mutual Funds",
      "2. Name Clear Beneficiaries, Shares & a Trusted Executor",
      "3. Include Plain-English Residuary & Guardian Clauses",
      "4. Sign on Plain White Paper with Two Adult Witnesses",
    ];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
      <rect width="1536" height="1024" fill="#FAF7F0"/>
      <rect x="40" y="40" width="1456" height="944" rx="24" fill="#FFFFFF" stroke="#172228" stroke-opacity="0.12" stroke-width="3"/>
      <rect x="40" y="40" width="1456" height="210" rx="24" fill="#172228"/>
      <rect x="85" y="75" width="360" height="38" rx="19" fill="#C65378"/>
      <text x="265" y="100" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700" letter-spacing="2">WILLDRAFTING.IN VISUAL GUIDE</text>
      <text x="85" y="160" fill="#FAF7F0" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800">${safeTitle.slice(0, 68)}</text>
      <text x="85" y="205" fill="#FAF7F0" fill-opacity="0.85" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="500">${safeSubtitle.slice(0, 95)}</text>
      ${defaultSteps.map((step, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = 85 + col * 695;
        const y = 290 + row * 290;
        return `
        <rect x="${x}" y="${y}" width="665" height="250" rx="18" fill="#FAF7F0" stroke="#172228" stroke-opacity="0.1" stroke-width="2"/>
        <circle cx="${x + 55}" cy="${y + 65}" r="28" fill="#C65378"/>
        <text x="${x + 55}" y="${y + 74}" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="800">${idx + 1}</text>
        <text x="${x + 100}" y="${y + 72}" fill="#172228" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="700">${step.replace(/[<>&"']/g, "").slice(0, 44)}</text>
        <text x="${x + 40}" y="${y + 135}" fill="#49585F" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="500">${step.replace(/[<>&"']/g, "").slice(44, 95) || "Verified under the Indian Succession Act, 1925."}</text>
        <rect x="${x + 40}" y="${y + 175}" width="240" height="36" rx="8" fill="#5F7E75" fill-opacity="0.15"/>
        <text x="${x + 160}" y="${y + 199}" text-anchor="middle" fill="#5F7E75" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700">100% Plain-English Rule</text>`;
      }).join("\n")}
      <rect x="85" y="885" width="1366" height="65" rx="14" fill="#172228"/>
      <text x="768" y="925" text-anchor="middle" fill="#FAF7F0" font-family="'Plus Jakarta Sans', sans-serif" font-size="21" font-weight="700">Start Your Legally Valid Indian Will Online at www.willdrafting.in</text>
    </svg>`;
    return { base64: Buffer.from(svg, "utf8").toString("base64"), contentType: "image/svg+xml" };
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#172228"/>
        <stop offset="100%" stop-color="#212F35"/>
      </linearGradient>
    </defs>
    <rect width="1536" height="1024" fill="url(#bg)"/>
    <rect x="70" y="70" width="1396" height="884" rx="32" fill="#FAF7F0" fill-opacity="0.04" stroke="#C65378" stroke-width="3" stroke-opacity="0.6"/>
    <rect x="130" y="150" width="360" height="52" rx="26" fill="#C65378"/>
    <text x="310" y="183" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" letter-spacing="2">WILLDRAFTING.IN GUIDE</text>
    <text x="130" y="330" fill="#FAF7F0" font-family="'Plus Jakarta Sans', sans-serif" font-size="52" font-weight="800">${safeTitle.slice(0, 42)}</text>
    <text x="130" y="405" fill="#C65378" font-family="'Plus Jakarta Sans', sans-serif" font-size="46" font-weight="800">${safeTitle.slice(42, 85)}</text>
    <text x="130" y="515" fill="#FAF7F0" fill-opacity="0.9" font-family="'Plus Jakarta Sans', sans-serif" font-size="27" font-weight="500">${safeSubtitle.slice(0, 75)}</text>
    <text x="130" y="560" fill="#FAF7F0" fill-opacity="0.9" font-family="'Plus Jakarta Sans', sans-serif" font-size="27" font-weight="500">${safeSubtitle.slice(75, 150)}</text>
    <rect x="130" y="790" width="640" height="68" rx="16" fill="#5F7E75"/>
    <text x="450" y="833" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="24" font-weight="700">www.willdrafting.in - Plain-English Legal Wills</text>
  </svg>`;
  return { base64: Buffer.from(svg, "utf8").toString("base64"), contentType: "image/svg+xml" };
}

async function generateAndStoreImage({ db, slug, title, subtitle, category, kind, customPrompt, headings = [] }) {
  const apiKey = process.env.HELLO_DROP_CHOO;
  const baseScene = customPrompt
    ? customPrompt
    : kind === "infographic"
      ? `Wide real-life landscape visual process infographic (1536x1024) set over a real Indian residential/architectural landscape background explaining "${title}" in 4 clear step cards: ${headings.slice(0, 4).join(" | ")}.`
      : `Wide real-life landscape DSLR photograph (1536x1024, natural golden-hour light) of real Indian people (a warm Indian family and estate lawyer) in a real Indian residential home/landscape setting discussing "${title}" (${category}).`;

  const prompt =
    kind === "infographic"
      ? `${baseScene}\n\nSTRICT LANDSCAPE VISUAL, TITLE OVERLAY & BRAND RULES:\n- Format: Wide real-life landscape orientation (1536x1024) featuring a real Indian architectural/residential setting in the background.\n- Title Written on Image: The exact blog title "${title}" MUST be clearly, accurately, and prominently written at the top of the image inside a refined WillDrafting.in header banner.\n- WillDrafting Brand Font: 100% of all text, the main title, headings, and step labels MUST exclusively use the exact WillDrafting website font 'Plus Jakarta Sans' (clean geometric sans-serif, weights 600-800). Strictly NO serif, script, or other fonts.\n- WillDrafting Brand Colors: Use exclusively the WillDrafting color palette - Deep Navy (#172228) for primary banners/text, Warm Cream (#FAF7F0) for clean cards/surfaces, Berry Rose (#C65378) for primary highlights/badges, Slate (#49585F) for subtext, and Sage (#5F7E75) for positive step accents.`
      : `${baseScene}\n\nSTRICT LANDSCAPE VISUAL, TITLE OVERLAY & BRAND RULES:\n- Format: Wide real-life landscape DSLR photograph (1536x1024, natural lighting) featuring REAL Indian people in a REAL Indian landscape, home, or architectural setting (strictly NO cartoon, vector, or flat illustration).\n- Title Written on Image: The exact blog title "${title}" MUST be clearly, accurately, and prominently written on the image inside a refined, high-contrast editorial banner/overlay.\n- WillDrafting Brand Font: The title written on the image MUST exclusively use the exact WillDrafting website font 'Plus Jakarta Sans' (bold modern geometric sans-serif, weights 700-800). Do NOT use any serif, cursive, or other font.\n- WillDrafting Brand Colors: Style the title typography and brand overlay using the exact WillDrafting color palette - Deep Navy (#172228), Warm Cream (#FAF7F0), Berry Rose accent (#C65378), and Sage (#5F7E75).`;

  let base64 = null;
  let contentType = "image/png";

  if (apiKey) {
    const modelsToTry = ["gpt-image-2", "gpt-image-1", "gpt-image-1-mini", "dall-e-3"];
    for (const modelName of modelsToTry) {
      try {
        const payload = {
          model: modelName,
          prompt,
          n: 1,
          size: modelName === "dall-e-3" ? "1792x1024" : "1536x1024",
        };
        if (modelName === "dall-e-3") {
          payload.response_format = "b64_json";
        } else {
          payload.quality = "medium";
        }
        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(90000),
        });
        if (response.ok) {
          const data = await response.json();
          const item = data?.data?.[0];
          if (item?.b64_json) {
            base64 = item.b64_json;
            contentType = "image/png";
            break;
          } else if (item?.url) {
            const imgRes = await fetch(item.url);
            if (imgRes.ok) {
              const arrBuf = await imgRes.arrayBuffer();
              base64 = Buffer.from(arrBuf).toString("base64");
              contentType = imgRes.headers.get("content-type") || "image/png";
              break;
            }
          }
        }
      } catch (err) {
        console.warn(`[ImageGen] OpenAI ${modelName} warning (${kind}):`, err.message);
      }
    }
  }

  if (!base64) {
    try {
      const width = 1536;
      const height = 1024;
      const seed = Math.floor(Math.random() * 1000000);
      const pollUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt.slice(0, 900))}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;
      const pollRes = await fetch(pollUrl, {
        headers: { "User-Agent": "WillDrafting-DailySEO/1.0" },
        signal: AbortSignal.timeout(35000),
      });
      if (pollRes.ok) {
        const buf = await pollRes.arrayBuffer();
        if (buf.byteLength > 1000) {
          base64 = Buffer.from(buf).toString("base64");
          contentType = pollRes.headers.get("content-type") || "image/jpeg";
        }
      }
    } catch (err) {
      console.warn(`[ImageGen] Pollinations fallback warning (${kind}):`, err.message);
    }
  }

  if (!base64) {
    const svgFallback = buildFallbackSvg({ title, subtitle, kind, steps: headings });
    base64 = svgFallback.base64;
    contentType = svgFallback.contentType;
  }

  const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, "");
  const size = Buffer.byteLength(cleanBase64, "base64");
  const ext = contentType.includes("svg") ? "svg" : contentType.includes("jpeg") || contentType.includes("jpg") ? "jpg" : "png";
  const now = new Date();
  const res = await db.collection("blog_images").insertOne({
    kind,
    filename: `willdrafting_${kind}_${Date.now()}.${ext}`,
    mimeType: contentType,
    contentType,
    base64: cleanBase64,
    size,
    prompt,
    blogSlug: slug || null,
    createdAt: now,
  });

  return `/api/blog-images/${res.insertedId.toString()}`;
}

function updateSitemapDataFile(slug, title, istDate) {
  if (!fs.existsSync(SITEMAP_DATA_PATH)) return false;
  const targetHref = `/blogs/${slug}`;
  const raw = fs.readFileSync(SITEMAP_DATA_PATH, "utf8");
  if (raw.includes(`"${targetHref}"`)) return false;

  const marker = "\n];\n\n/**\n * Normalizes a URL path";
  const idx = raw.indexOf(marker);
  if (idx === -1) return false;

  const newEntry = `\n  {\n    title: ${JSON.stringify(title)},\n    href: ${JSON.stringify(targetHref)},\n    category: "Guides",\n    date: ${JSON.stringify(istDate)},\n    changefreq: "weekly",\n    priority: 0.8,\n  },`;
  const updated = raw.slice(0, idx) + newEntry + raw.slice(idx);
  fs.writeFileSync(SITEMAP_DATA_PATH, updated, "utf8");
  return true;
}

async function run() {
  const args = process.argv.slice(2);
  const mode = args[0] || "--status";

  if (!fs.existsSync(PLAN_PATH)) {
    console.error(`Missing 30-day plan file at ${PLAN_PATH}`);
    process.exit(1);
  }
  const planDays = JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));

  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI in .env / .env.local");
    process.exit(1);
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "willdrafting");
  const blogsCol = db.collection("blogs");

  try {
    if (mode === "--status") {
      const existing = await blogsCol
        .find({}, { projection: { slug: 1, status: 1, date: 1, title: 1 } })
        .toArray();
      const publishedMap = new Map(
        existing.filter((b) => b.status === "PUBLISHED").map((b) => [b.slug, b])
      );

      console.log("================================================================================");
      console.log(" WILLDRAFTING.IN - 30-DAY #1 RANKING BLOG AUTOMATION STATUS");
      console.log("================================================================================");
      console.log(`Total Published Blogs in MongoDB: ${publishedMap.size}`);
      let completedInPlan = 0;
      let nextDay = null;
      for (const day of planDays) {
        const pub = publishedMap.get(day.slug);
        if (pub) {
          completedInPlan++;
          console.log(`Day ${String(day.day).padStart(2, "0")}: [PUBLISHED ${pub.date}] ${day.slug}`);
        } else {
          if (!nextDay) nextDay = day;
          console.log(`Day ${String(day.day).padStart(2, "0")}: [PENDING]            ${day.slug} (${day.primaryKeyword})`);
        }
      }
      console.log("--------------------------------------------------------------------------------");
      console.log(`30-Day Plan Progress: ${completedInPlan} / ${planDays.length} Published`);
      if (nextDay) {
        console.log(`Next Scheduled Topic: Day ${nextDay.day} -> "${nextDay.title}" (${nextDay.slug})`);
      } else {
        console.log("All 30 days in the current plan have been published!");
      }
      return;
    }

    if (mode === "--next") {
      const existing = await blogsCol
        .find({ status: "PUBLISHED" }, { projection: { slug: 1, title: 1, category: 1 } })
        .sort({ date: -1 })
        .toArray();
      const publishedSlugs = new Set(existing.map((b) => b.slug));
      const nextDay = planDays.find((d) => !publishedSlugs.has(d.slug));

      if (!nextDay) {
        console.log(JSON.stringify({ status: "ALL_30_DAYS_COMPLETE", totalPublished: existing.length }, null, 2));
        return;
      }

      const output = {
        status: "READY_FOR_GENERATION",
        istDate: getIstDateString(),
        dayNumber: nextDay.day,
        totalDaysInPlan: planDays.length,
        blueprint: nextDay,
        recentPublishedBlogsForInternalLinking: existing.slice(0, 12).map((b) => ({
          url: `/blogs/${b.slug}`,
          title: b.title,
          category: b.category,
        })),
        strictSeoAndLaymanConstraints: {
          metaTitleLength: "Strictly 50 to 60 characters (use blueprint.metaTitle)",
          metaDescriptionLength: "Strictly 140 to 155 characters (use blueprint.metaDescription)",
          h1TitleLength: "Strictly 30 to 65 characters, distinct from metaTitle (use blueprint.title)",
          h2HeadingsLimit: "Every <h2> must be <= 70 characters and 100% unique (use blueprint.mandatoryH2Headings)",
          noEmDashes: "Strictly ZERO em-dashes (— or &mdash;) anywhere in title, meta, headings, or HTML",
          laymanLanguage: "Plain everyday English (Flesch Reading Ease >= 60). 12-18 words per sentence. Explain every legal Act/Section immediately in simple family terms. Zero unexplained Latin or dense legalese.",
          wordCountTarget: "2,000 to 2,600 words of deep, actionable, practical guidance",
          requiredHtmlElements: [
            "Quick 5-bullet Plain-English Summary Box at the top",
            "All 5 mandatoryH2Headings from blueprint",
            "<div data-infographic-slot=\"1\"></div> placed right after the 2nd H2 section",
            "Real-life Indian or NRI family story with concrete Rs figures",
            "HTML <table> matching blueprint.tableSpec",
            "Sample Plain-English Will Clause in a <blockquote> matching blueprint.sampleClauseTopic",
            "At least 4 contextual internal <a href=\"...\"> links using blueprint.internalLinksToInclude",
          ],
          faqsRequirement: "6 to 8 conversational PAA FAQs with 50-80 word direct plain-English answers",
          reviewsRequirement: "3 realistic client reviews (rating 5) relevant to the topic",
        },
      };

      console.log(JSON.stringify(output, null, 2));
      return;
    }

    if (mode === "--publish") {
      const payloadPath = args[1];
      if (!payloadPath || !fs.existsSync(payloadPath)) {
        console.error("Usage: --publish <path-to-json-payload>");
        process.exit(1);
      }

      const rawPayload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
      const slug = stripEmDashes(String(rawPayload.slug || "").trim().toLowerCase());
      const title = stripEmDashes(String(rawPayload.title || "").trim());
      const metaTitle = stripEmDashes(String(rawPayload.metaTitle || "").trim());
      const subtitle = stripEmDashes(String(rawPayload.subtitle || "").trim());
      const metaDescription = stripEmDashes(String(rawPayload.metaDescription || "").trim());
      const category = stripEmDashes(String(rawPayload.category || "Will Basics").trim());
      const author = stripEmDashes(String(rawPayload.author || "Advocate Sneha Jaiswal").trim());

      let rawHtml = rawPayload.content || "";
      if (!rawHtml && rawPayload.contentFile && fs.existsSync(rawPayload.contentFile)) {
        rawHtml = fs.readFileSync(rawPayload.contentFile, "utf8");
      } else if (!rawHtml && fs.existsSync("/tmp/daily-blog-content.html")) {
        rawHtml = fs.readFileSync("/tmp/daily-blog-content.html", "utf8");
      }
      let content = stripEmDashes(String(rawHtml).trim());
      // Ensure no inner <h1> tags exist inside content body
      content = content.replace(/<h1(\s[^>]*)?>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
      content = ensureInfographicSlot(content);

      // Validate Screaming Frog rules
      const errors = [];
      if (!slug) errors.push("Missing slug");
      if (metaTitle.length < 30 || metaTitle.length > 60) {
        errors.push(`metaTitle length (${metaTitle.length}) must be between 30 and 60 chars: "${metaTitle}"`);
      }
      if (metaDescription.length < 100 || metaDescription.length > 155) {
        errors.push(`metaDescription length (${metaDescription.length}) must be between 100 and 155 chars: "${metaDescription}"`);
      }
      if (title.length < 25 || title.length > 65) {
        errors.push(`title (H1) length (${title.length}) must be between 25 and 65 chars: "${title}"`);
      }
      if (title.toLowerCase() === metaTitle.toLowerCase()) {
        errors.push("title (H1) and metaTitle (<title>) must not be identical");
      }

      // Check H2 headings inside content
      const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
        stripHtmlTags(m[1])
      );
      if (h2Matches.length < 4) {
        errors.push(`Content must contain at least 4 <h2> headings (found ${h2Matches.length})`);
      }
      const seenH2 = new Set();
      for (const h2 of h2Matches) {
        if (h2.length > 70) {
          errors.push(`<h2> exceeds 70 characters (${h2.length} chars): "${h2}"`);
        }
        const key = h2.toLowerCase();
        if (seenH2.has(key)) {
          errors.push(`Duplicate <h2> heading detected: "${h2}"`);
        }
        seenH2.add(key);
      }

      if (errors.length > 0) {
        console.error("SEO / Screaming Frog Validation Failed:");
        for (const err of errors) console.error(`  - ${err}`);
        process.exit(1);
      }

      const readability = analyzeReadability(content);
      console.log("[Readability & Depth Check]", readability);

      const faqs = Array.isArray(rawPayload.faqs)
        ? rawPayload.faqs.map((f) => ({
            question: stripEmDashes(String(f.question || "").trim()),
            answer: stripEmDashes(String(f.answer || "").trim()),
          }))
        : [];

      const reviews = Array.isArray(rawPayload.reviews)
        ? rawPayload.reviews.map((r) => ({
            name: stripEmDashes(String(r.name || "").trim()),
            rating: Number(r.rating) || 5,
            date: String(r.date || getIstDateString()).trim(),
            comment: stripEmDashes(String(r.comment || "").trim()),
          }))
        : [];

      const matchedDay = planDays.find((d) => d.slug === slug);
      console.log("[Image Pipeline] Generating & storing real-life landscape cover image + infographic with WillDrafting font & colors...");
      const coverUrl =
        rawPayload.image && String(rawPayload.image).startsWith("/api/blog-images/")
          ? rawPayload.image
          : await generateAndStoreImage({
              db,
              slug,
              title,
              subtitle,
              category,
              kind: "cover",
              customPrompt: rawPayload.coverImagePrompt || matchedDay?.coverImagePrompt || "",
              headings: h2Matches,
            });

      const infographicUrl =
        rawPayload.infographic && String(rawPayload.infographic).startsWith("/api/blog-images/")
          ? rawPayload.infographic
          : await generateAndStoreImage({
              db,
              slug,
              title,
              subtitle,
              category,
              kind: "infographic",
              customPrompt: rawPayload.infographicPrompt || matchedDay?.infographicPrompt || "",
              headings: h2Matches,
            });

      const now = new Date();
      const istDate = rawPayload.date || getIstDateString();

      const blogDoc = {
        title,
        metaTitle,
        subtitle,
        slug,
        category,
        date: istDate,
        readingTime: readability.readingTime,
        author,
        image: coverUrl,
        infographic: infographicUrl,
        metaDescription,
        status: "PUBLISHED",
        content,
        faqs,
        reviews,
        updatedAt: now,
      };

      const existing = await blogsCol.findOne({ slug });
      if (existing) {
        await blogsCol.updateOne({ _id: existing._id }, { $set: blogDoc });
        console.log(`[MongoDB] Updated existing PUBLISHED blog: ${slug} (_id: ${existing._id})`);
      } else {
        const res = await blogsCol.insertOne({ ...blogDoc, createdAt: now });
        console.log(`[MongoDB] Inserted new PUBLISHED blog: ${slug} (_id: ${res.insertedId})`);
      }

      const sitemapUpdated = updateSitemapDataFile(slug, title, istDate);
      console.log(`[Sitemap] Static sitemapData.ts updated: ${sitemapUpdated}`);
      console.log(`[Success] Live URL: https://www.willdrafting.in/blogs/${slug}`);
      return;
    }

    if (mode === "--sync-prompts") {
      const promptsCol = db.collection("prompts");
      const allPrompts = await promptsCol.find({}).toArray();
      console.log(`Found ${allPrompts.length} prompts in MongoDB prompts collection.`);
      for (const p of allPrompts) {
        if (typeof p.promptText === "string" && !p.promptText.includes("PLAIN LAYMAN LANGUAGE")) {
          const updatedText = `${p.promptText}\n\nPLAIN LAYMAN LANGUAGE & SCREAMING FROG RULES:\n- Write in simple everyday English (Flesch Reading Ease >= 60, 12-18 words per sentence).\n- Explain every statutory section immediately in plain family words.\n- Strictly ZERO em-dashes (— or &mdash;).\n- Meta Title 50-60 chars, Meta Description 140-155 chars, H1 30-65 chars (distinct from Meta Title), all H2s <= 70 chars.`;
          await promptsCol.updateOne({ _id: p._id }, { $set: { promptText: updatedText, updatedAt: new Date() } });
          console.log(`Updated prompt profile: ${p.name}`);
        }
      }
      return;
    }

    console.error(`Unknown mode: ${mode}`);
    process.exit(1);
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error("[Fatal Error in publish-daily-blog.mjs]:", err);
  process.exit(1);
});
