import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { blogsCol, promptsCol } from "@/lib/db/collections";
import { DEFAULT_WILLDRAFTING_PROMPT } from "@/lib/defaultPrompts";

const MODEL_HEAVY = process.env.OPENAI_MODEL_HEAVY || "gpt-6-luna";
const MODEL_LIGHT = process.env.OPENAI_MODEL_LIGHT || "gpt-6-luna";
const MODEL_FALLBACK = "gpt-4.1-mini";

// Approved internal link directory for WillDrafting.in
const CORE_SITE_LINKS = [
  {
    url: "/start",
    title: "Create Your Legal Will Online in India",
    keywords: ["create a will online", "draft your will online", "online will maker", "make a will in india"],
  },
  {
    url: "/services",
    title: "Will Drafting & Estate Planning Services",
    keywords: ["will drafting services", "estate planning services", "professional will drafting", "legal will assistance"],
  },
  {
    url: "/pricing",
    title: "Will Drafting Packages & Pricing",
    keywords: ["will drafting cost", "cost of making a will", "will drafting charges", "will pricing"],
  },
  {
    url: "/how-it-works",
    title: "How Online Will Drafting Works",
    keywords: ["how online will works", "will drafting process", "steps to create a will online"],
  },
  {
    url: "/tools/probate-checker",
    title: "Indian State-Wise Probate Requirement Checker",
    keywords: ["probate requirement", "is probate mandatory", "probate checker", "probate in mumbai", "probate in india"],
  },
  {
    url: "/tools/stamp-duty-calculator",
    title: "Stamp Duty & Will Registration Fee Calculator",
    keywords: ["stamp duty on will", "will registration fee", "registration charges for will"],
  },
  {
    url: "/tools",
    title: "Free Estate Planning & Succession Legal Tools",
    keywords: ["estate planning tools", "succession planning tools", "inheritance calculators"],
  },
  {
    url: "/templates/hindu-will",
    title: "Hindu Will Format & Template under Hindu Succession Act",
    keywords: ["hindu will format", "hindu succession act will", "hindu will template"],
  },
  {
    url: "/templates/muslim-will",
    title: "Muslim Will (Wasiyat) Format & Shariat Rules",
    keywords: ["muslim will format", "wasiyat rules", "one third rule muslim will", "muslim succession"],
  },
  {
    url: "/templates/joint-will",
    title: "Joint & Mutual Will Format for Married Couples",
    keywords: ["joint will", "mutual will", "will for husband and wife", "mirror will"],
  },
  {
    url: "/templates/living-will",
    title: "Living Will & Advance Medical Directive in India",
    keywords: ["living will", "advance medical directive", "passive euthanasia directive"],
  },
  {
    url: "/templates/codicil",
    title: "Codicil Format to Amend or Update an Existing Will",
    keywords: ["codicil to a will", "amend a will", "update existing will", "codicil format"],
  },
  {
    url: "/templates/will-for-nri",
    title: "NRI Will Format for Indian Property & Bank Accounts",
    keywords: ["nri will for indian property", "nri succession", "nri estate planning", "foreign citizen indian property will"],
  },
  {
    url: "/templates/senior-citizens-will",
    title: "Senior Citizen Will Format & Medical Fitness Certificate",
    keywords: ["senior citizen will", "elderly will drafting", "medical fitness certificate for will"],
  },
  {
    url: "/templates/property-bequest-will",
    title: "Property Bequest Will Format for Flats, Land & Ancestral Assets",
    keywords: ["property bequest", "immovable property will", "self acquired property will", "flat inheritance"],
  },
  {
    url: "/templates",
    title: "Indian Legal Will Formats & Templates Library",
    keywords: ["will format india", "sample will format", "will templates"],
  },
  {
    url: "/glossary",
    title: "Indian Succession & Will Legal Glossary",
    keywords: ["testator meaning", "executor meaning", "beneficiary meaning", "intestate meaning", "codicil meaning"],
  },
  {
    url: "/faq",
    title: "Frequently Asked Questions on Indian Wills",
    keywords: ["will drafting faqs", "common questions about wills"],
  },
  {
    url: "/contact",
    title: "Speak with an Estate Planning Specialist",
    keywords: ["estate planning specialist", "succession consultation", "contact willdrafting"],
  },
];

// 7 Topic Archetypes to guarantee structural & substantive differentiation across blogs
const ARCHETYPE_BLUEPRINTS: Record<
  string,
  {
    label: string;
    structuralMandate: string;
    tableMandate: string;
    bannedClichés: string[];
  }
