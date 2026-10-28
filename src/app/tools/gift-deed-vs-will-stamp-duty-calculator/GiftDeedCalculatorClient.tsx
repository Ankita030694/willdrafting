"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  RefreshCw,
  Landmark,
  Check,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  TrendingUp,
  Users,
  FileText,
  Layers,
  Globe,
  Lock,
  HeartHandshake,
  Building2,
} from "lucide-react";

interface StateRule {
  name: string;
  code: string;
  article: string;
  summary: string;
  portalName: string;
  portalUrl: string;
  calculate: (
    val: number,
    relation: string,
    propType: string
  ) => {
    stampDuty: number;
    regFee: number;
    isCapped: boolean;
    note: string;
  };
  releaseDeedRule: {
    isFlat: boolean;
    duty: number; // flat amount or percentage
    regFee: number;
    description: string;
  };
}

const STATE_RULES: Record<string, StateRule> = {
  MH: {
    name: "Maharashtra",
    code: "MH",
    article: "Maharashtra Stamp Act, 1958 (Article 34 Proviso)",
    summary:
      "Fixed stamp duty of ₹200 for residential/agricultural property gifted to spouse, children, grandchildren, or wife of deceased son. 1% registration fee capped at ₹30,000.",
    portalName: "IGR Maharashtra (e-Registration)",
    portalUrl: "https://igrmaharashtra.gov.in",
    calculate: (val, relation, propType) => {
      const isDirectBlood = ["spouse", "children", "grandchildren"].includes(relation);
      const isResOrAgri = ["residential", "agricultural"].includes(propType);

      if (isDirectBlood && isResOrAgri) {
        const regFee = Math.min(val * 0.01, 30000);
        return {
          stampDuty: 200,
          regFee,
          isCapped: true,
          note: "Concessional ₹200 stamp duty under Article 34 proviso + 1% registration fee capped at ₹30,000.",
        };
      }
      if (isDirectBlood && !isResOrAgri) {
        const stampDuty = val * 0.03; // 2% + 1% cess
        const regFee = Math.min(val * 0.01, 30000);
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "Commercial property to blood relative attracts 3% stamp duty (with cess) + 1% reg fee (max ₹30,000).",
        };
      }
      if (["parents", "siblings"].includes(relation)) {
        const stampDuty = val * 0.03;
        const regFee = Math.min(val * 0.01, 30000);
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "Gift to parents or siblings attracts 3% duty + 1% reg fee (max ₹30,000).",
        };
      }
      // Non relative
      const stampDuty = val * 0.06; // 5% + 1% metro cess
      const regFee = Math.min(val * 0.01, 30000);
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-relative gift attracts standard 6% conveyance duty + 1% reg fee (max ₹30,000).",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 200,
      regFee: 200,
      description: "Fixed ₹200 stamp duty + ₹200 registration fee between legal co-owners / coparceners.",
    },
  },
  UP: {
    name: "Uttar Pradesh",
    code: "UP",
    article: "Uttar Pradesh Stamp Act & Article 33 Concession Notification",
    summary:
      "Flat ₹5,000 stamp duty on gift deeds executed between defined blood relatives (parents, spouse, children, siblings, grandchildren, daughter-in-law). 1% registration fee capped at ₹10,000.",
    portalName: "IGRS Uttar Pradesh (Prerna Portal)",
    portalUrl: "https://igrsup.gov.in",
    calculate: (val, relation) => {
      const isBlood = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
        "in_laws",
      ].includes(relation);

      if (isBlood) {
        const regFee = Math.min(val * 0.01, 10000);
        return {
          stampDuty: 5000,
          regFee,
          isCapped: true,
          note: "Flat ₹5,000 stamp duty under UP Blood Relative Scheme + 1% registration fee capped at ₹10,000.",
        };
      }
      // Non relative
      const stampDuty = val * 0.07;
      const regFee = val * 0.01;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-relative gift attracts full 7% conveyance stamp duty + 1% uncapped registration fee.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 5000,
      regFee: 500,
      description: "Concessional flat ₹5,000 stamp duty for release deeds among family co-heirs.",
    },
  },
  DL: {
    name: "Delhi (NCT)",
    code: "DL",
    article: "Indian Stamp Act, 1899 (Delhi Schedule) & DMC Transfer Duty",
    summary:
      "Gift deed to family members attracts 2% (female grantee) or 3% (male grantee) stamp duty + 1% municipal transfer duty + 1% registration fee.",
    portalName: "DORIS Delhi (Revenue Department)",
    portalUrl: "https://esearch.delhigovt.nic.in",
    calculate: (val, relation) => {
      const isFamily = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isFamily) {
        const stampDuty = val * 0.035;
        const regFee = val * 0.01 + 100;
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "3.5% combined stamp & municipal duty (average male/female) + 1% registration fee + ₹100 pasting fee.",
        };
      }
      const stampDuty = val * 0.06;
      const regFee = val * 0.01 + 100;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-family gift attracts 6% combined transfer duty + 1% registration fee.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 100,
      regFee: 100,
      description: "Nominal ₹100 stamp paper + ₹100 registration for coparcenary ancestral relinquishment.",
    },
  },
  KA: {
    name: "Karnataka",
    code: "KA",
    article: "Karnataka Stamp Act, 1957 (Article 28 Family Settlement / Gift)",
    summary:
      "Concessional slab duty: Flat ₹1,000 to ₹5,000 for residential gifts between immediate family members within BBMP/municipal areas, with 1% registration fee capped at ₹1,000.",
    portalName: "Kaveri 2.0 (Department of Stamps & Registration)",
    portalUrl: "https://kaveri.karnataka.gov.in",
    calculate: (val, relation) => {
      const isImmediateFamily = ["spouse", "children", "parents", "grandchildren"].includes(
        relation
      );
      if (isImmediateFamily) {
        return {
          stampDuty: 5000,
          regFee: 1000,
          isCapped: true,
          note: "Concessional flat ₹5,000 stamp duty under Article 28 + ₹1,000 registration fee in municipal/BBMP limits.",
        };
      }
      if (relation === "siblings") {
        const stampDuty = val * 0.02;
        const regFee = Math.min(val * 0.01, 10000);
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "Broader family gift attracts 2% concessional stamp duty + 1% registration fee.",
        };
      }
      const stampDuty = val * 0.055;
      const regFee = val * 0.02;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-family gift attracts 5.5% conveyance duty (including cess) + 2% registration fee.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 5000,
      regFee: 1000,
      description: "Flat ₹5,000 stamp duty + ₹1,000 registration fee for family co-owners.",
    },
  },
  TN: {
    name: "Tamil Nadu",
    code: "TN",
    article: "Tamil Nadu Stamp Act, 1899 (Article 33 Family Proviso)",
    summary:
      "1% stamp duty subject to a maximum ceiling of ₹25,000, and 1% registration fee capped at ₹4,000 for family members. Non-family gifts attract 11% total.",
    portalName: "TNREGINET (Inspector General of Registration)",
    portalUrl: "https://tnreginet.gov.in",
    calculate: (val, relation) => {
      const isFamily = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isFamily) {
        const stampDuty = Math.min(val * 0.01, 25000);
        const regFee = Math.min(val * 0.01, 4000);
        return {
          stampDuty,
          regFee,
          isCapped: true,
          note: "1% stamp duty capped at ₹25,000 + 1% registration fee capped at ₹4,000 under Article 33.",
        };
      }
      const stampDuty = val * 0.07;
      const regFee = val * 0.04;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-family gift attracts 7% stamp duty + 4% registration fee (total 11% uncapped).",
      };
    },
    releaseDeedRule: {
      isFlat: false,
      duty: 0.01,
      regFee: 4000,
      description: "1% stamp duty capped at ₹25,000 + ₹4,000 registration fee for family release.",
    },
  },
  GJ: {
    name: "Gujarat",
    code: "GJ",
    article: "Gujarat Stamp Act, 1958 (Article 28 / Schedule I)",
    summary:
      "Concessional stamp duty of 1% to 2% for residential/agricultural property gifted to direct blood relatives, plus 1% registration fee.",
    portalName: "Garvi Gujarat (Inspector General of Registration)",
    portalUrl: "https://garvi.gujarat.gov.in",
    calculate: (val, relation) => {
      const isBlood = ["spouse", "children", "parents", "grandchildren"].includes(relation);
      if (isBlood) {
        const stampDuty = val * 0.015;
        const regFee = val * 0.01;
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "Concessional 1.5% stamp duty for direct blood relatives + 1% registration fee.",
        };
      }
      const stampDuty = val * 0.049;
      const regFee = val * 0.01;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Standard 4.9% stamp duty + 1% registration fee for non-family transfers.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 1000,
      regFee: 500,
      description: "Concessional nominal stamp duty and registration for ancestral co-sharers.",
    },
  },
  HR: {
    name: "Haryana",
    code: "HR",
    article: "Haryana Government Blood Relation Property Transfer Notification",
    summary:
      "ZERO (0%) stamp duty on transfer of immovable property between direct blood relations. Only nominal computerization processing fee of ₹2,000 applies.",
    portalName: "Jamabandi Haryana (Revenue & Disaster Management)",
    portalUrl: "https://jamabandi.nic.in",
    calculate: (val, relation) => {
      const isBlood = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isBlood) {
        return {
          stampDuty: 0,
          regFee: 2000,
          isCapped: true,
          note: "0% stamp duty under Haryana blood relation exemption policy + ₹2,000 nominal facilitation fee.",
        };
      }
      const stampDuty = val * 0.06;
      const regFee = Math.min(val * 0.01, 50000);
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-blood transfers attract 6% conveyance duty + 1% registration fee.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 0,
      regFee: 1000,
      description: "0% stamp duty on family release deeds + ₹1,000 nominal service charge.",
    },
  },
  WB: {
    name: "West Bengal",
    code: "WB",
    article: "West Bengal Stamp Act & Article 33 Concession",
    summary:
      "Concessional 0.5% stamp duty for gifts among family members under Article 33, with 1% registration fee.",
    portalName: "WBI-Registration (Directorate of Registration)",
    portalUrl: "https://wbregistration.gov.in",
    calculate: (val, relation) => {
      const isFamily = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isFamily) {
        const stampDuty = val * 0.005;
        const regFee = val * 0.01;
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "0.5% concessional stamp duty for family members + 1% registration fee.",
        };
      }
      const stampDuty = val * 0.06;
      const regFee = val * 0.01;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Standard 6% conveyance duty (urban) + 1% registration fee for non-family.",
      };
    },
    releaseDeedRule: {
      isFlat: false,
      duty: 0.005,
      regFee: 0.01,
      description: "0.5% stamp duty + 1% registration fee for relinquishment among co-heirs.",
    },
  },
  TS: {
    name: "Telangana & Andhra Pradesh",
    code: "TS",
    article: "Indian Stamp Act (Telangana/AP Amendment, Article 29)",
    summary:
      "Concessional 1% stamp duty + 0.5% transfer duty + 0.5% registration fee (total 2%) for family gifts. Non-family transfers attract 7.5% total.",
    portalName: "Registration & Stamps Department (TS / AP)",
    portalUrl: "https://registration.telangana.gov.in",
    calculate: (val, relation) => {
      const isFamily = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isFamily) {
        const stampDuty = val * 0.015;
        const regFee = val * 0.005;
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "1.5% combined duty (stamp + local transfer) + 0.5% registration fee = 2% total.",
        };
      }
      const stampDuty = val * 0.065;
      const regFee = val * 0.01;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "6.5% duty + 1% registration fee (total 7.5%) for non-family transfers.",
      };
    },
    releaseDeedRule: {
      isFlat: false,
      duty: 0.01,
      regFee: 0.005,
      description: "1% stamp duty + 0.5% registration fee for release among family co-sharers.",
    },
  },
  RJ: {
    name: "Rajasthan",
    code: "RJ",
    article: "Rajasthan Stamp Act, 1998 (Schedule Item 31)",
    summary:
      "0% stamp duty in favor of wife. 1% to 2.5% concessional duty in favor of children and parents, plus 1% registration fee.",
    portalName: "E-Panjiyan Rajasthan (Registration & Stamps)",
    portalUrl: "https://epanjiyan.nic.in",
    calculate: (val, relation) => {
      if (relation === "spouse") {
        return {
          stampDuty: 0,
          regFee: Math.min(val * 0.01, 10000),
          isCapped: true,
          note: "0% stamp duty on gift to wife + 1% registration fee (capped at ₹10,000).",
        };
      }
      const isBlood = ["children", "parents", "grandchildren"].includes(relation);
      if (isBlood) {
        const stampDuty = val * 0.015;
        const regFee = val * 0.01;
        return {
          stampDuty,
          regFee,
          isCapped: false,
          note: "Concessional 1.5% stamp duty for children/parents + 1% registration fee.",
        };
      }
      const stampDuty = val * 0.06;
      const regFee = val * 0.01;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Standard 6% stamp duty + 1% registration fee for non-family.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 1000,
      regFee: 500,
      description: "Nominal ₹1,000 stamp duty + ₹500 registration for coparceners.",
    },
  },
  PB: {
    name: "Punjab",
    code: "PB",
    article: "Punjab Government Blood Relation Exemption Policy",
    summary:
      "ZERO (0%) stamp duty on transfer of property between direct blood relatives. Nominal social security / registration cess applies.",
    portalName: "NGDRS Punjab (Department of Revenue)",
    portalUrl: "https://revenue.punjab.gov.in",
    calculate: (val, relation) => {
      const isBlood = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isBlood) {
        return {
          stampDuty: 0,
          regFee: 2000,
          isCapped: true,
          note: "0% stamp duty under Punjab blood relation policy + ₹2,000 nominal cess.",
        };
      }
      const stampDuty = val * 0.06;
      const regFee = val * 0.01;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Non-blood transfers attract 6% conveyance duty + 1% registration fee.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 0,
      regFee: 1000,
      description: "0% stamp duty + ₹1,000 nominal service charge for family release deeds.",
    },
  },
  KL: {
    name: "Kerala",
    code: "KL",
    article: "Kerala Stamp Act, 1959 (Schedule Article 31)",
    summary:
      "Concessional stamp duty of 2% subject to a maximum ceiling of ₹25,000 for family members, plus ₹1,000 registration fee.",
    portalName: "PEARL Kerala (Registration Department)",
    portalUrl: "https://keralaregistration.gov.in",
    calculate: (val, relation) => {
      const isFamily = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isFamily) {
        const stampDuty = Math.min(val * 0.02, 25000);
        return {
          stampDuty,
          regFee: 1000,
          isCapped: true,
          note: "2% stamp duty capped at ₹25,000 + flat ₹1,000 registration fee under Article 31.",
        };
      }
      const stampDuty = val * 0.08;
      const regFee = val * 0.02;
      return {
        stampDuty,
        regFee,
        isCapped: false,
        note: "Standard 8% stamp duty + 2% registration fee (total 10%) for non-family.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 1000,
      regFee: 500,
      description: "Flat ₹1,000 stamp duty + ₹500 registration for family co-owners.",
    },
  },
  OTHER: {
    name: "Other States & Union Territories",
    code: "OTHER",
    article: "Indian Stamp Act, 1899 & Respective State Schedules",
    summary:
      "Concessional family rates range between 2% and 3% stamp duty + 1% registration fee in most Indian states.",
    portalName: "National Generic Document Registration System (NGDRS)",
    portalUrl: "https://ngdrs.gov.in",
    calculate: (val, relation) => {
      const isFamily = [
        "spouse",
        "children",
        "parents",
        "grandchildren",
        "siblings",
      ].includes(relation);
      if (isFamily) {
        return {
          stampDuty: val * 0.025,
          regFee: val * 0.01,
          isCapped: false,
          note: "Estimated 2.5% concessional family stamp duty + 1% registration fee.",
        };
      }
      return {
        stampDuty: val * 0.06,
        regFee: val * 0.01,
        isCapped: false,
        note: "Estimated standard 6% conveyance duty + 1% registration fee.",
      };
    },
    releaseDeedRule: {
      isFlat: true,
      duty: 5000,
      regFee: 1000,
      description: "Estimated ₹5,000 flat stamp duty for family release deeds.",
    },
  },
};

