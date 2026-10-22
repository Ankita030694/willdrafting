import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { blogsCol, promptsCol } from "@/lib/db/collections";
import { WILLDRAFTING_PROMPT_PRESETS } from "@/lib/defaultPrompts";
import { BLOG_ARTICLES } from "@/data/blogs";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const MODEL_HEAVY = process.env.OPENAI_MODEL_HEAVY || "gpt-4o";
const MODEL_LIGHT = process.env.OPENAI_MODEL_LIGHT || "gpt-4o-mini";

const CORE_SITE_LINKS: Array<{ url: string; title: string; keywords: string }> = [
  { url: "/start", title: "Online Indian Will Drafting Wizard", keywords: "start will draft online make will india" },
  { url: "/pricing", title: "Fixed-Fee Will Drafting Plans", keywords: "pricing cost fee charges will drafting india" },
  { url: "/services", title: "Online Will Drafting & Estate Planning Services", keywords: "services estate planning lawyer advocate will" },
  { url: "/services/nri-will-india", title: "NRI & OCI Indian Will Drafting Service", keywords: "nri oci foreign property fema two will strategy" },
  { url: "/services/will-registration", title: "Will Registration Service at Sub-Registrar Office", keywords: "will registration sub registrar sro book 3 stamp duty" },
  { url: "/services/probate-lawyer", title: "Probate of Will & Letters of Administration Service", keywords: "probate court letters of administration executor section 213" },
  { url: "/services/succession-certificate", title: "Succession Certificate Legal Service India", keywords: "succession certificate bank fd shares section 370" },
  { url: "/services/mirror-wills-for-couples", title: "Mirror Wills for Couples in India", keywords: "mirror will joint will husband wife couple spouse" },
  { url: "/tools/succession-calculator", title: "Free Indian Intestate Succession Calculator", keywords: "succession calculator legal heir share hindu muslim christian" },
  { url: "/tools/probate-checker", title: "Is Probate Required in India? Free Checker Tool", keywords: "is probate mandatory mumbai chennai kolkata delhi" },
  { url: "/tools/nri-will-checker", title: "NRI Indian Will Diagnostic Checker", keywords: "nri will checker overseas property fema repatriation" },
  { url: "/tools/will-checklist", title: "Documents Required for Will in India Checklist", keywords: "documents required checklist witness executor property schedule" },
  { url: "/tools/succession-certificate-court-fee-calculator", title: "Succession Certificate Court Fee Calculator", keywords: "court fee calculator stamp duty succession certificate" },
  { url: "/templates/will-format-india", title: "Legally Valid Will Format in India Template", keywords: "will format template sample draft section 63" },
  { url: "/templates/will-format-hindi", title: "Hindi Will Format (वसीयतनामा फॉर्मेट)", keywords: "hindi will format vasiyatnama sample" },
  { url: "/templates/codicil-format-india", title: "Codicil Format to Amend a Will in India", keywords: "codicil format amend update modify existing will" },
  { url: "/templates/living-will-format-india", title: "Living Will & Advance Medical Directive Format", keywords: "living will advance medical directive healthcare" },
  { url: "/templates/release-deed-format", title: "Relinquishment / Release Deed Format India", keywords: "relinquishment deed release deed legal heir property share" },
  { url: "/contact", title: "Speak to a WillDrafting.in Estate Planning Advocate", keywords: "contact consult estate advocate lawyer help" },
  { url: "/about-us", title: "About WillDrafting.in Estate Planning Team", keywords: "about willdrafting estate planning platform" },
];

