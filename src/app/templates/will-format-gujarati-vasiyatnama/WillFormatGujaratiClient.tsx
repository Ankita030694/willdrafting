"use client";

import React, { useState } from "react";
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
} from "lucide-react";

const TOC_ITEMS = [
  { id: "statutory-validity", label: "1. Legal Validity of Gujarati Will" },
  { id: "gujarati-vasiyatnama-template", label: "2. Native Gujarati Vasiyatnama Format" },
  { id: "gujarati-english-glossary", label: "3. Legal Terms Glossary" },
  { id: "gujarat-sro-registration-sop", label: "4. Gujarat SRO Registration SOP" },
  { id: "plain-paper-vs-registered", label: "5. Plain Paper vs Registered Will" },
  { id: "agricultural-land-tenancy-act", label: "6. Agricultural Land Bequest Rules" },
  { id: "section-63-checklist", label: "7. Section 63 Execution Checklist" },
  { id: "succession-calculators-tools", label: "8. Inheritance & Tax Calculators" },
  { id: "practical-regional-case-studies", label: "9. Gujarat Case Studies (Ahmedabad, Surat)" },
  { id: "copy-paste-attestation-clause", label: "10. Copyable Attestation & Medical Form" },
  { id: "institutional-profile", label: "11. Legal Backing & Advocate Profile" },
  { id: "frequently-asked-questions", label: "12. Frequently Asked Questions" },
  { id: "statutory-citations", label: "13. Statutory Citations & Portals" },
];

const FAQS = [
  {
    q: "ગુજરાતીમાં લખેલું વસીયતનામું શું કાયદેસર ગણાય છે? (Is a Gujarati Will legally valid?)",
    a: "હા, સંપૂર્ણપણે કાયદેસર છે. ભારતીય ઉત્તરાધિકાર અધિનિયમ, 1925 (Indian Succession Act, 1925) ની કલમ 63 મુજબ વિલ કોઈપણ ભાષામાં લખી શકાય છે. ગુજરાતી ભાષામાં સાદા કાગળ પર લખેલું વસીયતનામું, જો તેના પર ટેસ્ટેટરની સહી અને બે પુખ્ત સાક્ષીઓની સાક્ષી હોય, તો ભારતીય અદાલતોમાં 100% માન્ય છે.",
  },
  {
    q: "શું ગુજરાતમાં વસીયતનામું સ્ટેમ્પ પેપર પર બનાવવું ફરજિયાત છે? (Is stamp paper mandatory in Gujarat?)",
    a: "ના, વસીયતનામું કોઈપણ સ્ટેમ્પ પેપર પર બનાવવું ફરજિયાત નથી. ગુજરાત સ્ટેમ્પ અધિનિયમ, 1958 અને ભારતીય સ્ટેમ્પ કાયદા હેઠળ વસીયતનામા પર સ્ટેમ્પ ડ્યુટીમાંથી સંપૂર્ણ મુક્તિ છે. તમે સાદા A4 કાગળ અથવા ગ્રીન લેજર પેપર પર વિલ લખી શકો છો.",
  },
  {
    q: "વસીયતનામા માટે કેટલા સાક્ષીઓ હોવા જરૂરી છે? (How many witnesses are required?)",
    a: "કલમ 63(c) મુજબ ઓછામાં ઓછા બે (2) પુખ્ત અને સક્ષમ સાક્ષીઓની સહી હોવી ફરજિયાત છે. બંને સાક્ષીઓએ ટેસ્ટેટરને સહી કરતા રૂબરૂ જોયેલા હોવા જોઈએ. સૌથી મહત્વનો નિયમ: કલમ 67 મુજબ વિલના લાભાર્થી (વારસદાર) કે તેના પતિ/પત્ની સાક્ષી બની શકતા નથી. સાક્ષી હંમેશા તટસ્થ વ્યક્તિ (જેમ કે ફેમિલી ડૉક્ટર, સીએ કે મિત્ર) હોવા જોઈએ.",
  },
  {
    q: "શું ગુજરાતમાં વસીયતનામાની નોંધણી (Registration) કરાવવી ફરજિયાત છે? (Is registration mandatory?)",
    a: "નોંધણી અધિનિયમ, 1908 (Registration Act) ની કલમ 18(e) મુજબ વસીયતનામાની રજિસ્ટ્રેશન મરજિયાત (optional) છે. બિન-નોંધાયેલું વિલ પણ કાયદેસર છે. જોકે સબ-રજિસ્ટ્રાર કચેરી (SRO) ખાતે રજિસ્ટ્રેશન કરાવવાથી બનાવટી દસ્તાવેજ કે દબાણના આક્ષેપો સામે મજબૂત કાનૂની પુરાવો મળે છે.",
  },
  {
    q: "ખેતીની જમીનનું વસીયતનામું બિન-ખેડૂતને કરી શકાય? (Can agricultural land in Gujarat be bequeathed to non-agriculturists?)",
    a: "મુંબઈ ગણોત વહીવટ અને ખેતીની જમીન અધિનિયમ, 1948 (Bombay Tenancy Act) ની કલમ 63 અને સુપ્રીમ કોર્ટના ચુકાદા મુજબ, ખેતીની જમીન વસીયતનામા દ્વારા પણ બિન-ખેડૂત વ્યક્તિને આપી શકાતી નથી. જો વિલ દ્વારા બિન-ખેડૂતને ખેતીની જમીન આપવામાં આવે તો તે ટ્રાન્સફર રદબાતલ ઠરી શકે છે અને કલમ 84C હેઠળ જમીન સરકાર હસ્તક જઈ શકે છે.",
  },
  {
    q: "વહીવટકર્તા (Executor) ની નિમણૂક શા માટે જરૂરી છે? (Why appoint an Executor in a Gujarati Will?)",
    a: "વહીવટકર્તા એ વ્યક્તિ છે જેને ટેસ્ટેટર પોતાના અવસાન બાદ મિલકતોની વહેંચણી, બેંક ખાતાઓનું સમાધાન, સોનાની વહેંચણી અને મ્યુટેશન કરાવવાની કાનૂની જવાબદારી સોંપે છે. વિશ્વસનીય એક્ઝિક્યુટર રાખવાથી વારસદારો વચ્ચે ઝઘડા કે કોર્ટ વિવાદ અટકે છે.",
  },
  {
    q: "શું વસીયતનામું ગમે ત્યારે બદલી કે રદ કરી શકાય છે? (Can a Gujarati Will be changed or revoked?)",
    a: "હા, ટેસ્ટેટર પોતાના જીવનકાળ દરમિયાન અને સ્વસ્થ માનસિક સ્થિતિમાં હોય ત્યાં સુધી ગમે તેટલી વાર નવું વિલ બનાવી શકે છે અથવા જૂનું વિલ રદ (Revoke) કરી શકે છે. કલમ 62 મુજબ બનાવેલું છેલ્લું વસીયતનામું જ કાયદેસર અમલમાં આવે છે. નાના ફેરફારો માટે કોડિસિલ (Codicil) પણ બનાવી શકાય છે.",
  },
  {
    q: "વિદેશમાં રહેતા NRI ગુજરાતીઓ પોતાની ગુજરાતની મિલકત માટે વિલ કેવી રીતે બનાવી શકે? (How can NRIs draft a Will for Gujarat property?)",
    a: "NRI ગુજરાતીઓ ભારતીય મિલકતો (અમદાવાદ, વડોદરા, સુરત, રાજકોટ વગેરે) માટે સ્વતંત્ર ભારતીય વિલ બનાવી શકે છે. તેઓ વિદેશમાં બે સાક્ષીઓની હાજરીમાં વિલ સહી કરીને ભારતીય વાણિજ્ય દૂતાવાસ (Indian Embassy/Consulate) માં નોટરાઈઝ અથવા એપોસ્ટિલ કરાવી શકે છે.",
  },
];