const TOC_ITEMS = [
  { id: "statutory-foundation", label: "1. Statutory Foundation: Gift vs Release vs Will" },
  { id: "interactive-calculator", label: "2. Interactive Stamp Duty Calculator" },
  { id: "state-stamp-schedules", label: "3. State Stamp Schedules & Blood Relative Concessions" },
  { id: "senior-citizens-act", label: "4. Senior Citizens Act Sec 23 & Revocation Rules" },
  { id: "income-tax-section-56", label: "5. Income Tax Treatment: Sec 56(2)(x) & Capital Gains" },
  { id: "structural-comparison", label: "6. Structural Comparison: Gift Deed vs Will vs Release" },
  { id: "property-transfer-sop", label: "7. Step-by-Step SOP: Choosing the Right Transfer Mode" },
  { id: "real-family-scenarios", label: "8. Real Family Scenarios: MH, UP, Delhi & Karnataka" },
  { id: "legal-clause-templates", label: "9. Legal Clause Templates: Senior Citizen Gift vs Will" },
  { id: "advocate-profile-ama", label: "10. Advocate Profile: AMA Legal Solutions Advisory" },
  { id: "frequently-asked-questions", label: "11. Frequently Asked Questions" },
  { id: "statutory-citations", label: "12. Statutory Citations & Official State Portals" },
];

