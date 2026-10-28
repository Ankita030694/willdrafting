"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OPEN_SIGNUP_EVENT } from "@/components/auth/SignupModalHost";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Scale,
  Building,
  UserCheck,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Landmark,
  Check,
  X,
  MapPin,
  Building2,
  Info,
  DollarSign,
  Gavel,
  Calculator,
  Percent,
  Copy,
  CheckCheck,
  Users,
  FileText,
  Globe,
  Coins,
  ScrollText,
  Wheat,
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-validity", label: "1. Legal Validity of Punjabi Will" },
  { id: "complete-punjabi-will-template", label: "2. Native Punjabi Vasiyatnama Format" },
  { id: "agricultural-land-schedule", label: "3. Agricultural Land Schedule (Khewat/Khasra)" },
  { id: "nri-children-inheritance", label: "4. NRI Children Inheritance & FEMA Rules" },
  { id: "legal-comparison-table", label: "5. Registered vs Unregistered vs No Will" },
  { id: "punjab-sro-registration-guide", label: "6. Punjab SRO NGDRS Registration SOP" },
  { id: "revenue-mutation-sop", label: "7. Revenue Mutation (Jamabandi & Intiqal)" },
  { id: "disinheritance-exclusion-clauses", label: "8. Disinheritance & Exclusion Clauses" },
  { id: "witness-doctor-mandate", label: "9. Attesting Witnesses & Doctor Certificate" },
  { id: "punjabi-legal-glossary", label: "10. Punjabi Revenue Terms Glossary" },
  { id: "landmark-case-studies", label: "11. Landmark Case Studies (Punjab)" },
  { id: "will-drafting-sop", label: "12. Step-by-Step Will Drafting SOP" },
  { id: "institutional-profile", label: "13. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "14. Frequently Asked Questions" },
  { id: "statutory-citations", label: "15. Statutory Citations & Punjab Portals" },
];

const FAQS = [
  {
    q: "ਕੀ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖਿਆ ਵਸੀਅਤਨਾਮਾ ਕਾਨੂੰਨੀ ਤੌਰ ਤੇ ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਹੈ? (Is a Punjabi Will legally valid?)",
    a: "ਹਾਂ, ਪੂਰੀ ਤਰ੍ਹਾਂ ਕਾਨੂੰਨੀ ਹੈ। ਭਾਰਤੀ ਉੱਤਰਾਧਿਕਾਰ ਕਾਨੂੰਨ, 1925 (Indian Succession Act, 1925) ਦੀ ਧਾਰਾ 63 ਅਤੇ 74 ਅਨੁਸਾਰ ਵਸੀਅਤ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖੀ ਜਾ ਸਕਦੀ ਹੈ। ਗੁਰਮੁਖੀ ਪੰਜਾਬੀ ਵਿੱਚ ਸਾਦੇ ਕਾਗਜ਼ ਤੇ ਲਿਖਿਆ ਵਸੀਅਤਨਾਮਾ, ਜੇਕਰ ਉਸ ਤੇ ਵਸੀਅਤ-ਕਰਤਾ ਦੇ ਦਸਤਖਤ ਅਤੇ ਦੋ ਬਾਲਗ ਗਵਾਹਾਂ ਦੀ ਹਾਜ਼ਰੀ ਹੋਵੇ, ਤਾਂ ਭਾਰਤੀ ਅਦਾਲਤਾਂ ਅਤੇ ਮਾਲ ਵਿਭਾਗ (Revenue Department) ਵਿੱਚ 100% ਜਾਇਜ਼ ਹੈ।",
  },
  {
    q: "ਕੀ ਪੰਜਾਬ ਵਿੱਚ ਵਸੀਅਤਨਾਮੇ ਦੀ ਪ੍ਰੋਬੇਟ (Probate) ਲੈਣੀ ਜ਼ਰੂਰੀ ਹੈ?",
    a: "ਨਹੀਂ। ਭਾਰਤੀ ਉੱਤਰਾਧਿਕਾਰ ਕਾਨੂੰਨ ਦੀ ਧਾਰਾ 213(2) ਅਤੇ ਧਾਰਾ 57 ਅਨੁਸਾਰ ਪ੍ਰੋਬੇਟ ਕੇਵਲ ਪੁਰਾਣੇ ਪ੍ਰੈਜ਼ੀਡੈਂਸੀ ਸ਼ਹਿਰਾਂ (ਮੁੰਬਈ, ਕੋਲਕਾਤਾ, ਚੇਨਈ) ਵਿੱਚ ਲਾਜ਼ਮੀ ਹੈ। ਸੁਪਰੀਮ ਕੋਰਟ ਦੇ ਮੀਲ-ਪੱਥਰ ਫੈਸਲੇ ਕਾਂਤਾ ਯਾਦਵ ਬਨਾਮ ਓਮ ਪ੍ਰਕਾਸ਼ ਯਾਦਵ (2020) ਅਨੁਸਾਰ ਪੰਜਾਬ, ਹਰਿਆਣਾ ਅਤੇ ਦਿੱਲੀ ਵਿੱਚ ਵਸੀਅਤ ਲਈ ਕੋਰਟ ਤੋਂ ਪ੍ਰੋਬੇਟ ਲੈਣਾ ਲਾਜ਼ਮੀ ਨਹੀਂ ਹੈ। ਵਸੀਅਤ ਦੇ ਅਧਾਰ ਤੇ ਸਿੱਧਾ ਇੰਤਕਾਲ ਹੋ ਸਕਦਾ ਹੈ।",
  },
  {
    q: "ਵਸੀਅਤਨਾਮੇ ਵਿੱਚ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ (ਖੇਵਟ/ਖਤੌਨੀ/ਖਸਰਾ) ਦਾ ਵੇਰਵਾ ਕਿਵੇਂ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ?",
    a: "ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਲਈ ਤਾਜ਼ਾ ਜਮ੍ਹਾਬੰਦੀ (ਰਿਕਾਰਡ ਆਫ਼ ਰਾਈਟਸ) ਅਨੁਸਾਰ ਪਿੰਡ ਦਾ ਨਾਮ, ਹੱਦਬਸਤ ਨੰਬਰ, ਤਹਿਸੀਲ, ਜ਼ਿਲ੍ਹਾ, ਖੇਵਟ ਨੰਬਰ (ਮਾਲਕੀ ਖਾਤਾ), ਖਤੌਨੀ ਨੰਬਰ (ਕਾਸ਼ਤਕਾਰ ਖਾਤਾ), ਮੁਰੱਬਾ ਨੰਬਰ, ਕਿੱਲਾ/ਖਸਰਾ ਨੰਬਰ ਅਤੇ ਕੁੱਲ ਰਕਬਾ (ਕਨਾਲ ਅਤੇ ਮਰਲੇ) ਸਪੱਸ਼ਟ ਲਿਖਣਾ ਲਾਜ਼ਮੀ ਹੈ। ਇਸਦੇ ਨਾਲ ਨਹਿਰੀ ਪਾਣੀ ਦੇ ਵਾਰਾਬੰਦੀ ਹੱਕ ਜਾਂ ਟਿਊਬਵੈੱਲ ਕਨੈਕਸ਼ਨ ਦਾ ਵੇਰਵਾ ਵੀ ਜ਼ਰੂਰ ਦਰਜ ਕਰੋ।",
  },
  {
    q: "ਕੀ ਐਨ.ਆਰ.ਆਈ. (NRI) ਬੱਚੇ ਪੰਜਾਬ ਵਿੱਚ ਖੇਤੀ ਵਾਲੀ ਜ਼ਮੀਨ ਵਸੀਅਤ ਰਾਹੀਂ ਲੈ ਸਕਦੇ ਹਨ?",
    a: "ਹਾਂ। ਫੇਮਾ ਕਾਨੂੰਨ (FEMA 1999) ਦੀ ਧਾਰਾ 6(5) ਅਤੇ ਆਰ.ਬੀ.ਆਈ. (RBI) ਨਿਯਮਾਂ ਅਧੀਨ, ਗੈਰ-ਨਿਵਾਸੀ ਭਾਰਤੀ (NRI) ਜਾਂ ਓਵਰਸੀਜ਼ ਸਿਟੀਜ਼ਨ ਆਫ਼ ਇੰਡੀਆ (OCI) ਭਾਰਤ ਵਿੱਚ ਰਹਿ ਰਹੇ ਵਿਅਕਤੀ ਤੋਂ ਵਸੀਅਤ ਰਾਹੀਂ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ, ਫਾਰਮ ਹਾਊਸ ਜਾਂ ਬਾਗ਼ ਵਿਰਾਸਤ ਵਿੱਚ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹਨ। ਹਾਲਾਂਕਿ ਐਨ.ਆਰ.ਆਈ. ਸਿੱਧੀ ਖੇਤੀ ਜ਼ਮੀਨ ਖਰੀਦ ਨਹੀਂ ਸਕਦੇ, ਪਰ ਵਸੀਅਤ ਰਾਹੀਂ ਵਿਰਾਸਤ 100% ਕਾਨੂੰਨੀ ਹੈ।",
  },
  {
    q: "ਕੀ ਪੰਜਾਬ ਵਿੱਚ ਵਸੀਅਤਨਾਮਾ ਸਟੈਂਪ ਪੇਪਰ ਤੇ ਲਿਖਣਾ ਲਾਜ਼ਮੀ ਹੈ?",
    a: "ਨਹੀਂ। ਭਾਰਤੀ ਸਟੈਂਪ ਐਕਟ 1899 ਅਤੇ ਪੰਜਾਬ ਸਟੈਂਪ ਨਿਯਮਾਂ ਤਹਿਤ ਵਸੀਅਤਨਾਮੇ ਤੇ ਕੋਈ ਸਟੈਂਪ ਡਿਊਟੀ ਨਹੀਂ ਲੱਗਦੀ। ਵਸੀਅਤ ਸਾਦੇ A4 ਕਾਗਜ਼ ਜਾਂ ਲੀਗਲ ਗ੍ਰੀਨ ਪੇਪਰ ਤੇ ਲਿਖੀ ਜਾ ਸਕਦੀ ਹੈ। ਕਿਸੇ ਈ-ਸਟੈਂਪ ਜਾਂ ਨਿਆਂਇਕ ਸਟੈਂਪ ਪੇਪਰ ਦੀ ਲੋੜ ਨਹੀਂ ਹੁੰਦੀ।",
  },
  {
    q: "ਕੀ ਵਸੀਅਤ ਵਿੱਚ ਜਾਇਦਾਦ ਲੈਣ ਵਾਲਾ ਵਾਰਸ ਗਵਾਹ ਬਣ ਸਕਦਾ ਹੈ?",
    a: "ਬਿਲਕੁਲ ਨਹੀਂ! ਭਾਰਤੀ ਉੱਤਰਾਧਿਕਾਰ ਕਾਨੂੰਨ ਦੀ ਧਾਰਾ 67 ਅਨੁਸਾਰ, ਜੇਕਰ ਕੋਈ ਵਿਅਕਤੀ ਵਸੀਅਤ ਵਿੱਚ ਗਵਾਹ ਬਣਦਾ ਹੈ, ਤਾਂ ਉਸਨੂੰ ਜਾਂ ਉਸਦੇ ਪਤੀ/ਪਤਨੀ ਨੂੰ ਦਿੱਤੀ ਗਈ ਜਾਇਦਾਦ ਕਾਨੂੰਨੀ ਤੌਰ ਤੇ ਰੱਦ (Void) ਹੋ ਜਾਂਦੀ ਹੈ। ਇਸ ਲਈ ਬੱਚਿਆਂ, ਪਤਨੀ ਜਾਂ ਕਿਸੇ ਵੀ ਵਾਰਸ ਨੂੰ ਕਦੇ ਗਵਾਹ ਨਾ ਬਣਾਓ। ਗਵਾਹ ਹਮੇਸ਼ਾ ਨਿਰਪੱਖ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ, ਜਿਵੇਂ ਪਰਿਵਾਰਕ ਡਾਕਟਰ, ਨੰਬਰਦਾਰ ਜਾਂ ਵਕੀਲ।",
  },
  {
    q: "ਵਸੀਅਤ ਤੋਂ ਬਾਅਦ ਪਟਵਾਰੀ ਪਾਸੋਂ ਇੰਤਕਾਲ (Mutation) ਕਿਵੇਂ ਦਰਜ ਹੁੰਦਾ ਹੈ?",
    a: "ਵਸੀਅਤ-ਕਰਤਾ ਦੇ ਦੇਹਾਂਤ ਤੋਂ ਬਾਅਦ ਵਾਰਸ ਪੰਜਾਬ ਲੈਂਡ ਰੈਵੇਨਿਊ ਐਕਟ ਦੀ ਧਾਰਾ 34 ਤਹਿਤ ਹਲਕਾ ਪਟਵਾਰੀ ਕੋਲ ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ, ਵਸੀਅਤ ਦੀ ਕਾਪੀ ਅਤੇ ਜਮ੍ਹਾਬੰਦੀ ਪੇਸ਼ ਕਰਦਾ ਹੈ। ਪਟਵਾਰੀ ਪਰਤ ਪਤਵਾਰ ਵਿੱਚ ਇੰਤਕਾਲ ਦਰਜ ਕਰਦਾ ਹੈ। ਕਾਨੂੰਨਗੋ ਦੀ ਤਸਦੀਕ ਤੋਂ ਬਾਅਦ ਨਾਇਬ ਤਹਿਸੀਲਦਾਰ ਜਾਂ ਤਹਿਸੀਲਦਾਰ ਪਿੰਡ ਦੇ ਜਲਸਾ-ਏ-ਆਮ ਵਿੱਚ ਖੁੱਲ੍ਹੀ ਤਸਦੀਕ ਕਰਕੇ ਇੰਤਕਾਲ ਮਨਜ਼ੂਰ ਕਰਦਾ ਹੈ।",
  },
  {
    q: "ਕੀ ਸੁਬ-ਰਜਿਸਟਰਾਰ ਦਫ਼ਤਰ ਵਿੱਚ ਵਸੀਅਤ ਰਜਿਸਟਰ ਕਰਵਾਉਣੀ ਜ਼ਰੂਰੀ ਹੈ?",
    a: "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਐਕਟ, 1908 ਦੀ ਧਾਰਾ 18(e) ਤਹਿਤ ਵਸੀਅਤ ਰਜਿਸਟਰ ਕਰਵਾਉਣਾ ਮਰਜ਼ੀ ਅਨੁਸਾਰ (Optional) ਹੈ। ਬਿਨਾਂ ਰਜਿਸਟਰੀ ਵਾਲੀ ਵਸੀਅਤ ਵੀ ਜਾਇਜ਼ ਹੁੰਦੀ ਹੈ। ਪ੍ਰੰਤੂ ਪੰਜਾਬ ਵਿੱਚ NGDRS ਪੋਰਟਲ ਰਾਹੀਂ ਸੁਬ-ਰਜਿਸਟਰਾਰ ਦਫ਼ਤਰ ਵਿੱਚ ਰਜਿਸਟਰੀ ਕਰਵਾਉਣ ਨਾਲ ਭਵਿੱਖ ਵਿੱਚ ਜਾਅਲਸਾਜ਼ੀ ਜਾਂ ਜ਼ਬਰਦਸਤੀ ਦੇ ਝੂਠੇ ਦੋਸ਼ਾਂ ਤੋਂ ਬਚਾਅ ਹੁੰਦਾ ਹੈ।",
  },
  {
    q: "ਕੀ ਕਿਸੇ ਨਾਫ਼ਰਮਾਨ ਪੁੱਤਰ ਜਾਂ ਧੀ ਨੂੰ ਜਾਇਦਾਦ ਵਿੱਚੋਂ ਬੇਦਖ਼ਲ (Disinherit) ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ?",
    a: "ਹਾਂ। ਵਸੀਅਤ-ਕਰਤਾ ਆਪਣੀ ਸਵੈ-ਅਰਜਿਤ (Self-Acquired) ਜਾਇਦਾਦ ਕਿਸੇ ਨੂੰ ਵੀ ਦੇਣ ਜਾਂ ਕਿਸੇ ਨੂੰ ਬੇਦਖ਼ਲ ਕਰਨ ਦਾ ਪੂਰਾ ਹੱਕ ਰੱਖਦਾ ਹੈ। ਅਦਾਲਤੀ ਝਗੜਿਆਂ ਤੋਂ ਬਚਣ ਲਈ ਵਸੀਅਤ ਵਿੱਚ ਬੇਦਖ਼ਲੀ ਦਾ ਸਪੱਸ਼ਟ ਕਾਰਨ (ਜਿਵੇਂ ਕਿ ਪਹਿਲਾਂ ਦਿੱਤਾ ਹਿੱਸਾ, ਬਜ਼ੁਰਗ ਅਵਸਥਾ ਵਿੱਚ ਸੇਵਾ ਨਾ ਕਰਨਾ ਆਦਿ) ਸਾਫ਼ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦਰਜ ਕਰਨਾ ਜ਼ਰੂਰੀ ਹੈ।",
  },
  {
    q: "ਕੀ ਵਸੀਅਤਨਾਮੇ ਵਿੱਚ ਡਾਕਟਰੀ ਸਰਟੀਫਿਕੇਟ ਲਗਾਉਣਾ ਜ਼ਰੂਰੀ ਹੈ?",
    a: "ਹਾਲਾਂਕਿ ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਇਹ ਲਾਜ਼ਮੀ ਸ਼ਰਤ ਨਹੀਂ ਹੈ, ਪਰ ਬਜ਼ੁਰਗ ਵਿਅਕਤੀਆਂ ਲਈ ਰਜਿਸਟਰਡ ਐਮ.ਬੀ.ਬੀ.ਐਸ. ਡਾਕਟਰ ਦਾ ਮਾਨਸਿਕ ਤੰਦਰੁਸਤੀ ਸਰਟੀਫਿਕੇਟ ਨਾਲ ਨੱਥੀ ਕਰਨਾ ਬਹੁਤ ਲਾਹੇਵੰਦ ਰਹਿੰਦਾ ਹੈ। ਇਹ ਭਵਿੱਖ ਵਿੱਚ ਕਿਸੇ ਵੀ ਰਿਸ਼ਤੇਦਾਰ ਵੱਲੋਂ ਮਾਨਸਿਕ ਕਮਜ਼ੋਰੀ ਜਾਂ ਭਰਮ ਦੇ ਝੂਠੇ ਇਲਜ਼ਾਮਾਂ ਨੂੰ ਅਦਾਲਤ ਵਿੱਚ ਮੁੱਢੋਂ ਰੱਦ ਕਰਵਾ ਦਿੰਦਾ ਹੈ।",
  },
];