function getRelevantInternalLinks(
  keyword: string,
  allLinks: Array<{ url: string; title: string; keywords?: string }>
) {
  const kwTokens = keyword
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2);

  const scored = allLinks.map((link) => {
    const text = `${link.title} ${link.url} ${link.keywords || ""}`.toLowerCase();
    let score = 0;
    for (const token of kwTokens) {
      if (text.includes(token)) score += 3;
    }
    if (link.url === "/start" || link.url === "/services" || link.url === "/tools/succession-calculator") {
      score += 1;
    }
    return { ...link, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const selected = scored.slice(0, 15);

  const essentials = [
    { url: "/start", title: "Online Indian Will Drafting Wizard" },
    { url: "/tools/succession-calculator", title: "Free Indian Intestate Succession Calculator" },
    { url: "/contact", title: "Speak to a WillDrafting.in Estate Planning Advocate" },
  ];

  for (const ess of essentials) {
    if (!selected.some((s) => s.url === ess.url)) {
      selected.push({ ...ess, score: 1 });
    }
  }

  return selected.slice(0, 16);
}

function isRefusal(text: string): boolean {
  if (!text || text.trim().length < 500) return true;
  const lower = text.toLowerCase().slice(0, 450);
  const refusalPatterns = [
    "i'm sorry, i cannot",
    "i am sorry, i cannot",
    "i cannot fulfill this request",
    "i can't fulfill this request",
    "i'm unable to generate",
    "i am unable to assist",
    "as an ai, i cannot",
    "i cannot assist with that",
  ];
  return refusalPatterns.some((pattern) => lower.includes(pattern));
}

function trimToWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sanitizeTitle(rawTitle: string): string {
  if (!rawTitle) return "";
  let t = rawTitle.trim();
  const suffixPatterns = [
    /\s*[:\-–—|]\s*(a\s+)?(complete|comprehensive|ultimate|definitive|step-by-step|detailed|essential|practical|full|in-depth|expert|legal)\s+(guide|overview|handbook|manual|walkthrough|analysis|breakdown|explained).*$/i,
    /\s*[:\-–—|]\s*everything\s+you\s+need\s+to\s+know.*$/i,
    /\s*[:\-–—|]\s*what\s+you\s+(need|must|should)\s+know.*$/i,
    /\s*[:\-–—|]\s*all\s+you\s+need\s+to\s+know.*$/i,
  ];
  for (const pat of suffixPatterns) {
    t = t.replace(pat, "");
  }
  return t.replace(/\s*[:\-–—|]\s*$/, "").trim();
}

function postProcessAndSanitizeHtml(rawHtml: string): string {
  if (!rawHtml) return "";
  let html = rawHtml
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // Convert stray Markdown headings & bold
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");

  // Convert standalone Markdown bullet lists
  html = html.replace(/(?:^[ \t]*[-*]\s+.+\n?)+/gm, (match) => {
    if (match.includes("<li") || match.includes("<ul") || match.includes("<table")) return match;
    const items = match
      .trim()
      .split("\n")
      .map((line) => line.replace(/^[ \t]*[-*]\s+/, "").trim())
      .filter(Boolean);
    if (items.length === 0) return match;
    return `<ul>\n${items.map((item) => `  <li>${item}</li>`).join("\n")}\n</ul>\n`;
  });

  // Replace em-dashes with spaced hyphens
  html = html.replace(/\s*—\s*/g, " - ");

  // Strip H1 tags to H2
  html = html.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");

  // Strip robotic meta-commentary
  html = html.replace(
    /<p[^>]*>\s*(?:Here is|Below is|In this article, we will|This article provides|Sure, here is)[^<]*<\/p>/gi,
    ""
  );

  // Strip trailing duplicate FAQ or Review headings inside HTML body (since FAQs & Reviews are rendered in dedicated structured sections)
  html = html.replace(
    /<h[2-4][^>]*>\s*(?:Frequently Asked Questions|FAQs?|Client Reviews|Testimonials)\s*<\/h[2-4]>[\s\S]*$/i,
    ""
  );

  // Cap tables at max 2
  let tableCount = 0;
  html = html.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    tableCount++;
    return tableCount <= 2 ? match : "";
  });

  return html.trim();
}