const GLOSSARY_TERMS = [
  { gu: "વસીયતનામું (Vasiyatnama)", en: "Last Will and Testament", desc: "A person's legal declaration of the intention regarding disposal of their property after death." },
  { gu: "વસીયતકર્તા / ટેસ્ટેટર (Testator)", en: "Testator", desc: "The individual of sound mind who executes and signs the Will." },
  { gu: "વહીવટકર્તા (Executor)", en: "Executor", desc: "The trusted fiduciary appointed by the testator to distribute assets and execute instructions." },
  { gu: "લાભાર્થી / વારસદાર (Legatee)", en: "Beneficiary / Legatee", desc: "The person or entity named in the Will to receive movable or immovable assets." },
  { gu: "સ્થાવર મિલકત (Sthavar Milkat)", en: "Immovable Property", desc: "Real estate assets including land, houses, residential flats, shops, and agricultural plots." },
  { gu: "જંગમ મિલકત (Jangam Milkat)", en: "Movable Property", desc: "Liquid and portable assets including bank accounts, fixed deposits, gold jewellery, mutual funds, and cars." },
  { gu: "સાક્ષી (Attesting Witness)", en: "Attesting Witness", desc: "Independent person who sees the testator sign the Will and attests in the testator's presence." },
  { gu: "અવશેષ મિલકત (Residuary Estate)", en: "Residuary Estate", desc: "All remaining assets not specifically named or acquired after executing the Will." },
  { gu: "કોડિસિલ (Codicil)", en: "Codicil", desc: "A supplementary legal document making minor amendments or additions to an existing Will." },
  { gu: "પ્રોબેટ (Probate)", en: "Probate", desc: "Official court certification under court seal confirming the legal validity of a Will." },
  { gu: "સ્વ-ઉપાર્જિત મિલકત (Self-Acquired)", en: "Self-Acquired Property", desc: "Property purchased with individual earnings over which the testator has 100% testamentary right." },
  { gu: "વારસાગત મિલકત (Ancestral)", en: "Ancestral Property", desc: "Property inherited through 4 generations of coparcenary, where only the undivided coparcenary share can be willed." },
];