const GLOSSARY_TERMS = [
  { pa: "ਵਸੀਅਤਨਾਮਾ (Vasiyatnama)", en: "Last Will and Testament", desc: "Legal declaration of the testator's intention regarding disposal of their property after death." },
  { pa: "ਵਸੀਅਤ-ਕਰਤਾ (Vasiyatkarta)", en: "Testator", desc: "The person of sound mind who executes, signs, and authorizes the Will." },
  { pa: "ਵਸੀਕਾਰ / ਕਾਰਕੁੰਨ (Vaseekar)", en: "Executor", desc: "The trusted person appointed to administer, distribute, and execute the testamentary wishes." },
  { pa: "ਵਸੀਅਤ-ਗ੍ਰਹੀਤਾ / ਵਾਰਸ (Waris)", en: "Beneficiary / Legatee", desc: "The individual or legal heir who receives the designated bequest or property under the Will." },
  { pa: "ਜਮ੍ਹਾਬੰਦੀ (Jamabandi)", en: "Record of Rights (RoR)", desc: "The core Punjab revenue land register prepared quadrennially detailing ownership and cultivation." },
  { pa: "ਖੇਵਟ ਨੰਬਰ (Khewat Number)", en: "Ownership Khata Number", desc: "The serial number in Jamabandi identifying an individual or group of co-owners holding land." },
  { pa: "ਖਤੌਨੀ ਨੰਬਰ (Khatauni Number)", en: "Cultivator Holding Number", desc: "The number identifying the specific cultivator, tenant, or co-sharer working the parcel." },
  { pa: "ਖਸਰਾ ਨੰਬਰ (Khasra Number)", en: "Survey Field Parcel Number", desc: "The specific cadastral plot number designating exact physical field boundaries on village map." },
  { pa: "ਮੁਰੱਬਾ (Murabba)", en: "Square Block (25 Acres)", desc: "A standard agricultural revenue block in Punjab comprising 25 killas (acres)." },
  { pa: "ਕਿੱਲਾ / ਕਨਾਲ / ਮਰਲਾ (Killa / Kanal / Marla)", en: "Land Measurement Units", desc: "1 Killa = 8 Kanals = 1 Acre; 1 Kanal = 20 Marlas (each Marla = approx 272 sq ft in Punjab standard)." },
  { pa: "ਹੱਦਬਸਤ ਨੰਬਰ (Hadbast Number)", en: "Revenue Estate Village Code", desc: "The permanent administrative census number assigned to each revenue village (Mauza) in Punjab." },
  { pa: "ਇੰਤਕਾਲ / ਦਾਖ਼ਲ-ਖ਼ਾਰਿਜ (Intiqal)", en: "Mutation of Title", desc: "The official administrative updating of land title in revenue records following succession or sale." },
  { pa: "ਫਰਦ (Fard)", en: "Certified Revenue Extract", desc: "Official copy of the Jamabandi record issued by the Revenue Department (PLRS) verifying ownership." },
  { pa: "ਨਹਿਰੀ / ਚਾਹੀ / ਬਾਰਾਨੀ (Nehri / Chahi / Barani)", en: "Irrigation Classifications", desc: "Nehri = Canal-fed water share; Chahi = Tube-well irrigated land; Barani = Rainfed non-irrigated soil." },
];