function enrichInternalLinks(
  html: string,
  relevantLinks: Array<{ url: string; title: string }>
): string {
  const existingLinkMatches = html.match(/<a\s+[^>]*href=/gi) || [];
  if (existingLinkMatches.length >= 6) return html;

  const usedUrls = new Set<string>();
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRegex.exec(html)) !== null) {
    usedUrls.add(m[1]);
  }

  const availableLinks = relevantLinks.filter((l) => !usedUrls.has(l.url));
  if (availableLinks.length === 0) return html;

  const needed = Math.min(8 - existingLinkMatches.length, availableLinks.length);
  const paragraphs = html.split("</p>");
  if (paragraphs.length < 4) return html;

  const step = Math.max(2, Math.floor((paragraphs.length - 2) / (needed + 1)));
  let linkIdx = 0;

  for (let i = step; i < paragraphs.length - 1 && linkIdx < needed; i += step) {
    const link = availableLinks[linkIdx++];
    paragraphs[i] += ` For step-by-step assistance, explore our <a href="${link.url}">${link.title}</a> on WillDrafting.in.`;
  }

  return paragraphs.join("</p>");
}

function ensurePrimaryKeywordPresence(html: string, primaryKeyword: string): string {
  if (!primaryKeyword) return html;
  const kwRegex = new RegExp(escapeRegExp(primaryKeyword.trim()), "gi");
  const matches = html.match(kwRegex) || [];
  if (matches.length >= 6) return html;

  return html.replace(/<p([^>]*)>([\s\S]*?)<\/p>/i, (_full, attrs, inner) => {
    if (inner.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      return `<p${attrs}>${inner}</p>`;
    }
    return `<p${attrs}>Understanding <strong>${primaryKeyword}</strong> is essential for protecting your family and property under Indian succession law. ${inner}</p>`;
  });
}