const FAQS = [
  {
    q: "How much stamp duty is charged on a Will in India?",
    a: "A Will attracts exactly zero (₹0) stamp duty in every Indian state and union territory. A Will is a testamentary instrument under the Indian Succession Act, 1925, and is completely exempt from stamp duty under the Indian Stamp Act, 1899. Writing a Will on plain white paper is 100% legally valid.",
  },
  {
    q: "Why is a Gift Deed more expensive than a Will?",
    a: "A Gift Deed transfers property ownership immediately during the donor's lifetime (inter vivos). Under Section 17 of the Registration Act, 1908, it requires mandatory registration and ad valorem or concessional state stamp duty ranging from ₹200 to 7% of property value, plus 1% registration fees. A Will costs ₹0 stamp duty and registration is entirely optional.",
  },
  {
    q: "What is the stamp duty on a gift deed to blood relatives in Maharashtra?",
    a: "Under Article 34 proviso of the Maharashtra Stamp Act, 1958, a gift deed of residential or agricultural property made to a spouse, son, daughter, grandchild, or wife of a deceased son attracts a fixed stamp duty of only ₹200. A registration fee of 1% applies, capped at a maximum of ₹30,000.",
  },
  {
    q: "What is the flat ₹5,000 gift deed stamp duty rule in Uttar Pradesh?",
    a: "The Government of Uttar Pradesh notified a concessional flat stamp duty of ₹5,000 under Article 33 for gift deeds executed between defined blood relatives (parents, spouse, children, siblings, grandchildren, and daughter-in-law). The registration fee is 1%, subject to a maximum cap of ₹10,000.",
  },
  {
    q: "Can a parent cancel a registered Gift Deed if their child neglects them?",
    a: "Under general property law, a registered gift deed is irrevocable. However, under Section 23 of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007, a senior citizen can petition the Maintenance Tribunal to cancel the gift deed if the deed contains an express clause stating the gift was conditional upon providing basic physical needs, as affirmed in Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20).",
  },
  {
    q: "Can I use a Release Deed instead of a Gift Deed to avoid stamp duty?",
    a: "No. A Release Deed (or Relinquishment Deed) can only be executed between existing co-owners or coparceners who already hold a pre-existing legal share in ancestral or jointly owned property. A sole living owner cannot execute a Release Deed for self-acquired property; attempting to do so is legally void.",
  },
  {
    q: "Is income tax applicable on gifts received from blood relatives?",
    a: "Under Section 56(2)(x) of the Income Tax Act, 1961, any immovable property or sum of money received as a gift from a defined relative (spouse, parents, siblings, children, grandchildren) is 100% exempt from income tax in the hands of the receiver. However, gifts from non-relatives exceeding ₹50,000 are taxed as income.",
  },
  {
    q: "What happens to ownership when I make a Gift Deed vs a Will?",
    a: "With a Gift Deed, ownership transfers immediately upon registration. You lose all ownership rights, cannot sell or mortgage the property, and cannot revoke the gift easily. With a Will, you retain 100% absolute ownership and control during your entire lifetime; property only passes to beneficiaries after your demise.",
  },
  {
    q: "What is the stamp duty cap on family gift deeds in Tamil Nadu?",
    a: "Under Article 33 of the Tamil Nadu Stamp Act, a gift deed made in favor of family members (spouse, children, parents, grandchildren, siblings) attracts 1% stamp duty subject to a maximum ceiling of ₹25,000, and a 1% registration fee capped at ₹4,000. Non-family gifts attract 7% stamp duty and 4% registration fees.",
  },
  {
    q: "Does a Will need to be registered in India to be legally valid?",
    a: "No. Under Section 18(e) of the Registration Act, 1908, registration of a Will is completely optional in India. An unregistered Will written on plain paper and signed by the testator in the presence of two attesting witnesses under Section 63 of the Indian Succession Act is 100% legally valid.",
  },
  {
    q: "Can an NRI execute a gift deed or Will for property in India without traveling?",
    a: "Yes. An NRI can execute a Will remotely from anywhere in the world before two local witnesses and have it attested. For a Gift Deed, the NRI donor can either execute a Specific Power of Attorney (POA) attested by the Indian Consulate or Embassy to appoint an Indian representative, or execute the gift deed before the Indian Consulate.",
  },
  {
    q: "Which is better for avoiding family disputes: Gift Deed or Will?",
    a: "A Will is far safer for parents because it preserves their shelter, dignity, and income for life while allowing unequal distribution without immediate family hostility. A Gift Deed executed prematurely often triggers abandonment of the elderly parent or immediate friction among children who did not receive property.",
  },
];

const formatINR = (val: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));
};