export default function WillFormatGujaratiClient() {
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
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const [copiedAttestation, setCopiedAttestation] = useState<boolean>(false);
  const [copiedDoctorCert, setCopiedDoctorCert] = useState<boolean>(false);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyTemplateToClipboard = () => {
    const templateText = `|| શ્રી ગણેશાય નમઃ ||
છેલ્લું વસીયતનામું (LAST WILL AND TESTAMENT)

હું નીચે સહી કરનાર, [વસીયતકર્તાનું પૂરું નામ], ઉંમર આશરે [ઉંમર] વર્ષ, ધર્મ: [હિન્દુ/જૈન/અન્ય], વ્યવસાય: [ધંધો/નોકરી/નિવૃત્ત], રહેવાસી: [ઘર નં., સોસાયટીનું નામ, રોડ, વિસ્તાર, શહેર/ગામ, જિલ્લો, ગુજરાત - પિનકોડ], ભારતીય નાગરિક, આધાર કાર્ડ નં.: [XXXX-XXXX-XXXX], પાન કાર્ડ નં.: [XXXXX0000X].

હું આ વસીયતનામું સંપૂર્ણપણે શારીરિક અને માનસિક રીતે સ્વસ્થ હાલતમાં, કોઈના પણ દાબ, દબાણ, અનુચિત પ્રભાવ, કે લાલચ વગર મારી પોતાની સ્વતંત્ર ઇચ્છા અને રાજીખુશીથી કરું છું.

૧. પૂર્વવર્તી વસીયતનામા રદ કરવાની કલમ:
મેં આ તારીખ પહેલાં જો કોઈ પણ વસીયતનામું, વિલ, અથવા કોડિસિલ કરેલું હોય, તો તે આ દસ્તાવેજથી સંપૂર્ણપણે રદબાતલ (Revoked and Cancelled) જાહેર કરું છું. આ મારું છેલ્લું અને અંતિમ વસીયતનામું છે.

૨. એક્ઝિક્યુટર / વહીવટકર્તાની નિમણૂક:
મારા અવસાન બાદ આ વસીયતનામાની શરતો અને વહેંચણીનો કાયદેસર અમલ કરાવવા માટે હું શ્રી/શ્રીમતી [વહીવટકર્તાનું પૂરું નામ], ઉંમર: [ઉંમર], રહેવાસી: [સરનામું], જેઓ મારા [સંબંધ - દા.ત. પુત્ર / મિત્ર / વડીલ] છે, તેમને મારા વિલના સોલ એક્ઝિક્યુટર (Sole Executor) તરીકે નિયુક્ત કરું છું.

૩. સ્થાવર મિલકતોની વહેંચણી (Immovable Properties):
મારા નામે રહેલી નીચે દર્શાવેલી સ્વ-ઉપાર્જિત (Self-Acquired) સ્થાવર મિલકતો મારા અવસાન બાદ નીચે મુજબના વારસદારોને પ્રાપ્ત થશે:
(અ) રહેણાંક ફ્લેટ / મકાન:
મિલકતની વિગત: [સોસાયટીનું નામ, બ્લોક નં., ફ્લેટ નં., ટી.પી. સ્કીમ નં., ફાઇનલ પ્લોટ નં., સબ-ડિસ્ટ્રિક્ટ, શહેર].
આ મિલકત મારા અવસાન બાદ સંપૂર્ણ માલિકી હક્ક સાથે મારા [સંબંધ, દા.ત. પત્ની/પુત્ર/પુત્રી] શ્રી/શ્રીમતી [વારસદારનું નામ] ને મળશે.

(બ) દુકાન / ઓફિસ / પ્લોટ:
મિલકતની વિગત: [દુકાન/ઓફિસ નં., બિલ્ડિંગનું નામ, વિસ્તાર, સર્વે નં.].
આ મિલકત મારા અવસાન બાદ મારા [સંબંધ અને નામ] ને સંપૂર્ણ હક્કથી મળશે.

(ક) ખેતીની જમીન (ખેડૂત વારસદાર માટે):
મિલકતની વિગત: [ગામ, તાલુકો, જિલ્લો, રેવન્યુ સર્વે નં., ખાતા નં., હેક્ટર-આરે].
આ ખેતીની જમીન મારા ખેડૂત ખાતેદાર વારસદાર શ્રી [વારસદારનું નામ] ને મળશે.

૪. જંગમ મિલકતોની વહેંચણી (Movable Properties):
(અ) બેંક બચત ખાતા, એફ.ડી. (Fixed Deposits) અને રોકડ:
[બેંકનું નામ], શાખા: [બ્રાન્ચ], ખાતા નં.: [XXXXXXXXXXXX] તથા ફિક્સ્ડ ડિપોઝિટ્સમાં જમા રકમ મારા [વારસદારનું નામ] ને મળશે.

(બ) સોના-ચાંદીના દાગીના:
મારા ઘરમાં અથવા બેંક લોકરમાં રહેલા સોના-ચાંદીના તમામ ઘરેણાં મારા [પત્ની/પુત્રી/પુત્રવધૂનું નામ] ને પ્રાપ્ત થશે.

(ક) ડિમેટ ખાતું અને શેર રોકાણ:
[ડિપોઝિટરી/બ્રોકરનું નામ], ડિમેટ ખાતા નં.: [XXXXXXXX] ના શેર્સ અને મ્યુચ્યુઅલ ફંડ્સ મારા [વારસદારનું નામ] ને ટ્રાન્સફર થશે.

૫. અવશેષ મિલકત કલમ (Residuary Clause):
ઉપર દર્શાવ્યા સિવાયની મારી અન્ય કોઈ પણ સ્થાવર કે જંગમ મિલકત, અથવા આ વિલ કર્યા પછી મારા જીવનકાળ દરમિયાન હું ખરીદું કે મને મળે, તે તમામ અવશેષ મિલકત મારા [વારસદારનું નામ] ને મળશે.

૬. અંતિમ વિનંતી:
મારા તમામ વારસદારોને મારી નમ્ર વિનંતી છે કે તેઓ મારા અવસાન બાદ કોઈપણ કલેશ, વિવાદ કે મુકદ્દમાબાજી વગર પ્રેમ અને સદ્ભાવનાથી આ વસીયતનામાનું પાલન કરે.

આ વસીયતનામું મેં સમજી-વિચારીને, વાંચીને, મારી રાજીખુશીથી આજ રોજ તારીખ: [તારીખ-માસ-વર્ષ] ના રોજ [સ્થળ, દા.ત. અમદાવાદ] મુકામે નીચે જણાવેલા બે સાક્ષીઓની રૂબરૂ સહી કરી આપ્યું છે.

______________________________
ટેસ્ટેટરની સહી / અંગૂઠાનું નિશાન
[વસીયતકર્તાનું પૂરું નામ]

સાક્ષીઓનું પ્રમાણપત્ર (ATTESTATION CLAUSE)
અમે નીચે સહી કરનાર બંને સાક્ષીઓ ખાતરીપૂર્વક પ્રમાણિત કરીએ છીએ કે ટેસ્ટેટર શ્રી [વસીયતકર્તાનું નામ] એ અમારી બંનેની એકસાથે પ્રત્યક્ષ હાજરીમાં આ વસીયતનામા પર પોતાની સહી કરેલ છે. ટેસ્ટેટર તે વખતે સંપૂર્ણ માનસિક સ્વસ્થતા ધરાવતા હતા અને તેમના પર કોઈનું દબાણ ન હતું. ત્યારબાદ ટેસ્ટેટરની પ્રત્યક્ષ હાજરીમાં અને તેમની વિનંતીથી અમે બંને સાક્ષીઓએ પણ એકબીજાની હાજરીમાં આ વસીયતનામા પર સાક્ષી તરીકે સહી કરેલ છે.

સાક્ષી ૧:
સહી: _______________________
નામ: [સાક્ષી ૧ નું પૂરું નામ]
પિતા/પતિનું નામ: [નામ]
સરનામું: [સંપૂર્ણ સરનામું, શહેર, ગુજરાત]
આધાર / ઓળખપત્ર નં.: [XXXX-XXXX-XXXX]

સાક્ષી ૨:
સહી: _______________________
નામ: [સાક્ષી ૨ નું પૂરું નામ]
પિતા/પતિનું નામ: [નામ]
સરનામું: [સંપૂર્ણ સરનામું, શહેર, ગુજરાત]
આધાર / ઓળખપત્ર નં.: [XXXX-XXXX-XXXX]`;

    navigator.clipboard.writeText(templateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 3000);
  };

  const copyAttestationClause = () => {
    const clauseText = `સાક્ષીઓનું પ્રમાણપત્ર (STATUTORY ATTESTATION CLAUSE - SECTION 63 COMPLIANCE):
"અમે નીચે સહી કરનાર બંને સાક્ષીઓ ખાતરીપૂર્વક પ્રમાણિત કરીએ છીએ કે વસીયતકર્તા શ્રી/શ્રીમતી [ટેસ્ટેટરનું પૂરું નામ] એ અમારી બંનેની પ્રત્યક્ષ હાજરીમાં આ વસીયતનામાના દરેક પાના પર વાંચી-સમજીને સહી કરેલ છે. તે સમયે તેઓ સંપૂર્ણ સ્વસ્થ ચિત્તે અને કોઈના દબાણ વગર નિર્ણય લેવા સક્ષમ હતા. વસીયતકર્તાની હાજરીમાં અને તેમની સૂચનાથી અમે બંને સાક્ષીઓએ એકબીજાની રૂબરૂ સાક્ષી તરીકે સહી કરેલ છે. અમે જાહેર કરીએ છીએ કે અમે આ વસીયતનામા હેઠળ કોઈ પણ મિલકતના લાભાર્થી (Beneficiary) નથી."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedAttestation(true);
    setTimeout(() => setCopiedAttestation(false), 3000);
  };

  const copyDoctorCert = () => {
    const docText = `તબીબી સ્વસ્થતા પ્રમાણપત્ર (REGISTERED MEDICAL PRACTITIONER FITNESS CERTIFICATE):
"I hereby certify that I have medically examined Shri/Smt. [Testator Full Name], aged [Age] years, resident of [Address], on this day [Date] at [Time]. In my professional medical opinion, the testator is completely alert, oriented to time, place, and person, possesses sound disposing mind and testamentary capacity, and is fully capable of understanding the nature and effect of executing his/her Last Will and Testament."
Doctor Name: Dr. [Name] | Qualification: [MBBS/MD] | Reg No.: [GMC Reg No.]`;
    navigator.clipboard.writeText(docText);
    setCopiedDoctorCert(true);
    setTimeout(() => setCopiedDoctorCert(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#172228] font-sans selection:bg-[#C65378] selection:text-white">
      {/* =========================================================================
          LAYER 1: HERO SECTION (Full-Width Brand Navy - Matching Tool Theme)
          ========================================================================= */}
      <section className="relative w-full bg-[#172228] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C65378]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5F7E75]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Category Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-rose-200 mb-6 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#C65378]" />
            <span>INDIAN SUCCESSION ACT, 1925 S. 63 • GUJARAT REGISTRATION RULES</span>
          </div>

          {/* Strict Single H1 Tag (Length 30-65 chars, 0 em-dashes) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
            વસીયતનામું ફોર્મેટ ગુજરાતી: Legal Will Format in Gujarati
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto mb-8">
            કાનૂની રીતે માન્ય <strong>વસીયતનામું ફોર્મેટ ગુજરાતી</strong> સાદા કાગળ પર ડાઉનલોડ કરો. કલમ
            63 ના સાક્ષી નિયમો, ગુજરાત સબ-રજિસ્ટ્રાર નોંધણી પદ્ધતિ, અને ખેતીની જમીન વહેંચણીના વિશિષ્ટ
            નિયમો સાથે.
          </p>

          {/* Action CTAs in Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#gujarati-vasiyatnama-template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <ScrollText className="w-4 h-4" />
              <span>વિલ ફોર્મેટ જુઓ અને કોપી કરો</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleStartDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#172228] hover:bg-slate-100 font-extrabold text-sm sm:text-base transition-transform hover:-translate-y-0.5 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#C65378]" />
              <span>ઓનલાઈન વિલ તૈયાર કરો (૧૫ મિનિટ)</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 2: STATS STRIP (Full-Width Trust Signals)
          ========================================================================= */}
      <section className="w-full border-b border-[#172228]/10 bg-gradient-to-r from-rose-50/70 via-[#FAF7F0] to-emerald-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">કલમ ૬૩</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ૨ સાક્ષીઓનું અટેસ્ટેશન
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">૦% સ્ટેમ્પ ડ્યુટી</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                સાદા કાગળ પર માન્ય
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">બુક ૩ SRO</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                મરજિયાત સરકારી નોંધણી
              </div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#172228]">૧૦૦% માન્ય</div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#49585F] mt-0.5">
                ગુજરાત હાઇકોર્ટ સમર્થિત
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LAYER 3: THREE-COLUMN GRID (Main Content & Modules)
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
                <span>અનુક્રમણિકા (INDEX)</span>
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

            {/* Statutory Authority Badge */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#172228]">
                <ShieldCheck className="w-4 h-4 text-[#5F7E75]" />
                <span>કાનૂની માળખું</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Governed under Sections 59, 63 &amp; 67 of the Indian Succession Act, 1925, Section 18(e)
                of the Registration Act, 1908, and Gujarat Registration Rules, 1970.
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
                <span>મુખ્ય કાનૂની મુદ્દા (EXECUTIVE BRIEF: GUJARATI WILL)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>ભાષાની માન્યતા:</strong> ગુજરાતી ભાષામાં લખાયેલું વસીયતનામું સંપૂર્ણપણે કાયદેસર
                    છે. ભારતીય કાયદામાં અંગ્રેજીમાં જ વિલ લખવું ફરજિયાત નથી.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>સ્ટેમ્પ પેપરની જરૂર નથી:</strong> વસીયતનામું સાદા સફેદ કાગળ કે લેજર પેપર પર
                    લખી શકાય છે. ગુજરાતમાં વિલ પર કોઈ સ્ટેમ્પ ડ્યુટી લાગતી નથી.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>બે સાક્ષીઓનો કડક નિયમ (કલમ ૬૩):</strong> વસીયતકર્તા સિવાય ઓછામાં ઓછા બે પુખ્ત
                    સાક્ષીઓની સહી હોવી ફરજિયાત છે. વિલનો વારસદાર સાક્ષી બની શકતો નથી (કલમ ૬૭).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>ખેતીની જમીન સાવચેતી:</strong> મુંબઈ ગણોત અધિનિયમની કલમ ૬૩ મુજબ, ગુજરાતમાં
                    ખેતીની જમીન બિન-ખેડૂતને વસીયતનામા દ્વારા પણ આપી શકાતી નથી.
                  </span>
                </li>
              </ul>
            </div>

            {/* FEATURED VISUAL ASSET: HIGH-RESOLUTION OG BANNER */}
            <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-3 sm:p-4 space-y-3">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src="/images/will-format-gujarati-vasiyatnama-og.jpg"
                  alt="વસીયતનામું ફોર્મેટ ગુજરાતી - Legal Will Format in Gujarati with Indian Succession Act"
                  width={1200} height={675}
                  priority
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 65vw"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-[#C65378]" />
                  <span>પ્રમાણિત ગુજરાતી વસીયતનામું દસ્તાવેજ અને કાનૂની માર્ગદર્શિકા</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1 text-[#C65378] hover:text-[#a33b5c] font-bold"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>પ્રિન્ટ લેઆઉટ</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 1: STATUTORY VALIDITY */}
            <section id="statutory-validity" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>કાનૂની સ્થાપના અને અધિકારક્ષેત્ર</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                1. Statutory Rules: Will Legal Validity in Gujarat
              </h2>
              <div className="space-y-3 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  ગુજરાતમાં વસતા પરિવારો અને વિદેશમાં રહેતા NRI ગુજરાતીઓમાં વસીયતનામું (Will) બનાવતી વખતે
                  સૌથી મોટો પ્રશ્ન એ થાય છે કે શું ગુજરાતી ભાષામાં લખાયેલું વિલ કાનૂની દૃષ્ટિએ માન્ય ગણાય?
                  ભારતીય ઉત્તરાધિકાર અધિનિયમ, ૧૯૨૫ (Indian Succession Act, 1925) ની કલમ ૭૪ સ્પષ્ટ કરે છે કે
                  વસીયતકર્તાનો આશય સ્પષ્ટ હોવો જોઈએ. કાયદો કોઈ ચોક્કસ ટેકનિકલ ભાષા કે માત્ર અંગ્રેજી ભાષાનો
                  આગ્રહ રાખતો નથી.
                </p>
                <p>
                  કલમ ૬૩ (Section 63) હેઠળ કોઈપણ વ્યક્તિ પોતાની સ્વ-ઉપાર્જિત મિલકતોનું વિલ ગુજરાતી ભાષામાં
                  સાદા કાગળ પર લખી શકે છે. ગુજરાત હાઇકોર્ટે વિવિધ સીમાચિહ્નરૂપ ચુકાદાઓમાં પુષ્ટિ કરી છે કે
                  જો વસીયતકર્તા સ્વસ્થ ચિત્ત ધરાવતા હોય, પોતાની રાજીખુશીથી સહી કરેલ હોય, અને બે સક્ષમ
                  સાક્ષીઓએ રૂબરૂ સહી કરેલ હોય, તો ગુજરાતી વિલ દેશની કોઈપણ અદાલતમાં ૧૦૦% કાયદેસર અને અમલી
                  છે.
                </p>
                <p>
                  ગુજરાત રજિસ્ટ્રેશન રૂલ્સ, ૧૯૭૦ (Gujarat Registration Rules, 1970) મુજબ વસીયતનામાની
                  નોંધણી સ્થાનિક સબ-રજિસ્ટ્રાર કચેરી (SRO) ખાતે બુક-૩ (Book III) માં કરવામાં આવે છે.
                  રજિસ્ટ્રેશન મરજિયાત હોવા છતાં, તે ભવિષ્યમાં વારસદારો વચ્ચે થતા મુકદ્દમા સામે સુરક્ષા કવચ
                  પૂરું પાડે છે.
                </p>
              </div>
            </section>

            {/* SECTION 2: COMPLETE GUJARATI VASIYATNAMA TEMPLATE */}
            <section
              id="gujarati-vasiyatnama-template"
              className="scroll-target scroll-mt-28 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <ScrollText className="w-4 h-4" />
                <span>કાનૂની ડ્રાફ્ટ ટેમ્પલેટ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                2. Native Gujarati Vasiyatnama Format Template
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                નીચે ભારતીય ઉત્તરાધિકાર અધિનિયમની કલમ ૬૩ મુજબ તૈયાર કરેલું સંપૂર્ણ ગુજરાતી વસીયતનામું
                આપેલ છે. તમે તેને સીધું કોપી કરી તમારી મિલકતની વિગતો ઉમેરી શકો છો અથવા પ્રિન્ટ કરી શકો છો.
              </p>

              {/* Template Container Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="font-extrabold text-base text-slate-900">
                      સાદા કાગળ પર માન્ય કાનૂની વસીયતનામું ડ્રાફ્ટ (ગુજરાતી)
                    </div>
                    <div className="text-xs text-slate-500">
                      ઇન્ડિયન સક્સેશન એક્ટ કલમ ૬૩ • સ્ટેમ્પ ડ્યુટી મુક્ત • ૨ સાક્ષીઓનું પ્રમાણપત્ર
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyTemplateToClipboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors"
                    >
                      {copiedTemplate ? (
                        <>
                          <CheckCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">કોપી થઈ ગયું!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>સંપૂર્ણ વિલ કોપી કરો</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                    >
                      <Printer className="w-4 h-4 text-slate-600" />
                      <span>પ્રિન્ટ</span>
                    </button>
                  </div>
                </div>

                {/* Printable Document Box */}
                <div
                  id="printable-will-container"
                  lang="gu"
                  className="p-5 sm:p-8 rounded-2xl bg-amber-50/30 border border-amber-200/50 text-slate-900 text-xs sm:text-sm font-sans leading-relaxed space-y-4 whitespace-pre-wrap select-text font-medium"
                >
{`|| શ્રી ગણેશાય નમઃ ||

છેલ્લું વસીયતનામું (LAST WILL AND TESTAMENT)

હું નીચે સહી કરનાર, [વસીયતકર્તાનું પૂરું નામ], ઉંમર આશરે [ઉંમર] વર્ષ, ધર્મ: [હિન્દુ/જૈન/અન્ય], વ્યવસાય: [ધંધો/નોકરી/નિવૃત્ત], રહેવાસી: [ઘર નં., સોસાયટીનું નામ, રોડ, વિસ્તાર, શહેર/ગામ, જિલ્લો, ગુજરાત - પિનકોડ], ભારતીય નાગરિક, આધાર કાર્ડ નં.: [XXXX-XXXX-XXXX], પાન કાર્ડ નં.: [XXXXX0000X].

હું આ વસીયતનામું સંપૂર્ણપણે શારીરિક અને માનસિક રીતે સ્વસ્થ હાલતમાં, કોઈના પણ દાબ, દબાણ, અનુચિત પ્રભાવ, કે લાલચ વગર મારી પોતાની સ્વતંત્ર ઇચ્છા અને રાજીખુશીથી કરું છું.

૧. પૂર્વવર્તી વસીયતનામા રદ કરવાની કલમ (Revocation of Prior Wills):
મેં આ તારીખ પહેલાં જો કોઈ પણ વસીયતનામું, વિલ, અથવા કોડિસિલ કરેલું હોય, તો તે આ દસ્તાવેજથી સંપૂર્ણપણે રદબાતલ (Revoked and Cancelled) જાહેર કરું છું. આ મારું છેલ્લું અને અંતિમ વસીયતનામું છે.

૨. એક્ઝિક્યુટર / વહીવટકર્તાની નિમણૂક (Appointment of Executor):
મારા અવસાન બાદ આ વસીયતનામાની શરતો અને વહેંચણીનો કાયદેસર અમલ કરાવવા માટે હું શ્રી/શ્રીમતી [વહીવટકર્તાનું પૂરું નામ], ઉંમર: [ઉંમર], રહેવાસી: [સરનામું], જેઓ મારા [સંબંધ - દા.ત. પુત્ર / મિત્ર / વડીલ] છે, તેમને મારા વિલના સોલ એક્ઝિક્યુટર (Sole Executor) તરીકે નિયુક્ત કરું છું.

૩. સ્થાવર મિલકતોની વહેંચણી (Schedule of Immovable Properties):
મારા નામે રહેલી નીચે દર્શાવેલી સ્વ-ઉપાર્જિત (Self-Acquired) સ્થાવર મિલકતો મારા અવસાન બાદ નીચે મુજબના વારસદારોને પ્રાપ્ત થશે:

(અ) રહેણાંક ફ્લેટ / મકાન:
મિલકતની વિગત: [સોસાયટીનું નામ, બ્લોક નં., ફ્લેટ નં., ટી.પી. સ્કીમ નં., ફાઇનલ પ્લોટ નં., સબ-ડિસ્ટ્રિક્ટ, શહેર].
આ મિલકત મારા અવસાન બાદ સંપૂર્ણ માલિકી હક્ક સાથે મારા [સંબંધ, દા.ત. પત્ની/પુત્ર/પુત્રી] શ્રી/શ્રીમતી [વારસદારનું નામ] ને મળશે.

(બ) દુકાન / ઓફિસ / પ્લોટ:
મિલકતની વિગત: [દુકાન/ઓફિસ નં., બિલ્ડિંગનું નામ, વિસ્તાર, સર્વે નં.].
આ મિલકત મારા અવસાન બાદ મારા [સંબંધ અને નામ] ને સંપૂર્ણ હક્કથી મળશે.

(ક) ખેતીની જમીન (ખેડૂત ખાતેદાર વારસદાર માટે):
મિલકતની વિગત: [ગામ, તાલુકો, જિલ્લો, રેવન્યુ સર્વે નં., ખાતા નં., હેક્ટર-આરે].
આ ખેતીની જમીન મારા ખેડૂત ખાતેદાર વારસદાર શ્રી [વારસદારનું નામ] ને મળશે. (નોંધ: મુંબઈ ગણોત ધારાની કલમ ૬૩ નું પાલન).

૪. જંગમ મિલકતોની વહેંચણી (Schedule of Movable Properties):
(અ) બેંક બચત ખાતા, એફ.ડી. (Fixed Deposits) અને રોકડ:
[બેંકનું નામ], શાખા: [બ્રાન્ચ], ખાતા નં.: [XXXXXXXXXXXX] તથા ફિક્સ્ડ ડિપોઝિટ્સમાં જમા રકમ મારા [વારસદારનું નામ] ને મળશે.

(બ) સોના-ચાંદીના દાગીના:
મારા ઘરમાં અથવા બેંક લોકરમાં રહેલા સોના-ચાંદીના તમામ ઘરેણાં મારા [પત્ની/પુત્રી/પુત્રવધૂનું નામ] ને પ્રાપ્ત થશે.

(ક) ડિમેટ ખાતું અને શેર રોકાણ:
[ડિપોઝિટરી/બ્રોકરનું નામ], ડિમેટ ખાતા નં.: [XXXXXXXX] ના શેર્સ અને મ્યુચ્યુઅલ ફંડ્સ મારા [વારસદારનું નામ] ને ટ્રાન્સફર થશે.

૫. અવશેષ મિલકત કલમ (Residuary Estate Clause):
ઉપર દર્શાવ્યા સિવાયની મારી અન્ય કોઈ પણ સ્થાવર કે જંગમ મિલકત, અથવા આ વિલ કર્યા પછી મારા જીવનકાળ દરમિયાન હું ખરીદું કે મને મળે, તે તમામ અવશેષ મિલકત મારા [વારસદારનું નામ] ને મળશે.

૬. અંતિમ વિનંતી:
મારા તમામ વારસદારોને મારી નમ્ર વિનંતી છે કે તેઓ મારા અવસાન બાદ કોઈપણ કલેશ, વિવાદ કે મુકદ્દમાબાજી વગર પ્રેમ અને સદ્ભાવનાથી આ વસીયતનામાનું પાલન કરે.

આ વસીયતનામું મેં સમજી-વિચારીને, વાંચીને, મારી રાજીખુશીથી આજ રોજ તારીખ: [તારીખ-માસ-વર્ષ] ના રોજ [સ્થળ, દા.ત. અમદાવાદ] મુકામે નીચે જણાવેલા બે સાક્ષીઓની રૂબરૂ સહી કરી આપ્યું છે.

______________________________
ટેસ્ટેટરની સહી / અંગૂઠાનું નિશાન
[વસીયતકર્તાનું પૂરું નામ]

============================================================
સાક્ષીઓનું પ્રમાણપત્ર (STATUTORY ATTESTATION CLAUSE)
============================================================
અમે નીચે સહી કરનાર બંને સાક્ષીઓ ખાતરીપૂર્વક પ્રમાણિત કરીએ છીએ કે ટેસ્ટેટર શ્રી [વસીયતકર્તાનું નામ] એ અમારી બંનેની એકસાથે પ્રત્યક્ષ હાજરીમાં આ વસીયતનામા પર પોતાની સહી કરેલ છે. ટેસ્ટેટર તે વખતે સંપૂર્ણ માનસિક સ્વસ્થતા ધરાવતા હતા અને તેમના પર કોઈનું દબાણ ન હતું. ત્યારબાદ ટેસ્ટેટરની પ્રત્યક્ષ હાજરીમાં અને તેમની વિનંતીથી અમે બંને સાક્ષીઓએ પણ એકબીજાની હાજરીમાં આ વસીયતનામા પર સાક્ષી તરીકે સહી કરેલ છે. અમે પુષ્ટિ કરીએ છીએ કે અમે આ વસીયતનામાના લાભાર્થી નથી.

સાક્ષી ૧:
સહી: _______________________
નામ: [સાક્ષી ૧ નું પૂરું નામ]
પિતા/પતિનું નામ: [નામ]
સરનામું: [સંપૂર્ણ સરનામું, શહેર, ગુજરાત]
આધાર / ઓળખપત્ર નં.: [XXXX-XXXX-XXXX]

સાક્ષી ૨:
સહી: _______________________
નામ: [સાક્ષી ૨ નું પૂરું નામ]
પિતા/પતિનું નામ: [નામ]
સરનામું: [સંપૂર્ણ સરનામું, શહેર, ગુજરાત]
આધાર / ઓળખપત્ર નં.: [XXXX-XXXX-XXXX]`}
                </div>
              </div>
            </section>

            {/* SECTION 3: GUJARATI TO ENGLISH GLOSSARY */}
            <section id="gujarati-english-glossary" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <BookOpen className="w-4 h-4" />
                <span>કાનૂની શબ્દાવલી અને અર્થ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                3. Gujarati to English Legal Glossary &amp; Terms
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                ગુજરાતી વસીયતનામામાં વપરાતા કાનૂની શબ્દો અને તેના અંગ્રેજી સમકક્ષ શબ્દોનો સ્પષ્ટ અર્થ:
              </p>

              {/* Glossary HTML Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">ગુજરાતી શબ્દ</th>
                      <th className="py-3 px-4">English Equivalent</th>
                      <th className="py-3 px-4">કાનૂની મહત્ત્વ / અર્થ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {GLOSSARY_TERMS.map((term, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{term.gu}</td>
                        <td className="py-3 px-4 font-semibold text-[#C65378]">{term.en}</td>
                        <td className="py-3 px-4 text-slate-600 leading-relaxed">{term.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 4: GUJARAT SRO REGISTRATION SOP */}
            <section id="gujarat-sro-registration-sop" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Building className="w-4 h-4" />
                <span>સબ-રજિસ્ટ્રાર કચેરી નોંધણી પ્રક્રિયા</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                4. Step-by-Step SOP: Will Registration in Gujarat
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
                <p>
                  જો તમે તમારા ગુજરાતી વસીયતનામાની સબ-રજિસ્ટ્રાર કચેરી ખાતે કાયદેસર નોંધણી કરાવવા માંગતા હો,
                  તો ગુજરાત રજિસ્ટ્રેશન રૂલ્સ, ૧૯૭૦ હેઠળ નીચે મુજબની પગલાવાર પ્રક્રિયા અનુસરો:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">1</span>
                      <span>ડ્રાફ્ટિંગ અને પ્રૂફરીડિંગ</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      વસીયતનામું સાદા કાગળ પર ગુજરાતીમાં ટાઈપ કરો. તમામ સ્થાવર મિલકતોના ટીપી સ્કીમ, ફાઇનલ
                      પ્લોટ કે સર્વે નંબર અને બેંક એકાઉન્ટ નંબરોની ચકાસણી કરો.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">2</span>
                      <span>તટસ્થ ૨ સાક્ષીઓની પસંદગી</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      કલમ ૬૭ હેઠળ વારસદાર સિવાયના બે પુખ્ત સાક્ષીઓ પસંદ કરો. સાક્ષીઓના આધાર કાર્ડ અને પાન
                      કાર્ડની નકલો તૈયાર રાખો.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">3</span>
                      <span>ગર્વી ગુજરાત પોર્ટલ એપોઈન્ટમેન્ટ</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ગુજરાતના સત્તાવાર ગર્વી ગુજરાત પોર્ટલ (Garvi Gujarat) પર તમારા વિસ્તારની
                      સબ-રજિસ્ટ્રાર કચેરી માટે ઓનલાઇન સ્લોટ અને ટોકન મેળવો.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 font-extrabold text-slate-900">
                      <span className="w-6 h-6 rounded-full bg-[#C65378] text-white flex items-center justify-center text-xs">4</span>
                      <span>બાયોમેટ્રિક્સ અને બુક-૩ એન્ટ્રી</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      કચેરી ખાતે વસીયતકર્તા અને બંને સાક્ષીઓના અંગૂઠાના નિશાન અને વેબકેમેરા ફોટો લેવામાં આવશે.
                      નામ માત્ર સરકારી ફી ચૂકવી રજિસ્ટર્ડ વિલની સીલવાળી નકલ મેળવો.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: COMPARISON TABLE */}
            <section id="plain-paper-vs-registered" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Scale className="w-4 h-4" />
                <span>કાનૂની સરખામણી કોષ્ટક</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                5. Comparison: Plain Paper vs Registered Will
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                સાદા કાગળ પર કરેલા વિલ અને સબ-રજિસ્ટ્રાર કચેરીએ નોંધાયેલા વિલ વચ્ચેનો કાનૂની તફાવત:
              </p>

              {/* Comparison HTML Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#172228] text-white font-extrabold">
                    <tr>
                      <th className="py-3 px-4">સરખામણી પરિમાણ</th>
                      <th className="py-3 px-4">સાદા કાગળ પર ગુજરાતી વિલ</th>
                      <th className="py-3 px-4">નોંધાયેલું ગુજરાતી વિલ (SRO)</th>
                      <th className="py-3 px-4">વિલ વગર અવસાન (Intestate)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">કાનૂની માન્યતા (ISA s. 63)</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">૧૦૦% સંપૂર્ણ માન્ય</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">૧૦૦% સંપૂર્ણ માન્ય</td>
                      <td className="py-3 px-4 text-rose-700 font-bold">લાગુ પડતું નથી</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">સ્ટેમ્પ ડ્યુટી ખર્ચ</td>
                      <td className="py-3 px-4">શૂન્ય (₹0)</td>
                      <td className="py-3 px-4">શૂન્ય (માત્ર નોમિનલ SRO ફી)</td>
                      <td className="py-3 px-4">કોર્ટ વારસાઈ પ્રમાણપત્ર ફી</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">બનાવટી દસ્તાવેજનો આક્ષેપ</td>
                      <td className="py-3 px-4 text-amber-700">સાક્ષીઓની જુબાનીથી સાબિત કરવું પડે</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">સરકારી રેકોર્ડ હોવાથી અતિ મજબૂત</td>
                      <td className="py-3 px-4 text-rose-700">સગા-સંબંધીઓ વચ્ચે વિવાદનું જોખમ</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">ઓરિજિનલ ખોવાઈ જવાનું જોખમ</td>
                      <td className="py-3 px-4 text-amber-700">હા, સુરક્ષિત કસ્ટડી જરૂરી</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">ના, SRO માંથી પ્રમાણિત નકલ મળે</td>
                      <td className="py-3 px-4">લાગુ પડતું નથી</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">ગુજરાતમાં પ્રોબેટની જરૂરિયાત</td>
                      <td className="py-3 px-4">ગુજરાતમાં પ્રોબેટ ફરજિયાત નથી</td>
                      <td className="py-3 px-4">પ્રોબેટ વિના સીધું મ્યુટેશન થાય</td>
                      <td className="py-3 px-4">પેઢીનામું / વારસાઈ આંબો જરૂરી</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 6: AGRICULTURAL LAND TENANCY ACT */}
            <section id="agricultural-land-tenancy-act" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>ખેતીની જમીન અને ગણોત ધારો</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                6. Gujarat Tenancy Act: Agricultural Land Bequest
              </h3>
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>મુંબઈ ગણોત વહીવટ અને ખેતીની જમીન અધિનિયમ, ૧૯૪૮ ની કલમ ૬૩ ચેતવણી</span>
                </div>
                <p>
                  ગુજરાતમાં જમીન વારસાઈ બાબતે એક અતિ મહત્ત્વનો કાનૂની મુદ્દો ધ્યાનમાં રાખવો જરૂરી છે. મુંબઈ
                  ગણોત અધિનિયમની <strong>કલમ ૬૩ (Section 63 of Bombay Tenancy Act)</strong> હેઠળ બિન-ખેડૂત
                  વ્યક્તિને ખેતીની જમીન વેચાણ, બક્ષિસ કે અન્ય રીતે ટ્રાન્સફર કરવા પર કડક પ્રતિબંધ છે.
                </p>
                <p>
                  ભારતની સુપ્રીમ કોર્ટે <em>વિનોદચંદ્ર સાકરલાલ કાપડિયા વિ. ગુજરાત રાજ્ય (2020)</em> ના
                  ચુકાદામાં સ્પષ્ટ ઠરાવ્યું છે કે, વસીયતનામા (Will) દ્વારા પણ ખેતીની જમીન બિન-ખેડૂત વ્યક્તિને
                  આપી શકાતી નથી. જો કોઈ વ્યક્તિ વસીયતનામામાં પોતાના બિન-ખેડૂત મિત્ર કે સગાને ખેતીની જમીન
                  આપે, તો રેવન્યુ ઓથોરિટી <strong>કલમ ૮૪-સી (Section 84C)</strong> હેઠળ કાર્યવાહી કરીને તે
                  જમીન સરકાર હસ્તક જપ્ત કરી શકે છે.
                </p>
                <div className="p-3 bg-white rounded-xl border border-amber-300/80 font-medium text-slate-800">
                  <strong>વકીલની કાનૂની સલાહ:</strong> ખેતીની જમીનનું વસીયતનામું કરતી વખતે માત્ર કાયદેસરના
                  ખેડૂત ખાતેદાર (જેમની પાસે ૭/૧૨ અને ૮-અ માં ખેડૂત દરજ્જો હોય) વારસદારને જ જમીન ફાળવો.
                </div>
              </div>
            </section>

            {/* SECTION 7: SECTION 63 CHECKLIST */}
            <section id="section-63-checklist" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>કાનૂની પૂર્તતા ચેકલિસ્ટ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                7. Crucial Clauses: Section 63 Execution Checklist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>માનસિક સ્વસ્થતા:</strong> વસીયતકર્તા સાઉન્ડ માઇન્ડ ધરાવતા હોવાનું ડૉક્ટરનું સર્ટી
                    જોડવું હિતાવહ છે.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>કલમ ૬૭ બહિષ્કાર:</strong> વિલના કોઈ પણ વારસદાર કે તેમના પતિ/પત્ની સાક્ષી તરીકે સહી
                    કરી શકતા નથી.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>મિલકતોની સ્પષ્ટ વિગત:</strong> સર્વે નંબર, દસ્તાવેજ નંબર, બિલ્ડિંગ નામ અને ખાતા
                    નંબર સાચા હોવા જોઈએ.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>રેસિડ્યુઅરી ક્લોઝ:</strong> ભવિષ્યમાં ખરીદાનાર મિલકતો માટે અવશેષ મિલકત કલમ ઉમેરવી
                    અતિ આવશ્યક છે.
                  </span>
                </div>
              </div>
            </section>

            {/* SECTION 8: SUCCESSION TOOLS & CALCULATORS */}
            <section id="succession-calculators-tools" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Calculator className="w-4 h-4" />
                <span>સંબંધિત કાનૂની અને ટેક્સ ટૂલ્સ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                8. Succession Tools &amp; Capital Gains Calculators
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                વારસાગત મિલકતો પર ટેક્સ બચાવવા અને કાયદેસર હિસ્સાની ગણતરી કરવા માટે અમારા ઇન્ટરેક્ટિવ
                ટૂલ્સનો ઉપયોગ કરો:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <Link
                  href="/tools/capital-gains-tax-calculator-inherited-property"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Capital Gains Tax Calculator
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      વારસાગત મિલકત વેચતી વખતે બજેટ ૨૦૨૪ હેઠળ ૧૨.૫% ફ્લેટ વિ. ૨૦% ઇન્ડેક્સેશન ટેક્સની સરખામણી
                      કરો.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378]">
                    <span>કેલ્ક્યુલેટર વાપરો</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/tools/succession-calculator"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Legal Heir Share Calculator
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      હિન્દુ ઉત્તરાધિકાર કાયદા હેઠળ વર્ગ-૧ અને વર્ગ-૨ ના કાયદેસર વારસદારોના હિસ્સાની આપમેળે
                      ગણતરી કરો.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378]">
                    <span>હિસ્સો ગણો</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href="/tools/probate-checker"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#C65378] flex items-center justify-center font-bold">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-sm text-slate-900 group-hover:text-[#C65378] transition-colors">
                      Probate Requirement Checker
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      તમારા વિલ માટે હાઇકોર્ટ પ્રોબેટની જરૂરિયાત છે કે નહીં તે કાયદાકીય નિયમો મુજબ ચેક કરો.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C65378]">
                    <span>પ્રોબેટ ચેક કરો</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </section>

            {/* SECTION 9: PRACTICAL CASE STUDIES */}
            <section id="practical-regional-case-studies" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>વાસ્તવિક કેસ સ્ટડીઝ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                9. Practical Case Studies: Ahmedabad &amp; Surat NRIs
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    કેસ સ્ટડી ૧: અમદાવાદ પારિવારિક વેપાર અને સ્થાવર મિલકત વિવાદ નિવારણ
                  </div>
                  <p>
                    અમદાવાદના સિનિયર સિટિઝન વેપારી પાસે બોપલમાં બંગલો, સી.જી. રોડ પર કોમર્શિયલ દુકાન અને
                    જી.આઈ.ડી.સી. માં ફેક્ટરી શેડ હતા. તેમણે અમારા ગુજરાતી વસીયતનામા ફોર્મેટ દ્વારા મોટા પુત્રને
                    દુકાન, નાના પુત્રને ફેક્ટરી અને પત્નીને બંગલાનો આજીવન ઉપભોગ હક્ક (Life Interest) આપતું
                    નોંધાયેલું વિલ તૈયાર કર્યું. પરિણામે તેમના અવસાન બાદ કોઈપણ કોર્ટ વિવાદ વિના તમામ મિલકતોનું
                    સરળતાથી ટ્રાન્સફર થયું.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div className="font-extrabold text-slate-900 text-sm">
                    કેસ સ્ટડી ૨: અમેરિકા (USA) સ્થિત NRI ગુજરાતી અને વડોદરાની મિલકત
                  </div>
                  <p>
                    ન્યૂજર્સીમાં વસતા એનઆરઆઈ ગુજરાતી દંપતી પાસે વડોદરા (અકોટા) ખાતે રહેણાંક ફ્લેટ અને એસબીઆઈ
                    માં એનઆરઈ ફિક્સ્ડ ડિપોઝિટ્સ હતી. તેમણે ભારત માટે અલગ ગુજરાતી-અંગ્રેજી બહુભાષી વિલ
                    બનાવીને ભારતીય વાણિજ્ય દૂતાવાસ (Indian Consulate) સમક્ષ પ્રમાણિત કરાવ્યું. બેંક અને
                    સોસાયટીએ આ વિલના આધારે એક મહિનામાં ટ્રાન્સમિશન પૂર્ણ કર્યું.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 10: COPY-PASTE ATTESTATION CLAUSE */}
            <section id="copy-paste-attestation-clause" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <FileCheck className="w-4 h-4" />
                <span>કાનૂની અટેસ્ટેશન અને ફિટનેસ ફોર્મેટ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                10. Copy-Paste Witness Attestation Clause in Gujarati
              </h3>

              {/* Clause Box 1 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    સાક્ષીઓનું વૈધાનિક પ્રમાણપત્ર કલમ (Section 63 ISA)
                  </div>
                  <button
                    type="button"
                    onClick={copyAttestationClause}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedAttestation ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">કોપી થયું!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>કલમ કોપી કરો</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-sans leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"અમે નીચે સહી કરનાર બંને સાક્ષીઓ ખાતરીપૂર્વક પ્રમાણિત કરીએ છીએ કે વસીયતકર્તા શ્રી/શ્રીમતી [ટેસ્ટેટરનું પૂરું નામ] એ અમારી બંનેની પ્રત્યક્ષ હાજરીમાં આ વસીયતનામાના દરેક પાના પર વાંચી-સમજીને સહી કરેલ છે. તે સમયે તેઓ સંપૂર્ણ સ્વસ્થ ચિત્તે અને કોઈના દબાણ વગર નિર્ણય લેવા સક્ષમ હતા. વસીયતકર્તાની હાજરીમાં અને તેમની સૂચનાથી અમે બંને સાક્ષીઓએ એકબીજાની રૂબરૂ સાક્ષી તરીકે સહી કરેલ છે. અમે જાહેર કરીએ છીએ કે અમે આ વસીયતનામા હેઠળ કોઈ પણ મિલકતના લાભાર્થી (Beneficiary) નથી."`}
                </pre>
              </div>

              {/* Clause Box 2 */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-sm text-slate-900">
                    ડૉક્ટરનું માનસિક સ્વસ્થતા પ્રમાણપત્ર (Medical Fitness Certificate)
                  </div>
                  <button
                    type="button"
                    onClick={copyDoctorCert}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                  >
                    {copiedDoctorCert ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">કોપી થયું!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>સર્ટી કોપી કરો</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-sans leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`"I hereby certify that I have medically examined Shri/Smt. [Testator Full Name], aged [Age] years, resident of [Address], on this day [Date] at [Time]. In my professional medical opinion, the testator is completely alert, oriented to time, place, and person, possesses sound disposing mind and testamentary capacity, and is fully capable of understanding the nature and effect of executing his/her Last Will and Testament."
Doctor Name: Dr. [Name] | Qualification: [MBBS/MD] | Reg No.: [GMC Reg No.]`}
                </pre>
              </div>
            </section>

            {/* SECTION 11: INSTITUTIONAL PROFILE */}
            <section id="institutional-profile" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Award className="w-4 h-4" />
                <span>કાનૂની કુશળતા અને અનુભવ</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                11. Institutional Profile: Succession Legal Bench
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C65378]">
                      POWERED BY AMA LEGAL SOLUTIONS
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">
                      WillDrafting.in Gujarati Testamentary &amp; Succession Desk
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>બાર કાઉન્સિલ પ્રમાણિત વકીલ પેનલ</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  WillDrafting.in એ ભારતમાં ઉત્તરાધિકાર આયોજન અને વસીયતનામું તૈયાર કરવા માટેનું અગ્રણી
                  પ્લેટફોર્મ છે, જે AMA Legal Solutions ના નિષ્ણાત વકીલો દ્વારા સંચાલિત છે. અમારી પેનલ
                  ગુજરાત હાઇકોર્ટના ટેસ્ટામેન્ટરી લિટિગેટર્સ, રેવન્યુ એડવોકેટ્સ અને ક્રોસ-બોર્ડર NRI એસ્ટેટ
                  પ્લાનર્સ ધરાવે છે. અમે અત્યાર સુધીમાં ૧૫,૦૦૦ થી વધુ પરિવારોને કાયદેસર અને વિવાદમુક્ત
                  વસીયતનામું બનાવવામાં સફળ માર્ગદર્શન આપ્યું છે.
                </p>

                {/* Service Grid Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-800">
                  <Link
                    href="/services/will-registration"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>વિલ રજિસ્ટ્રેશન સેવા</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/will-format-india"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>ઇંગ્લિશ વિલ ફોર્મેટ</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                  <Link
                    href="/templates/will-format-hindi"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between"
                  >
                    <span>હિન્દી વસીયતનામા ફોર્મેટ</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C65378]" />
                  </Link>
                </div>
              </div>
            </section>

            {/* SECTION 12: FAQ ACCORDION */}
            <section id="frequently-asked-questions" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <HelpCircle className="w-4 h-4" />
                <span>વારંવાર પૂછાતા પ્રશ્નો</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                12. Frequently Asked Questions: Gujarati Vasiyatnama
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                ગુજરાતી વસીયતનામાની કાનૂની માન્યતા, સાક્ષીઓ અને રજિસ્ટ્રેશન વિશે વારંવાર પૂછાતા પ્રશ્નોના
                સીધા જવાબો:
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

            {/* SECTION 13: STATUTORY CITATIONS */}
            <section id="statutory-citations" className="scroll-target scroll-mt-28 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C65378]">
                <Landmark className="w-4 h-4" />
                <span>સત્તાવાર કાનૂની પોર્ટલ અને સંદર્ભો</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                13. Statutory Citations &amp; Gujarat Revenue Portals
              </h3>
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 text-xs text-slate-700 shadow-xs">
                <div>
                  <div className="font-extrabold text-slate-900 mb-1">
                    લાગુ પડતા વૈધાનિક કાયદા અને નિયમો:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>
                      <strong>ઇન્ડિયન સક્સેશન એક્ટ, ૧૯૨૫ (કલમ ૫૯, ૬૩, ૬૭ અને ૭૪):</strong> વસીયતનામું
                      બનાવવાની પાત્રતા, બે સાક્ષીઓનું અટેસ્ટેશન અને સાક્ષી લાભાર્થી ન હોવાનો નિયમ.
                    </li>
                    <li>
                      <strong>નોંધણી અધિનિયમ, ૧૯૦૮ (કલમ ૧૮(e) અને ૪૦-૪૧):</strong> વસીયતનામાની મરજિયાત
                      નોંધણી અને બુક-૩ ડિપોઝિટ.
                    </li>
                    <li>
                      <strong>ગુજરાત રજિસ્ટ્રેશન રૂલ્સ, ૧૯૭૦:</strong> સબ-રજિસ્ટ્રાર કચેરી ખાતે વિલની
                      નોંધણી પ્રક્રિયા.
                    </li>
                    <li>
                      <strong>મુંબઈ ગણોત અધિનિયમ, ૧૯૪૮ (કલમ ૬૩):</strong> ખેતીની જમીન બિન-ખેડૂતને
                      ટ્રાન્સફર કરવા પર પ્રતિબંધ.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3">
                  <a
                    href="https://garvi.gujarat.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>Garvi Gujarat (SRO Portal)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://anyror.gujarat.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold"
                  >
                    <span>AnyRoR Gujarat (7/12 Land Records)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.indiacode.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 font-semibold"
                  >
                    <span>India Code: Indian Succession Act</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    સંબંધિત વિલ ડ્રાફ્ટિંગ ગાઇડ્સ
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/templates/will-format-india"
                      className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 font-bold"
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
                      href="/services/will-registration"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      SRO Will Registration Service
                    </Link>
                    <Link
                      href="/tools/will-checklist"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-rose-50 hover:text-rose-800 font-bold"
                    >
                      Will Document Checklist
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* =====================================================================
              RIGHT COLUMN: STICKY SIDEBAR
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
                Specialist in Indian testamentary jurisprudence, High Court probate petitions, Section
                63 Will execution compliance, and NRI estate structuring across Gujarat.
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
                  <span>PREVENT FAMILY INHERITANCE DISPUTES</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  તમારા પરિવારને કોર્ટ કચેરીના વિવાદોથી સુરક્ષિત કરો
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  સ્પષ્ટ કાનૂની શરતો સાથે માત્ર ૧૫ મિનિટમાં ઓનલાઇન વિલ બનાવો. ગુજરાત સબ-રજિસ્ટ્રાર કચેરીએ
                  માન્ય અને વકીલ પ્રમાણિત.
                </p>
                <button
                  onClick={handleStartDraft}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C65378] hover:bg-[#a33b5c] text-white font-extrabold text-xs shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ઓનલાઈન વિલ તૈયાર કરો</span>
                </button>
                <div className="pt-1 text-[11px] text-white/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>વકીલ ચકાસાયેલ • સ્ટેમ્પ ડ્યુટી મુક્ત</span>
                </div>
              </div>

              {/* CARD 3: DUAL CTA 2 - ADVOCATE CONSULTATION (Rose / White Card) */}
              <div className="rounded-3xl bg-white border border-rose-200 shadow-sm p-5 space-y-3.5 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[#C65378] text-[10px] font-bold uppercase tracking-wider">
                  <Landmark className="w-3 h-3" />
                  <span>GUJARAT SRO &amp; NRI DESK</span>
                </div>
                <h4 className="font-black text-slate-900 text-sm leading-snug">
                  ખાસ કાનૂની સલાહ અથવા SRO નોંધણી સહાય જોઈએ છે?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  અમદાવાદ, સુરત, વડોદરા કે રાજકોટ સબ-રજિસ્ટ્રાર કચેરીએ નોંધણી, ખેતીની જમીન આયોજન અને NRI વિલ
                  ડ્રાફ્ટિંગ માટે અમારા વકીલ સાથે સંપર્ક કરો.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>સંપર્ક ફોર્મ ભરો (Advocate Consultation)</span>
                </Link>
              </div>

              {/* CARD 4: TRUST CHECKLIST */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  શા માટે ગુજરાતી પરિવારો WillDrafting પસંદ કરે છે?
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>કલમ ૬૩ સુસંગત:</strong> બે સાક્ષીઓ અને કલમ ૬૭ બહિષ્કાર નિયમનું ચોક્કસ પાલન.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>ખેતીની જમીન સુરક્ષા:</strong> મુંબઈ ગણોત ધારાની કલમ ૬૩ અનુસાર સલામત વહેંચણી.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>NRI સ્પેશિયલ ડેસ્ક:</strong> વિદેશમાં રહેતા પરિવારો માટે ક્રોસ-બોર્ડર વિલ સપોર્ટ.
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
          href="#gujarati-vasiyatnama-template"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
        >
          <ScrollText className="w-3.5 h-3.5" />
          <span>વિલ ફોર્મેટ</span>
        </a>
        <button
          onClick={handleStartDraft}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#C65378] text-white text-xs font-bold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ઓનલાઈન વિલ</span>
        </button>
      </div>
    </div>
  );
}