export default function WillFormatPunjabiClient() {
  const { status } = useSession();
  const router = useRouter();

  const handleStartDraft = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (status === "authenticated") {
      router.push("/start/dashboard");
    } else {
      window.dispatchEvent(new Event(OPEN_SIGNUP_EVENT));
    }
  };

  const [activeId, setActiveId] = useState<string>("statutory-validity");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [templateLanguage, setTemplateLanguage] = useState<"punjabi" | "english">("punjabi");
  const [copiedMainWill, setCopiedMainWill] = useState<boolean>(false);
  const [copiedLandSchedule, setCopiedLandSchedule] = useState<boolean>(false);
  const [copiedDisinheritance, setCopiedDisinheritance] = useState<boolean>(false);
  const [copiedDoctorCert, setCopiedDoctorCert] = useState<boolean>(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -40% 0px",
      threshold: 0.05,
    });

    const elements = document.querySelectorAll("section[id], div[id].scroll-target");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const punjabiWillText = `ਵਸੀਅਤਨਾਮਾ (LAST WILL AND TESTAMENT)

ਮੈਂ, [ਵਸੀਅਤ-ਕਰਤਾ ਦਾ ਪੂਰਾ ਨਾਮ], ਪੁੱਤਰ/ਪੁੱਤਰੀ ਸ਼੍ਰੀ [ਪਿਤਾ ਦਾ ਨਾਮ], ਉਮਰ ਲਗਭਗ [ਉਮਰ] ਸਾਲ, ਧਰਮ [ਹਿੰਦੂ / ਸਿੱਖ], ਵਾਸੀ [ਮਕਾਨ ਨੰਬਰ, ਪਿੰਡ/ਮੁਹੱਲਾ, ਡਾਕਖਾਨਾ, ਤਹਿਸੀਲ [ਤਹਿਸੀਲ], ਜ਼ਿਲ੍ਹਾ [ਜ਼ਿਲ੍ਹਾ], ਪੰਜਾਬ, ਭਾਰਤ (ਆਧਾਰ ਕਾਰਡ ਨੰਬਰ: [XXXX-XXXX-XXXX]), ਪਰਮਾਤਮਾ ਦੀ ਕ੍ਰਿਪਾ ਨਾਲ ਪੂਰਨ ਹੋਸ਼ੋ-ਹਵਾਸ ਅਤੇ ਚੰਗੀ ਸਰੀਰਕ ਤੇ ਮਾਨਸਿਕ ਤੰਦਰੁਸਤੀ ਵਿੱਚ, ਬਿਨਾਂ ਕਿਸੇ ਬਾਹਰੀ ਦਬਾਅ, ਡਰ ਜਾਂ ਅਸਰ-ਰਸੂਖ ਦੇ, ਆਪਣੀ ਆਜ਼ਾਦ ਮਰਜ਼ੀ ਨਾਲ ਇਹ ਆਪਣਾ ਅੰਤਿਮ ਵਸੀਅਤਨਾਮਾ ਲਿਖਵਾ ਰਿਹਾ/ਰਹੀ ਹਾਂ:

੧. ਪਹਿਲੀਆਂ ਵਸੀਅਤਾਂ ਦੀ ਮਨਸੂਖੀ (Revocation of Prior Wills):
ਮੈਂ ਇਸ ਦਸਤਾਵੇਜ਼ ਰਾਹੀਂ ਆਪਣੇ ਵੱਲੋਂ ਪਹਿਲਾਂ ਲਿਖੀਆਂ ਗਈਆਂ ਸਾਰੀਆਂ ਪਿਛਲੀਆਂ ਵਸੀਅਤਾਂ, ਕੋਡਿਸਿਲਾਂ ਜਾਂ ਵਸੀਅਤੀ ਲਿਖਤਾਂ ਨੂੰ ਪੂਰਨ ਤੌਰ ਤੇ ਮਨਸੂਖ (ਰੱਦ) ਕਰਦਾ ਹਾਂ। ਇਹ ਮੇਰਾ ਆਖ਼ਰੀ ਅਤੇ ਕਾਨੂੰਨੀ ਤੌਰ ਤੇ ਜਾਇਜ਼ ਵਸੀਅਤਨਾਮਾ ਹੈ।

੨. ਵਸੀਕਾਰ / ਕਾਰਕੁੰਨ ਦੀ ਨਿਯੁਕਤੀ (Appointment of Executor):
ਮੈਂ ਆਪਣੇ ਦੇਹਾਂਤ ਉਪਰੰਤ ਆਪਣੀ ਜਾਇਦਾਦ ਦੀ ਵੰਡ ਅਤੇ ਵਸੀਅਤੀ ਹਦਾਇਤਾਂ ਨੂੰ ਸੁਚਾਰੂ ਢੰਗ ਨਾਲ ਲਾਗੂ ਕਰਨ ਹਿੱਤ ਸ਼੍ਰੀ [ਵਸੀਕਾਰ ਦਾ ਨਾਮ], ਪੁੱਤਰ ਸ਼੍ਰੀ [ਪਿਤਾ ਦਾ ਨਾਮ], ਵਾਸੀ [ਪੂਰਾ ਪਤਾ] ਨੂੰ ਆਪਣਾ ਕਾਨੂੰਨੀ ਵਸੀਕਾਰ (Executor) ਨਿਯੁਕਤ ਕਰਦਾ ਹਾਂ। ਜੇਕਰ ਉਹ ਕਿਸੇ ਕਾਰਨ ਜ਼ਿੰਮੇਵਾਰੀ ਨਿਭਾਉਣ ਤੋਂ ਅਸਮਰੱਥ ਹੋਣ, ਤਾਂ ਸ਼੍ਰੀ [ਬਦਲਵੇਂ ਵਸੀਕਾਰ ਦਾ ਨਾਮ] ਇਸ ਜ਼ਿੰਮੇਵਾਰੀ ਨੂੰ ਸੰਭਾਲਣਗੇ।

੩. ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਦੀ ਵਸੀਅਤ (Bequest of Agricultural Land):
ਮੇਰੀ ਮਾਲਕੀ ਅਤੇ ਕਬਜ਼ੇ ਵਾਲੀ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ, ਜੋ ਕਿ ਪਿੰਡ [ਪਿੰਡ ਦਾ ਨਾਮ], ਹੱਦਬਸਤ ਨੰਬਰ [ਹੱਦਬਸਤ], ਤਹਿਸੀਲ [ਤਹਿਸੀਲ], ਜ਼ਿਲ੍ਹਾ [ਜ਼ਿਲ੍ਹਾ], ਪੰਜਾਬ ਵਿੱਚ ਸਥਿਤ ਹੈ, ਜਿਸਦਾ ਤਾਜ਼ਾ ਜਮ੍ਹਾਬੰਦੀ ਸਾਲ [20XX-XX] ਅਨੁਸਾਰ ਵੇਰਵਾ ਹੇਠ ਲਿਖੇ ਅਨੁਸਾਰ ਹੈ:
• ਖੇਵਟ ਨੰਬਰ: [ਖੇਵਟ ਨੰਬਰ]
• ਖਤੌਨੀ ਨੰਬਰ: [ਖਤੌਨੀ ਨੰਬਰ]
• ਮੁਰੱਬਾ ਨੰਬਰ: [ਮੁਰੱਬਾ ਨੰਬਰ]
• ਕਿੱਲਾ / ਖਸਰਾ ਨੰਬਰ: [ਖਸਰਾ ਨੰਬਰਾਂ ਦੀ ਸੂਚੀ, ਜਿਵੇਂ ਕਿ ੧੨//੧, ੧੨//੨]
• ਕੁੱਲ ਰਕਬਾ: [ਕੁੱਲ ਕਨਾਲ] ਕਨਾਲ [ਕੁੱਲ ਮਰਲੇ] ਮਰਲੇ (ਲਗਭਗ [ਏਕੜ] ਕਿੱਲੇ)
• ਨਹਿਰੀ ਵਾਰਾਬੰਦੀ / ਟਿਊਬਵੈੱਲ ਹੱਕ: ਨਹਿਰ [ਰਜਵਾਹੇ ਦਾ ਨਾਮ] ਦੇ ਖਾਤੇ ਵਿੱਚ ਦਰਜ ਪਾਣੀ ਦੀ ਵਾਰੀ ਅਤੇ ਬੋਰਵੈੱਲ ਮੋਟਰ ਕਨੈਕਸ਼ਨ ਨੰਬਰ [ਕਨੈਕਸ਼ਨ ਨੰਬਰ] ਸਮੇਤ।

ਮੇਰੇ ਅਕਾਲ ਚਲਾਣੇ ਤੋਂ ਬਾਅਦ ਇਹ ਸਮੁੱਚੀ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਮੇਰੇ ਪੁੱਤਰ/ਪੁੱਤਰੀ ਸ਼੍ਰੀ/ਸ਼੍ਰੀਮਤੀ [ਵਾਰਸ ਦਾ ਨਾਮ], ਵਾਸੀ [ਪਤਾ/ਵਿਦੇਸ਼ੀ ਪਤਾ] ਦੀ ਪੂਰਨ, ਨਿਰੋਲ ਅਤੇ ਨਿਰਵਿਰੋਧ ਮਾਲਕੀ ਹੋਵੇਗੀ। ਉਹ ਮਾਲ ਵਿਭਾਗ (ਮਾਲ ਪਟਵਾਰੀ ਤੇ ਤਹਿਸੀਲਦਾਰ) ਪਾਸੋਂ ਆਪਣੇ ਨਾਮ ਤੇ ਇੰਤਕਾਲ (Mutation) ਦਰਜ ਕਰਵਾਉਣ ਦੇ ਪੂਰਨ ਹੱਕਦਾਰ ਹੋਣਗੇ।

੪. ਰਿਹਾਇਸ਼ੀ ਮਕਾਨ ਅਤੇ ਸ਼ਹਿਰੀ ਜਾਇਦਾਦ (Residential / Urban Property):
ਮੇਰੀ ਸਵੈ-ਅਰਜਿਤ ਰਿਹਾਇਸ਼ੀ ਕੋਠੀ / ਮਕਾਨ ਨੰਬਰ [ਮਕਾਨ ਨੰਬਰ], ਸਥਿਤ [ਕਲੋਨੀ/ਸਟਰੀਟ], [ਸ਼ਹਿਰ, ਜਿਵੇਂ ਲੁਧਿਆਣਾ/ਜਲੰਧਰ/ਮੋਹਾਲੀ], ਪੰਜਾਬ (ਜਿਸਦੀ ਰਜਿਸਟਰੀ ਵਸੀਕਾ ਨੰਬਰ [ਵਸੀਕਾ ਨੰ.], ਮਿਤੀ [ਮਿਤੀ], ਦਫ਼ਤਰ ਸੁਬ-ਰਜਿਸਟਰਾਰ ਵਿਖੇ ਦਰਜ ਹੈ), ਮੇਰੇ ਦੇਹਾਂਤ ਉਪਰੰਤ ਮੇਰੀ ਧਰਮਪਤਨੀ ਸ਼੍ਰੀਮਤੀ [ਪਤਨੀ ਦਾ ਨਾਮ] ਦੇ ਨਾਮ ਤੇ ਰਹੇਗੀ। ਉਹਨਾਂ ਦੇ ਜੀਵਨ ਕਾਲ ਦੌਰਾਨ ਉਹਨਾਂ ਦਾ ਪੂਰਨ ਲਾਈਫ ਇੰਟਰਸਟ ਹੋਵੇਗਾ, ਅਤੇ ਉਹਨਾਂ ਦੇ ਅਕਾਲ ਚਲਾਣੇ ਉਪਰੰਤ ਇਹ ਮਕਾਨ ਮੇਰੇ ਬੱਚਿਆਂ ਵਿੱਚ ਬਰਾਬਰ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਜਾਵੇਗਾ।

੫. ਚੱਲ ਜਾਇਦਾਦ ਅਤੇ ਬੈਂਕ ਖਾਤੇ (Movable Assets & Bank Deposits):
ਮੇਰੇ ਨਾਮ ਤੇ ਚੱਲ ਰਹੇ ਸਮੂਹ ਬੈਂਕ ਖਾਤੇ (ਸੇਵਿੰਗ, ਐੱਫ.ਡੀ., ਪੀ.ਪੀ.ਐੱਫ., ਲਾਕਰ), ਟਰੈਕਟਰ ਮਾਡਲ [ਮਾਡਲ ਤੇ ਨੰਬਰ], ਖੇਤੀ ਸੰਦ ਅਤੇ ਸੁਨਹਿਰੀ ਗਹਿਣੇ ਮੇਰੇ ਵਾਰਸਾਂ ਵਿੱਚ ਹੇਠ ਲਿਖੇ ਅਨੁਸਾਰ ਤਕਸੀਮ ਹੋਣਗੇ:
(ੳ) ਸਟੇਟ ਬੈਂਕ ਆਫ਼ ਇੰਡੀਆ, ਬ੍ਰਾਂਚ [ਸ਼ਾਖਾ] ਖਾਤਾ ਨੰਬਰ [ਖਾਤਾ ਨੰ.]: ਸ਼੍ਰੀ [ਨਾਮ]
(ਅ) ਪੰਜਾਬ ਨੈਸ਼ਨਲ ਬੈਂਕ ਐੱਫ.ਡੀ. ਰਸੀਦ ਨੰਬਰ [ਰਸੀਦ ਨੰ.]: ਸ਼੍ਰੀ [ਨਾਮ]
(ੲ) ਖੇਤੀਬਾੜੀ ਟਰੈਕਟਰ ਅਤੇ ਸੰਦ: ਸ਼੍ਰੀ [ਨਾਮ]

੬. ਬਕਾਇਆ ਜਾਇਦਾਦ (Residuary Clause):
ਜੇਕਰ ਮੇਰੀ ਕੋਈ ਹੋਰ ਚੱਲ ਜਾਂ ਅਚੱਲ ਜਾਇਦਾਦ, ਜੋ ਇਸ ਵਸੀਅਤਨਾਮੇ ਵਿੱਚ ਦਰਜ ਹੋਣ ਤੋਂ ਰਹਿ ਗਈ ਹੋਵੇ ਜਾਂ ਜੋ ਮੈਂ ਇਸ ਵਸੀਅਤ ਤੋਂ ਬਾਅਦ ਆਪਣੇ ਜੀਵਨ ਕਾਲ ਵਿੱਚ ਹਾਸਲ ਕਰਾਂ, ਉਹ ਸਾਰੀ ਬਕਾਇਆ ਜਾਇਦਾਦ ਮੇਰੇ ਨਾਮਜ਼ਦ ਵਾਰਸ [ਨਾਮ] ਦੀ ਮਲਕੀਅਤ ਹੋਵੇਗੀ।

੭. ਬੇਦਖ਼ਲੀ ਦਾ ਕਾਰਨ (Specific Reason for Exclusion):
ਮੈਂ ਆਪਣੇ ਪੁੱਤਰ ਸ਼੍ਰੀ [ਨਾਮ] ਨੂੰ ਇਸ ਵਸੀਅਤ ਵਿੱਚੋਂ ਜਾਣਬੁੱਝ ਕੇ ਕੋਈ ਹਿੱਸਾ ਨਹੀਂ ਦੇ ਰਿਹਾ ਹਾਂ, ਕਿਉਂਕਿ ਮੈਂ ਆਪਣੇ ਜੀਵਨ ਕਾਲ ਦੌਰਾਨ ਮਿਤੀ [ਮਿਤੀ] ਨੂੰ ਉਸਨੂੰ ਉਸਦੇ ਕਾਰੋਬਾਰ ਅਤੇ ਵਿਦੇਸ਼ ਜਾਣ ਲਈ ₹[ਰਕਮ] ਰੁਪਏ ਨਕਦ ਦੇ ਚੁੱਕਾ ਹਾਂ, ਅਤੇ ਉਸਨੇ ਆਪਣਾ ਹਿੱਸਾ ਪਹਿਲਾਂ ਹੀ ਸਮਝ ਲਿਆ ਹੈ। ਇਸ ਲਈ ਮੇਰੇ ਦੇਹਾਂਤ ਤੋਂ ਬਾਅਦ ਉਸਦਾ ਮੇਰੀ ਕਿਸੇ ਜਾਇਦਾਦ ਤੇ ਕੋਈ ਹੱਕ ਨਹੀਂ ਹੋਵੇਗਾ।

ਦਸਤਖਤ ਵਸੀਅਤ-ਕਰਤਾ (Signature of Testator):
ਮੈਂ ਇਸ ਵਸੀਅਤਨਾਮੇ ਨੂੰ ਪੜ੍ਹ ਅਤੇ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਮਝ ਕੇ ਹੇਠ ਲਿਖੇ ਦੋ ਗਵਾਹਾਂ ਦੀ ਹਾਜ਼ਰੀ ਵਿੱਚ ਆਪਣੇ ਦਸਤਖਤ ਕੀਤੇ ਹਨ:

ਦਸਤਖਤ / ਅੰਗੂਠਾ: __________________________
ਵਸੀਅਤ-ਕਰਤਾ ਦਾ ਨਾਮ: [ਨਾਮ]
ਮਿਤੀ: [ਮਿਤੀ, ਜਿਵੇਂ: 27 ਅਕਤੂਬਰ 2026]
ਸਥਾਨ: [ਸਥਾਨ, ਜਿਵੇਂ: ਜਲੰਧਰ, ਪੰਜਾਬ]

ਗਵਾਹਾਂ ਦੀ ਤਸਦੀਕ (Attestation of Witnesses):
ਅਸੀਂ ਦੋਵੇਂ ਗਵਾਹ ਤਸਦੀਕ ਕਰਦੇ ਹਾਂ ਕਿ ਵਸੀਅਤ-ਕਰਤਾ ਸ਼੍ਰੀ [ਨਾਮ] ਨੇ ਸਾਡੇ ਦੋਹਾਂ ਦੇ ਸਾਹਮਣੇ ਪੂਰਨ ਹੋਸ਼ੋ-ਹਵਾਸ ਵਿੱਚ ਇਸ ਵਸੀਅਤਨਾਮੇ ਉੱਤੇ ਆਪਣੇ ਦਸਤਖਤ ਕੀਤੇ ਹਨ। ਅਸੀਂ ਦੋਹਾਂ ਗਵਾਹਾਂ ਨੇ ਵਸੀਅਤ-ਕਰਤਾ ਦੀ ਬੇਨਤੀ ਉੱਤੇ ਅਤੇ ਉਹਨਾਂ ਦੇ ਰੂਬਰੂ ਇੱਕ-ਦੂਜੇ ਦੇ ਸਾਹਮਣੇ ਬਤੌਰ ਗਵਾਹ ਆਪਣੇ ਦਸਤਖਤ ਕੀਤੇ ਹਨ।

ਗਵਾਹ ਨੰਬਰ ੧:
ਦਸਤਖਤ: __________________________
ਨਾਮ: [ਗਵਾਹ ਦਾ ਪੂਰਾ ਨਾਮ]
ਪਿਤਾ ਦਾ ਨਾਮ: [ਪਿਤਾ ਦਾ ਨਾਮ]
ਪਤਾ: [ਪੂਰਾ ਰਿਹਾਇਸ਼ੀ ਪਤਾ]
ਆਧਾਰ / ਵੋਟਰ ਕਾਰਡ: [ਨੰਬਰ]

ਗਵਾਹ ਨੰਬਰ ੨ (ਨਿਰਪੱਖ ਵਿਅਕਤੀ / ਡਾਕਟਰ / ਨੰਬਰਦਾਰ):
ਦਸਤਖਤ: __________________________
ਨਾਮ: [ਗਵਾਹ ਦਾ ਪੂਰਾ ਨਾਮ]
ਪਿਤਾ ਦਾ ਨਾਮ: [ਪਿਤਾ ਦਾ ਨਾਮ]
ਪਤਾ: [ਪੂਰਾ ਰਿਹਾਇਸ਼ੀ ਪਤਾ]
ਆਧਾਰ / ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰ.: [ਨੰਬਰ]`;

  const englishTranslationText = `LAST WILL AND TESTAMENT (ENGLISH TRANSLATION OF PUNJABI VASIYATNAMA)

I, [Full Name of Testator], son/daughter of Shri [Father's Name], aged approximately [Age] years, religion [Hindu / Sikh], resident of [House No., Village/Locality, Post Office, Tehsil [Tehsil], District [District], Punjab, India (Aadhaar Card No.: [XXXX-XXXX-XXXX]), being by God's grace in sound disposing state of mind, memory, and physical understanding, and acting of my own free will without any coercion, force, duress, or undue influence, do hereby make, execute, and declare this as my Last Will and Testament:

1. REVOCATION OF PRIOR WILLS & TESTAMENTARY WRITINGS:
I hereby absolutely revoke, cancel, and annul all former Wills, Codicils, testamentary dispositions, or instruments heretofore executed by me. This document stands as my sole, final, and legally enforceable Last Will.

2. APPOINTMENT OF EXECUTOR:
For the faithful administration and implementation of my bequests after my demise, I hereby appoint Shri [Name of Executor], son of Shri [Father's Name], resident of [Complete Address] as the sole Executor of this my Last Will. In the event of his inability, unwillingness, or demise, Shri [Alternate Executor Name] shall act as the substitute Executor.

3. BEQUEST OF AGRICULTURAL REVENUE LAND:
I am the sole, absolute, and recorded owner in exclusive possession of agricultural land situated at Village [Village Name], Hadbast No. [Hadbast Number], Tehsil [Tehsil], District [District], Punjab, India, detailed as per the latest Jamabandi (Record of Rights for year 20XX-XX) as follows:
• Khewat Number: [Khewat No.]
• Khatauni Number: [Khatauni No.]
• Murabba Number: [Murabba No.]
• Killa / Khasra Numbers: [Survey Numbers, e.g., 12//1, 12//2, 13//5]
• Total Area: [Total Kanals] Kanals [Total Marlas] Marlas (measuring approximately [Acres] Killas/Acres)
• Irrigation & Water Rights: Together with canal water turn (Nehri Warabandi) registered on [Canal Outlet/Rajwaha Name] and electric tube-well motor connection bearing A/c No. [Account No.].

Upon my demise, this entire agricultural parcel shall devolve upon and belong absolutely, exclusively, and forever to my son/daughter Shri/Smt. [Beneficiary Name], resident of [Address/Overseas Address]. He/She shall possess full and undisputed authority to apply before the Halqa Patwari and Revenue Tehsildar to sanction the Mutation of Title (Intiqal) in his/her sole name.

4. RESIDENTIAL HOUSE PROPERTY:
My self-acquired residential bungalow/house bearing No. [House No.], situated at [Colony/Street], [City, e.g. Ludhiana/Jalandhar/Mohali], Punjab (registered vide Conveyance Deed No. [Doc No.], dated [Date] in the Office of the Sub-Registrar), shall upon my demise remain in the sole possession and enjoyment of my wife Smt. [Wife's Name] during her natural life (Life Interest). Following her demise, the property shall devolve equally upon my surviving legal heirs.

5. MOVABLE ASSETS, BANK ACCOUNTS & FARM EQUIPMENT:
All bank accounts, deposits, farm machinery, and vehicles registered in my name shall devolve as under:
(a) Savings Account No. [A/c No.] with State Bank of India, Branch [Branch]: Bequeathed to Shri [Name]
(b) Fixed Deposit Receipts with Punjab National Bank: Bequeathed to Shri [Name]
(c) Agricultural Tractor Model [Make & Regn No.] and implements: Bequeathed to Shri [Name]

6. RESIDUARY ESTATE:
Any other property, movable or immovable, whether forgotten, omitted, or acquired by me subsequent to the execution of this Will, shall devolve solely upon my nominated residuary beneficiary Shri [Name].

7. EXPLICIT STATEMENT OF EXCLUSION (DISINHERITANCE):
I consciously and intentionally exclude my son Shri [Excluded Son Name] from inheriting any share of my agricultural or residential property under this Will. The specific and valid reason is that during my lifetime, on [Date], I provided him with a lumpsum cash assistance of Rs. [Amount]/- for his overseas migration and commercial establishment, which was accepted in full satisfaction of his expectations.

TESTATOR SIGNATURE & ATTESTATION:
I have signed this Will in Gurmukhi script on each page in the presence of the two attesting witnesses named below, who have both signed in my presence and at my request.

Signature / Thumb Impression: __________________________
Testator Name: [Testator Full Name]
Date: [Execution Date, e.g. 27 October 2026]
Place: [Location, e.g. Jalandhar, Punjab]

ATTESTATION OF TWO WITNESSES (SECTION 63(c)):
We, the undersigned attesting witnesses, hereby certify that the Testator Shri [Name] signed this Will in our presence while in sound disposing mind and memory, and we, at his request and in his presence, have subscribed our names as witnesses:

Witness 1:
Signature: __________________________
Name: [Full Witness Name] | S/o: [Father Name]
Address: [Residential Address] | Aadhaar/ID: [ID Number]

Witness 2 (Neutral Person / Medical Practitioner / Village Lambardar):
Signature: __________________________
Name: [Full Witness Name] | S/o: [Father Name]
Address: [Residential Address] | Regn/ID No: [Number]`;

  const landScheduleSnippet = `ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਦਾ ਤਫ਼ਸੀਲਵਾਰ ਵੇਰਵਾ (AGRICULTURAL LAND SCHEDULE BLOCK)

੧. ਮਾਲ ਮੌਜ਼ਾ (Revenue Village): ਪਿੰਡ [ਪਿੰਡ ਦਾ ਨਾਮ], ਹੱਦਬਸਤ ਨੰਬਰ [ਹੱਦਬਸਤ ਨੰ.]
੨. ਪ੍ਰਸ਼ਾਸਕੀ ਵੇਰਵਾ: ਤਹਿਸੀਲ [ਤਹਿਸੀਲ], ਸਬ-ਤਹਿਸੀਲ [ਸਬ-ਤਹਿਸੀਲ], ਜ਼ਿਲ੍ਹਾ [ਜ਼ਿਲ੍ਹਾ], ਪੰਜਾਬ
੩. ਜਮ੍ਹਾਬੰਦੀ ਸਾਲ: [੨੦੨੨-੨੦੨੩ / 20XX-XX] (ਰਿਕਾਰਡ ਆਫ਼ ਰਾਈਟਸ)
੪. ਮਾਲਕੀ ਖਾਤਾ (Khewat No.): [ਖੇਵਟ ਨੰਬਰ, ਜਿਵੇਂ ੧੪੫/੧੮੨]
੫. ਕਾਸ਼ਤਕਾਰ ਖਾਤਾ (Khatauni No.): [ਖਤੌਨੀ ਨੰਬਰ, ਜਿਵੇਂ ੨੧੦]
੬. ਮੁਰੱਬਾ ਤੇ ਕਿੱਲਾ/ਖਸਰਾ ਨੰਬਰ (Murabba & Khasra Parcels):
   • ਮੁਰੱਬਾ ਨੰਬਰ [੧੫], ਕਿੱਲਾ ਨੰਬਰ [੧ (੮-੦), ੨ (੮-੦), ੯ (੭-੧੨), ੧੦ (੮-੦)]
   • ਮੁਰੱਬਾ ਨੰਬਰ [੧੬], ਕਿੱਲਾ ਨੰਬਰ [੫ (੬-੮), ੬ (੮-੦)]
੭. ਕੁੱਲ ਮਾਲਕੀ ਰਕਬਾ: [੪੫] ਕਨਾਲ [੦] ਮਰਲੇ (ਕੁੱਲ ੫ ਕਿੱਲੇ ੫ ਕਨਾਲ)
੮. ਸਿੰਚਾਈ ਦਾ ਸਾਧਨ (Water Rights): ਨਹਿਰ [ਕੋਟਲਾ ਬ੍ਰਾਂਚ / ਸਰਹਿੰਦ ਕੈਨਾਲ] ਤੋਂ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਨਹਿਰੀ ਵਾਰੀ (ਵਾਰਾਬੰਦੀ ਪਰਚੀ ਨੰ. [XXX]) ਅਤੇ ਖੇਤ ਵਿੱਚ ਲੱਗੀ [੧੦ ਐੱਚ.ਪੀ.] ਬਿਜਲੀ ਟਿਊਬਵੈੱਲ ਮੋਟਰ (ਖਾਤਾ ਨੰਬਰ: [XXXXX]) ਸਮੇਤ।
੯. ਵਾਰਸ ਦਾ ਨਾਮ: ਇਹ ਸਮੁੱਚਾ ਰਕਬਾ ਮੇਰੇ ਪੁੱਤਰ [ਨਾਮ], ਵਾਸੀ [ਪਤਾ / ਕੈਨੇਡਾ / ਯੂ.ਕੇ.] ਨੂੰ ਪੂਰਨ ਮਾਲਕੀ ਹੱਕਾਂ ਸਹਿਤ ਜਾਵੇਗਾ।`;

  const disinheritanceSnippet = `ਬੇਦਖ਼ਲੀ ਸ਼ਰਤ (STATUTORY DISINHERITANCE CLAUSE)

"ਮੈਂ ਇਹ ਸਪੱਸ਼ਟ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ ਕਿ ਮੇਰੇ ਤਿੰਨ ਬੱਚਿਆਂ ਵਿੱਚੋਂ, ਮੇਰਾ ਵੱਡਾ ਪੁੱਤਰ ਸ਼੍ਰੀ [ਨਾਮ] ਪਿਛਲੇ [੧੦] ਸਾਲਾਂ ਤੋਂ ਮੇਰੇ ਤੋਂ ਵੱਖ ਰਹਿ ਰਿਹਾ ਹੈ। ਉਸਨੇ ਬੁਢਾਪੇ ਵਿੱਚ ਮੇਰੀ ਅਤੇ ਮੇਰੀ ਪਤਨੀ ਦੀ ਕੋਈ ਦੇਖਭਾਲ ਜਾਂ ਆਰਥਿਕ ਮਦਦ ਨਹੀਂ ਕੀਤੀ। ਇਸ ਤੋਂ ਇਲਾਵਾ, ਮੈਂ ਆਪਣੇ ਜੀਵਨ ਕਾਲ ਦੌਰਾਨ ਮਿਤੀ [ਮਿਤੀ] ਨੂੰ ਰਜਿਸਟਰਡ ਫ਼ੈਮਲੀ ਸੈਟਲਮੈਂਟ ਰਾਹੀਂ ਉਸਨੂੰ ਉਸਦਾ ਹਿੱਸਾ ₹[ਰਕਮ] ਰੁਪਏ ਨਕਦ ਅਤੇ [ਸ਼ਹਿਰ] ਵਿਚਲਾ ਪਲਾਟ ਪਹਿਲਾਂ ਹੀ ਦੇ ਦਿੱਤਾ ਸੀ।

ਇਸ ਲਈ, ਮੈਂ ਪੂਰਨ ਹੋਸ਼ੋ-ਹਵਾਸ ਵਿੱਚ ਆਪਣੀ ਆਜ਼ਾਦ ਮਰਜ਼ੀ ਨਾਲ ਇਹ ਫੈਸਲਾ ਕੀਤਾ ਹੈ ਕਿ ਉਸਨੂੰ ਮੇਰੀ ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ, ਰਿਹਾਇਸ਼ੀ ਮਕਾਨ ਜਾਂ ਬੈਂਕ ਖਾਤਿਆਂ ਵਿੱਚੋਂ ਕੋਈ ਵੀ ਹਿੱਸਾ ਨਹੀਂ ਦਿੱਤਾ ਜਾਵੇਗਾ। ਮੇਰੇ ਅਕਾਲ ਚਲਾਣੇ ਤੋਂ ਬਾਅਦ ਉਸਦਾ ਮੇਰੀ ਕਿਸੇ ਵੀ ਚੱਲ ਜਾਂ ਅਚੱਲ ਜਾਇਦਾਦ ਉੱਤੇ ਕੋਈ ਕਾਨੂੰਨੀ ਹੱਕ, ਦਾਅਵਾ ਜਾਂ ਇਤਰਾਜ਼ ਨਹੀਂ ਹੋਵੇਗਾ।"`;

  const doctorCertSnippet = `ਡਾਕਟਰੀ ਮਾਨਸਿਕ ਤੰਦਰੁਸਤੀ ਸਰਟੀਫਿਕੇਟ (DOCTOR MENTAL FITNESS CERTIFICATE)

(To be issued on Registered Medical Practitioner's Letterhead)

"This is to certify that I, Dr. [Doctor Full Name], MBBS / MD (Regn No.: [Medical Council Regn No.]), practicing at [Clinic/Hospital Name, City, Punjab], have on this day, [Date of Execution], examined Shri/Smt. [Testator Full Name], aged [Age] years, resident of [Address].

Upon thorough clinical and cognitive evaluation, I hereby certify that the Testator is in full possession of mental faculties, oriented to time, place, and person, and is capable of fully understanding the nature and effect of executing his/her Last Will and Testament. The Testator does not suffer from dementia, delirium, undue influence, or any cognitive impairment affecting testamentary capacity.

Date: [Date]
Place: [City, Punjab]
Doctor Signature & Official Seal: __________________________"`;

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#172228] selection:bg-[#C65378]/15 selection:text-[#C65378]">
      {/* Decorative ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C65378]/[0.05] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-72 -left-20 w-80 h-80 rounded-full bg-[#5F7E75]/[0.05] blur-3xl"
      />

      {/* =========================================================================
          LAYER 1: HERO SECTION (Dark Navy Theme with Gold & Rose Accents)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white py-12 md:py-16 border-b border-[#172228]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs text-white/70 mb-6 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/templates" className="hover:text-white transition-colors">
              Templates
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ</span>
          </nav>

          {/* Statutory Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider text-rose-200 mb-6">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 S. 63 • PUNJAB REGISTRATION RULES</span>
          </div>

          {/* Strict H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ: Will Format in Punjabi
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            Complete legal guide and free copyable Gurmukhi Punjabi Will format. Features agricultural
            land schedules with <strong>Khewat, Khatauni &amp; Khasra</strong> numbers, NRI children
            bequests, and Punjab Sub-Registrar execution rules.
          </p>

          {/* Hero Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#complete-punjabi-will-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ScrollText className="w-4 h-4" />
              <span>Copy Punjabi Will Format</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>Draft a Challenge-Proof Will</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-amber-50/70 via-[#FAF7F0] to-rose-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Section 63</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                INDIAN SUCCESSION ACT VALID
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Khewat &amp; Khasra</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                PUNJAB REVENUE SCHEDULE
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">FEMA Sec 6(5)</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NRI INHERITANCE PROTECTED
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">Zero Probate</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                NOT MANDATORY IN PUNJAB
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Interactive Templates)
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
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>Statutory Authority</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 59, 63, 67, 74 &amp; 213 of the Indian Succession Act, 1925,
                read with the Punjab Land Revenue Act, 1887 and Punjab Registration Rules.
              </p>
            </div>
          </aside>

          {/* =====================================================================
              MIDDLE COLUMN: MAIN CONTENT & TEMPLATES
              ===================================================================== */}
          <main className="space-y-10 min-w-0">
            {/* SECTION 0: EXECUTIVE BRIEF */}
            <div className="rounded-2xl bg-[#F4F8FE] border-l-4 border-l-[#C65378] border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>EXECUTIVE BRIEF: PUNJABI VASIYATNAMA LEGAL ESSENTIALS</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Legal in Gurmukhi Script:</strong> Section 74 of the Indian Succession Act
                    expressly confirms that a Will does not require any technical form or English language.
                    A Punjabi Vasiyatnama written in Gurmukhi on plain paper is fully enforceable in civil
                    courts and revenue offices.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Agricultural Revenue Precision:</strong> Generic property descriptions fail in
                    Punjab. Agricultural land bequests must explicitly enumerate <em>Khewat</em>,{" "}
                    <em>Khatauni</em>, <em>Khasra</em>, <em>Murabba</em>, <em>Killa</em>, and canal water
                    irrigation turns (Nehri Warabandi) to ensure seamless Jamabandi mutation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Mandatory Probate in Punjab:</strong> Under Section 213(2) read with Section 57,
                    probate from a civil court is <em>not mandatory</em> in the State of Punjab. Beneficiaries
                    can present the registered Will directly before the Halqa Patwari for title mutation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>FEMA Protection for NRI Children:</strong> Under Section 6(5) of FEMA, non-resident
                    Indian children residing in Canada, the UK, or the USA can legally inherit agricultural
                    land and ancestral real estate in Punjab without prior RBI approval.
                  </span>
                </li>
              </ul>
            </div>

            {/* SECTION 1: STATUTORY VALIDITY */}
            <section id="statutory-validity" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>STATUTORY FOUNDATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Validity: Section 63 Succession Act in Punjab
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Punjab, estate planning for agricultural families and urban property owners is deeply
                  intertwined with cultural traditions and ancestral land holdings. A frequent misconception is
                  that a legally binding Will must be drafted in English by an advocate or typed on judicial
                  stamp paper.
                </p>
                <p>
                  Under Section 63 of the <strong>Indian Succession Act, 1925</strong>, any person of sound
                  disposing mind who is not a minor may execute a Will in any vernacular language, including
                  Gurmukhi Punjabi. Section 74 clarifies that the wording of a Will needs no technical terms.
                  The only statutory requirements are that the testator signs or affixes their thumb impression,
                  and at least two competent witnesses attest the document in the testator&apos;s physical presence.
                </p>
                <p>
                  Furthermore, under Section 18(e) of the Registration Act, 1908, registration of a Will remains
                  optional throughout Punjab. An unregistered handwritten Punjabi Will (ਹੱਥ-ਲਿਖਤ ਵਸੀਅਤਨਾਮਾ) on
                  plain A4 paper carries equal legal validity in court. However, given the high prevalence of
                  land litigation in agricultural belts like Jalandhar, Ludhiana, Hoshiarpur, and Bathinda,
                  voluntary registration at the Sub-Registrar Office via the NGDRS portal provides an unshakeable
                  evidentiary shield.
                </p>
              </div>
            </section>

            {/* SECTION 2: COMPLETE PUNJABI VASIYATNAMA FORMAT */}
            <section id="complete-punjabi-will-template" className="scroll-target scroll-mt-28 space-y-6">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ScrollText className="w-4 h-4" />
                <span>LEGAL TEMPLATE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Complete Punjabi Vasiyatnama Format: Gurmukhi Template
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Below is the comprehensive, lawyer-vetted Punjabi Vasiyatnama template. Use the toggle to view
                either the authentic Gurmukhi Punjabi script or the official English translation.
              </p>

              {/* Language Toggle & Copy Button Header */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  {/* Language Selector Pills */}
                  <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setTemplateLanguage("punjabi")}
                      className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                        templateLanguage === "punjabi"
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      ਗੁਰਮੁਖੀ ਪੰਜਾਬੀ (Native Script)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTemplateLanguage("english")}
                      className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                        templateLanguage === "english"
                          ? "bg-[#C65378] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      English Legal Translation
                    </button>
                  </div>

                  {/* Copy Action */}
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        templateLanguage === "punjabi" ? punjabiWillText : englishTranslationText,
                        setCopiedMainWill
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    {copiedMainWill ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Complete Will Format</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preformatted Template Box */}
                <div className="relative">
                  <pre
                    lang={templateLanguage === "punjabi" ? "pa" : "en"}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-slate-100 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[600px] border border-slate-800 shadow-inner"
                  >
                    {templateLanguage === "punjabi" ? punjabiWillText : englishTranslationText}
                  </pre>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2">
                  <span>Standard Plain Paper / Green Ledger Format</span>
                  <span>Section 63 Succession Act &bull; Two Witnesses Required</span>
                </div>
              </div>
            </section>

            {/* FEATURED VISUAL GUIDE: OFFICIAL PUNJABI VASIYATNAMA OVERVIEW */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 my-8">
              <div className="relative w-full">
                <Image
                  src="/images/will-format-punjabi-vasiyatnama-og.jpg"
                  alt="ਵਸੀਅਤਨਾਮਾ ਫਾਰਮੈਟ ਪੰਜਾਬੀ - Will Format in Punjabi Legal Document Structure with"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-4 bg-slate-900 text-left border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-white/90 gap-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Official Visual Guide:</strong> Gurmukhi Punjabi Vasiyatnama Architecture &amp; Execution Essentials
                  </span>
                </div>
                <span className="text-[11px] text-white/60">
                  Governed under Indian Succession Act, 1925 &amp; Punjab Land Revenue Act, 1887
                </span>
              </div>
            </div>

            {/* SECTION 3: AGRICULTURAL LAND SCHEDULE */}
            <section id="agricultural-land-schedule" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Wheat className="w-4 h-4" />
                <span>PUNJAB REVENUE SYSTEM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Agricultural Land Schedule: Khewat, Khatauni &amp; Khasra
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  The most common reason for mutation rejection or bitter court litigation in Punjab is an
                  ambiguous land description. Merely writing <em>&quot;my 5 killas of agricultural land in village
                  Nurpur&quot;</em> is legally defective because it does not identify which specific parcel or
                  co-ownership share is being bequeathed.
                </p>
                <p>
                  In Punjab&apos;s land revenue terminology, land is recorded in the <strong>Jamabandi</strong>{" "}
                  (Record of Rights) managed by the Department of Revenue, Rehabilitation and Disaster Management.
                  A challenge-proof clause must mention all four core identifiers:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong>Hadbast Number (ਹੱਦਬਸਤ ਨੰਬਰ):</strong> The official census boundary number of the
                    revenue village (Mauza).
                  </li>
                  <li>
                    <strong>Khewat Number (ਖੇਵਟ ਨੰਬਰ):</strong> The joint or individual ownership account of
                    proprietors. If co-shared, state whether you are bequeathing the entire parcel or your
                    undivided fractional share (e.g. 1/3rd share).
                  </li>
                  <li>
                    <strong>Khatauni Number (ਖਤੌਨੀ ਨੰਬਰ):</strong> The tenancy/cultivator holding record showing
                    who possesses the land.
                  </li>
                  <li>
                    <strong>Khasra / Murabba / Killa (ਖਸਰਾ / ਮੁਰੱਬਾ / ਕਿੱਲਾ):</strong> The survey field numbers
                    specifying precise plots, measured in Kanals (ਕਨਾਲ) and Marlas (ਮਰਲੇ).
                  </li>
                  <li>
                    <strong>Water &amp; Irrigation Rights (ਵਾਰਾਬੰਦੀ):</strong> Canal water turn rights (Nehri)
                    under the Northern India Canal and Drainage Act, 1873, and electricity connections for
                    submersible tube-wells.
                  </li>
                </ul>
              </div>

              {/* Copy-Pasteable Agricultural Land Schedule Block */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Wheat className="w-4 h-4 text-[#C65378]" />
                    <span>Copy-Paste Agricultural Land Schedule Block (Gurmukhi)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(landScheduleSnippet, setCopiedLandSchedule)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedLandSchedule ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Block</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  lang="pa"
                  className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap"
                >
                  {landScheduleSnippet}
                </pre>
              </div>
            </section>

            {/* SECTION 4: NRI CHILDREN INHERITANCE */}
            <section id="nri-children-inheritance" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Globe className="w-4 h-4" />
                <span>CROSS-BORDER SUCCESSION</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. NRI Children Inheritance: Cross-Border Asset Bequests
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  With millions of Punjabi families settled in Canada, the United Kingdom, the United States,
                  Australia, and Europe, cross-border transmission of ancestral land in the Doaba, Majha, and
                  Malwa regions is a high-stakes legal priority.
                </p>
                <p>
                  Under <strong>Section 6(5) of the Foreign Exchange Management Act, 1999 (FEMA)</strong>, an
                  NRI or OCI (Overseas Citizen of India) may hold, own, transfer, or invest in Indian real estate
                  if such property was acquired by way of inheritance from a person resident in India. While NRIs
                  are strictly prohibited from *purchasing* agricultural land or farmhouses in India, inheritance
                  through a valid testamentary Will is completely legal and protected by statute.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="font-extrabold text-xs uppercase tracking-wider text-[#C65378]">
                      SEPARATE INDIAN WILL ADVANTAGE
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Executing an independent Indian Will for assets in Punjab avoids costly probate re-sealing
                      petitions in foreign courts (such as Ontario or British Columbia Supreme Courts) and saves
                      months of bureaucratic delays.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="font-extrabold text-xs uppercase tracking-wider text-[#5F7E75]">
                      REPATRIATION OF SALE PROCEEDS
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      When NRI children subsequently sell inherited land, RBI allows repatriation of up to
                      <strong> USD 1,000,000 per financial year</strong> from their NRO account upon submitting
                      Form 15CA and Form 15CB certified by a Chartered Accountant.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: LEGAL COMPARISON TABLE */}
            <section id="legal-comparison-table" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>COMPARATIVE ANALYSIS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Legal Comparison: Registered vs Unregistered Punjabi Will
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Examine how different testamentary options compare under Punjab land revenue laws and civil
                court procedures:
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Evaluation Criteria</th>
                      <th className="py-3 px-4 text-[#C65378]">Registered Punjabi Will (NGDRS)</th>
                      <th className="py-3 px-4">Plain Paper Unregistered Will</th>
                      <th className="py-3 px-4">No Will (Intestate Succession)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Legal Enforceability</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">100% Valid (Section 63 ISA)</td>
                      <td className="py-3 px-4">100% Valid (Section 63 ISA)</td>
                      <td className="py-3 px-4 text-rose-700">Governed by Hindu Succession Act 1956</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Stamp Duty in Punjab</td>
                      <td className="py-3 px-4">₹0 (Zero Stamp Duty)</td>
                      <td className="py-3 px-4">₹0 (Plain paper allowed)</td>
                      <td className="py-3 px-4">Partition deed stamp duties apply</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Evidentiary Presumption</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        Strong statutory presumption under Section 114 Evidence Act
                      </td>
                      <td className="py-3 px-4">
                        Requires attesting witness proof under Section 68
                      </td>
                      <td className="py-3 px-4 text-rose-700">
                        Subject to legal heir certificate disputes
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Jamabandi Mutation Ease</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        Swift sanction by Tehsildar in Jalsa-e-Aam
                      </td>
                      <td className="py-3 px-4">
                        May face objections from contesting co-sharers
                      </td>
                      <td className="py-3 px-4 text-rose-700">
                        Equal split among all Class I heirs; fragmentation
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Archived Copy Security</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        Permanent digital scan on NGDRS &amp; SRO Book III
                      </td>
                      <td className="py-3 px-4 text-amber-700">
                        Vulnerable to physical loss, fire, or theft
                      </td>
                      <td className="py-3 px-4">Not applicable</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">NRI Asset Protection</td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        Prevents unauthorized encroachments and fraudulent sales
                      </td>
                      <td className="py-3 px-4 text-amber-700">
                        Can be contested while NRI is abroad
                      </td>
                      <td className="py-3 px-4 text-rose-700">
                        Co-sharers may file vexatious partition suits
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: PUNJAB SRO REGISTRATION GUIDE */}
            <section id="punjab-sro-registration-guide" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>PUNJAB REGISTRATION SOP</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Punjab SRO Registration Guide: NGDRS Appointment &amp; Fees
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  In Punjab, document registration is digitized under the <strong>National Generic Document
                  Registration System (NGDRS Punjab)</strong> via the portal{" "}
                  <code>ngdrs.punjab.gov.in</code>. Registering a Will at the Sub-Registrar Office (SRO) in
                  Ludhiana, Jalandhar, Amritsar, SAS Nagar (Mohali), Patiala, or Bathinda follows a structured
                  protocol:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center">
                      1
                    </div>
                    <div className="font-extrabold text-xs text-slate-900">Online Token Generation</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Upload party details, Aadhaar numbers, and draft copy onto the NGDRS Punjab portal to book
                      an appointment slot.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center">
                      2
                    </div>
                    <div className="font-extrabold text-xs text-slate-900">In-Person SRO Appearance</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      The Testator and two attesting witnesses must appear before the Sub-Registrar with original
                      Aadhaar cards and passport photos.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 text-[#C65378] font-bold text-xs flex items-center justify-center">
                      3
                    </div>
                    <div className="font-extrabold text-xs text-slate-900">Biometrics &amp; Book III Archival</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Thumbprints and digital web-camera photos are recorded. The registered Will is entered into
                      confidential Book III.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fee Schedule in Punjab:</strong> Zero stamp duty is payable on a Will. A nominal
                    registration fee (typically ₹200 to ₹500 plus pasting/facilitation charges) is deposited at the
                    SRO counter.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 7: REVENUE MUTATION SOP */}
            <section id="revenue-mutation-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building2 className="w-4 h-4" />
                <span>PUNJAB LAND REVENUE ACT</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Revenue Mutation SOP: Jamabandi &amp; Patwari Intiqal Process
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  A Will takes effect only upon the testator&apos;s death. In Punjab, transferring agricultural land
                  title from the deceased parent to the legatee requires a formal Mutation (ਇੰਤਕਾਲ / Dakhil Kharij)
                  under <strong>Section 34 of the Punjab Land Revenue Act, 1887</strong>.
                </p>
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200/90 text-xs">
                    <span className="font-bold text-[#C65378] shrink-0">Step 1:</span>
                    <span>
                      <strong>Submission to Halqa Patwari:</strong> The beneficiary submits an application along with
                      the original death certificate, copy of the Will, and the latest Jamabandi / Fard copy.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200/90 text-xs">
                    <span className="font-bold text-[#C65378] shrink-0">Step 2:</span>
                    <span>
                      <strong>Entry in Parat Patwar:</strong> The Patwari makes a preliminary entry in the Register of
                      Mutations (Parat Patwar &amp; Parat Sarkar) and issues an entry receipt to the applicant.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200/90 text-xs">
                    <span className="font-bold text-[#C65378] shrink-0">Step 3:</span>
                    <span>
                      <strong>Kanungo Verification:</strong> The Field Kanungo visits the village, compares the
                      mutation entry against the previous quadrennial Jamabandi, and signs the verification report.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200/90 text-xs">
                    <span className="font-bold text-[#C65378] shrink-0">Step 4:</span>
                    <span>
                      <strong>Sanction in Jalsa-e-Aam:</strong> The Naib Tehsildar or Tehsildar convenes an open
                      village assembly (ਜਲਸਾ-ਏ-ਆਮ). In the presence of the village Lambardar and local residents, the
                      officer verifies the absence of objections and sanctions the mutation order.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: DISINHERITANCE CLAUSES */}
            <section id="disinheritance-exclusion-clauses" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4" />
                <span>LITIGATION DEFENSE</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Specific Disinheritance Clauses: Preventing Land Disputes
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Under Indian law, a testator has testamentary freedom to bequeath self-acquired property to anyone.
                  However, under the Supreme Court doctrine established in{" "}
                  <em>H. Venkatachala Iyengar v. B.N. Thimmajamma (AIR 1959 SC 443)</em>, the complete exclusion of a
                  natural heir (such as an elder son or daughter) is treated as a &quot;suspicious circumstance&quot; if
                  left unexplained.
                </p>
                <p>
                  To bulletproof your Punjabi Will against court challenges under Section 61 (allegations of fraud or
                  coercion), you must incorporate a specific disinheritance clause stating rational, factual grounds
                  for exclusion (e.g. past cash advancements, separate business setups, or abandonment of elderly parents).
                </p>
              </div>

              {/* Copy-Paste Disinheritance Clause Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#C65378]" />
                    <span>Copyable Disinheritance Clause (Gurmukhi Script)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(disinheritanceSnippet, setCopiedDisinheritance)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedDisinheritance ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Clause</span>
                      </>
                    )}
                  </button>
                </div>
                <pre
                  lang="pa"
                  className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap"
                >
                  {disinheritanceSnippet}
                </pre>
              </div>
            </section>

            {/* SECTION 9: WITNESS & DOCTOR MANDATE */}
            <section id="witness-doctor-mandate" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <UserCheck className="w-4 h-4" />
                <span>EXECUTION PROTOCOL</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Execution Mandate: Attesting Witnesses &amp; Doctor Certificate
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Execution rules under Section 63(c) are mandatory. The Supreme Court in{" "}
                  <em>Janki Narayan Bhoir v. Narayan Namdeo Kadam (2003)</em> held that if both attesting witnesses
                  fail to prove due execution, the entire Will collapses.
                </p>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1.5">
                  <div className="font-extrabold uppercase tracking-wider text-[#C65378]">
                    CRITICAL: SECTION 67 WITNESS DISQUALIFICATION
                  </div>
                  <p>
                    Under Section 67 of the Indian Succession Act, if any beneficiary (or their spouse) signs as an
                    attesting witness, the bequest in their favour is <strong>strictly void</strong>. Never allow
                    your children, wife, or relatives who stand to inherit property to sign as witnesses.
                  </p>
                </div>
                <p>
                  For senior citizens executing a Will in Punjab, obtaining a Mental Fitness Certificate from a
                  registered MBBS doctor on the date of execution is strongly advised.
                </p>
              </div>

              {/* Copy-Paste Doctor Certificate Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#5F7E75]" />
                    <span>Copyable Doctor Medical Fitness Certificate Format</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(doctorCertSnippet, setCopiedDoctorCert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedDoctorCert ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Certificate</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {doctorCertSnippet}
                </pre>
              </div>
            </section>

            {/* SECTION 10: PUNJABI REVENUE GLOSSARY */}
            <section id="punjabi-legal-glossary" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>PUNJABI REVENUE VOCABULARY</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Punjabi Legal Glossary: Revenue Terms Explained in English
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Understanding historical revenue terms ensures accurate drafting and prevents patwari misinterpretation:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {GLOSSARY_TERMS.map((term, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900">{term.pa}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {term.en}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{term.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: LANDMARK CASE STUDIES */}
            <section id="landmark-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Gavel className="w-4 h-4" />
                <span>PRECEDENTS &amp; LITIGATION LESSONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Landmark Case Studies: Amritsar, Jalandhar &amp; Ludhiana
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Real-world testamentary disputes resolved under Punjab High Court and Supreme Court rulings:
              </p>

              <div className="space-y-3 pt-1">
                {/* Case 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      CASE STUDY 1: JALANDHAR NRI AGRICULTURAL BEQUEST
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Will Upheld
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Challenge by Resident Sibling Claiming Adverse Possession against Canadian NRI Sister
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A father in Jalandhar bequeathed his 8-acre agricultural holding to his Canadian NRI daughter
                    via a registered Gurmukhi Will, explicitly identifying Khewat No. 42 and Khasra parcels. The
                    resident brother claimed that NRIs cannot hold farmland and alleged adverse possession. The
                    Punjab &amp; Haryana High Court dismissed the challenge, ruling that under FEMA Section 6(5)
                    and the Succession Act, an NRI has absolute title by inheritance, and a co-heir cannot plead
                    adverse possession.
                  </p>
                </div>

                {/* Case 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      CASE STUDY 2: LUDHIANA WITNESS BENEFICIARY TRAP
                    </span>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                      Bequest Voided
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Son-in-Law Signed as Attesting Witness to House Property Bequest
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In a Ludhiana estate, the testator bequeathed a prime commercial shop to his youngest daughter.
                    However, her husband signed as the second attesting witness. Upon the testator&apos;s demise, the
                    other siblings invoked Section 67 of the Indian Succession Act. The civil court held that
                    although the Will was genuine, the bequest to the daughter was legally void because her husband
                    was an attesting witness, reverting the shop back to joint intestate succession.
                  </p>
                </div>

                {/* Case 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      CASE STUDY 3: AMRITSAR MISSING KHASRA MUTATION REJECTION
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      Mutation Disputed
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Unregistered Will Mentioning Generic &quot;Ancestral Land&quot; without Khewat Numbers
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An unregistered Will drafted in Amritsar bequeathed &quot;all my ancestral agricultural lands in
                    Majha&quot; without mentioning Khewat, Khatauni, or Khasra survey numbers. The Halqa Patwari
                    refused to record the Intiqal, stating that the testator was only a co-sharer in joint khewat.
                    The matter resulted in a protracted 6-year partition dispute before the Revenue Collector.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 12: WILL DRAFTING SOP & TOOLS LINK */}
            <section id="will-drafting-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Clock className="w-4 h-4" />
                <span>STEP-BY-STEP WORKFLOW</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Step-by-Step SOP: Drafting a Legally Binding Punjabi Will
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  Follow this 6-step Standard Operating Procedure to draft, execute, and safeguard your Punjabi Will:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                    <span className="font-bold text-xs text-[#C65378]">Step 1: Obtain Latest Fard</span>
                    <p className="text-xs text-slate-600">
                      Procure an updated certified Jamabandi extract from the Fard Kendra (PLRS) to record current
                      Khewat, Khatauni, and Khasra numbers.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                    <span className="font-bold text-xs text-[#C65378]">Step 2: Appoint Independent Executor</span>
                    <p className="text-xs text-slate-600">
                      Nominate a trustworthy individual (or a professional executor) with authority to manage
                      revenue mutation and bank distribution.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                    <span className="font-bold text-xs text-[#C65378]">Step 3: Draft Clear Bequests</span>
                    <p className="text-xs text-slate-600">
                      Use our Gurmukhi template above. If disinheriting any legal heir, record clear factual reasons
                      to eliminate suspicious circumstances.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                    <span className="font-bold text-xs text-[#C65378]">Step 4: Secure Doctor Fitness Proof</span>
                    <p className="text-xs text-slate-600">
                      Obtain an MBBS mental fitness certificate on the date of execution to pre-empt cognitive
                      incapacity challenges.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                    <span className="font-bold text-xs text-[#C65378]">Step 5: Two Neutral Witnesses</span>
                    <p className="text-xs text-slate-600">
                      Execute in the simultaneous presence of two independent non-beneficiary witnesses (Section 67
                      compliance).
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                    <span className="font-bold text-xs text-[#C65378]">Step 6: Optional SRO Registration</span>
                    <p className="text-xs text-slate-600">
                      Book an NGDRS Punjab slot and register the Will before the Sub-Registrar for permanent digital
                      archival in Book III.
                    </p>
                  </div>
                </div>

                {/* MID-ARTICLE CONTEXTUAL LINK TO INTERACTIVE CALCULATOR */}
                <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#172228] text-white p-6 shadow-md space-y-3 mt-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-rose-200">
                    <Calculator className="w-3.5 h-3.5 text-[#C65378]" />
                    <span>TAX PLANNING ON INHERITED REAL ESTATE</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    Planning to Sell Inherited Land in Punjab? Calculate Capital Gains Tax
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Under the Finance (No. 2) Act, 2024 grandfathering provisions, properties acquired prior to July
                    23, 2024 can choose between <strong>12.5% flat tax vs 20% indexation</strong>. In addition,
                    multiple siblings inheriting agricultural land each receive a separate ₹50 Lakh Section 54EC bond
                    limit. Use our statutory tax tool to evaluate potential savings:
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href="/tools/capital-gains-tax-calculator-inherited-property"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Inherited Property Tax Calculator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/tools/succession-calculator"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Legal Heir Share Calculator</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 13: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>LEGAL EXPERTISE &amp; TRUST SIGNALS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Institutional Profile: Legal Excellence &amp; Trust Signals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Vernacular Succession Bench
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Bar Council Verified Succession Counsel</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in is India&apos;s leading succession planning and estate transmission platform,
                  operated in collaboration with AMA Legal Solutions. Our specialized Punjab estate desk handles
                  Gurmukhi Will drafting, agricultural land title verification, cross-border NRI asset bequests,
                  and Sub-Registrar execution across Ludhiana, Jalandhar, Amritsar, Mohali, and Patiala. Over 15,000
                  families have secured their legacy through our dispute-proof testamentary instruments.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/nri-will-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>NRI Will for India</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>SRO Will Registration</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/tools/probate-checker"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>Probate Requirement Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 14: FAQS ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                14. Frequently Asked Questions: Punjabi Vasiyatnama Guide
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                Plain-language answers to vital legal questions regarding Gurmukhi Wills, agricultural mutation,
                and NRI inheritance in Punjab:
              </p>

              {/* Accordion Stack */}
              <div className="space-y-3 pt-2">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors hover:border-slate-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                        className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm sm:text-base"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C65378] shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 15: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>PRIMARY LEGAL SOURCES</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                15. Statutory Citations &amp; Official Punjab Revenue Portals
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    Primary Statutory Authorities &amp; Landmark Precedents:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Indian Succession Act, 1925 - Sections 59, 63, 67, 74 &amp; 213</li>
                    <li>Punjab Land Revenue Act, 1887 - Section 34 (Mutation Protocol)</li>
                    <li>Registration Act, 1908 - Sections 18(e), 40, 41 (Book III Will Registration)</li>
                    <li>Foreign Exchange Management Act, 1999 (FEMA) - Section 6(5) (NRI Inheritance)</li>
                    <li>Supreme Court of India: <em>Kanta Yadav v. Om Prakash Yadav (2020)</em> (No Probate in Punjab)</li>
                    <li>Supreme Court of India: <em>H. Venkatachala Iyengar v. B.N. Thimmajamma (1959)</em> (Attestation Proof)</li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://jamabandi.punjab.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Punjab Land Records (Jamabandi)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://jamabandi.punjab.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>NGDRS Punjab Registration Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://plrs.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>Punjab Land Records Society (PLRS)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Related WillDrafting Vernacular Templates &amp; Guides
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Indian Legal Will Template
                    </Link>
                    <Link
                      href="/templates/will-format-hindi"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Hindi Vasiyatnama Format
                    </Link>
                    <Link
                      href="/templates/nri-separate-indian-will-format"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      NRI Separate Indian Will Format
                    </Link>
                    <Link
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
                    >
                      Sub-Registrar Will Registration Desk
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR (NO MOBILE NUMBER)
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
                Specialist in Indian testamentary jurisprudence, Punjab Land Revenue Act mutations, Section 63
                evidentiary defense, and cross-border NRI inheritance structuring.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>AMA Legal Solutions</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
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
                  <span>PREVENT AGRICULTURAL LAND DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  Protect Your Farmland from Protracted Partition Lawsuits
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  A precisely drafted, lawyer-vetted Will with exact Khewat &amp; Khasra details ensures clean
                  revenue mutation and protects your children&apos;s inheritance rights.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Your Will Online in 15 Mins</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Section 63 Compliant &bull; Ready for SRO</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card - NO MOBILE NUMBER) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>PUNJAB SUCCESSION DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  Need Help with High-Value Farmland or NRI Inheritance?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our High Court testamentary advocates advise on agricultural land partition, SRO NGDRS
                  registration in Punjab, and FEMA cross-border bequests.
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
                  Why Punjab Families Trust WillDrafting
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Gurmukhi Legal Precision:</strong> Fully vetted under Section 63 of Indian Succession Act.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Revenue Compliant:</strong> Formatted for Halqa Patwari &amp; Tehsildar mutation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>FEMA Sec 6(5) Protected:</strong> Safeguards inheritance for NRI children in Canada/UK/USA.
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
          href="#complete-punjabi-will-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <ScrollText className="w-3.5 h-3.5" />
          <span>View Template</span>
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