async function callOpenAiChat(params: {
  apiKey: string;
  model: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}): Promise<string> {
  const payload: Record<string, unknown> = {
    model: params.model,
    messages: params.messages,
    temperature: params.temperature ?? 0.5,
  };
  if (params.maxTokens) {
    payload.max_completion_tokens = params.maxTokens;
  }
  if (params.jsonMode) {
    payload.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI Chat API (${params.model}) failed with ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "";
}

async function callOpenAiWebResearch(apiKey: string, queryPrompt: string): Promise<string> {
  try {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_HEAVY,
        tools: [{ type: "web_search_preview" }],
        input: queryPrompt,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (typeof data.output_text === "string" && data.output_text.trim()) {
        return data.output_text;
      }
      if (Array.isArray(data.output)) {
        for (const item of data.output) {
          if (Array.isArray(item.content)) {
            for (const c of item.content) {
              if (typeof c.text === "string" && c.text.trim()) {
                return c.text;
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("[generate-article] Web search preview fallback:", err);
  }

  return callOpenAiChat({
    apiKey,
    model: MODEL_HEAVY,
    messages: [{ role: "user", content: queryPrompt }],
    temperature: 0.3,
    maxTokens: 1500,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const primaryKeyword = String(body.primaryKeyword || "").trim();
    const promptId = body.promptId ? String(body.promptId).trim() : "";
    const customApiKey = body.apiKey ? String(body.apiKey).trim() : "";

    if (!primaryKeyword) {
      return NextResponse.json(
        { error: "Primary Keyword is required to generate an article." },
        { status: 400 }
      );
    }

    const apiKey = customApiKey || process.env.HELLO_DROP_CHOO?.trim() || "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured. Please add HELLO_DROP_CHOO in .env.local." },
        { status: 500 }
      );
    }

    // 1. Resolve Prompt Profile from MongoDB `prompts`
    const pCol = await promptsCol();
    let promptDoc = null;
    if (promptId && ObjectId.isValid(promptId)) {
      promptDoc = await pCol.findOne({ _id: new ObjectId(promptId) });
    }
    if (!promptDoc) {
      promptDoc = await pCol.findOne({ isDefault: true });
    }

    const defaultPreset = WILLDRAFTING_PROMPT_PRESETS[0];
    const coreInstructions = promptDoc?.coreInstructions || defaultPreset.coreInstructions;
    let targetWordCount = Number(promptDoc?.targetWordCount) || defaultPreset.targetWordCount;

    const wordMatch = coreInstructions.match(/(\d{3,5})\s*(?:\+\s*)?words/i);
    if (!promptDoc?.targetWordCount && wordMatch) {
      const parsed = parseInt(wordMatch[1], 10);
      if (parsed >= 500 && parsed <= 12000) targetWordCount = parsed;
    }

    // 2. Build Internal Link Pool from WillDrafting.in core pages + static blogs + MongoDB published blogs
    const dynamicLinks: Array<{ url: string; title: string; keywords: string }> = [
      ...CORE_SITE_LINKS,
      ...BLOG_ARTICLES.map((a) => ({
        url: `/blogs/${a.slug}`,
        title: a.title,
        keywords: (a.keywords || []).join(" "),
      })),
    ];

    try {
      const bCol = await blogsCol();
      const recentDbBlogs = await bCol
        .find({ status: "PUBLISHED" }, { projection: { slug: 1, title: 1, keywords: 1 } })
        .sort({ createdAt: -1 })
        .limit(30)
        .toArray();

      for (const b of recentDbBlogs) {
        if (b.slug && b.title && !dynamicLinks.some((l) => l.url === `/blogs/${b.slug}`)) {
          dynamicLinks.push({
            url: `/blogs/${b.slug}`,
            title: b.title,
            keywords: Array.isArray(b.keywords) ? b.keywords.join(" ") : "",
          });
        }
      }
    } catch (e) {
      console.warn("[generate-article] Could not fetch recent DB blogs for internal linking:", e);
    }

    const relevantLinks = getRelevantInternalLinks(primaryKeyword, dynamicLinks);
    const linksContextString = relevantLinks
      .map((l) => `- <a href="${l.url}">${l.title}</a>`)
      .join("\n");

    const currentYear = new Date().getFullYear();

    // =========================================================================
    // STEP 0: Live Statutory & Judicial Research for WillDrafting.in
    // =========================================================================
    const researchQuery = `Conduct a focused Indian legal and succession law research briefing on: "${primaryKeyword}" as of ${currentYear}.
Include:
1. Exact statutory sections from applicable Indian legislation (Indian Succession Act 1925, Hindu Succession Act 1956, Muslim Personal Law (Shariat) Application Act 1937, Registration Act 1908, Indian Stamp Act 1899, Indian Trusts Act 1882, Transfer of Property Act 1882, FEMA 1999, Income Tax Act 1961, Senior Citizens Act 2007).
2. Relevant Supreme Court of India and High Court judgments with case names and years.
3. Practical procedural details in India (Sub-Registrar Book 3 rules, court fees, probate timelines, document requirements, ₹ cost benchmarks).
Keep the briefing dense, factual, and around 750 words.`;

    const rawResearch = await callOpenAiWebResearch(apiKey, researchQuery);
    const researchNotes = trimToWords(rawResearch, 850);

    // =========================================================================
    // STEP 1: Title, SEO Metadata, Category & Direct Factual Outline
    // =========================================================================
    const h2CountRange = targetWordCount >= 2200 ? "6 to 8" : "5 to 7";
    const step1Prompt = `You are the Principal Succession Law Editorial Counsel at WillDrafting.in (https://www.willdrafting.in).
Based on the primary keyword "${primaryKeyword}" and the statutory research below, generate the article metadata and a strictly to-the-point, factual outline in JSON format.

STATUTORY RESEARCH:
${researchNotes}

Return a JSON object with these exact keys:
- "title": Direct, factual H1 title (50-70 characters) naturally containing "${primaryKeyword}". No clickbait or generic fluff.
- "subtitle": Concise 1-sentence factual summary stating the exact legal rule and outcome under Indian law.
- "category": Choose the best matching category from: ["Indian Succession Law", "Estate Planning & Lifecycle", "NRI Estate Planning", "Hindu Succession Act", "Supreme Court Precedent", "Probate & Execution", "Digital Assets & Trusts"].
- "metaTitle": SEO title (50-60 characters) ending with "| WillDrafting.in".
- "metaDescription": Direct, high-utility meta description (145-160 characters) featuring "${primaryKeyword}" and WillDrafting.in.
- "slug": URL-friendly lowercase hyphenated slug focused on "${primaryKeyword}".
- "outline": Array of ${h2CountRange} crisp, direct H2 section headings focused strictly on: exact statutory rules, step-by-step procedure, required documents/fees, comparison table, and common legal mistakes. (No fluffy intro headings, no FAQ or Review headings).`;

    const step1Raw = await callOpenAiChat({
      apiKey,
      model: MODEL_LIGHT,
      messages: [
        {
          role: "system",
          content: "You are the Principal Succession Law Editorial Counsel at WillDrafting.in. Output valid JSON only.",
        },
        { role: "user", content: step1Prompt },
      ],
      temperature: 0.4,
      maxTokens: 1200,
      jsonMode: true,
    });

    let step1Data: {
      title?: string;
      subtitle?: string;
      category?: string;
      metaTitle?: string;
      metaDescription?: string;
      slug?: string;
      outline?: string[];
    } = {};

    try {
      step1Data = JSON.parse(step1Raw);
    } catch {
      step1Data = {};
    }

    const cleanTitle = sanitizeTitle(step1Data.title || `${primaryKeyword}: Indian Succession Law Rules`);
    const subtitle =
      step1Data.subtitle ||
      `Authoritative statutory analysis and practical Indian estate planning rules on ${primaryKeyword} under the Indian Succession Act, 1925, prepared by WillDrafting.in estate planning counsel.`;
    const category = step1Data.category || "Indian Succession Law";
    const metaTitle = step1Data.metaTitle || `${cleanTitle} | WillDrafting.in`;
    const metaDescription =
      step1Data.metaDescription ||
      `${primaryKeyword} explained under Indian succession law. Learn statutory rules, Supreme Court rulings, and draft your legally valid Will on WillDrafting.in.`;
    const slug = (step1Data.slug || primaryKeyword)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const outline = Array.isArray(step1Data.outline) && step1Data.outline.length >= 4
      ? step1Data.outline.filter((h) => !/faq|frequently asked|review|testimonial|table of contents/i.test(h))
      : [
          `1. Statutory Framework Governing ${primaryKeyword} in India`,
          `2. Key Legal Provisions Under the Indian Succession Act & Personal Laws`,
          `3. Landmark Supreme Court and High Court Rulings`,
          `4. Worked Indian Family & Property Scenarios`,
          `5. Statutory Comparison Matrix: Costs, Timelines & Legal Validity`,
          `6. Step-by-Step Procedure and Required Documentation`,
          `7. Common Drafting Mistakes That Trigger Family Disputes`,
          `8. How to Safeguard Your Estate Using WillDrafting.in`,
        ];

    // =========================================================================
    // STEP 2: Core HTML Article Body Generation (Adaptive: Zero-Filler OR SEO/Lead-Gen)
    // =========================================================================
    const dynamicMaxTokens = Math.min(6000, Math.max(3000, Math.ceil(targetWordCount * 2.0)));
    const isLeadGenMode =
      /lead[- ]?gen|comprehensive|seo strategist/i.test(promptDoc?.name || "") ||
      /LEAD GENERATION|SEO STRATEGIST/i.test(coreInstructions);

    const step2SystemPrompt = isLeadGenMode
      ? `${coreInstructions}

COMPREHENSIVE SEO & LEAD-GENERATION WRITING RULES FOR WILLDRAFTING.IN:
1. Write pure semantic HTML only (<h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <table>, <thead>, <tbody>, <tr>, <th>, <td>). Do not wrap in markdown code fences and do not include <h1> tags.
2. HIGH-IMPACT LEGAL & CONVERSION WRITING:
   - Start the very first sentence with the direct legal answer and exact statutory Section number.
   - Use clear, authoritative Indian English with practical depth. Explain concepts using realistic Indian family scenarios, document checklists (<ol>/<ul>), and comparison tables (<table>).
   - Write clean, readable paragraphs (3 to 4 sentences).
   - Address common misconceptions, personal-law differences (Hindu, Muslim, Christian/Parsi), and NRI implications where relevant.
   - Conclude the article with a clear, professional Call to Action inviting readers to draft their Will on WillDrafting.in (/start) or consult counsel (/contact), followed by a concise 1-sentence legal disclaimer.
3. Use the primary keyword "${primaryKeyword}" naturally 6 to 10 times across headings and paragraphs.
4. Embed 5 to 8 contextual internal links from this WillDrafting.in link pool:
${linksContextString}
5. All brand references and calls to action belong exclusively to WillDrafting.in (https://www.willdrafting.in).
6. Do not include meta-commentary, author bylines, dates, or trailing FAQ sections inside the HTML body (FAQs are rendered in a dedicated structured section).`
      : `${coreInstructions}

STRICT "TO-THE-POINT, ZERO-FILLER" OUTPUT RULES FOR WILLDRAFTING.IN:
1. Write pure semantic HTML only (<h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <table>, <thead>, <tbody>, <tr>, <th>, <td>). Do not wrap in markdown code fences and do not include <h1> tags.
2. ZERO BULLSHIT / ZERO FILLER:
   - Do NOT write generic throat-clearing introductions, philosophical reflections, or emotional padding.
   - Start the very first sentence of the article with the direct legal answer and exact statutory Section number.
   - Keep every paragraph short and sharp (2 to 3 sentences maximum).
   - Every single sentence must deliver a concrete legal fact: a Section number, Act name, Supreme Court ruling, required document, timeline, fee/stamp duty amount, or actionable step.
   - Never repeat the same point twice across different headings.
3. Prefer bulleted checklists (<ul>), numbered steps (<ol>), and structured HTML comparison tables (<table> with <thead> and <tbody>) over long paragraphs.
4. Use the primary keyword "${primaryKeyword}" naturally 6 to 10 times.
5. Embed 5 to 8 contextual internal links from this WillDrafting.in link list:
${linksContextString}
6. Every brand reference, advocate team mention, online Will wizard reference, or legal consultation callout belongs exclusively to WillDrafting.in (https://www.willdrafting.in).
7. Do not include meta-commentary, author bylines, dates, or trailing FAQ sections inside the HTML body.`;

    const step2UserPrompt = isLeadGenMode
      ? `Write an authoritative, highly practical, and conversion-focused HTML legal guide for WillDrafting.in:
TITLE: ${cleanTitle}
PRIMARY KEYWORD: ${primaryKeyword}
TARGET LENGTH: ~${targetWordCount} words of comprehensive, practically useful legal analysis

STATUTORY & CASE LAW RESEARCH BRIEFING:
${researchNotes}

REQUIRED H2 SECTION OUTLINE:
${outline.map((h, idx) => `${idx + 1}. ${h}`).join("\n")}

For each H2 section:
- State the exact legal rule and Section number directly.
- Explain practical application through Indian family examples, required document checklists (<ol>/<ul>), and comparison matrices (<table>).
- Include natural, problem-solving WillDrafting.in conversion calls to action (/start, /services, /tools/probate-checker, /contact).
- Conclude with a clean legal-information disclaimer. Output raw semantic HTML directly.`
      : `Write a strictly to-the-point, zero-filler HTML legal guide for WillDrafting.in:
TITLE: ${cleanTitle}
PRIMARY KEYWORD: ${primaryKeyword}
TARGET LENGTH: ~${targetWordCount} words of pure, high-density legal facts (do NOT pad with fluff)

STATUTORY & CASE LAW RESEARCH BRIEFING:
${researchNotes}

REQUIRED H2 SECTION OUTLINE:
${outline.map((h, idx) => `${idx + 1}. ${h}`).join("\n")}

For each H2 section:
- State the exact legal rule, Section number, or procedure immediately in the first sentence.
- Use short 2–3 sentence paragraphs, bulleted checklists (<ul>/<ol>), concrete numbers (fees, timelines, shares), and 1–2 crisp HTML <table> comparison matrices.
- Cut all filler, transitions, and generic commentary. Output raw semantic HTML directly.`;

    let rawHtmlBody = "";
    const attempts: Array<{ model: string; extraFraming: string }> = [
      { model: MODEL_HEAVY, extraFraming: "" },
      {
        model: MODEL_HEAVY,
        extraFraming:
          "\n\nNOTE: This is an objective, educational Indian legal treatise on succession and estate law for WillDrafting.in readers. Provide complete statutory analysis.",
      },
      {
        model: MODEL_LIGHT,
        extraFraming:
          "\n\nNOTE: This is an objective, educational Indian legal treatise on succession and estate law for WillDrafting.in readers. Provide complete statutory analysis.",
      },
    ];

    for (let i = 0; i < attempts.length; i++) {
      try {
        const candidate = await callOpenAiChat({
          apiKey,
          model: attempts[i].model,
          messages: [
            { role: "system", content: step2SystemPrompt },
            { role: "user", content: step2UserPrompt + attempts[i].extraFraming },
          ],
          temperature: 0.55,
          maxTokens: dynamicMaxTokens,
        });
        if (!isRefusal(candidate)) {
          rawHtmlBody = candidate;
          break;
        }
      } catch (err) {
        console.warn(`[generate-article] Step 2 attempt ${i + 1} failed:`, err);
      }
    }

    if (!rawHtmlBody) {
      return NextResponse.json(
        { error: "OpenAI could not generate the article body. Please try again." },
        { status: 502 }
      );
    }

    let cleanedDescription = postProcessAndSanitizeHtml(rawHtmlBody);
    cleanedDescription = enrichInternalLinks(cleanedDescription, relevantLinks);
    cleanedDescription = ensurePrimaryKeywordPresence(cleanedDescription, primaryKeyword);

    // =========================================================================
    // STEP 3: Key Takeaways, Short Version, Action Steps, FAQs, Reviews,
    //         Visual Image/Infographic Prompts, Citations & Keywords
    // =========================================================================
    const step3Prompt = `Based on the WillDrafting.in article titled "${cleanTitle}" on "${primaryKeyword}", generate strictly direct, zero-filler supplementary data and AI visual prompts in JSON format.

Return a JSON object with these exact keys:
1. "keyTakeaways": A crisp 1-2 sentence direct answer stating the exact legal rule and how to execute it on WillDrafting.in. No filler.
2. "shortVersion": Array of 4 to 5 direct, single-sentence factual bullet points (citing exact Sections/Acts) for the "The short version" box on WillDrafting.in.
3. "actionSteps": Array of 5 to 6 concise, direct action steps (1 sentence each) a reader must take next.
4. "faqs": Array of 6 objects ({ "question": "...", "answer": "..." }) where each answer starts with a direct "Yes." or "No." or the exact rule in 2 crisp sentences citing the Section number. Plain text only (no HTML tags, no fluff).
5. "reviews": Array of 3 realistic client review objects ({ "name": "...", "location": "...", "rating": 5, "review": "..." }) from Indian/NRI homeowners praising how WillDrafting.in helped them resolve "${primaryKeyword}".
6. "references": Array of 4 official statutory/judicial reference objects ({ "title": "...", "url": "..." }) citing India Code, Supreme Court of India, RBI, or SEBI resources.
7. "keywords": Array of 12 high-intent long-tail SEO search keywords related to "${primaryKeyword}" in India.
8. "suggestedImagePrompt": A detailed prompt for generating a premium editorial Featured Cover Illustration for WillDrafting.in representing "${primaryKeyword}". Specify: warm editorial legal illustration featuring dignified Indian family members or estate counsel in an upscale Indian home/study setting, prominently displaying the exact title text "${cleanTitle}" in crisp typography, using WillDrafting.in's signature color palette of Warm Cream (#FAF7F0), Deep Slate Navy (#172228), and Berry Rose (#C65378).
9. "suggestedInfographicPrompt": A detailed prompt for generating a clean 2D corporate legal Infographic for WillDrafting.in visualizing the step-by-step legal workflow, statutory shares, or comparison matrix for "${primaryKeyword}". Specify: structured 2D vector infographic layout with clear icons, numbered stages, and callout boxes on a Warm Cream (#FAF7F0) background with Deep Slate Navy (#172228) typography and Berry Rose (#C65378) accents.`;

    const step3Raw = await callOpenAiChat({
      apiKey,
      model: MODEL_LIGHT,
      messages: [
        {
          role: "system",
          content: "You are the Principal Succession Law Editorial Counsel at WillDrafting.in. Output valid JSON only.",
        },
        { role: "user", content: step3Prompt },
      ],
      temperature: 0.45,
      maxTokens: 2500,
      jsonMode: true,
    });

    let step3Data: {
      keyTakeaways?: string;
      shortVersion?: string[];
      actionSteps?: string[];
      faqs?: Array<{ question: string; answer: string }>;
      reviews?: Array<{ name: string; location?: string; rating: number; review: string }>;
      references?: Array<{ title: string; url: string }>;
      keywords?: string[];
      suggestedImagePrompt?: string;
      suggestedInfographicPrompt?: string;
    } = {};

    try {
      step3Data = JSON.parse(step3Raw);
    } catch {
      step3Data = {};
    }

    if (step3Data.keyTakeaways) {
      cleanedDescription = `<blockquote><p><strong>Executive Summary:</strong> <em>${step3Data.keyTakeaways}</em></p></blockquote>\n\n${cleanedDescription}`;
    }

    const keywordsList = Array.isArray(step3Data.keywords) && step3Data.keywords.length > 0
      ? step3Data.keywords
      : [primaryKeyword, `${primaryKeyword} india`, `indian succession act ${primaryKeyword}`, `willdrafting.in ${primaryKeyword}`];

    const popularSearchesHtml = `\n<h3>Popular Searches</h3>\n<ul>\n${keywordsList
      .map((kw) => `  <li>${kw}</li>`)
      .join("\n")}\n</ul>`;

    cleanedDescription = `${cleanedDescription}\n${popularSearchesHtml}`;

    const plainWords = cleanedDescription.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
    const readTime = `${Math.max(4, Math.ceil(plainWords / 220))} min`;

    const responsePayload = {
      title: cleanTitle,
      subtitle,
      category,
      readTime,
      metaTitle,
      metaDescription,
      slug,
      description: cleanedDescription,
      shortVersion: Array.isArray(step3Data.shortVersion) ? step3Data.shortVersion : [],
      actionSteps: Array.isArray(step3Data.actionSteps) ? step3Data.actionSteps : [],
      faqs: Array.isArray(step3Data.faqs) ? step3Data.faqs : [],
      reviews: Array.isArray(step3Data.reviews) ? step3Data.reviews : [],
      references: Array.isArray(step3Data.references) ? step3Data.references : [],
      keywords: keywordsList,
      suggestedImagePrompt:
        step3Data.suggestedImagePrompt ||
        `Warm editorial legal illustration for WillDrafting.in representing "${primaryKeyword}", featuring an Indian family and estate planning documents in a refined study, prominently displaying the title "${cleanTitle}" in crisp typography, styled in Warm Cream (#FAF7F0), Deep Slate Navy (#172228), and Berry Rose (#C65378).`,
      suggestedInfographicPrompt:
        step3Data.suggestedInfographicPrompt ||
        `Clean 2D vector legal infographic for WillDrafting.in explaining "${primaryKeyword}" under the Indian Succession Act, with numbered workflow steps, statutory comparison callouts, and icons on a Warm Cream (#FAF7F0) background with Deep Slate Navy (#172228) and Berry Rose (#C65378) accents.`,
      date: new Date().toISOString().split("T")[0],
      wordCount: plainWords,
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("[generate-article] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate article",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
