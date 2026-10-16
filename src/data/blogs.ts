export interface BlogSection {
  heading: string;
  paragraphs: string[];
  calloutQuote?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  aliases?: string[];
  category: string;
  readTime: string;
  title: string;
  lead: string;
  date: string;
  imageSrc: string;
  author: string;
  authorRole: string;
  shortVersion: string[];
  sections: BlogSection[];
  actionSteps: string[];
  disclaimer: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    slug: "nri-will-for-indian-property-two-will-strategy",
    aliases: ["nri-will-india-guide"],
    category: "NRI Estate Planning",
    readTime: "7 min",
    title: "Why NRIs & OCIs Need a Separate Indian Will: The Two-Will Strategy, FEMA Rules & NRE/NRO Repatriation",
    lead: "Relying on a single US, UK, UAE, or Canadian Will to transfer Indian real estate and NRE/NRO bank accounts forces your family into multi-year foreign probate re-sealing under Section 228 of the Indian Succession Act.",
    date: "October 12, 2026",
    imageSrc: "/3.jpg",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Estate & FEMA Counsel, AMA Legal Solutions",
    shortVersion: [
      "Always maintain a separate Indian Will exclusively for assets situated in India (the 'Two-Will Strategy') so Indian transmission does not wait for foreign probate",
      "Include an explicit non-revocation scope clause so your Indian Will and your foreign Will do not accidentally cancel each other",
      "Under FEMA Non-Debt Instruments Rules, NRIs and OCIs can inherit residential, commercial, and even agricultural land in India by testamentary succession, though subsequent sale of agricultural land is restricted to Resident Indians",
      "A clear Indian Will streamlines Form 15CA / 15CB Chartered Accountant certification and NRO-to-NRE repatriation up to USD 1 Million per financial year",
    ],
    sections: [
      {
        heading: "Why a single global Will creates a two-continent legal bottleneck",
        paragraphs: [
          "Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) living in the United States, United Kingdom, UAE, Canada, Australia, or Singapore frequently assume that a comprehensive Will drafted in their country of residence automatically governs their flat in Mumbai, ancestral house in Delhi, or NRE/NRO fixed deposits with Indian banks.",
          "While Indian courts recognize foreign wills in principle, executing a foreign Will in India triggers Section 228 of the Indian Succession Act, 1925. Before any Indian bank, cooperative housing society, or Sub-Registrar accepts a foreign Will, your beneficiaries must first wait 6 to 18 months for the overseas court (in California, London, Ontario, or Dubai) to grant probate, obtain apostilled or Indian Embassy-attested certified copies, and then file a second ancillary petition in an Indian District Court or High Court for 'Letters of Administration with Authenticated Copy of the Will Annexed'.",
        ],
        calloutQuote:
          "Under the Two-Will Strategy, your foreign Will governs your overseas assets and your Indian Will exclusively governs your Indian movable and immovable estate—allowing both jurisdictions to administer your estate simultaneously without waiting on each other.",
      },
      {
        heading: "The golden rule of the Two-Will Strategy: Non-revocation territorial clauses",
        paragraphs: [
          "The single biggest drafting error made by general practitioners is leaving a standard blanket revocation clause ('I hereby revoke all my previous Wills and codicils') at the top of a new Will. If you execute an Indian Will in 2026 and later update your US or UK Will in 2027 with a blanket revocation clause, that foreign update inadvertently revokes your Indian Will.",
          "Every NRI Indian Will drafted on WillDrafting.in and reviewed by AMA Legal Solutions contains a strict territorial scope declaration: it states that the testament applies solely to movable and immovable assets situated within the Republic of India and explicitly preserves any past or future testamentary instruments governing assets outside India.",
        ],
      },
      {
        heading: "FEMA rules on inheriting residential, commercial, and agricultural property",
        paragraphs: [
          "Under Section 6(5) of the Foreign Exchange Management Act (FEMA), 1999 and the FEMA (Non-Debt Instruments) Rules, 2019, an NRI or OCI is legally permitted to inherit any immovable property in India—including residential apartments, commercial offices, and even agricultural land, farmhouse, or plantation property—from a person resident in India or from another NRI/OCI who acquired it in compliance with FEMA laws in force at the time.",
          "However, while an NRI or OCI can lawfully inherit agricultural land through a valid Indian Will, FEMA prohibits them from selling or gifting that agricultural land to another NRI or OCI; any subsequent sale must be made only to a person resident in India who is an Indian citizen.",
        ],
      },
      {
        heading: "How an NRI executes a legally valid Indian Will from abroad",
        paragraphs: [
          "Under Section 63 of the Indian Succession Act, 1925, an NRI does not need to fly to India or purchase Indian stamp paper to make a valid Indian Will. You can print your Indian Will on plain A4 paper in New York, London, Dubai, or Toronto and sign it in the simultaneous presence of two adult independent witnesses (such as friends, colleagues, or neighbors in your country of residence) who Are NOT beneficiaries or spouses of beneficiaries.",
          "For added evidentiary weight—especially if you are bequeathing high-value real estate in India or nominating an Indian executor—you may also attach a physician's sound-mind certificate and, if executing a supporting Power of Attorney for property mutation, have it apostilled under the Hague Convention or attested at the local Indian Embassy or Consulate.",
        ],
      },
    ],
    actionSteps: [
      "Catalogue all Indian assets separately: flat/plot survey numbers, NRE/NRO/FCNR bank accounts, Demat DP ID/Client ID folios, mutual funds, and PPF accounts",
      "Appoint a trusted executor residing in India (or an alternate Indian executor) who can physically appear before banks, housing societies, and municipal mutation authorities",
      "Draft a dedicated Indian Will with an explicit territorial clause protecting your overseas Will from accidental cross-revocation",
    ],
    disclaimer:
      "This guide reflects the Indian Succession Act, 1925, Hindu Succession Act, 1956, and FEMA (Non-Debt Instruments) Rules, 2019. Cross-border estate taxation (such as UK IHT or US estate tax treaties) should be verified with counsel in your country of tax residence.",
  },
  {
    id: "2",
    slug: "nominee-vs-legal-heir-india-supreme-court-rule",
    aliases: ["nominee-vs-legal-heir-india"],
    category: "Supreme Court Precedent",
    readTime: "6 min",
    title: "Nominee vs. Legal Heir in India: Why Bank, Mutual Fund & Demat Nominations Do Not Replace a Will",
    lead: "In landmark rulings from Sarbati Devi to Shakti Yezdani (2023), the Supreme Court of India has settled the law: a nominee is merely a caretaker trustee, and your Will always overrides nomination.",
    date: "October 08, 2026",
    imageSrc: "/images/asset-bequests.jpg",
    author: "Advocate Sunita Deshmukh",
    authorRole: "Partner, Succession & Wealth Practice, AMA Legal Solutions",
    shortVersion: [
      "A nominee on a bank account, Fixed Deposit, Mutual Fund, or Demat account is ONLY a provisional custodian (trustee), not the legal owner of the money",
      "In Shakti Yezdani v. Jayanand Jayant Salgaonkar (Dec 2023), the Supreme Court ruled that Companies Act / Depositories Act nominations DO NOT override testamentary succession under a Will",
      "If your bank nominee and your Will's beneficiary are different people, the nominee must legally hand over the funds to the beneficiary named in your Will",
      "Matching your asset nominations with your Will's beneficiaries is the only way to guarantee both instant bank release and permanent dispute-free ownership",
    ],
    sections: [
      {
        heading: "The ₹1.84 Lakh Crore misconception: 'I already added a nominee in the bank app'",
        paragraphs: [
          "Across India, millions of depositors, equity investors, and NRI account holders skip drafting a Will because they believe clicking 'Add Nominee' on their net-banking portal, Zerodha/Groww Demat account, or mutual fund folio settles who inherits that wealth.",
          "In Indian law, nomination and inheritance are two completely distinct legal concepts. A nomination exists solely to give the bank, insurance company, or depository participant a valid discharge of liability so the institution knows whose hands to place the funds into immediately after the account holder's passing.",
        ],
        calloutQuote:
          "A nominee is a mere stop-gap custodian or receiving hand. Legal ownership of the asset vests strictly in the beneficiaries named in a valid Will—or, if there is no Will, in all statutory legal heirs equally.",
      },
      {
        heading: "What the Supreme Court ruled in Sarbati Devi and Shakti Yezdani (2023)",
        paragraphs: [
          "In Smt. Sarbati Devi v. Smt. Usha Devi (1984), the Supreme Court held that a nominee under Section 39 of the Insurance Act does not acquire beneficial ownership of life insurance proceeds; the money forms part of the deceased's estate and is governed by the law of succession.",
          "For years, financial intermediaries argued that Demat share accounts and company shares were an exception under Section 109A of the Companies Act, 1956 (now Section 72 of the Companies Act, 2013) and Section 9.11 of the Depositories Act bylaws. On December 14, 2023, a division bench of the Supreme Court in Shakti Yezdani & Anr. v. Jayanand Jayant Salgaonkar permanently settled this debate: the Court ruled that the Companies Act and Depositories Act do not create a 'third mode of succession' and a nominee of shares or Demat securities holds them purely in fiduciary trust for the legal heirs or legatees under a Will.",
        ],
      },
      {
        heading: "What happens when your Nomination and your Will conflict?",
        paragraphs: [
          "Suppose a father nominates his elder son on a ₹50 Lakh Fixed Deposit for convenience, assuming the elder son knows to split it equally with his sister, or suppose the father leaves a Will bequeathing his financial portfolio to his wife while an old bank account still lists a brother as nominee.",
          "Upon death, the bank will transfer the ₹50 Lakh to the nominee's account. However, the legal beneficiaries under the Will (or Class I heirs if intestate) have an enforceable right to demand their share from the nominee. Without a clear Will aligning nominations with intended bequests, families are dragged into civil recovery suits and freezing injunctions.",
        ],
      },
      {
        heading: "The exception to watch out for: EPF and Statutory Gratuity",
        paragraphs: [
          "While bank accounts (Section 45ZA Banking Regulation Act), mutual funds, PPF, real estate society shares, and Demat accounts treat the nominee as a trustee, Employees' Provident Fund (EPF) and Payment of Gratuity Act schemes restrict valid nominations to defined 'family members' and confer direct statutory rights on eligible family nominees. Even there, explicitly referencing your EPF, NPS, and superannuation accounts inside your Will prevents ambiguity among surviving dependents.",
        ],
      },
    ],
    actionSteps: [
      "List every bank account (Savings, NRE, NRO, FD), Demat account, Mutual Fund folio, PPF, and insurance policy along with who is currently recorded as the nominee",
      "Draft a legally valid Will that explicitly names both the ultimate beneficiary and the percentage share for each financial account",
      "Update your bank and Demat nominations so the nominee matches the primary beneficiary named in your Will",
    ],
    disclaimer:
      "This article summarizes binding Supreme Court of India precedents including Sarbati Devi (1984) and Shakti Yezdani (2023), as well as the Banking Regulation Act, 1949 (including the Banking Laws Amendment norms).",
  },
  {
    id: "3",
    slug: "probate-of-will-in-india-2025-amendment-mumbai-chennai-kolkata",
    aliases: ["probate-of-will-in-india"],
    category: "Statutory Reform",
    readTime: "6 min",
    title: "Is Probate of a Will Still Mandatory in Mumbai, Chennai & Kolkata? The 2025 Amendment Explained",
    lead: "For 100 years, Section 213 of the Indian Succession Act forced Hindus, Buddhists, Sikhs, and Jains in Mumbai, Chennai, and Kolkata to obtain compulsory court probate. Here is how the Repealing and Amending Act, 2025 changes the law—and when probate is still required.",
    date: "October 04, 2026",
    imageSrc: "/images/advocate.jpg",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Counsel, High Court, AMA Legal Solutions",
    shortVersion: [
      "Under Section 2(f) of the Indian Succession Act, 'Probate' is a copy of a Will certified under the seal of a court of competent jurisdiction granting administration to the executor",
      "Historically, Section 213 made probate compulsory only for Wills executed in—or covering immovable property in—the colonial Presidency Towns of Mumbai, Chennai, and Kolkata",
      "Parliament's Repealing and Amending Act, 2025 omitted the colonial-era compulsory mandate of Section 213, harmonizing probate rules across India",
      "Probate remains essential whenever a Will is contested, when foreign wills are enforced in India, or when high-value housing societies and banks demand judicial authentication",
    ],
    sections: [
      {
        heading: "What is Probate of a Will under the Indian Succession Act, 1925?",
        paragraphs: [
          "Defined under Section 2(f) of the Indian Succession Act, 1925, Probate is the official judicial certification by a competent court confirming that a Will was validly executed by the deceased testator in a sound disposing mind, is the testator's genuine last testament, and empowers the named Executor to administer and distribute the estate.",
          "Crucially, under Section 222 of the Act, Probate can be granted only to an Executor appointed by the Will. If a Will does not name an Executor, the beneficiaries must instead petition the court for 'Letters of Administration with the Will Annexed' under Section 232—which is why naming a primary and alternate executor in your Will is critical.",
        ],
      },
      {
        heading: "The colonial anomaly of Mumbai, Chennai, and Kolkata (Section 213 vs. the 2025 Reform)",
        paragraphs: [
          "For nearly a century, Section 213 read with Section 57 of the Indian Succession Act created a geographic divide: if a Hindu, Buddhist, Sikh, or Jain executed a Will in Delhi, Bangalore, Pune, Hyderabad, Ahmedabad, or Noida for property outside the former Presidency Towns, compulsory probate was NOT required. Yet if the Will was signed within—or covered a flat located in—Mumbai, Chennai, or Kolkata, no right as executor or legatee could be established in court without first obtaining High Court probate.",
          "With the enactment of the Repealing and Amending Act, 2025 omitting Section 213 of the Indian Succession Act, Parliament dismantled this colonial geographic discrimination. Statutory rights under an uncontested Will can now be asserted uniformly across Indian cities without an automatic statutory bar under Section 213.",
        ],
        calloutQuote:
          "While the 2025 omission of Section 213 removes the compulsory statutory bar in Mumbai, Chennai, and Kolkata, a cleanly drafted, properly attested Will remains your family's primary shield against anyone forcing the estate into contested probate litigation.",
      },
      {
        heading: "Four situations where Probate or Court Certification is still required in India",
        paragraphs: [
          "1. Contested Wills or Suspicious Circumstances: If any Class I legal heir challenges the Will alleging forgery, lack of mental capacity (Section 59), or undue influence (Section 61), the executor must prove the Will in solemn form before the court.",
          "2. Foreign Wills Covering Indian Assets (Section 228): If an NRI leaves only a foreign Will without a separate Indian Will, Indian courts require ancillary certification under Section 228.",
          "3. Cooperative Housing Societies & Municipal Mutation Policies: Many high-value cooperative housing societies in Mumbai and metro development authorities still request either a registered Will, no-objection affidavits from all Class I heirs, or probate when an unregistered Will disinherits a natural heir.",
          "4. High-Value Financial Assets Without Matching Nominations: When bank deposits or securities lack a surviving nominee and exceed institutional indemnity thresholds, banks routinely demand Probate or a Succession Certificate.",
        ],
      },
      {
        heading: "How to draft your Will today so your family avoids court delays",
        paragraphs: [
          "Whether your property is in Mumbai, Delhi NCR, Bengaluru, Chennai, Hyderabad, or Kolkata, the way to spare your family 12 to 24 months of probate court fees and newspaper citations is proactive drafting: appoint a clear executor, ensure two independent adult witnesses sign properly under Section 63, align your bank/Demat nominations with your Will, and—where family friction is possible—attach a doctor's medical fitness certificate or register the Will at the local Sub-Registrar office.",
        ],
      },
    ],
    actionSteps: [
      "Always name a primary Executor and an alternate Executor in your Will (required under Section 222)",
      "Ensure two independent witnesses who are NOT beneficiaries attest every page of your Will",
      "If disinheriting a natural Class I heir, clearly state the objective reason in the Will and obtain a doctor's fitness certificate on the date of signing",
    ],
    disclaimer:
      "This analysis covers the Indian Succession Act, 1925 and the Repealing and Amending Act, 2025. State-specific court fee acts and High Court Original Side rules govern voluntary and contested probate petitions.",
  },
  {
    id: "4",
    slug: "will-valid-on-plain-paper-india",
    aliases: ["will-valid-plain-paper"],
    category: "Succession Law",
    readTime: "6 min",
    title: "Is a Will valid on plain paper in India? The legal truth",
    lead: "Under Indian succession law, a will does not require expensive non-judicial stamp paper or mandatory registration to be completely legal.",
    date: "July 15, 2026",
    imageSrc: "/2.jpg",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Counsel, High Court",
    shortVersion: [
      "A Will written on plain A4 paper is 100% legally valid under Indian law",
      "Stamp paper is NOT mandatory under the Indian Stamp Act for testamentary wills",
      "Two independent witnesses must attest the testator's signature in their presence",
      "Registration with the Sub-Registrar is optional, though strongly recommended for immovable property",
    ],
    sections: [
      {
        heading: "The widespread myth of stamp paper in Indian estates",
        paragraphs: [
          "One of the most persistent misconceptions in Indian estate planning is that a Will has no legal standing unless it is typed on high-value non-judicial stamp paper or notarized with official red ribbons.",
          "The legal truth is straightforward: Indian succession law governs the execution of wills in India and nowhere mandates stamp paper, judicial bonds, or notarization. A Will drafted legibly on plain white A4 paper carries identical testamentary validity to one drafted on court parchment.",
        ],
      },
      {
        heading: "The mandatory legal essentials under Section 63",
        paragraphs: [
          "While paper format is flexible, statutory execution rules are strict. For any Will to be enforceable in Indian courts, three core criteria must be fulfilled:",
          "1. Testamentary Capacity: The testator must be an adult of sound mind, exercising free volition without coercion, fraud, or undue influence.",
          "2. Testator Signature: The testator must sign or affix their thumb impression at the foot of each page and at the conclusion of the testament.",
          "3. Attestation by Two Witnesses: At least two competent adult witnesses must witness the testator sign the document, and must subsequently sign in the presence of the testator.",
        ],
        calloutQuote:
          "Under Indian law, a beneficiary under the Will or their spouse should NEVER sign as an attesting witness, as Section 67 renders bequests to attesting witnesses null and void.",
      },
      {
        heading: "Registration vs. Non-Registration",
        paragraphs: [
          "Under Section 18 of the Registration Act, 1908, the registration of a Will is optional (not compulsory). An unregistered Will on plain paper is fully enforceable in probate courts.",
          "However, registering the Will with the Sub-Registrar of Assurances provides substantial evidentiary advantages: it places the document in official government custody and makes allegations of post-facto tampering or forgery virtually impossible for disgruntled relatives to sustain.",
        ],
      },
    ],
    actionSteps: [
      "Draft your testament with clear clauses describing assets, revocations, and named executors",
      "Ensure two independent witnesses who are not beneficiaries attest your signature together",
      "Store the original executed copy in a secure location and notify your nominated executor",
    ],
    disclaimer:
      "This guidance is grounded in Indian succession law and the Registration Act, 1908. Specific community rules (such as Hindu Succession Act or Muslim personal laws) may govern particular testamentary quotas.",
  },
  {
    id: "5",
    slug: "appoint-guardians-minor-children",
    aliases: ["appoint-guardians-minor-children-india"],
    category: "Estate Planning",
    readTime: "5 min",
    title: "How to appoint legal guardians for minor children",
    lead: "Prevent child custody from becoming a contested courtroom battle. Essential guidelines on nominating primary and alternate testamentary guardians.",
    date: "July 02, 2026",
    imageSrc: "/images/hero-family.jpg",
    author: "Sunita Deshmukh",
    authorRole: "Family Law & Trust Specialist",
    shortVersion: [
      "Testamentary guardianship takes effect only if both legal parents have passed away",
      "Always nominate an alternate guardian in case your primary nominee is unable to serve",
      "Separate the role of guardian of the person from guardian of family financial assets",
      "Document specific parental values, education choices, and living preferences clearly",
    ],
    sections: [
      {
        heading: "Why silence leaves custody to judicial discretion",
        paragraphs: [
          "Many young parents assume that if tragedy strikes, their children will seamlessly transition into the care of their favorite sibling or grandparent. Under the Guardians and Wards Act, 1890, this assumption is dangerous.",
          "In the absence of a legally valid testamentary guardianship clause in a Will, custody becomes subject to judicial discretion under the 'best interests of the child' doctrine. Well-meaning relatives may engage in bitter, protracted litigation that traumatizes the minor children and ties up estate assets.",
        ],
      },
      {
        heading: "Separating personal care from asset trusteeship",
        paragraphs: [
          "A crucial best practice in estate structuring is bifurcating physical care from financial management. The person with the greatest emotional warmth for daily parenting may not possess the financial discipline to oversee mutual funds, real estate rentals, and insurance payouts.",
          "By appointing a personal guardian for day-to-day upbringing and an independent financial trustee or executor to manage estate payouts for school fees and maintenance, you eliminate conflicts of interest and protect the child's inheritance.",
        ],
        calloutQuote:
          "Naming an alternate guardian is imperative. Life circumstances change, and a nominated relative may face health constraints or relocation across international borders.",
      },
      {
        heading: "How to formalize the nomination",
        paragraphs: [
          "State the full legal name, relationship, address, and consent status of your chosen primary and successor guardians. Include a non-binding memorandum of wishes explaining your expectations regarding schooling, religious upbringing, and living arrangements.",
        ],
      },
    ],
    actionSteps: [
      "Have an open, candid discussion with your prospective guardians before naming them",
      "Nominate both a primary guardian and a resilient alternate guardian in your Will",
      "Create a testamentary trust structure so financial funds are disbursed periodically for the child",
    ],
    disclaimer:
      "Guardianship nominations in India are governed by the Guardians and Wards Act, 1890 and the Hindu Minority and Guardianship Act, 1956. Court confirmation may be required in contested scenarios.",
  },
  {
    id: "6",
    slug: "intestacy-rules-without-will",
    aliases: ["intestacy-rules-what-happens-without-will"],
    category: "Legal Insights",
    readTime: "7 min",
    title: "Intestacy rules: What happens if someone passes without a Will?",
    lead: "Understanding statutory asset division under personal succession laws, and why family bank accounts and real estate get frozen during succession certificate hearings.",
    date: "June 28, 2026",
    imageSrc: "/images/senior-couple.jpg",
    author: "Advocate Rajeshwar Rao",
    authorRole: "Senior Counsel, High Court",
    shortVersion: [
      "Dying intestate means your estate is divided by rigid statutory formulas, not personal wishes",
      "Bank accounts and demat portfolios often require Succession Certificates or Letters of Administration",
      "Class I legal heirs receive equal shares regardless of who contributed financially",
      "Contested property partitions routinely take years to resolve in Indian civil courts",
    ],
    sections: [
      {
        heading: "The statutory default: When the state writes your estate plan",
        paragraphs: [
          "When an individual passes away without leaving a valid testament, they die 'intestate'. In that instant, personal preferences, oral promises, and unspoken family understandings carry zero legal weight.",
          "Instead, rigid statutory schedules determine exactly who receives which fractional share of your lifetime savings, ancestral holdings, and self-acquired real estate. Under the Hindu Succession Act, 1956, an estate is divided equally among Class I legal heirs — surviving spouse, mother, sons, and daughters.",
        ],
      },
      {
        heading: "The administrative freeze on financial assets",
        paragraphs: [
          "Even if surviving family members are in complete harmony, institutional gatekeepers create prolonged friction. Banks, registrar offices, and mutual fund depositories cannot release substantial assets without court-sanctioned authority.",
          "The heirs are compelled to petition the District Court or High Court for a Succession Certificate or Letters of Administration. This procedure mandates public newspaper notices, valuation affidavits, court fee deposits, and a waiting period that frequently spans 8 to 24 months.",
        ],
        calloutQuote:
          "Nomination is NOT ownership. Under established Supreme Court precedent, a nominee is merely a statutory trustee holding funds on behalf of legal heirs, not the ultimate beneficiary.",
      },
      {
        heading: "Preventing family fragmentation through simple estate governance",
        paragraphs: [
          "A single, thoughtfully drafted Will completely bypasses the statutory freeze. By appointing a reliable executor and clearly distributing self-acquired properties, bank balances, and business shares, you protect your family from court delays, public notices, and unneeded litigation costs.",
        ],
      },
    ],
    actionSteps: [
      "Audit your asset registry: compile bank accounts, demat folios, properties, and locker details",
      "Ensure all bank and insurance nominations align precisely with your intended heirs",
      "Execute a comprehensive Will to eliminate the costly requirement for a succession certificate",
    ],
    disclaimer:
      "Succession rules vary significantly between religious personal laws in India. This overview reflects general principles of Indian succession law and Hindu Succession Act, 1956.",
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  const normalized = slug.toLowerCase().trim();
  return BLOG_ARTICLES.find(
    (a) =>
      a.slug.toLowerCase() === normalized ||
      a.aliases?.some((alias) => alias.toLowerCase() === normalized)
  );
}

export function getRelatedArticles(currentSlug: string, count = 3): BlogArticle[] {
  const current = getArticleBySlug(currentSlug);
  return BLOG_ARTICLES.filter((a) => a.id !== current?.id).slice(0, count);
}
