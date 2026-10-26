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

function extractImageId(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/api\/blog-images\/([a-fA-F0-9]{24})/);
  return m ? m[1] : null;
}

function extractSummaryBullets(html) {
  const boxMatch = html.match(/<div\s+class=["']summary-box["'][^>]*>([\s\S]*?)<\/div>/i);
  const target = boxMatch ? boxMatch[1] : html;
  const liMatches = [...target.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return liMatches
    .map((m) => stripEmDashes(stripHtmlTags(m[1])))
    .filter(Boolean)
    .slice(0, 5);
}

function extractActionSteps(html, fallbackHeadings = []) {
  const olMatches = [...html.matchAll(/<ol[^>]*>([\s\S]*?)<\/ol>/gi)];
  if (olMatches.length > 0) {
    const lastOl = olMatches[olMatches.length - 1][1];
    const items = [...lastOl.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((m) => stripEmDashes(stripHtmlTags(m[1])))
      .filter(Boolean)
      .slice(0, 5);
    if (items.length >= 3) return items;
  }
  return fallbackHeadings
    .map((h) => h.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 5);
}

async function storeLocalImageInMongo({ db, localFilePath, slug, kind, prompt }) {
  if (!localFilePath || !fs.existsSync(localFilePath)) {
    throw new Error(
      `Missing local ${kind} image file at "${localFilePath || ""}". Images in the automated funnel MUST be generated via the Gemini 4 Argon 'image-generator' subagent and passed as localHeroImagePath / localInfographicPath.`
    );
  }
  const fileBuffer = fs.readFileSync(localFilePath);
  const cleanBase64 = fileBuffer.toString("base64");
  const size = fileBuffer.byteLength;
  const rawExt = path.extname(localFilePath).toLowerCase().replace(".", "") || "png";
  const contentType =
    rawExt === "jpg" || rawExt === "jpeg"
      ? "image/jpeg"
      : rawExt === "webp"
        ? "image/webp"
        : "image/png";
  const ext = rawExt === "jpeg" ? "jpg" : rawExt;
  const now = new Date();

  const res = await db.collection("blog_images").insertOne({
    kind,
    filename: `willdrafting_${kind}_${Date.now()}.${ext}`,
    mimeType: contentType,
    contentType,
    base64: cleanBase64,
    size,
    prompt: prompt || null,
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
            "Real-life Indian or NRI family story with concrete Rs figures",
            "HTML <table> matching blueprint.tableSpec",
            "Sample Plain-English Will Clause in a <blockquote> matching blueprint.sampleClauseTopic",
            "At least 4 contextual internal <a href=\"...\"> links using blueprint.internalLinksToInclude",
          ],
          shortVersionRequirement: "4 to 5 concise plain-English bullet takeaways for 'The short version' sidebar card (array of strings in payload.shortVersion)",
          actionStepsRequirement: "5 practical, chronological action steps for 'What to do next' card (array of strings in payload.actionSteps)",
          imageGenerationRequirement: "Invoke the Gemini 4 Argon 'image-generator' subagent using blueprint.coverImagePrompt and blueprint.infographicPrompt to generate both 16:9 visuals, and pass their absolute file paths as localHeroImagePath and localInfographicPath in /tmp/daily-blog-payload.json",
          faqsRequirement: "6 to 8 conversational PAA FAQs with 50-80 word direct plain-English answers",
          reviewsRequirement: "3 realistic client reviews (rating 5, with name, location, and review text) relevant to the topic",
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
      const author = stripEmDashes(String(rawPayload.author || "Advocate Anuj Anand Malik").trim());

      let rawHtml = rawPayload.description || rawPayload.content || "";
      if (!rawHtml && rawPayload.contentFile && fs.existsSync(rawPayload.contentFile)) {
        rawHtml = fs.readFileSync(rawPayload.contentFile, "utf8");
      } else if (!rawHtml && fs.existsSync("/tmp/daily-blog-content.html")) {
        rawHtml = fs.readFileSync("/tmp/daily-blog-content.html", "utf8");
      }
      let content = stripEmDashes(String(rawHtml).trim());
      // Ensure no inner <h1> tags exist inside content body
      content = content.replace(/<h1(\s[^>]*)?>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
      content = content.replace(/<div\s+data-infographic-slot=["']1["']\s*><\/div>\s*/gi, "").trim();

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
        ? rawPayload.reviews
            .map((r) => {
              let rawName = stripEmDashes(String(r.name || "").trim());
              let location = r.location ? stripEmDashes(String(r.location).trim()) : undefined;
              if (!location && rawName.includes(",")) {
                const parts = rawName.split(",");
                rawName = parts[0].trim();
                location = parts.slice(1).join(",").trim();
              }
              const reviewText = stripEmDashes(String(r.review || r.comment || r.text || "").trim());
              return {
                name: rawName,
                rating: Number(r.rating) || 5,
                review: reviewText,
                comment: reviewText,
                ...(location ? { location } : {}),
                date: String(r.date || getIstDateString()).trim(),
              };
            })
            .filter((r) => r.name && r.review)
        : [];

      const matchedDay = planDays.find((d) => d.slug === slug);
      const authorRole = stripEmDashes(
        String(
          rawPayload.authorRole ||
            matchedDay?.authorRole ||
            "Senior Succession & Trust Counsel, WillDrafting.in"
        ).trim()
      );
      const keywords = Array.isArray(rawPayload.keywords) && rawPayload.keywords.length > 0
        ? rawPayload.keywords.map((k) => stripEmDashes(String(k).trim())).filter(Boolean)
        : matchedDay
          ? [matchedDay.primaryKeyword, ...(matchedDay.secondaryKeywords || [])].filter(Boolean)
          : [];

      const shortVersion =
        Array.isArray(rawPayload.shortVersion) && rawPayload.shortVersion.length > 0
          ? rawPayload.shortVersion.map((s) => stripEmDashes(String(s).trim())).filter(Boolean)
          : extractSummaryBullets(content);

      const actionSteps =
        Array.isArray(rawPayload.actionSteps) && rawPayload.actionSteps.length > 0
          ? rawPayload.actionSteps.map((s) => stripEmDashes(String(s).trim())).filter(Boolean)
          : extractActionSteps(content, h2Matches);

      const references = Array.isArray(rawPayload.references)
        ? rawPayload.references
            .map((ref) => ({
              title: stripEmDashes(String(ref?.title || "").trim()),
              url: String(ref?.url || "").trim(),
            }))
            .filter((ref) => ref.title)
        : [];

      const disclaimer =
        stripEmDashes(String(rawPayload.disclaimer || "").trim()) ||
        "This legal guide is published for educational and estate planning awareness under the Indian Succession Act, 1925 and applicable personal laws. For tailored estate planning or Will review, consult an advocate on WillDrafting.in.";

      const localCoverPath = rawPayload.localHeroImagePath || rawPayload.coverImagePath || "";
      const localInfographicPath =
        rawPayload.localInfographicPath || rawPayload.infographicImagePath || "";

      console.log("[Image Pipeline] Storing Gemini 4 Argon generated cover image + infographic in MongoDB...");
      const coverUrl =
        rawPayload.image && String(rawPayload.image).startsWith("/api/blog-images/")
          ? rawPayload.image
          : await storeLocalImageInMongo({
              db,
              localFilePath: localCoverPath,
              slug,
              kind: "cover",
              prompt: rawPayload.coverImagePrompt || matchedDay?.coverImagePrompt || "",
            });

      const infographicUrl =
        rawPayload.infographic && String(rawPayload.infographic).startsWith("/api/blog-images/")
          ? rawPayload.infographic
          : await storeLocalImageInMongo({
              db,
              localFilePath: localInfographicPath,
              slug,
              kind: "infographic",
              prompt: rawPayload.infographicPrompt || matchedDay?.infographicPrompt || "",
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
        readTime: readability.readingTime,
        readingTime: readability.readingTime,
        author,
        authorRole,
        image: coverUrl,
        imageId: extractImageId(coverUrl),
        infographic: infographicUrl,
        infographicId: extractImageId(infographicUrl),
        description: content,
        content,
        metaDescription,
        keywords,
        shortVersion,
        actionSteps,
        status: "PUBLISHED",
        faqs,
        reviews,
        references,
        disclaimer,
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