> = {
  clause_and_drafting: {
    label: "Clause-Level & Drafting Deep-Dive",
    structuralMandate: `
- Focus 100% on the actual wording, structure, and legal mechanics of the clauses or drafting elements in question.
- Include at least 2 to 3 VERBATIM SAMPLE LEGAL CLAUSE WORDING BLOCKS inside <blockquote> tags that a testator in India can actually read and adapt.
- Explain what happens in court if each clause is missing or ambiguously phrased (e.g., partial intestacy when a Residuary Clause is omitted).
- Contrast weak/ambiguous DIY phrasing against watertight legal phrasing.`,
    tableMandate: `Include 1 HTML <table> with columns: "Clause / Drafting Element" | "Legal Purpose" | "Weak / Ambiguous Wording to Avoid" | "Watertight Wording Standard".`,
    bannedClichés: [
      "Step-by-step Sub-Registrar Will registration procedure",
      "State-wise probate court fee tables (Mumbai/Chennai/Kolkata)",
      "Broad textbook comparisons of Hindu, Muslim, and Christian succession laws",
      "Generic 'Why You Need a Will' introductory lectures",
    ],
  },
  validity_and_evidence: {
    label: "Legal Validity, Registration & Evidentiary Ruling",
    structuralMandate: `
- Open immediately with the definitive Yes/No legal position under Indian law and the exact statute governing it.
- Explain how the document's validity is actually tested in an Indian court after the testator's death (e.g., proving execution via attesting witnesses under Section 68 of the Indian Evidence Act / Section 67 of the Bharatiya Sakshya Adhiniyam 2023, Section 63 of the Indian Succession Act 1925, and Sections 17 & 18 of the Registration Act 1908 if relevant).
- Analyze the "Suspicious Circumstances" doctrine and landmark Supreme Court precedents (such as H. Venkatachala Iyengar v. B.N. Thimmajamma or Kavita Kanwar) where validity was upheld or struck down.
- Provide practical evidentiary safeguards (doctor's mental fitness certificate, video recording, clear thumb/signature placement).`,
    tableMandate: `Include 1 HTML <table> comparing "Legal Scenario / Factor" | "Validity Status under Indian Law" | "How It Is Proved in Court" | "Risk of Family Challenge".`,
    bannedClichés: [
      "Hindu vs. Muslim vs. Christian personal law comparison tables",
      "General list of all clauses in a Will",
      "Generic breakdown of lawyer drafting fees and stamp duty across states",
    ],
  },
  intestacy_and_heirship: {
    label: "Intestate Succession, Heirship Hierarchy & Asset Freeze Consequences",
    structuralMandate: `
- Focus strictly on what happens when a person dies WITHOUT a valid Will (intestate) or how statutory heirship shares work.
- Detail the real-world asset-by-asset freeze faced by the surviving family: bank accounts, cooperative housing society flats, demat/mutual funds, EPF/PPF, and vehicles.
- Trace exact statutory distribution shares among Class I and Class II legal heirs (or applicable personal law shares) with concrete rupee/percentage family examples.
- Contrast the expensive, multi-month court remedies required when there is no Will (Succession Certificate for movable debts/securities, Legal Heir Certificate, Letters of Administration) against having a simple Will.`,
    tableMandate: `Include 1 HTML <table> with columns: "Asset Category (Flat, Bank, Demat, EPF)" | "What Happens Immediately Upon Intestate Death" | "Mandatory Legal Document Required by Heirs" | "Typical Timeline & Court Fee in India".`,
    bannedClichés: [
      "Step-by-step tutorial on how to sign or register a Will at the Sub-Registrar",
      "Presidency town probate procedures for valid Wills",
      "Witness attestation rules under Section 63",
    ],
  },
  asset_and_nomination: {
    label: "Asset-Specific Inheritance, Property Nature & Nominee vs. Legal Heir Law",
    structuralMandate: `
- Focus 100% on the specific asset class, property category (Ancestral/Coparcenary vs. Self-Acquired, Joint Property, Flats, Bank Accounts, Mutual Funds, Demat, Gold, Digital Assets, or NRI assets), or Nomination rule in the Primary Keyword.
- Clarify the crucial legal distinction in India between a "Nominee" (mere trustee/custodian receiving discharge from the bank/insurer/RTA) and a "Legal Beneficiary under a Will" (ultimate owner of the money/shares), citing relevant RBI, SEBI, Banking Regulation Act Section 45ZA, or Insurance Act Section 39 rules where applicable.
- Provide exact asset-description identifiers that must be written in the Will (e.g., Folio/DP ID/Client ID for demat, Survey/CTS/Flat & Society Share Certificate numbers for real estate) so transmission is never rejected.`,
    tableMandate: `Include 1 HTML <table> tailored to the specific asset class comparing "Asset / Holding Type" | "Role of Nominee / Joint Holder" | "Who Legally Inherits Under a Will" | "Mandatory Identifier to Cite in Will".`,
    bannedClichés: [
      "Generic overview of the Indian Succession Act 1925",
      "Broad probate court fee schedules",
      "General witness and Sub-Registrar registration tutorials",
    ],
  },
  roles_and_execution: {
    label: "Executor, Witness, Guardian & Execution Mechanics",
    structuralMandate: `
- Focus strictly on the human roles (Executor, Attesting Witness, Beneficiary, Minor's Guardian, Medical Doctor) or physical execution mechanics raised by the Primary Keyword.
- Detail statutory eligibility, disqualifications, and fatal conflicts of interest (such as Section 67 of the Indian Succession Act 1925 where a gift to an attesting witness or their spouse becomes void).
- Provide a practical chronological checklist of what that person must actually do (either during the signing of the Will or after the testator's demise).`,
    tableMandate: `Include 1 HTML <table> with columns: "Person / Role Candidate" | "Legally Permitted?" | "Statutory Rule / Conflict Risk" | "Practical Recommendation".`,
    bannedClichés: [
      "Hindu vs. Muslim vs. Christian succession share comparisons",
      "Detailed stamp duty and court fee breakdowns",
      "Generic 'What is a Will' definitions",
    ],
  },
  disputes_and_challenges: {
    label: "Will Contests, Forgery Defense, Caveats & Family Disputes",
    structuralMandate: `
- Focus strictly on how Wills are challenged or defended in Indian District and High Courts.
- Analyze the specific legal grounds for contesting a Will: Lack of Testamentary Capacity (Section 59), Coercion/Fraud/Undue Influence (Section 61), Forgery, Improper Attestation (Section 63), and Suspicious Circumstances.
- Explain the procedural mechanics: filing a Caveat under Section 284 of the Indian Succession Act, converting probate proceedings into a contentious suit, burden of proof on the propounder vs. objector, and limitation periods under Article 137 of the Limitation Act (3 years).
- Detail concrete defensive measures a testator can take today to make their Will challenge-proof.`,
    tableMandate: `Include 1 HTML <table> with columns: "Ground of Challenge" | "Who Bears the Burden of Proof" | "Key Evidence Examined by Indian Courts" | "How to Bulletproof Your Will Against It".`,
    bannedClichés: [
      "Basic beginner tutorials on what a Will is",
      "Routine Sub-Registrar fee schedules",
      "Generic personal law distribution tables",
    ],
  },
  platform_and_comparison: {
    label: "Online Will Drafting Platform, Cost & Service Comparison",
    structuralMandate: `
- Focus directly on evaluating how online Will creation on WillDrafting.in works, comparing guided online legal drafting against raw stationery templates and traditional offline lawyers.
- Address the reader's practical questions: Is an online-drafted Will legally valid in India? How are personal family & asset details kept confidential? What happens after the PDF is generated? How much time and money does it save?
- Provide a transparent walkthrough of the end-to-end user journey from asset inventory to printing and 2-witness signing at home.`,
    tableMandate: `Include 1 HTML <table> comparing "Parameter (Legal Validity, Customization, Privacy, Turnaround Time, Cost)" | "Blank Internet Template" | "Traditional Offline Lawyer" | "WillDrafting.in Guided Platform".`,
    bannedClichés: [
      "Long academic lectures on Hindu, Muslim, and Christian personal laws",
      "Detailed probate litigation procedures",
      "Unrelated statutory section dumps",
    ],
  },
};