export default function GiftDeedCalculatorClient() {
  const router = useRouter();
  const { data: session } = useSession();

  // Calculator State
  const [selectedState, setSelectedState] = useState<string>("MH");
  const [relationship, setRelationship] = useState<string>("children");
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [propertyValue, setPropertyValue] = useState<number>(10000000); // 1 Crore default
  const [coOwnership, setCoOwnership] = useState<string>("sole_owner");

  // UI Interactive State
  const [activeId, setActiveId] = useState<string>("statutory-foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedClauseIndex, setCopiedClauseIndex] = useState<number | null>(null);

  // Table of Contents scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartDraft = () => {
    if (session) {
      router.push("/start");
    } else {
      window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_EVENT));
    }
  };

  const handleResetCalculator = () => {
    setSelectedState("MH");
    setRelationship("children");
    setPropertyType("residential");
    setPropertyValue(10000000);
    setCoOwnership("sole_owner");
  };

  const handlePrint = () => {
    window.print();
  };

  // Execute State Calculation
  const currentStateRule = STATE_RULES[selectedState] || STATE_RULES.OTHER;
  const giftResult = currentStateRule.calculate(propertyValue, relationship, propertyType);
  const totalGiftCost = giftResult.stampDuty + giftResult.regFee;

  // Will Outflow: Always 0 stamp duty, 0 mandatory reg fee
  const totalWillCost = 0;

  // Release Deed Outflow
  const isReleaseApplicable = coOwnership === "joint_co_owner";
  let releaseDuty = 0;
  let releaseReg = 0;
  if (isReleaseApplicable) {
    if (currentStateRule.releaseDeedRule.isFlat) {
      releaseDuty = currentStateRule.releaseDeedRule.duty;
      releaseReg = currentStateRule.releaseDeedRule.regFee;
    } else {
      releaseDuty = Math.min(
        propertyValue * currentStateRule.releaseDeedRule.duty,
        25000
      );
      releaseReg = currentStateRule.releaseDeedRule.regFee;
    }
  }
  const totalReleaseCost = releaseDuty + releaseReg;

  // Difference: Savings by choosing a Will
  const savingsAmount = totalGiftCost - totalWillCost;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedClauseIndex(index);
    setTimeout(() => setCopiedClauseIndex(null), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Exact Template Alignment)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#3B5173]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN STAMP ACT, 1899 • TRANSFER OF PROPERTY ACT S. 122 • ISA S. 63</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Gift Deed vs Will Stamp Duty Calculator for Blood Relatives
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Calculate exact state stamp duty and registration fees for property gift deeds across
            Maharashtra, Uttar Pradesh, Delhi, Karnataka, and Tamil Nadu. Compare blood-relative
            concessions against a <strong>₹0 Stamp Duty Will</strong> and avoid lifetime title loss.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#interactive-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Stamp Duty Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft Challenge-Proof Will (Save ₹Lakhs)</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/60 via-[#FAF7F0] to-slate-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">₹0 Stamp Duty</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ON WILLS IN ALL 28 STATES
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">₹200 / ₹5,000</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                MH &amp; UP BLOOD RELATIVE CAPS
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C65378]">Section 23</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                SENIOR CITIZENS ACT SHIELD
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">100% Control</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                LIFETIME LIVING RIGHTS IN WILL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Tool)
          ========================================================================= */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] xl:grid-cols-[270px_minmax(0,1fr)_320px] 2xl:grid-cols-[290px_minmax(0,1fr)_340px] gap-6 xl:gap-8 items-start">
          {/* =====================================================================
              LEFT COLUMN: STICKY TABLE OF CONTENTS
              ===================================================================== */}
          <aside className="sticky top-24 hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 text-xs font-black tracking-wider uppercase text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>TABLE OF CONTENTS</span>
              </div>
              <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? "bg-rose-50 text-[#C65378] font-bold border-l-2 border-[#C65378]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Statutory Compliance Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Transfer of Property Act 1882 (ss. 122–129), Registration Act 1908
                (ss. 17 &amp; 18), Indian Succession Act 1925 (ss. 2(h), 59 &amp; 63), and
                Maintenance and Welfare of Parents and Senior Citizens Act 2007 (s. 23).
              </p>
            </div>

            {/* Quick Conversion Card */}
            <div className="rounded-2xl p-4 bg-[#172228] text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[#C65378] text-xs font-black tracking-wider uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Zero Stamp Duty</span>
              </div>
              <div className="text-sm font-bold">Save Lakhs in Transfer Fees</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                A Will costs ₹0 in stamp duty and lets you keep 100% ownership until your last
                breath.
              </p>
              <button
                onClick={handleStartDraft}
                className="w-full py-2.5 px-3 rounded-xl bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs tracking-wide transition-all shadow-xs"
              >
                Draft Your Will in 15 Mins
              </button>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & INTERACTIVE TOOL
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: GIFT DEED VS WILL STAMP DUTY</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Stamp Duty on Wills:</strong> Under the Indian Stamp Act, 1899,
                    drafting and executing a Will attracts exactly ₹0 stamp duty in all 28 states.
                    Registration is also completely optional under Section 18 of the Registration Act.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Immediate Loss of Ownership with Gift Deeds:</strong> Under Section 122 of
                    the Transfer of Property Act, 1882, a registered gift deed transfers title
                    immediately. The donor permanently loses all ownership rights and cannot revoke the
                    gift unilaterally.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Blood-Relative Concessions:</strong> While standard gift deeds attract 5% to
                    7% stamp duty, states like Maharashtra (₹200 flat under Art. 34), Uttar Pradesh
                    (₹5,000 flat under Art. 33), and Tamil Nadu (₹25,000 cap) offer huge family
                    concessions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                  <span>
                    <strong>Supreme Court Senior Citizen Protection:</strong> In{" "}
                    <em>Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</em>, the Supreme Court ruled
                    that a senior citizen can revoke a gift deed under Section 23 of the MWPSC Act only
                    if an express maintenance condition was inserted into the registered deed.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY FOUNDATION */}
            <section id="statutory-foundation" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Foundation: Gift Deed vs Release Deed vs Will
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  When Indian parents contemplate passing family real estate to their children, they
                  frequently confuse three distinct legal instruments: a <strong>Gift Deed</strong>, a{" "}
                  <strong>Release Deed</strong> (also known as a Relinquishment Deed), and a{" "}
                  <strong>Will (Vasiyat)</strong>. While property portals frequently show generic
                  stamp duty percentages, choosing the wrong instrument can cost your family lakhs in
                  needless government duties and strip senior citizens of their constitutional right
                  to shelter.
                </p>
                <p>
                  A <strong>Gift Deed</strong> is an inter-vivos transfer governed under Section 122 of
                  the Transfer of Property Act, 1882. It takes effect immediately during the donor&apos;s
                  lifetime, requires mandatory registration under Section 17 of the Registration Act,
                  1908, and attracts state stamp duty ranging from ₹200 up to 7% of circle value.
                </p>
                <p>
                  Conversely, a <strong>Will</strong> is a testamentary declaration governed under
                  Section 2(h) and Section 63 of the Indian Succession Act, 1925. It takes effect
                  strictly after the testator&apos;s demise. Under the Indian Stamp Act, 1899, a Will is
                  subject to <strong>₹0 Stamp Duty</strong> across all Indian states and Union
                  Territories, and registration is entirely optional under Section 18(e).
                </p>
              </div>

              {/* 3 Instruments Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
                  <div className="text-xs font-black text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-[#C65378]" />
                    <span>Gift Deed (Inter Vivos)</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <p>
                      <strong>Governed by:</strong> Section 122, Transfer of Property Act, 1882.
                    </p>
                    <p>
                      <strong>Timing:</strong> Transfers title immediately while the donor is alive.
                    </p>
                    <p>
                      <strong>Stamp Duty:</strong> 1% to 7% state stamp duty + 1% registration.
                    </p>
                    <p className="text-rose-700 font-semibold">
                      <strong>Irrevocable:</strong> Donor immediately loses all ownership rights.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-300 bg-slate-50 space-y-2">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Will (Testamentary)</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <p>
                      <strong>Governed by:</strong> Indian Succession Act, 1925 (ss. 2(h) &amp; 63).
                    </p>
                    <p>
                      <strong>Timing:</strong> Operates only after the demise of the testator.
                    </p>
                    <p className="text-[#C65378] font-black">
                      <strong>Stamp Duty:</strong> ₹0 (ZERO across all 28 Indian States).
                    </p>
                    <p className="text-slate-900 font-bold">
                      <strong>100% Control:</strong> Testator retains full ownership &amp; can revoke.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
                  <div className="text-xs font-black text-blue-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Release Deed (Relinquishment)</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <p>
                      <strong>Governed by:</strong> Registration Act, 1908 (Section 17(1)(b)).
                    </p>
                    <p>
                      <strong>Timing:</strong> Immediate release of pre-existing co-ownership share.
                    </p>
                    <p>
                      <strong>Stamp Duty:</strong> Concessional flat duty (₹200 to ₹5,000).
                    </p>
                    <p className="text-amber-800 font-semibold">
                      <strong>Sole Owner Trap:</strong> CANNOT be used for 100% self-acquired property.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: INTERACTIVE CALCULATOR */}
            <section id="interactive-calculator" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE STAMP DUTY CALCULATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Interactive Stamp Duty &amp; Registration Fee Calculator
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Select your property state, family relationship, and property valuation to
                instantly calculate exact stamp duty, registration fees, and compare your financial
                outflow against a ₹0 Stamp Duty Will.
              </p>

              {/* Calculator Panel Container */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 md:p-8 space-y-8">
                {/* Top Controls: State, Relationship, Property Type, Ownership */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
                  {/* 1. State Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>1. State / Jurisdiction</span>
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    >
                      {Object.keys(STATE_RULES).map((key) => (
                        <option key={key} value={key}>
                          {STATE_RULES[key].name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      {currentStateRule.article}
                    </p>
                  </div>

                  {/* 2. Relationship Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>2. Beneficiary Relationship</span>
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#C65378] bg-slate-50"
                    >
                      <option value="children">Son / Daughter / Children</option>
                      <option value="spouse">Spouse (Husband / Wife)</option>
                      <option value="parents">Father / Mother / Parents</option>
                      <option value="grandchildren">Grandson / Granddaughter</option>
                      <option value="siblings">Brother / Sister (Siblings)</option>
                      <option value="in_laws">Daughter-in-law / Son-in-law</option>
                      <option value="non_relative">Non-Relative / Third Party</option>
                    </select>
                    <p className="text-[10px] text-slate-500">
                      Blood relative exemptions depend strictly on degree.
                    </p>
                  </div>

                  {/* 3. Property Classification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>3. Property Category</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPropertyType("residential")}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                          propertyType === "residential"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Residential
                      </button>
                      <button
                        type="button"
                        onClick={() => setPropertyType("commercial")}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                          propertyType === "commercial"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Plot / Commercial
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ownership Source & Property Valuation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Ownership Source */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#C65378]" />
                      <span>4. Title Source (Release vs Gift)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCoOwnership("sole_owner")}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-left ${
                          coOwnership === "sole_owner"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Sole Self-Acquired
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoOwnership("joint_co_owner")}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-left ${
                          coOwnership === "joint_co_owner"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Joint / Ancestral
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Release deeds only apply to joint coparceners.
                    </p>
                  </div>

                  {/* Property Valuation Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>5. Circle Rate / Market Value</span>
                      <span className="text-[#C65378] font-bold">{formatINR(propertyValue)}</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={100000000}
                      step={500000}
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#C65378]"
                    />
                    {/* Preset Buttons */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[2500000, 5000000, 10000000, 20000000, 50000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setPropertyValue(preset)}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                            propertyValue === preset
                              ? "bg-[#C65378] text-white"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          {preset >= 10000000
                            ? `₹${preset / 10000000} Cr`
                            : `₹${preset / 100000} L`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset & Quick Print Action Strip */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleResetCalculator}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Default Values</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Calculation Report</span>
                  </button>
                </div>

                {/* =========================================================================
                    REAL-TIME STATUTORY COMPARISON RESULTS MATRIX (NO GREEN THEME)
                    ========================================================================= */}
                <div className="space-y-6 pt-4">
                  {/* WINNER RECOMMENDATION CALLOUT CARD - BRAND NAVY & ROSE */}
                  <div className="rounded-3xl border-2 p-6 transition-all shadow-md bg-[#172228] border-slate-700 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/15">
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 border border-white/20 text-rose-200 shadow-2xs">
                          <Award className="w-3.5 h-3.5 text-[#C65378]" />
                          <span>RECOMMENDED STATUTORY INSTRUMENT</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                          Optimal Choice: Last Will &amp; Testament (Vasiyat)
                        </h3>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="text-xs uppercase font-bold text-slate-300">Statutory Savings</div>
                        <div className="text-xl sm:text-2xl font-black text-rose-300">
                          Saves {formatINR(savingsAmount)} in Upfront Fees!
                        </div>
                      </div>
                    </div>

                    <p className="pt-3 text-xs sm:text-sm leading-relaxed text-slate-200">
                      Under the Indian Stamp Act, 1899, a Will is <strong>100% exempt from stamp duty</strong> in
                      all 28 states, saving your family {formatINR(savingsAmount)} in government outflow compared
                      to an immediate Gift Deed. Most importantly, you retain 100% absolute ownership, living
                      rights, and control over your home for life, with complete freedom to revoke or alter your
                      Will anytime under Section 62 of the Indian Succession Act.
                    </p>
                  </div>

                  {/* SIDE-BY-SIDE TWO INSTRUMENTS BREAKDOWN TABLE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option A: Gift Deed (Lifetime Transfer) */}
                    <div className="rounded-2xl border p-5 space-y-4 bg-white/80 border-slate-200">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                            OPTION A (INTER VIVOS)
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            Gift Deed Transfer
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-100 text-rose-800">
                          IMMEDIATE TITLE LOSS
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">State Stamp Duty</span>
                          <span className="font-semibold text-rose-900">
                            {formatINR(giftResult.stampDuty)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Registration Fee</span>
                          <span className="font-semibold text-rose-900">
                            {formatINR(giftResult.regFee)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Operational Timing</span>
                          <span className="font-bold text-slate-900">Immediate upon registration</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Donor Living Rights</span>
                          <span className="font-bold text-rose-700">Surrendered permanently</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Revocability</span>
                          <span className="font-bold text-rose-700">Irrevocable without court dispute</span>
                        </div>
                        <div className="flex justify-between pt-2 text-sm font-black text-rose-800">
                          <span>Total Government Outflow</span>
                          <span>{formatINR(totalGiftCost)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Option B: Will (Post-Demise Testamentary - Brand Navy / Rose Theme) */}
                    <div className="rounded-2xl border-2 border-[#172228] ring-2 ring-slate-200 shadow-sm p-5 space-y-4 bg-white">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                            OPTION B (TESTAMENTARY)
                          </div>
                          <div className="font-extrabold text-base text-slate-900">
                            Will / Vasiyat
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#172228] text-white">
                          RECOMMENDED
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">State Stamp Duty</span>
                          <span className="font-black text-[#C65378] text-sm">₹0 (ZERO)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600">Mandatory Registration Fee</span>
                          <span className="font-black text-[#C65378] text-sm">₹0 (Optional)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Operational Timing</span>
                          <span className="font-bold text-slate-900">Only post-demise of testator</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Donor Living Rights</span>
                          <span className="font-bold text-slate-900">100% full ownership retained</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50">
                          <span className="text-slate-600 font-bold">Revocability</span>
                          <span className="font-bold text-slate-900">100% revocable anytime for free</span>
                        </div>
                        <div className="flex justify-between pt-2 text-sm font-black text-[#172228]">
                          <span>Total Government Outflow</span>
                          <span className="text-base text-[#C65378] font-black">₹0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Option C: Release Deed Summary Card */}
                  <div className="bg-blue-50/60 rounded-2xl border border-blue-200 p-5 space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-blue-950 text-sm">
                      <Layers className="w-4 h-4 text-blue-700" />
                      <span>Option C: Release Deed Status (Relinquishment of Co-Ownership)</span>
                    </div>
                    {isReleaseApplicable ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-blue-100">
                          <div className="text-slate-500 font-semibold">Stamp Duty</div>
                          <div className="font-black text-slate-900 text-sm mt-0.5">
                            {formatINR(releaseDuty)}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-blue-100">
                          <div className="text-slate-500 font-semibold">Registration Fee</div>
                          <div className="font-black text-slate-900 text-sm mt-0.5">
                            {formatINR(releaseReg)}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-blue-100">
                          <div className="text-slate-500 font-semibold">Total Outflow</div>
                          <div className="font-black text-blue-800 text-sm mt-0.5">
                            {formatINR(totalReleaseCost)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 pt-1">
                        <strong>Not Applicable for Sole Owner:</strong> A Release Deed can only be
                        executed between existing co-owners or coparceners who already hold a pre-existing
                        share in ancestral property. A sole owner cannot release self-acquired property.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: STATE STAMP SCHEDULES */}
            <section id="state-stamp-schedules" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATE STAMP SCHEDULES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. State Stamp Duty Schedules: Blood Relative Concessions
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under the Indian Constitution (Seventh Schedule, Entry 63 of the State List), stamp
                  duties on instruments other than bills of exchange are enacted by individual state
                  legislatures. Consequently, stamp duty on family gift deeds varies dramatically
                  across India. Below is the verified statutory breakdown for high-volume states.
                </p>
              </div>

              {/* State Details Cards */}
              <div className="space-y-4 pt-2">
                {/* Maharashtra */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#172228]">
                      Maharashtra: Article 34 Proviso (Maharashtra Stamp Act, 1958)
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-100 text-slate-800 border border-slate-200">
                      ₹200 Flat Stamp Duty
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If residential or agricultural property is gifted to a spouse, son, daughter,
                    grandson, granddaughter, or the wife of a deceased son, the stamp duty is a flat
                    ₹200. Registration fee is 1% of market value, capped at a maximum of ₹30,000.
                    However, commercial properties gifted to blood relatives attract 2% stamp duty
                    plus 1% metro cess/LBT (total 3%). Gifts to brothers, sisters, or parents do not
                    qualify for the ₹200 concession and attract 3% duty.
                  </p>
                </div>

                {/* Uttar Pradesh */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#172228]">
                      Uttar Pradesh: Article 33 Concession Notification (2022/2023)
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-100 text-slate-800 border border-slate-200">
                      ₹5,000 Flat Duty
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under the landmark notification issued by the UP Government, gift deeds executed
                    between blood relatives (parents, spouse, children, siblings, grandchildren,
                    and daughter-in-law) for residential or agricultural property attract a flat
                    stamp duty of ₹5,000. Registration fee is 1%, subject to a maximum ceiling of
                    ₹10,000. For a ₹1 Crore property in Noida or Lucknow, total government outflow is
                    just ₹15,000, compared to ₹8 Lakhs for a non-relative!
                  </p>
                </div>

                {/* Delhi */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#172228]">
                      Delhi (NCT): Indian Stamp Act (Delhi Schedule)
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-black bg-amber-100 text-amber-800">
                      3% to 4% Combined Duty
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Delhi does NOT offer flat-fee concessions for blood relatives. The stamp duty on
                    a gift deed in Delhi is 2% of circle rate if the donee is female and 3% if the
                    donee is male. Additionally, 1% municipal transfer duty is charged by MCD, plus
                    1% registration fee (plus ₹100 pasting charges). Gifting a ₹3 Crore house in
                    South Delhi to a son costs over ₹12 Lakhs in government fees, whereas a Will
                    costs ₹0.
                  </p>
                </div>

                {/* Tamil Nadu */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#172228]">
                      Tamil Nadu: Article 33 (Tamil Nadu Stamp Act, 1899)
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-100 text-slate-800 border border-slate-200">
                      ₹25,000 Stamp Duty Cap
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    For family members (spouse, children, parents, grandchildren, and siblings),
                    Tamil Nadu charges 1% stamp duty subject to a strict maximum ceiling of ₹25,000,
                    plus a 1% registration fee capped at ₹4,000. Total government charges for a ₹1
                    Crore or ₹5 Crore home in Chennai are capped at just ₹29,000! For non-family,
                    the duty is an exorbitant 7% stamp duty + 4% registration (total 11%).
                  </p>
                </div>

                {/* Karnataka */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#172228]">
                      Karnataka: Article 28 (Karnataka Stamp Act, 1957)
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-100 text-slate-800 border border-slate-200">
                      Flat ₹1,000 to ₹5,000 Duty
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Article 28, gifts among immediate family members (spouse, children,
                    parents, grandchildren) within BBMP or city corporations attract a flat stamp
                    duty of ₹5,000 (and ₹1,000 in village/gram panchayat areas), plus a 1%
                    registration fee capped at ₹1,000. Non-family gifts attract 5.5% stamp duty (with
                    cess) + 2% registration fee.
                  </p>
                </div>

                {/* Haryana & Punjab */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-[#172228]">
                      Haryana &amp; Punjab: Blood Relation Exemption Policies
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-black bg-slate-100 text-slate-800 border border-slate-200">
                      0% Stamp Duty Exemption
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Both the Haryana and Punjab state governments have completely exempted stamp duty
                    on the transfer of immovable property between direct blood relatives (parents to
                    children, grandparents to grandchildren, and between spouses). Only nominal
                    computerization processing charges (₹1,000 to ₹2,000) apply.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: SENIOR CITIZENS ACT & REVOCATION */}
            <section id="senior-citizens-act" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>JUDICIAL PRECEDENTS &amp; ELDER SECURITY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Landmark Precedents: Senior Citizens Act &amp; Revocation
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The most severe risk of executing a Gift Deed is legal finality. Under Section 126
                  of the Transfer of Property Act, 1882, a registered gift deed cannot be revoked
                  unilaterally by the donor unless an express revocation condition was agreed upon in
                  writing before execution. Once the deed is registered, the child becomes the sole
                  absolute owner and the parent legally becomes a licensee in their own home.
                </p>
              </div>

              {/* Landmark Ruling Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/80 to-amber-50/80 border border-rose-200/90 space-y-3">
                <div className="flex items-center gap-2 font-black text-xs text-[#C65378] uppercase tracking-wide">
                  <Award className="w-4 h-4" />
                  <span>Supreme Court Precedent: Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</span>
                </div>
                <h3 className="text-base font-extrabold text-[#172228]">
                  Enforceability of Maintenance Conditions Under Section 23 of MWPSC Act
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  In January 2025, the Supreme Court of India delivered a landmark judgment in{" "}
                  <strong>Urmila Dixit v. Sunil Sharan Dixit (2025 INSC 20)</strong>. The Apex Court
                  reiterated that under Section 23 of the Maintenance and Welfare of Parents and
                  Senior Citizens Act, 2007, where a senior citizen transfers property by gift
                  subject to the condition that the transferee shall provide basic amenities and
                  physical needs, and the child fails or refuses to do so, the transfer of property
                  shall be deemed to have been made by fraud, coercion, or undue influence and may be
                  declared void by the Maintenance Tribunal.
                </p>
                <div className="p-3 bg-white/90 rounded-xl border border-rose-200 text-xs text-rose-900 font-semibold space-y-1">
                  <div>THE CRUCIAL CAVEAT: EXPRESS CLAUSE MANDATORY</div>
                  <p className="text-slate-600 font-normal">
                    Earlier Supreme Court rulings, including <em>Sudesh Chhikara v. Ram Tiwary (2022)</em>,
                    established that if the Gift Deed does NOT contain an express maintenance
                    condition clause in writing, the Tribunal cannot declare the gift deed void. If
                    you gift without this exact recital, your property is lost forever.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 5: INCOME TAX SECTION 56(2)(x) & CAPITAL GAINS */}
            <section id="income-tax-section-56" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Percent className="w-4 h-4" />
                <span>INCOME TAX &amp; CAPITAL GAINS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Income Tax Treatment: Section 56(2)(x) &amp; Capital Gains
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Both Gift Deeds and Wills enjoy favorable income tax exemptions at the moment of
                  transfer, but their downstream capital gains tax rules when the property is
                  subsequently sold differ significantly under Finance (No. 2) Act, 2024.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-extrabold text-[#172228] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Section 56(2)(x) Exemption for Relatives</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 56(2)(x) of the Income Tax Act, 1961, receiving property without
                    consideration from defined relatives (spouse, siblings, lineal ascendants, and
                    lineal descendants) is 100% exempt from income tax in the hands of the
                    recipient. However, if gifted to a non-relative, the ready reckoner value is
                    added to the recipient&apos;s income and taxed at slab rates (up to 39%).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-extrabold text-[#172228] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C65378]" />
                    <span>Section 47(iii) Will Transfer Exemption</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 47(iii), any transfer of a capital asset under a Will or an
                    irrevocable trust is not regarded as a transfer for capital gains tax. The
                    beneficiary pays zero tax when inheriting under a Will.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="font-extrabold text-[#172228] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Subsequent Sale: Section 49(1) Cost to Previous Owner</span>
                </div>
                <p>
                  When your child eventually sells the gifted or inherited property, their capital
                  gains tax is computed using <strong>Section 49(1)</strong>. The cost of
                  acquisition is deemed to be the cost paid by the parent. Under the landmark Bombay
                  High Court ruling in <em>CIT v. Manjula J. Shah</em>, the holding period includes
                  the period during which the parent held the property. Under Budget 2024 rules,
                  for properties acquired by parents before July 23, 2024, the seller can compare
                  12.5% flat tax vs 20% with indexation.
                </p>
              </div>
            </section>

            {/* SECTION 6: STRUCTURAL COMPARISON TABLE */}
            <section id="structural-comparison" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Layers className="w-4 h-4" />
                <span>COMPREHENSIVE COMPARISON TABLE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Structural Comparison Table: Gift Deed vs Will vs Release
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Compare all three instruments side-by-side across statutory parameters, costs,
                revocability, and operational timing.
              </p>

              {/* Responsive Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#172228] text-white">
                      <th className="p-3 sm:p-4 font-bold border-r border-slate-700">Parameter</th>
                      <th className="p-3 sm:p-4 font-bold border-r border-slate-700 text-rose-300">
                        Gift Deed (TP Act s.122)
                      </th>
                      <th className="p-3 sm:p-4 font-bold border-r border-slate-700 text-rose-200">
                        Will / Vasiyat (ISA s.63)
                      </th>
                      <th className="p-3 sm:p-4 font-bold text-blue-300">
                        Release Deed (Reg Act s.17)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Effective Timing
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 font-semibold text-rose-800">
                        Immediate upon registration
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 font-bold text-slate-900">
                        Only after demise of testator
                      </td>
                      <td className="p-3 sm:p-4">Immediate upon execution</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Stamp Duty Outflow
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 text-rose-800">
                        1% to 7% (₹200 to ₹10L+)
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 font-black text-[#C65378] text-sm">
                        ₹0 (ZERO across India)
                      </td>
                      <td className="p-3 sm:p-4">Flat ₹200 to ₹5,000 for family</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Registration Mandatory?
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200">
                        Yes, strictly mandatory (Sec 17)
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 font-bold text-slate-900">
                        No, optional (Sec 18(e))
                      </td>
                      <td className="p-3 sm:p-4">Yes, strictly mandatory</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Donor Living Rights
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 text-rose-700">
                        Surrendered permanently
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 font-bold text-slate-900">
                        100% full ownership retained
                      </td>
                      <td className="p-3 sm:p-4">Relinquishes co-owner share</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Revocability
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 text-rose-700">
                        Irrevocable (except MWPSC s.23)
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200 font-bold text-slate-900">
                        100% revocable anytime for free
                      </td>
                      <td className="p-3 sm:p-4">Irrevocable once registered</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Applicable Property
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200">
                        Self-acquired or sole share
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200">
                        Self-acquired or coparcenary share
                      </td>
                      <td className="p-3 sm:p-4 text-amber-800 font-semibold">
                        Ancestral / Joint co-owned ONLY
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 sm:p-4 font-bold bg-slate-50 border-r border-slate-200">
                        Witness Attestation
                      </td>
                      <td className="p-3 sm:p-4 border-r border-slate-200">2 witnesses mandatory</td>
                      <td className="p-3 sm:p-4 border-r border-slate-200">
                        2 witnesses mandatory (Sec 63)
                      </td>
                      <td className="p-3 sm:p-4">2 witnesses mandatory</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Infographic Visual Embed */}
              <div className="pt-3">
                <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs bg-white p-4 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                      <Scale className="w-4 h-4 text-[#C65378]" />
                      <span>STATUTORY VISUAL BLUEPRINT: GIFT DEED VS WILL STAMP DUTY</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">Indian Stamp Act 1899</span>
                  </div>
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-50">
                    <Image
                      src="/images/gift-deed-vs-will-stamp-duty-calculator.jpg"
                      alt="Gift Deed vs Will Stamp Duty Calculator and Legal Ownership Comparison"
                      width={1200} height={675}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: STEP-BY-STEP SOP */}
            <section id="property-transfer-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>VERIFIED PRACTICE PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Step-by-Step SOP: Choosing the Right Property Transfer Mode
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Follow this verified 5-step protocol prepared by AMA Legal Solutions senior estate
                advocates before signing any deed or executing a property transfer.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-[#172228]">
                      Verify Property Title Classification
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Check your title deed. If the property is 100% self-acquired, a Release Deed
                      is legally prohibited. You can only choose between a Gift Deed and a Will. If
                      the property is ancestral or jointly inherited with siblings, a Release Deed
                      can be used to surrender shares.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-[#172228]">
                      Evaluate Immediate Transfer Need vs Elder Security
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Ask yourself: Does your child urgently require immediate legal title to obtain
                      a bank construction loan, or can the title pass peacefully upon demise? If
                      there is no urgent commercial necessity, executing a Gift Deed surrenders your
                      roof needlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-[#172228]">
                      Calculate State Stamp Duty &amp; Registration Outflow
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Use our interactive calculator above. Check if your state provides a flat
                      concession (e.g. Maharashtra ₹200, UP ₹5,000, TN ₹25,000 cap) or charges
                      percentage duty (e.g. Delhi 4%). Compare this outflow against a ₹0 Stamp Duty
                      Will.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-[#172228]">
                      Incorporate Mandatory Statutory Safeguards
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      If you must execute a Gift Deed as a senior citizen, you MUST insert an
                      express Section 23 MWPSC maintenance recital. If you draft a Will, ensure
                      strict Section 63 attestation by two independent witnesses who are not
                      beneficiaries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-[#172228] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="font-extrabold text-[#172228]">
                      Execute and Preserve the Instrument
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      For a Gift Deed, visit the Sub-Registrar Office (SRO) for biometric
                      registration. For a Will, store the signed original securely, register it if
                      desired under Section 18, and inform your appointed executor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: REAL FAMILY SCENARIOS */}
            <section id="real-family-scenarios" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Users className="w-4 h-4" />
                <span>REAL FAMILY CASE STUDIES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Real Family Scenarios: Maharashtra, UP, Delhi &amp; Karnataka
              </h2>

              <div className="space-y-4 pt-1">
                {/* Case 1: Pune */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    Case Study 1: Retired Father in Pune, Maharashtra
                  </div>
                  <h3 className="text-sm font-extrabold text-[#172228]">
                    ₹1.5 Crore 3BHK Flat Gifted to Married Daughter vs Will
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mr. Deshmukh (68) wanted to transfer his Pune flat to his married daughter. A
                    local agent advised a Gift Deed, estimating ₹30,200 total cost (₹200 stamp duty +
                    ₹30,000 registration cap). However, after signing, marital friction arose
                    between the daughter and son-in-law, who demanded the flat be mortgaged for his
                    business. Mr. Deshmukh was forced to file a police complaint. Had Mr. Deshmukh
                    drafted a Will, he would have paid ₹0, kept complete ownership, and bequeathed
                    the flat exclusively to his daughter upon his demise without any risk from the
                    son-in-law.
                  </p>
                </div>

                {/* Case 2: Noida */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    Case Study 2: Senior Citizen Mother in Noida, Uttar Pradesh
                  </div>
                  <h3 className="text-sm font-extrabold text-[#172228]">
                    Availing UP ₹5,000 Concession with Mandatory Section 23 Clause
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mrs. Sharma (72) decided to gift her Noida villa (market value ₹2 Crore) to her
                    younger son under UP&apos;s ₹5,000 blood-relative scheme. On AMA Legal
                    Solutions&apos; advice, she insisted on including the statutory maintenance
                    recital under Section 23 of the Senior Citizens Act. Total fees paid: ₹15,000
                    (₹5,000 stamp + ₹10,000 reg). Two years later, when the son attempted to sell
                    the house without her consent, the Maintenance Tribunal promptly declared the
                    gift void because of the explicit condition clause.
                  </p>
                </div>

                {/* Case 3: South Delhi */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                    Case Study 3: Business Family in South Delhi
                  </div>
                  <h3 className="text-sm font-extrabold text-[#172228]">
                    Saving ₹20 Lakhs in Delhi Stamp Duty by Opting for a Will
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A family in Greater Kailash, Delhi, owned a bungalow valued at ₹5 Crore. Gifting
                    the property to their two sons would have attracted 4% duty (3% stamp + 1%
                    municipal) + 1% registration, requiring an upfront cash outflow of ₹25 Lakhs! By
                    consulting an estate advocate and executing a registered Will, the family paid
                    ₹0 in stamp duty, saved ₹25 Lakhs in capital, and clearly demarcated each floor
                    between both brothers.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 9: LEGAL CLAUSE TEMPLATES */}
            <section id="legal-clause-templates" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileText className="w-4 h-4" />
                <span>COPY-PASTEABLE STATUTORY CLAUSES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Legal Clause Templates: Senior Citizen Gift vs Will Clause
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Use these verified statutory clauses drafted by AMA Legal Solutions senior advocates
                to protect your legal rights.
              </p>

              {/* Template Box 1: Senior Citizen Maintenance Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 23 MWPSC Mandatory Maintenance Recital (For Gift Deeds)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `"AND WHEREAS the Donor is a Senior Citizen within the meaning of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 (Act No. 54 of 2007); AND WHEREAS this Gift of the Schedule Property is made subject to the EXPRESS AND ESSENTIAL STATUTORY CONDITION that the Donee shall, during the natural life of the Donor, continuously provide all basic amenities, medical expenses, boarding, lodging, and physical needs to the Donor; AND IT IS EXPRESSLY AGREED that in the event of any neglect, refusal, or failure by the Donee to provide such basic amenities and maintenance, this Deed of Gift shall be deemed to have been made by fraud, coercion, or undue influence and shall be voidable at the option of the Donor before the Maintenance Tribunal under Section 23 of the said Act."`,
                        1
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedClauseIndex === 1 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span className="text-[#C65378]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"AND WHEREAS the Donor is a Senior Citizen within the meaning of the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 (Act No. 54 of 2007); AND WHEREAS this Gift of the Schedule Property is made subject to the EXPRESS AND ESSENTIAL STATUTORY CONDITION that the Donee shall, during the natural life of the Donor, continuously provide all basic amenities, medical expenses, boarding, lodging, and physical needs to the Donor; AND IT IS EXPRESSLY AGREED that in the event of any neglect, refusal, or failure by the Donee to provide such basic amenities and maintenance, this Deed of Gift shall be deemed to have been made by fraud, coercion, or undue influence and shall be voidable at the option of the Donor before the Maintenance Tribunal under Section 23 of the said Act."`}
                </pre>
              </div>

              {/* Template Box 2: Will Ownership Retainment Clause */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    Section 62 ISA Absolute Lifetime Ownership &amp; Revocation Clause (For Wills)
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `"I HEREBY DECLARE that during my natural life, I shall remain the absolute and exclusive owner of all my movable and immovable properties described in the Schedule hereunder, with full and unrestricted powers to sell, mortgage, gift, lease, or otherwise dispose of the same as I may deem fit; AND I FURTHER DECLARE that this is my Last Will and Testament, and I reserve my absolute right under Section 62 of the Indian Succession Act, 1925, to alter, amend, codify, or revoke this Will at any time during my lifetime, and that no beneficiary named herein shall derive any right, title, or interest in any asset until after my demise."`,
                        2
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedClauseIndex === 2 ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-[#C65378]" />
                        <span className="text-[#C65378]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I HEREBY DECLARE that during my natural life, I shall remain the absolute and exclusive owner of all my movable and immovable properties described in the Schedule hereunder, with full and unrestricted powers to sell, mortgage, gift, lease, or otherwise dispose of the same as I may deem fit; AND I FURTHER DECLARE that this is my Last Will and Testament, and I reserve my absolute right under Section 62 of the Indian Succession Act, 1925, to alter, amend, codify, or revoke this Will at any time during my lifetime, and that no beneficiary named herein shall derive any right, title, or interest in any asset until after my demise."`}
                </pre>
              </div>
            </section>

            {/* SECTION 10: ADVOCATE PROFILE */}
            <section id="advocate-profile-ama" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; PRACTICE BENCH</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Advocate Profile: AMA Legal Solutions Estate Advisory
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Legal Editorial &amp; Estate Planning Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#C65378]" />
                    <span>Bar Council Verified Testamentary Bench</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&apos;s premier succession technology and estate planning
                  platform, powered by AMA Legal Solutions. With over 10,000+ Wills, family
                  settlements, and gift deeds structured across Maharashtra, Delhi NCR, Karnataka,
                  Tamil Nadu, and Uttar Pradesh, AMA Legal Solutions protects family wealth from
                  crippling stamp duties, unnecessary litigation, and elder vulnerability.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/contact"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Talk to Senior Advocate</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Checker Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/succession-calculator"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Legal Heir Share Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>DIRECT ANSWERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Frequently Asked Questions: Gift Deed vs Will Stamp Duty
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Clear layman explanations for the most common questions raised by Indian families
                and senior citizens regarding property transfer duties.
              </p>

              <div className="divide-y divide-slate-200 pt-2 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="py-3.5">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left gap-3 text-xs sm:text-sm font-bold text-[#172228] hover:text-[#C65378] transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-[#C65378]" : "text-slate-400"
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 12: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY CITATIONS &amp; PORTALS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Statutory Citations &amp; Official State Stamp Duty Portals
              </h2>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4 text-xs">
                <div className="font-extrabold text-slate-900 mb-1">
                  Governing State Portals for Biometric Property Registration:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {Object.keys(STATE_RULES).map((key) => {
                    const item = STATE_RULES[key];
                    const stateSlugMap: Record<string, string> = {
                      MH: "/locations/maharashtra",
                      UP: "/locations/uttar-pradesh",
                      DL: "/locations/delhi",
                      KA: "/locations/karnataka",
                      TN: "/locations/tamil-nadu",
                      GJ: "/locations/gujarat",
                      HR: "/locations/haryana",
                      WB: "/locations/west-bengal",
                      TS: "/locations/telangana",
                      RJ: "/locations/rajasthan",
                      PB: "/locations/punjab",
                      KL: "/locations/kerala",
                      OTHER: "/locations",
                    };
                    return (
                      <Link
                        key={key}
                        href={stateSlugMap[key] || "/locations"}
                        className="p-3 rounded-xl border border-slate-200 hover:border-[#C65378] transition-colors bg-slate-50/50 flex flex-col justify-between group"
                      >
                        <div className="font-extrabold text-[#172228] group-hover:text-[#C65378] flex items-center justify-between">
                          <span>{item.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C65378]" />
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                          {item.portalName}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed space-y-1">
                  <div className="font-bold text-[#172228]">Core Statutory Authorities:</div>
                  <p>
                    • Indian Stamp Act, 1899 (Schedule I) &amp; Respective State Stamp Amendments •
                    Registration Act, 1908 (Section 17, Section 18) • Transfer of Property Act, 1882
                    (Sections 122–129) • Indian Succession Act, 1925 (Sections 2(h), 59, 62, 63) •
                    Income Tax Act, 1961 (Sections 47(iii), 49(1), 56(2)(x)) • Maintenance and
                    Welfare of Parents and Senior Citizens Act, 2007 (Section 23).
                  </p>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (Brand Navy & Rose, No Green)
              ===================================================================== */}
          <aside className="space-y-6 sticky top-24">
            {/* CARD 1: AUTHOR BIO CARD */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-[#C65378] font-black text-sm flex items-center justify-center shrink-0">
                  AAM
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">Advocate Anuj Anand Malik</div>
                  <div className="text-[11px] font-bold text-[#C65378] uppercase tracking-wider">
                    Senior Succession Counsel
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialist in Indian testamentary jurisprudence, property stamp duty exemptions,
                Section 23 elder protection petitions, and cross-border family estate structuring.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-[#C65378] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>Verified Counsel</span>
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY SIDEBAR CARDS */}
            <div className="hidden lg:block space-y-6">
              {/* CARD 2: DUAL CTA 1 - WILL DRAFTING (Brand Navy) */}
              <div className="rounded-3xl bg-[#172228] text-white p-6 shadow-md text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-rose-200">
                  <Lock className="w-3 h-3 text-[#C65378]" />
                  <span>PREVENT FAMILY STAMP DUTY OUTFLOW</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Save ₹Lakhs in Stamp Duty and Retain 100% Lifetime Control
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A legally registered Will costs ₹0 in stamp duty, preserves your shelter and living
                  rights, and prevents premature family property disputes.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
                  <span>Lawyer Reviewed &amp; Stamp Duty Ready</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>DEED REGISTRATION &amp; SRO DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Unsure Whether to Gift, Release, or Will Your Home?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our testamentary advocates verify circle rates, insert mandatory Section 23 elder
                  protection recitals, and handle SRO document registration pan-India.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Schedule Advocate Consultation</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  Why Families Rely on WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>State Statutory Precision:</strong> Calculates exact blood-relative
                      concessions for MH, UP, DL, TN, and all states.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Elder Protection Focus:</strong> Integrates Supreme Court Section 23
                      safeguards for senior citizens.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#C65378] shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Stamp Duty Solution:</strong> Empowers families to preserve wealth
                      with challenge-proof Wills.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FLOATING MOBILE ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <a
          href="#interactive-calculator"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Stamp Calculator</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Draft a Will</span>
        </button>
      </div>
    </div>
  );
}