const sanitizeText = (txt: string) => txt.replace(/—|\u2014|&mdash;/g, " - ");

function sanitizeTitle(title: string, currentYear: number): string {
  return title
    .replace(
      /:\s*(A\s+Complete\s+Guide|Comprehensive\s+Overview|Legal\s+Solutions|Step-by-Step\s+Guide|Everything\s+You\s+Need\s+to\s+Know|All\s+You\s+Need\s+to\s+Know|Ultimate\s+Guide|Full\s+Guide|Detailed\s+Guide|In-Depth\s+Guide|The\s+Ultimate\s+Playbook|Understanding\s+Indian\s+Law|Understanding\s+Legal\s+Implications)\b/gi,
      ""
    )
    .replace(
      /\s*[-–—|]\s*(A\s+Complete\s+Guide|Comprehensive\s+Overview|Legal\s+Solutions|Step-by-Step\s+Guide|Everything\s+You\s+Need\s+to\s+Know|All\s+You\s+Need\s+to\s+Know|Ultimate\s+Guide|Full\s+Guide|Detailed\s+Guide|In-Depth\s+Guide|The\s+Ultimate\s+Playbook|Understanding\s+Indian\s+Law|Understanding\s+Legal\s+Implications)\b/gi,
      ""
    )
    .replace(/\b(202[0-5])\b/g, String(currentYear))
    .replace(/["']/g, "")
    .trim();
}

function postProcessAndSanitizeHtml(rawHtml: string): string {
  let processed = rawHtml;
  processed = processed.replace(/^```(?:html)?\s*/i, "").replace(/```\s*$/i, "").trim();
  processed = sanitizeText(processed);

  processed = processed.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  processed = processed.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  processed = processed.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  processed = processed.replace(/^#\s+(.+)$/gm, "<h2>$1</h2>");

  processed = processed.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>");
  processed = processed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  processed = processed.replace(/__(.+?)__/g, "<strong>$1</strong>");
  processed = processed.replace(/(?<![a-zA-Z0-9])\*([^*]+?)\*(?![a-zA-Z0-9])/g, "<em>$1</em>");
  processed = processed.replace(/(?<![a-zA-Z0-9])_([^_]+?)_(?![a-zA-Z0-9])/g, "<em>$1</em>");

  processed = processed
    .replace(/^(?:<p>\s*)?(?:Here is|Below is|Certainly!?|Sure!?)[\s\S]*?(?=<h2|<p>)/i, "")
    .trim();
  processed = processed
    .replace(
      /\(?\s*(?:The HTML content above|Note:|Please note:|As requested|Sections were omitted|This concludes|Omitted following your instructions)[\s\S]*?\)?$/gi,
      ""
    )
    .trim();
  processed = processed
    .replace(
      /<p>\s*\(?(?:The HTML content above|Note:|Please note:|As requested|Sections were omitted|This concludes|Omitted following your instructions)[\s\S]*?<\/p>/gi,
      ""
    )
    .trim();
  processed = processed
    .replace(
      /<p>\s*(?:<strong>)?\s*(?:Publication Date|Published on|Date of Publication|Published Date|Article Date|Last Updated)\s*:?[\s\S]*?<\/p>/gi,
      ""
    )
    .trim();
  processed = processed
    .replace(
      /<h[23][^>]*>\s*(?:Frequently Asked Questions|FAQs?|Client Reviews|User Reviews)\s*<\/h[23]>[\s\S]*$/gi,
      ""
    )
    .trim();

  const tableMatches = Array.from(processed.matchAll(/<table[\s\S]*?<\/table>/gi));
  if (tableMatches.length > 2) {
    let idx = 0;
    processed = processed.replace(/<table[\s\S]*?<\/table>/gi, (m) => {
      idx++;
      return idx <= 2 ? m : "";
    });
  }

  return processed;
}

function getRelevantInternalLinks(
  primaryKeyword: string,
  allLinks: { url: string; title: string; keywords: string[] }[]
) {
  const kwTokens = primaryKeyword
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored = allLinks.map((link) => {
    let score = 0;
    const linkText = `${link.title} ${link.keywords.join(" ")} ${link.url}`.toLowerCase();
    for (const token of kwTokens) {
      if (linkText.includes(token)) score += 3;
    }
    if (["/start", "/services", "/tools/probate-checker", "/templates"].includes(link.url)) {
      score += 1;
    }
    return { link, score };
  });

  const topRelevant = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.link);

  const fallbackUrls = ["/start", "/services", "/tools/probate-checker", "/templates"];
  for (const fbUrl of fallbackUrls) {
    if (!topRelevant.some((l) => l.url === fbUrl)) {
      const found = allLinks.find((l) => l.url === fbUrl);
      if (found) topRelevant.push(found);
    }
  }

  return topRelevant.slice(0, 15);
}

function enrichInternalLinks(htmlContent: string, links: { url: string; keywords: string[] }[]) {
  let enriched = htmlContent;
  let currentLinkCount = (enriched.match(/<a\s[^>]*href=["'][^"']*["']/gi) || []).length;
  if (currentLinkCount >= 6) return enriched;

  for (const linkItem of links) {
    if (currentLinkCount >= 8) break;
    if (
      enriched.includes(`href="${linkItem.url}"`) ||
      enriched.includes(`href='${linkItem.url}'`)
    ) {
      continue;
    }
    for (const keyword of linkItem.keywords) {
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(
        `(?<!<[^>]*)(?<!<a[^>]*>[^<]*)\\b(${escapedKeyword})\\b(?![^<]*<\\/a>)`,
        "i"
      );
      if (regex.test(enriched)) {
        enriched = enriched.replace(regex, `<a href="${linkItem.url}">$1</a>`);
        currentLinkCount++;
        break;
      }
    }
  }
  return enriched;
}

function ensurePrimaryKeywordPresence(html: string, keyword: string): string {
  if (!keyword) return html;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "gi");
  const matches = html.match(regex) || [];

  let updated = html;
  if (matches.length < 5) {
    const firstPRegex = /(<h2[^>]*>[\s\S]*?<\/h2>\s*<p[^>]*>)([\s\S]*?)(<\/p>)/i;
    const match = updated.match(firstPRegex);
    if (match && !new RegExp(`\\b${escaped}\\b`, "i").test(match[2])) {
      const introEnhancement = `Regarding <strong>${keyword}</strong> under Indian law, `;
      const secondPart = match[2].charAt(0).toLowerCase() + match[2].slice(1);
      updated = updated.replace(firstPRegex, `$1${introEnhancement}${secondPart}$3`);
    }
  }
  return updated;
}

async function callOpenAiChat({
  apiKey,
  model,
  messages,
  jsonMode = false,
  temperature = 0.45,
  maxTokens = 4096,
}: {
  apiKey: string;
  model: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  jsonMode?: boolean;
  temperature?: number;
  maxTokens?: number;
}) {
  // GPT-5, GPT-6, and o-series models do not accept custom temperature values (only default 1) and support reasoning_effort
  const isReasoningOrLunaModel = /^(gpt-[56]|o[134])/i.test(model);

  const payload: Record<string, unknown> = {
    model,
    messages,
    max_completion_tokens: maxTokens,
  };

  if (isReasoningOrLunaModel) {
    payload.reasoning_effort = "low";
  } else {
    payload.temperature = temperature;
  }

  if (jsonMode) {
    payload.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error (${res.status} on ${model}): ${errText}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0]?.message;
  return {
    content: (choice?.content || "") as string,
    refusal: (choice?.refusal || null) as string | null,
  };
}

// Conditional Topic Grounding: Uses fast, low-cost gpt-6-luna statutory & practical scoping by default,
// and only triggers live web search when the keyword explicitly queries recent/current-year developments.
async function callOpenAiTopicGrounding({
  apiKey,
  model,
  primaryKeyword,
  currentDateFormatted,
  currentYear,
}: {
  apiKey: string;
  model: string;
  primaryKeyword: string;
  currentDateFormatted: string;
  currentYear: number;
}): Promise<string> {
  const needsLiveWebSearch = /\b(202[5-9]|latest|new rule|amendment|budget|news|recent judgment|supreme court ruling|circular)\b/i.test(
    primaryKeyword
  );

  const groundingPrompt = `Today's Date: ${currentDateFormatted} (Year: ${currentYear}).
Target Topic: "${primaryKeyword}" (Indian Succession & Estate Planning Law).

Provide a laser-focused, non-generic technical legal briefing (~550 words) strictly on "${primaryKeyword}":
1. Exact User Problem: What specific question, fear, or drafting task is a person searching "${primaryKeyword}" trying to solve?
2. Specific Governing Law (ONLY What Directly Applies): Name ONLY the 1 to 3 exact statutory sections, regulatory rules (RBI/SEBI/Registration/Evidence/BSA), or Supreme Court precedents that directly govern "${primaryKeyword}". Do NOT list unrelated sections.
3. Unique Substance & Concrete Mechanics:
   - If about clauses/drafting: write 2 verbatim sample clause wordings and explain common drafting errors.
   - If about validity/registration/evidence: explain how Indian courts test it and what evidence proves it.
   - If about intestacy/family disputes: detail which specific assets freeze and which court certificates apply.
   - If about specific assets/nominees/NRIs: detail the exact transfer rules and required asset identifiers.
4. Off-Topic Material to Exclude: List 3 generic Will topics (e.g., general probate fee tables, Hindu vs Muslim textbook comparisons, or routine Sub-Registrar steps) that are NOT the focus of "${primaryKeyword}" and must be left out.`;

  if (needsLiveWebSearch) {
    try {
      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          tools: [{ type: "web_search_preview" }],
          input: groundingPrompt,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.output_text === "string" && data.output_text.trim()) {
          return data.output_text.trim();
        }
        if (Array.isArray(data.output)) {
          const parts: string[] = [];
          for (const item of data.output) {
            if (item.type === "message" && Array.isArray(item.content)) {
              for (const c of item.content) {
                if (c.text) parts.push(c.text);
              }
            }
          }
          if (parts.length > 0) return parts.join("\n");
        }
      }
    } catch (err) {
      console.warn("[WillDrafting AI Generator] Live web search preview skipped, using fast statutory grounding:", err);
    }
  }

  try {
    const fallback = await callOpenAiChat({
      apiKey,
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a specialist Indian succession law researcher. Provide only topic-specific statutory mechanics, sample clauses, or evidentiary rules for the exact query—never generic boilerplate.",
        },
        { role: "user", content: groundingPrompt },
      ],
      maxTokens: 2000,
    });
    return fallback.content;
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const primaryKeyword =
      typeof body.primaryKeyword === "string" ? body.primaryKeyword.trim() : "";
    const promptId = typeof body.promptId === "string" ? body.promptId.trim() : "";
    const customApiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";

    const apiKey = customApiKey || process.env.HELLO_DROP_CHOO?.trim() || "";

    if (!primaryKeyword) {
      return NextResponse.json({ error: "Primary Keyword is required" }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API Key is not configured. Please set HELLO_DROP_CHOO in .env.local or pass it in the request.",
        },
        { status: 500 }
      );
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentDateFormatted = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const todayIsoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;

    // 1. Load Selected or Default Prompt Profile from MongoDB `prompts` collection
    let coreInstructions = DEFAULT_WILLDRAFTING_PROMPT;
    let targetWordCount = 1400;
    let selectedPromptName = "";

    try {
      const pCol = await promptsCol();
      let promptDoc = null;
      if (promptId && ObjectId.isValid(promptId)) {
        promptDoc = await pCol.findOne({ _id: new ObjectId(promptId) });
      }
      if (!promptDoc) {
        promptDoc = await pCol.findOne({ isDefault: true });
      }
      if (!promptDoc) {
        promptDoc = await pCol.findOne({});
      }

      if (promptDoc) {
        selectedPromptName = promptDoc.name || "";
        if (promptDoc.coreInstructions) {
          coreInstructions = promptDoc.coreInstructions;
        }
        const profileWordCount = Number(promptDoc.targetWordCount);
        if (!isNaN(profileWordCount) && profileWordCount >= 400) {
          targetWordCount = profileWordCount;
        }
      }

      const wordCountMatch = coreInstructions.match(
        /(?:target\s+word\s+count|word\s+count|article\s+length)\s*[:=]?\s*(\d{3,5})\s*words?/i
      );
      if (wordCountMatch && (!promptDoc?.targetWordCount || promptDoc.targetWordCount === 0)) {
        const parsed = Number(wordCountMatch[1]);
        if (parsed >= 500 && parsed <= 2000) {
          targetWordCount = parsed;
        }
      }
    } catch (err) {
      console.warn("[WillDrafting AI Generator] Prompt fetch fallback to default:", err);
    }

    // Hard cap word count between 1,200 and 1,800 words so the AI never bloats articles to 3,500–5,000 words
    targetWordCount = Math.min(1800, Math.max(1200, targetWordCount));

    // 2. Fetch Live Published Blog Links from MongoDB for Internal Linking + Anti-Cannibalization
    let dynamicBlogLinks: { url: string; title: string; keywords: string[] }[] = [];
    let existingBlogTitles: string[] = [];
    try {
      const bCol = await blogsCol();
      const recentBlogs = await bCol
        .find({ status: "PUBLISHED" }, { projection: { slug: 1, title: 1 } })
        .sort({ publishedAt: -1 })
        .limit(30)
        .toArray();

      existingBlogTitles = recentBlogs.map((b) => b.title).filter(Boolean);
      dynamicBlogLinks = recentBlogs
        .filter((b) => b.slug && b.title)
        .map((b) => ({
          url: `/blogs/${b.slug}`,
          title: b.title,
          keywords: [b.title.toLowerCase()],
        }));
    } catch (err) {
      console.warn("[WillDrafting AI Generator] Dynamic blog links fetch skipped:", err);
    }

    const allAvailableLinks = [...CORE_SITE_LINKS, ...dynamicBlogLinks];
    const relevantLinks = getRelevantInternalLinks(primaryKeyword, allAvailableLinks);
    const formattedInternalLinks = relevantLinks
      .map((l) => `- "${l.title}" -> ${l.url}`)
      .join("\n");

    // STEP 0: Topic-Specific Grounding (with `gpt-6-luna`)
    console.log(`[WillDrafting AI Generator] Step 0: Topic-specific legal grounding for [${primaryKeyword}] with ${MODEL_LIGHT}...`);
    const researchContext = await callOpenAiTopicGrounding({
      apiKey,
      model: MODEL_LIGHT,
      primaryKeyword,
      currentDateFormatted,
      currentYear,
    });
    const trimmedResearch = researchContext.split(/\s+/).slice(0, 650).join(" ");

    // STEP 1: Archetype Classification, Anti-Cannibalization & Bespoke Outline
    const targetHeadingCount = "4 to 5";
    console.log(`[WillDrafting AI Generator] Step 1: Classifying archetype & building bespoke outline with ${MODEL_LIGHT}...`);

    const step1SystemPrompt = `${coreInstructions}

--- STEP 1: TOPIC ARCHETYPE CLASSIFICATION & BESPOKE OUTLINE ---
Current Date: ${currentDateFormatted} (Year: ${currentYear})
Primary Keyword: "${primaryKeyword}"
Target Word Count: ~${targetWordCount} words

EXISTING BLOGS ALREADY ON WILLDRAFTING.IN (DO NOT DUPLICATE THEIR CORE ANGLES):
${existingBlogTitles.slice(0, 15).map((t) => `- ${t}`).join("\n")}

CRITICAL ANTI-HOMOGENEITY & DIFFERENTIATION RULES:
1. Classify "${primaryKeyword}" into the single most accurate \`archetype\` from these 7 options:
   - "clause_and_drafting" (about specific clauses, wording, formats, codicils, or how to write/structure parts of a Will)
   - "validity_and_evidence" (about whether a Will is valid, registration optionality, handwritten/plain-paper validity, or proving a Will in court)
   - "intestacy_and_heirship" (about dying without a Will, legal heir hierarchy, class I/II heirs, or asset freeze consequences)
   - "asset_and_nomination" (about specific assets like bank accounts, flats, mutual funds, demat, ancestral vs self-acquired property, NRI assets, or nominee vs legal heir)
   - "roles_and_execution" (about executors, witnesses, guardians, doctors, beneficiaries, or signing rules)
   - "disputes_and_challenges" (about contesting a Will, forgery, undue influence, caveats, or suspicious circumstances)
   - "platform_and_comparison" (about WillDrafting.in, online Will makers vs lawyers, cost of making a Will, or why/when you need a Will)

2. STRICT BAN ON COOKIE-CUTTER H2 HEADINGS:
   - You are FORBIDDEN from generating generic textbook headings like "Overview of Indian Succession Act, 1925", "Statutory Provisions Governing Wills in India", "Hindu vs Muslim vs Christian Personal Laws", "Required Documents and Fees for Probate", or "Procedural Steps for Will Registration" UNLESS "${primaryKeyword}" literally asks for that exact topic!
   - Every single H2 heading in \`outline\` MUST be uniquely written for "${primaryKeyword}" so that a reader looking only at the H2 headings knows immediately the article is exclusively about "${primaryKeyword}".

3. EXCLUDED SUBTOPICS (\`excludedSubtopics\`):
   - Identify 4 generic Will topics that do NOT belong in an article specifically about "${primaryKeyword}" (for example, if the keyword is "Important Clauses in Will", exclude "State-wise Probate Court Fees", "Sub-Registrar Registration Procedure", "Intestate Succession Shares", etc.).

4. TITLE & SEO RULES:
   - \`title\` must naturally contain "${primaryKeyword}" (max 68 chars) with NO cliché suffixes like ": A Complete Guide", ": Understanding Indian Law", or ": Everything You Need to Know".
   - Choose the best \`category\` from: "Will Basics", "NRI Succession", "Family Disputes", "Executor Guide", "Execution & Probate", "Digital Assets", "Tax & Estate".

Return ONLY a valid JSON object with this structure:
{
  "archetype": "one_of_the_7_archetypes",
  "uniqueAngle": "1-sentence description of what makes this article uniquely tailored to ${primaryKeyword} and different from a generic Will overview",
  "tableConcept": "Specific 4-column table concept tailored strictly to ${primaryKeyword}",
  "excludedSubtopics": [
    "Off-topic generic subtopic 1 to exclude",
    "Off-topic generic subtopic 2 to exclude",
    "Off-topic generic subtopic 3 to exclude",
    "Off-topic generic subtopic 4 to exclude"
  ],
  "title": "Sharp, specific H1 title containing ${primaryKeyword}",
  "subtitle": "Direct 1-sentence value proposition for ${primaryKeyword} (max 130 chars)",
  "metaTitle": "SEO Meta Title featuring ${primaryKeyword} | WillDrafting.in (55-65 chars)",
  "metaDescription": "Actionable SEO Meta Description featuring ${primaryKeyword} under Indian law (145-160 chars)",
  "slug": "${primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}",
  "category": "Will Basics",
  "readTime": "7 min read",
  "outline": [
    "Bespoke H2 Heading 1 specific to ${primaryKeyword}",
    "Bespoke H2 Heading 2 specific to ${primaryKeyword}",
    "Bespoke H2 Heading 3 specific to ${primaryKeyword}",
    "Bespoke H2 Heading 4 specific to ${primaryKeyword}",
    "Bespoke H2 Heading 5 specific to ${primaryKeyword}",
    "Bespoke H2 Heading 6 specific to ${primaryKeyword}"
  ]
}`;

    const step1Resp = await callOpenAiChat({
      apiKey,
      model: MODEL_LIGHT,
      messages: [
        { role: "system", content: step1SystemPrompt },
        {
          role: "user",
          content: `Classify the topic archetype and generate the differentiated SEO metadata, excluded subtopics, and ${targetHeadingCount} bespoke H2 headings for: "${primaryKeyword}".`,
        },
      ],
      jsonMode: true,
      maxTokens: 3000,
    });

    const step1Result = JSON.parse(sanitizeText(step1Resp.content || "{}"));
    step1Result.title = sanitizeTitle(step1Result.title || primaryKeyword, currentYear);

    const archetypeKey =
      typeof step1Result.archetype === "string" && ARCHETYPE_BLUEPRINTS[step1Result.archetype]
        ? step1Result.archetype
        : "validity_and_evidence";
    const blueprint = ARCHETYPE_BLUEPRINTS[archetypeKey];

    const uniqueAngle =
      step1Result.uniqueAngle ||
      `Focused legal analysis and practical guidance exclusively addressing ${primaryKeyword}.`;
    const tableConcept =
      step1Result.tableConcept || blueprint.tableMandate;
    const excludedSubtopics: string[] = Array.isArray(step1Result.excludedSubtopics)
      ? [...step1Result.excludedSubtopics, ...blueprint.bannedClichés]
      : blueprint.bannedClichés;

    let outline: string[] = Array.isArray(step1Result.outline) ? step1Result.outline : [];
    outline = outline
      .filter((h: string) => !/faq|frequently asked|review|table of contents/i.test(h))
      .slice(0, 5);

    // STEP 2: Archetype-Driven Core HTML Article Generation (Strictly Capped at ~1,300-1,700 Words, Zero Slop)
    console.log(
      `[WillDrafting AI Generator] Step 2: Generating Crisp HTML Body [Archetype: ${archetypeKey}] (~${targetWordCount} words max) with ${MODEL_HEAVY}...`
    );
    const dynamicMaxTokens = 3200;

    const isLeadGenMode =
      /lead[- ]?gen|comprehensive|seo strategist/i.test(selectedPromptName) ||
      /LEAD GENERATION|SEO STRATEGIST/i.test(coreInstructions);

    const step2SystemPrompt = `${coreInstructions}

--- STEP 2: CRISP, TO-THE-POINT HTML ARTICLE BODY (STRICTLY ${targetWordCount} WORDS MAX, ZERO AI SLOP) ---
Current Date: ${currentDateFormatted} (Year: ${currentYear})
Primary Keyword: "${primaryKeyword}"
Article Title: "${step1Result.title}"
Detected Topic Archetype: ${blueprint.label} (${archetypeKey})
Unique Editorial Angle: ${uniqueAngle}
HARD WORD COUNT CEILING: ${targetWordCount} words (NEVER exceed 1,800 words total; keep each <h2> section strictly between 200 and 280 words).

===================================================================
ARCHETYPE-SPECIFIC CONTENT & STRUCTURE MANDATE
===================================================================
${blueprint.structuralMandate}

===================================================================
STRICT ANTI-SLOP & ANTI-BOILERPLATE RULES
===================================================================
1. ZERO AI SLOP:
   - Start every <h2> section with the direct legal rule or answer in Sentence #1.
   - Keep paragraphs 1 to 2 sentences maximum.
   - Use crisp bullet points (<ul>) and numbered lists (<ol>) instead of long paragraphs.
   - NEVER repeat a point already made in an earlier section.
   - NEVER write filler transitions ("It is crucial to understand", "In India's complex legal framework", "To summarize", "In conclusion").
2. DO NOT WRITE ABOUT THESE OFF-TOPIC AREAS:
${excludedSubtopics.map((item) => `   - DO NOT write about: ${item}`).join("\n")}

===================================================================
STYLE & FORMATTING RULES (${isLeadGenMode ? "SHARP LEAD-GEN MODE" : "DIRECT ZERO-FILLER MODE"})
===================================================================
${
  isLeadGenMode
    ? `1. Answer the core question immediately under the first <h2>, backed by 1 concise real-world Indian family/property example.
2. Keep paragraphs 1 to 2 sentences max. Use <ul>/<ol> lists and <blockquote> callouts.
3. Naturally guide readers toward protecting their family using WillDrafting.in (/start, /services, /pricing).`
    : `1. Start immediately with the direct legal answer or rule under the first <h2>. Zero introductory fluff.
2. Keep paragraphs 1 to 2 sentences maximum. Pack every sentence with specific statutory sections, concrete examples, sample clause text, or actionable rules.
3. End directly with the final substantive point—no generic conclusion paragraph.`
}

===================================================================
PRIMARY KEYWORD & SEO PLACEMENT
===================================================================
1. Use "${primaryKeyword}" (or natural grammatical variations) 6 to 9 times across the article.
2. Include "${primaryKeyword}" in the opening 50 words under the first <h2> and in at least 2 subheadings.

===================================================================
RESEARCH & GROUNDING CONTEXT FOR "${primaryKeyword}"
===================================================================
${trimmedResearch}

===================================================================
MANDATORY BESPOKE H2 OUTLINE (200–280 WORDS PER SECTION MAX)
===================================================================
Structure the HTML article strictly around these ${outline.length} H2 headings:
${
  outline.length > 0
    ? outline.map((h, i) => `${i + 1}. <h2>${h}</h2>`).join("\n")
    : `1. <h2>Direct Legal Position on ${primaryKeyword}</h2>\n2. <h2>Key Rules & Practical Mechanics for ${primaryKeyword}</h2>\n3. <h2>Comparative Breakdown</h2>\n4. <h2>Critical Pitfalls & Safeguards</h2>`
}

===================================================================
MANDATORY TOPIC-SPECIFIC TABLE (STRICTLY 1 COMPACT TABLE)
===================================================================
${tableConcept}
Output 1 compact HTML <table> with <thead> and <tbody> containing 4 to 5 concise rows tailored to "${primaryKeyword}".

===================================================================
INTERNAL LINKING DIRECTIVE (5 TO 7 NATURAL LINKS)
===================================================================
Contextually weave 5 to 7 HTML hyperlinks (<a href="URL">Natural Anchor Text</a>) using ONLY URLs from this Approved Catalog:
${formattedInternalLinks}

===================================================================
OUTPUT FORMAT CONSTRAINTS
===================================================================
1. Output PURE HTML ONLY. Start directly with the first <h2> tag.
2. NEVER output <h1> tags, markdown code fences (\`\`\`html), FAQs, Reviews, or publication dates.`;

    const step2UserPrompt = `Write the complete, strictly to-the-point HTML article (1,200 to ${targetWordCount} words maximum—do NOT exceed 1,800 words) for "${step1Result.title}" targeting "${primaryKeyword}". Keep every section tight (200-280 words per H2), use 1-2 sentence paragraphs and bullet points, include zero AI slop, and strictly obey the excluded subtopics ban list.`;

    const step2EducationalPrompt = `Context: This is an objective Indian succession law guide for WillDrafting.in explaining "${primaryKeyword}".\n\n${step2UserPrompt}`;

    const attempts = [
      { model: MODEL_HEAVY, prompt: step2UserPrompt },
      { model: MODEL_HEAVY, prompt: step2EducationalPrompt },
      { model: MODEL_FALLBACK, prompt: step2EducationalPrompt },
    ];

    let rawDescription = "";
    for (const attempt of attempts) {
      try {
        const res = await callOpenAiChat({
          apiKey,
          model: attempt.model,
          messages: [
            { role: "system", content: step2SystemPrompt },
            { role: "user", content: attempt.prompt },
          ],
          temperature: 0.55,
          maxTokens: dynamicMaxTokens,
        });
        if (!res.refusal && res.content && res.content.trim().length > 500) {
          rawDescription = res.content;
          break;
        }
      } catch (err) {
        console.warn(`[WillDrafting AI Generator] Step 2 attempt (${attempt.model}) error:`, err);
      }
    }

    if (!rawDescription) {
      return NextResponse.json(
        { error: "Failed to generate the article body. Please try again." },
        { status: 422 }
      );
    }

    let cleanedDescription = postProcessAndSanitizeHtml(rawDescription);
    cleanedDescription = enrichInternalLinks(cleanedDescription, relevantLinks);
    cleanedDescription = ensurePrimaryKeywordPresence(cleanedDescription, primaryKeyword);

    // STEP 3: Topic-Specific Supplementary Assets, FAQs, Reviews, Action Steps & Visual Prompts
    console.log(`[WillDrafting AI Generator] Step 3: Generating supplementary assets & visual prompts with ${MODEL_LIGHT}...`);

    let faqs: { question: string; answer: string }[] = [];
    let reviews: { name: string; location: string; rating: number; review: string }[] = [];
    let references: { title: string; url: string }[] = [];
    let shortVersion: string[] = [];
    let actionSteps: string[] = [];
    let keyTakeaways = "";
    let suggestedImagePrompt = `Wide real-life landscape DSLR photograph (1536x1024) of real Indian people (an Indian family and estate lawyer) in a real Indian residential/architectural landscape reviewing Will documents for ${primaryKeyword}, with the exact title "${step1Result.title}" prominently written on the image in the WillDrafting font 'Plus Jakarta Sans' (bold geometric sans-serif) using WillDrafting brand colors (#172228 Deep Navy, #FAF7F0 Warm Cream, #C65378 Berry Rose accent, #5F7E75 Sage).`;
    let suggestedInfographicPrompt = `Wide real-life landscape visual process guide (1536x1024) explaining ${primaryKeyword} set over a real Indian architectural landscape background, with the exact title "${step1Result.title}" and 4 step cards rendered exclusively in the WillDrafting font 'Plus Jakarta Sans' and WillDrafting colors (#172228 Deep Navy, #FAF7F0 Warm Cream, #C65378 Berry Rose accent, #5F7E75 Sage).`;

    try {
      const step3SystemPrompt = `${coreInstructions}

--- STEP 3: TOPIC-SPECIFIC STRUCTURED ASSETS, SCHEMA & REAL-LIFE LANDSCAPE VISUAL PROMPTS ---
Primary Keyword: "${primaryKeyword}"
Article Title: "${step1Result.title}"
Detected Archetype: ${blueprint.label}

Based on the generated article for "${primaryKeyword}", produce a JSON object with:
1. "keyTakeaways": A direct, 2-sentence executive summary answering "${primaryKeyword}" with exact legal precision.
2. "shortVersion": Array of 4 crisp, one-line bullet takeaways unique to "${primaryKeyword}" (for "The Short Version" box).
3. "actionSteps": Array of 4 to 5 concrete, practical action steps a reader should take specifically regarding "${primaryKeyword}".
4. "faqs": Array of 5 to 6 specific Frequently Asked Questions and concise answers (1-2 sentences each) strictly about "${primaryKeyword}".
5. "reviews": Array of 3 realistic client testimonials from Indian/NRI users who used WillDrafting.in for "${primaryKeyword}". IMPORTANT: Each object MUST have exact keys: { "name": "Full Indian Name", "location": "City, India (or NRI City)", "rating": 5, "review": "2-sentence specific first-person client review describing how WillDrafting.in helped them with ${primaryKeyword}." }. The "review" string MUST NOT be empty.
6. "references": Array of 3 to 4 authoritative Indian statutory or judicial references directly cited for "${primaryKeyword}" (fields: "title", "url").
7. "keywords": Array of 10 related long-tail SEO search queries for "${primaryKeyword}".
8. "suggestedImagePrompt": Detailed prompt for a wide 1536x1024 Featured Cover Image that MUST be a real-life landscape DSLR photograph featuring REAL Indian people in a REAL Indian landscape/home/office setting representing "${primaryKeyword}" (strictly NO cartoon/vector illustrations), with the exact blog title "${step1Result.title}" prominently written on the image using exclusively the WillDrafting website font 'Plus Jakarta Sans' (bold geometric sans-serif) and WillDrafting brand colors (#172228 Deep Navy, #FAF7F0 Warm Cream, #C65378 Berry Rose accent, #5F7E75 Sage).
9. "suggestedInfographicPrompt": Detailed prompt for a wide 1536x1024 landscape visual summary chart set over a real-life Indian architectural landscape explaining the exact steps/rules of "${primaryKeyword}", with the exact title "${step1Result.title}" and 100% of text written exclusively in the WillDrafting website font 'Plus Jakarta Sans' and WillDrafting brand colors (#172228 Deep Navy, #FAF7F0 Warm Cream, #C65378 Berry Rose accent, #5F7E75 Sage).

Article Excerpt Context:
${cleanedDescription.substring(0, 3000)}

Return ONLY valid JSON.`;

      const step3Resp = await callOpenAiChat({
        apiKey,
        model: MODEL_LIGHT,
        messages: [
          { role: "system", content: step3SystemPrompt },
          {
            role: "user",
            content: `Generate the complete Step 3 JSON package tailored strictly to "${primaryKeyword}". Ensure every review object has a non-empty "review" string and both image prompts specify a real-life landscape photograph with the exact title "${step1Result.title}" written on it using the WillDrafting font ('Plus Jakarta Sans') and WillDrafting colors (#172228 Navy, #FAF7F0 Cream, #C65378 Berry Rose, #5F7E75 Sage).`,
          },
        ],
        jsonMode: true,
        maxTokens: 4000,
      });

      const step3Data = JSON.parse(sanitizeText(step3Resp.content || "{}"));
      keyTakeaways = step3Data.keyTakeaways || "";
      shortVersion = Array.isArray(step3Data.shortVersion) ? step3Data.shortVersion : [];
      actionSteps = Array.isArray(step3Data.actionSteps) ? step3Data.actionSteps : [];
      faqs = Array.isArray(step3Data.faqs) ? step3Data.faqs : [];
      reviews = Array.isArray(step3Data.reviews)
        ? step3Data.reviews
            .map((r: any) => ({
              name: String(r?.name || "")
                .replace(/\s*\((?:illustrative|sample|fictional).*?\)/gi, "")
                .trim(),
              location: String(r?.location || "India").trim(),
              rating: Number(r?.rating) || 5,
              review: String(r?.review || r?.text || "")
                .replace(
                  /^(?:\[?(?:Illustrative|Sample|Fictional|Example|Hypothetical)[^:\]]*[:\]]\s*)+/i,
                  ""
                )
                .trim(),
            }))
            .filter((r: { name: string; review: string }) => r.name && r.review.length > 0)
        : [];
      references = Array.isArray(step3Data.references) ? step3Data.references : [];
      suggestedImagePrompt = step3Data.suggestedImagePrompt || suggestedImagePrompt;
      suggestedInfographicPrompt =
        step3Data.suggestedInfographicPrompt || suggestedInfographicPrompt;

      const keywords: string[] = Array.isArray(step3Data.keywords) ? step3Data.keywords : [];
      if (keywords.length > 0) {
        const kwHtml = keywords
          .map((k: string) => `<li>${k.replace(/^[•\-\d.]\s*/, "").trim()}</li>`)
          .join("\n");
        cleanedDescription += `\n\n<h3>Popular Searches</h3>\n<ul>\n${kwHtml}\n</ul>`;
      }
    } catch (step3Err) {
      console.warn("[WillDrafting AI Generator] Step 3 partial fallback:", step3Err);
    }

    if (keyTakeaways) {
      const cleanTakeaways = keyTakeaways.replace(/^Key Takeaways:\s*/i, "").trim();
      const topBox = `<blockquote><p><strong>Executive Summary:</strong> <em>${cleanTakeaways}</em></p></blockquote>\n\n`;
      cleanedDescription = topBox + cleanedDescription;
    }

    const finalPayload = {
      title: step1Result.title,
      subtitle: step1Result.subtitle || "",
      metaTitle: step1Result.metaTitle || `${step1Result.title} | WillDrafting.in`,
      metaDescription: step1Result.metaDescription || step1Result.subtitle || "",
      slug:
        step1Result.slug ||
        primaryKeyword
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      category: step1Result.category || "Will Basics",
      readTime:
        step1Result.readTime ||
        `${Math.max(4, Math.round(cleanedDescription.split(/\s+/).length / 200))} min read`,
      description: cleanedDescription,
      shortVersion,
      actionSteps,
      faqs,
      reviews,
      references,
      suggestedImagePrompt,
      suggestedInfographicPrompt,
      date: todayIsoDate,
      author: "Advocate Anuj Anand Malik",
    };

    const finalJsonStr = JSON.stringify(finalPayload);
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode(finalJsonStr));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[WillDrafting AI Generator] Critical error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate article",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export const maxDuration = 300;
