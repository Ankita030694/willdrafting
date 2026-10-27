export const PAGE_URL = "https://www.willdrafting.in/templates/will-format-marathi-mrutyupatra";
export const ENGLISH_PAGE_URL = "https://www.willdrafting.in/templates/will-format-india";
export const HINDI_PAGE_URL = "https://www.willdrafting.in/templates/will-format-hindi";
export const OG_IMAGE_URL = "https://www.willdrafting.in/images/will-format-marathi-mrutyupatra-og.jpg";

// Screaming Frog SEO Limits: Title 50-60 chars, Meta Description 140-155 chars, 0 em-dashes
export const SEO_TITLE = "मृत्यूपत्र फॉरमॅट मराठी: Marathi Will Format | WillDrafting"; // exactly 59 characters
export const SEO_DESCRIPTION =
  "कायदेशीर मृत्यूपत्र फॉरमॅट मराठी (will format in marathi). भारतीय वारसा कायदा कलम ६३ नुसार २ साक्षीदार, साध्या कागदावर नमुना आणि वकिलांचे मार्गदर्शन."; // exactly 149 characters

export interface TocItem {
  id: string;
  label: string;
}

export const TOC_ITEMS: TocItem[] = [
  { id: "statutory-framework", label: "1. कायदेशीर पाया: कलम ६३ चे नियम" },
  { id: "marathi-will-template", label: "2. मृत्यूपत्र फॉरमॅट: प्रत्यक्ष नमुना" },
  { id: "bilingual-will-comparison", label: "3. द्विभाषिक तुलना: मराठी व इंग्रजी" },
  { id: "maharashtra-legal-nuances", label: "4. मुंबई व महाराष्ट्र विशेष नियम" },
  { id: "legal-comparison-matrix", label: "5. तुलना तक्ता: मृत्यूपत्र वि. इतर पर्याय" },
  { id: "legal-glossary-marathi-english", label: "6. मराठी ते इंग्रजी कायदेशीर संज्ञा" },
  { id: "step-by-step-guide", label: "7. टप्प्याटप्प्याने मृत्यूपत्र प्रक्रिया" },
  { id: "frequently-asked-questions", label: "8. वारंवार विचारले जाणारे प्रश्न" },
  { id: "statutory-citations", label: "9. कायदेशीर संदर्भ व सुप्रीम कोर्ट निकाल" },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "मृत्यूपत्र मराठी भाषेत साध्या कागदावर कायदेशीररित्या लिहिता येते का?",
    a: "होय, भारतीय वारसा कायदा, १९२५ (Indian Succession Act, 1925) च्या कलम ७४ नुसार मृत्यूपत्रासाठी कोणतीही विशिष्ट कायदेशीर भाषा किंवा स्टॅम्प पेपर बंधनकारक नाही. तुम्ही साध्या पांढऱ्या कागदावर (A4 Paper) स्वतःच्या हस्ताक्षरात किंवा टाईप करून मराठी भाषेत मृत्यूपत्र लिहू शकता. फक्त मृत्युपत्रकर्त्याची स्वाक्षरी आणि दोन स्वतंत्र साक्षीदारांचे साक्षांकन (Attestation under Section 63) असणे कायद्याने अनिवार्य आहे.",
  },
  {
    q: "मृत्यूपत्राची दुय्यम निबंधक कार्यालयात (SRO) नोंदणी करणे सक्तीचे आहे का?",
    a: "नाही, नोंदणी कायदा, १९०८ (Registration Act, 1908) च्या कलम १८(इ) नुसार मृत्यूपत्राची नोंदणी करणे ऐच्छिक (Optional) आहे. अनोंदणीकृत मृत्यूपत्र देखील १००% कायदेशीररित्या वैध असते. मात्र, भविष्यातील कौटुंबिक वाद, बोगस स्वाक्षरीचे आरोप किंवा संशयास्पद परिस्थिती टाळण्यासाठी दुय्यम निबंधक (Sub-Registrar) कार्यालयात नोंदणी करणे अत्यंत फायदेशीर ठरते.",
  },
  {
    q: "मुंबईमध्ये मृत्यूपत्राचे प्रोबेट (Probate) घेणे कायद्याने अनिवार्य आहे का?",
    a: "होय, भारतीय वारसा कायदा, १९२५ च्या कलम ५७ आणि २१३(२) नुसार, मुंबई, कोलकाता आणि चेन्नई या मूळ प्रेसिडेन्सी शहरांच्या कार्यक्षेत्रात केलेले किंवा या शहरांमधील स्थावर मिळकतीशी संबंधित असलेल्या हिंदू, बौद्ध, जैन व शीख व्यक्तींच्या मृत्यूपत्राचे मुंबई उच्च न्यायालयातून (Bombay High Court) प्रोबेट घेणे बंधनकारक आहे. उर्वरित महाराष्ट्रात (उदा. पुणे, नागपूर, नाशिक, ठाणे ग्रामीण) प्रोबेट सक्तीचे नाही.",
  },
  {
    q: "सहकारी गृहनिर्माण संस्थेतील (CHS) फ्लॅटच्या बाबतीत नॉमिनी की मृत्यूपत्र कोणाचा अधिकार मोठा?",
    a: "मृत्यूपत्रातील लाभार्थ्याचा अधिकार सर्वोच्च असतो. महाराष्ट्र सहकारी संस्था कायदा, १९६० च्या कलम १५४बी-१३ आणि सर्वोच्च न्यायालयाच्या इंद्राणी वाही विरुद्ध पश्चिम बंगाल निबंधक (Indrani Wahi v. Registrar of Co-op Societies, 2016) या ऐतिहासिक निकालानुसार, सोसायटीतील नॉमिनी (Nominee) हा केवळ तात्पुरता विश्वस्त (Trustee) असतो. फ्लॅटची खरी कायदेशीर मालकी मृत्यूपत्रातील कायदेशीर लाभार्थ्याकडेच (Legatee) जाते.",
  },
  {
    q: "मृत्यूपत्रावर किती साक्षीदारांची स्वाक्षरी आवश्यक असते आणि साक्षीदार कोण असावा?",
    a: "भारतीय वारसा कायद्याच्या कलम ६३(क) नुसार किमान दोन स्वतंत्र सज्ञान साक्षीदारांची (Two Attesting Witnesses) स्वाक्षरी अनिवार्य आहे. सर्वात महत्त्वाची कायदेशीर अट म्हणजे, ज्या व्यक्तीला मृत्यूपत्रात मालमत्ता दिली आहे (Beneficiary) किंवा त्याचा पती/पत्नी साक्षीदार असू शकत नाही (कलम ६७). साक्षीदार असे असावेत जे कुटुंब बाहेरील विश्वासू मित्र, शेजारी किंवा डॉक्टर/वकील असतील.",
  },
  {
    q: "मृत्यूपत्र किती वेळा बदलता किंवा नव्याने करता येते?",
    a: "मृत्युपत्रकर्ता हयात असेपर्यंत आणि मानसिकदृष्ट्या सक्षम असेपर्यंत आपले मृत्यूपत्र कितीही वेळा बदलू शकतो, त्यात दुरुस्ती (Codicil) करू शकतो किंवा ते पूर्णपणे रद्द करू शकतो. कायद्यानुसार मृत्युपत्रकर्त्याने त्याच्या मृत्यूपूर्वी केलेले सर्वात शेवटचे वैध मृत्यूपत्र (Last Will and Testament) हेच अंतिमतः लागू होते.",
  },
  {
    q: "वडिलोपार्जित (Ancestral) मालमत्तेचे मृत्यूपत्र करता येते का?",
    a: "हिंदू वारसा कायदा, १९५६ च्या कलम ३० नुसार, कोणतीही व्यक्ती केवळ स्वतःच्या कायदेशीर हिश्याचे (Undivided Coparcenary Share) मृत्यूपत्र करू शकते. संपूर्ण वडिलोपार्जित मालमत्तेचे मृत्यूपत्र इतर वारसदारांच्या संमतीशिवाय करता येत नाही. मात्र स्वतः कमावलेल्या (Self-Acquired) मालमत्तेचे वाटप व्यक्ती आपल्या मर्जीनुसार कोणालाही करू शकते.",
  },
  {
    q: "मृत्यूपत्रात अंमलबजावणीदार (Executor) नेमणे का गरजेचे आहे?",
    a: "अंमलबजावणीदार ही अशी व्यक्ती असते जिच्यावर मृत्युपत्रकर्त्याचा पूर्ण विश्वास असतो आणि जी मृत्यूनंतर मृत्यूपत्रातील अटींनुसार मालमत्तेचे वाटप, बँक खाती वर्ग करणे आणि सोसायटीत नाव नोंदणी करण्याचे काम कायदेशीररित्या पूर्ण करते. अंमलबजावणीदार नेमल्यामुळे वारसांमध्ये वाटपावरून वाद होत नाहीत.",
  },
];

export interface GlossaryTerm {
  marathi: string;
  english: string;
  explanation: string;
}

export const GLOSSARY_ITEMS: GlossaryTerm[] = [
  {
    marathi: "मृत्यूपत्र / इच्छापत्र",
    english: "Will / Testament",
    explanation: "व्यक्तीने आपल्या मृत्यूनंतर मालमत्तेच्या वाटपाबाबत व्यक्त केलेली कायदेशीर घोषणा.",
  },
  {
    marathi: "मृत्युपत्रकर्ता / इच्छापत्रकर्ता",
    english: "Testator (Male) / Testatrix (Female)",
    explanation: "स्वतःचे मृत्यूपत्र लिहून ठेवणारी मूळ मिळकतधारक व्यक्ती.",
  },
  {
    marathi: "अंमलबजावणीदार",
    english: "Executor",
    explanation: "मृत्यूनंतर मृत्यूपत्रातील इच्छेनुसार मालमत्ता वाटप करणारी नियुक्त व्यक्ती.",
  },
  {
    marathi: "साक्षीदार",
    english: "Attesting Witness",
    explanation: "मृत्युपत्रकर्त्याने स्वतःच्या समक्ष स्वाक्षरी केल्याचे प्रमाणित करणारी स्वतंत्र व्यक्ती.",
  },
  {
    marathi: "लाभार्थी / वारसदार",
    english: "Beneficiary / Legatee",
    explanation: "मृत्यूपत्राद्वारे ज्या व्यक्तीला मिळकत किंवा हिस्सा मिळतो ती व्यक्ती.",
  },
  {
    marathi: "स्थावर मिळकत",
    english: "Immovable Property",
    explanation: "जमीन, शेतजमीन, बंगला, फ्लॅट, दुकान, कार्यालय इत्यादी अचल मालमत्ता.",
  },
  {
    marathi: "जंगम मिळकत",
    english: "Movable Property",
    explanation: "बँक ठेवी, रोख रक्कम, सोन्या-चांदीचे दागिने, डीमॅट शेअर्स, म्युच्युअल फंड, वाहने.",
  },
  {
    marathi: "प्रोबेट",
    english: "Probate",
    explanation: "सक्षम दिवाणी न्यायालयातून मृत्यूपत्राच्या सत्यतेवर मिळणारे अधिकृत कायदेशीर प्रमाणपत्र.",
  },
  {
    marathi: "पुरवणीपत्र",
    english: "Codicil",
    explanation: "मूळ मृत्यूपत्रात काही अटी बदलण्यासाठी किंवा वाढवण्यासाठी जोडलेले कायदेशीर पुरवणीपत्र.",
  },
  {
    marathi: "खरेदीखत",
    english: "Sale Deed / Conveyance Deed",
    explanation: "मालमत्ता खरेदी केल्याचा अधिकृत नोंदणीकृत दस्तऐवज.",
  },
  {
    marathi: "बक्षीसपत्र",
    english: "Gift Deed",
    explanation: "हयातीत मोफत प्रेमापोटी मालमत्ता हस्तांतरित करण्याचा नोंदणीकृत दस्तऐवज.",
  },
  {
    marathi: "हक्कसोडपत्र",
    english: "Release / Relinquishment Deed",
    explanation: "वडिलोपार्जित किंवा सामायिक मिळकतीतील स्वतःचा हिस्सा स्वेच्छेने सोडून देणारा दस्तऐवज.",
  },
  {
    marathi: "वारस प्रमाणपत्र",
    english: "Legal Heir Certificate / Succession Certificate",
    explanation: "मृत्यूपत्र नसताना वारसा हक्क सिद्ध करण्यासाठी महसूल किंवा कोर्टाकडून मिळणारा दाखला.",
  },
  {
    marathi: "फेरफार नोंद (७/१२)",
    english: "Revenue Mutation (7/12 Extract)",
    explanation: "शेतजमीन किंवा जमिनीच्या शासकीय महसूल अभिलेखात नवीन मालकाचे नाव नोंदवण्याची प्रक्रिया.",
  },
];

export const COMPARISON_TABLE_DATA = [
  {
    feature: "कायदेशीर स्वरूप",
    registeredWill: "नोंदणीकृत मृत्यूपत्र (Registered Will)",
    unregisteredWill: "साध्या कागदावरील मृत्यूपत्र (Unregistered Will)",
    giftDeed: "बक्षीसपत्र (Gift Deed)",
    intestate: "विना-मृत्यूपत्र वारसा (Intestate)",
  },
  {
    feature: "लागू होण्याची वेळ",
    registeredWill: "मृत्युपत्रकर्त्याच्या मृत्यूनंतर",
    unregisteredWill: "मृत्युपत्रकर्त्याच्या मृत्यूनंतर",
    giftDeed: "नोंदणी होताच तात्काळ हयातीत",
    intestate: "मृत्यूनंतर कायद्यानुसार",
  },
  {
    feature: "स्टॅम्प ड्युटी (महाराष्ट्र)",
    registeredWill: "शून्य (₹० स्टॅम्प ड्युटी)",
    unregisteredWill: "शून्य (₹० स्टॅम्प ड्युटी)",
    giftDeed: "३% ते ५% + १% एलबीटी/सेस",
    intestate: "लागू नाही",
  },
  {
    feature: "नोंदणी फी (SRO)",
    registeredWill: "नामात्र (₹१०० मात्र)",
    unregisteredWill: "शून्य",
    giftDeed: "₹३०,००० कमाल किंवा १%",
    intestate: "कोर्ट फी ३% ते ७.५% (वारस दाखला)",
  },
  {
    feature: "बदलण्याची मुभा (Revocability)",
    registeredWill: "हयात असेपर्यंत कधीही बदलता येते",
    unregisteredWill: "हयात असेपर्यंत कधीही बदलता येते",
    giftDeed: "एकदा दिल्यावर परत घेता येत नाही",
    intestate: "लागू नाही (हक्क वाटप निश्चित)",
  },
  {
    feature: "कोर्टात आव्हानाची शक्यता",
    registeredWill: "अत्यंत कमी (सब-रजिस्ट्रार नोंद पुरावा)",
    unregisteredWill: "मध्यम (साक्षीदारांची साक्ष गरजेची)",
    giftDeed: "कमी (ताबा हस्तांतरित झालेला असतो)",
    intestate: "अत्यंत जास्त (दिवाणी कोर्ट वाटप दावे)",
  },
  {
    feature: "मालकी हक्काचे संरक्षण",
    registeredWill: "हयात असेपर्यंत स्वतःकडेच राहते",
    unregisteredWill: "हयात असेपर्यंत स्वतःकडेच राहते",
    giftDeed: "हयातीतच मालकी हक्क संपतो",
    intestate: "कायदेशीर वारसांमध्ये समान विभागणी",
  },
];

export const MARATHI_WILL_FULL_TEXT = `॥ श्री गणेशाय नमः ॥

मृत्यूपत्र / इच्छापत्र (LAST WILL AND TESTAMENT)

मी खाली सही करणार:
नाव: श्री/श्रीमती [मृत्युपत्रकर्त्याचे पूर्ण नाव]
वय: [वय] वर्षे, व्यवसाय: [व्यवसाय], धर्म: [धर्म]
पॅन क्रमांक: [पॅन क्र.]
आधार कार्ड क्रमांक: [आधार क्र.]
सध्याचा पत्ता: [सध्याचा पूर्ण रहिवासी पत्ता]

आज दिनांक [दिनांक] रोजी [शहर/गाव], महाराष्ट्र येथे खालीलप्रमाणे माझे शेवटचे मृत्यूपत्र लिहून ठेवत आहे:

१. मानसिक व शारीरिक स्वास्थ्याची घोषणा (Sound Mind & Capacity):
मी याद्वारे घोषित करतो/करते की, आज रोजी मी पूर्णपणे शुद्धीवर, निरोगी मानसिक स्थितीत आणि विचारशक्ती शाबूत असताना हे मृत्यूपत्र करत आहे. हे मृत्यूपत्र तयार करण्यासाठी माझ्यावर कोणाचाही दबाव, फसवणूक, धाकधपटशा किंवा अवाजवी प्रभाव (Undue Influence) नाही. हे माझे स्वतंत्र मर्जीने केलेले अंतिम मृत्यूपत्र आहे.

२. पूर्वीची सर्व मृत्यूपत्रे रद्दबातल (Revocation of Prior Wills):
मी यापूर्वी स्वतः केलेले कोणतेही मृत्यूपत्र, इच्छापत्र, पुरवणीपत्र (Codicil) किंवा मृत्युसमयीची व्यवस्था असेल, तर ती सर्व मी या मृत्यूपत्राद्वारे पूर्णपणे रद्द (Revoke) ठरवत आहे. आजचे हे मृत्यूपत्र माझे शेवटचे आणि अंतिमतः कायदेशीर मृत्यूपत्र राहील.

३. कौटुंबिक वारसदारांची माहिती (Family Details):
माझ्या कुटुंबात खालील कायदेशीर वारसदार आहेत:
(अ) पती / पत्नी: श्री/श्रीमती [नाव], वय [वय] वर्षे.
(ब) मुलगा: श्री [नाव], वय [वय] वर्षे.
(क) मुलगी: श्रीमती/कु [नाव], वय [वय] वर्षे.

४. अंमलबजावणीदाराची नेमणूक (Appointment of Executor):
माझ्या मृत्यूनंतर या मृत्यूपत्राची कायदेशीर अंमलबजावणी करण्यासाठी आणि माझ्या मालमत्तेचे वाटप सुरळीतपणे पार पाडण्यासाठी मी श्री/श्रीमती [अंमलबजावणीदाराचे पूर्ण नाव], वय [वय] वर्षे, आधार क्र. [आधार क्र.], राहणार [पत्ता] यांची नेमणूक 'अंमलबजावणीदार' (Executor) म्हणून करत आहे. जर काही कारणास्तव ते हे काम पाहू शकले नाहीत, तर पर्यायी अंमलबजावणीदार म्हणून श्री/श्रीमती [पर्यायी नाव] हे काम पाहतील.

५. माझ्या मालकीच्या मिळकतींचा तपशील (Schedule of Properties):
मी माझ्या हयातीत स्वतःच्या कमाईतून व परिश्रमातून खालील स्थावर व जंगम मिळकती स्वकष्टार्जित (Self-Acquired) म्हणून संपादित केलेल्या असून, त्यावर माझा संपूर्ण व अनिर्बंध मालकी हक्क आहे:

(अ) स्थावर मिळकत (Immovable Property):
फ्लॅट क्र. [फ्लॅट क्रमांक], मजला [मजला], इमारत नाव [इमारतीचे नाव], [सोसायटीचे पूर्ण नाव] सहकारी गृहनिर्माण संस्था मर्यादित, [रस्त्याचे नाव], [परिसर], [शहर/गाव], पिनकोड [पिन], सीटीएस क्र. [CTS No.] व सर्व्हे क्र. [Survey No.], क्षेत्रफळ अंदाजे [क्षेत्रफळ] चौ.फूट (बिल्ट-अप).

(ब) जंगम मिळकत (Movable Property):
१. स्टेट बँक ऑफ इंडिया, शाखा [शाखा], बचत खाते क्र. [खाते क्र.] मधील शिल्लक रक्कम.
२. बँक मुदत ठेवी (Fixed Deposits): [बँकेचे नाव], एफडी पावती क्र. [पावती क्र.].
३. डीमॅट खाते: [डिपॉझिटरी नाव], क्लायंट आयडी [डीमॅट क्र.] मधील सर्व शेअर्स व म्युच्युअल फंड्स.
४. बँक लॉकर क्र. [लॉकर क्र.], [बँकेचे नाव व शाखा] मधील सोन्या-चांदीचे दागिने व वस्तू.
५. चारचाकी वाहन क्र. [गाडी क्रमांक].

६. मिळकतीचे वाटप आणि अधिकार (Devolution of Assets):
माझ्या मृत्यूनंतर माझ्या मिळकतीचे वाटप खालीलप्रमाणे होईल:
(अ) माझी वरील परिच्छेद ५(अ) मधील स्थावर मिळकत (फ्लॅट) चा संपूर्ण मालकी हक्क, अधिकार व ताबा मी माझे/माझी [नाते व लाभार्थ्याचे नाव] यांना पूर्णपणे देत आहे. माझ्या मृत्यूनंतर ते/त्या या मिळकतीचे एकमेव पूर्ण मालक राहतील. संबंधित गृहनिर्माण संस्थेने (CHS) त्यांच्या नावे शेअर्स व फ्लॅट ट्रान्सफर करून घ्यावा.
(ब) जंगम मिळकतीचे वाटप: वरील परिच्छेद ५(ब) मधील बँक खाती, मुदत ठेवी, शेअर्स व दागिन्यांचे वाटप मी माझे/माझी [नाते व लाभार्थ्याचे नाव] यांना समान / विशिष्ट प्रमाणात देत आहे.
(क) नामनिर्देशन (Nomination) बाबत स्पष्टीकरण: माझ्या कोणत्याही मालमत्तेत किंवा सोसायटीत कोणाचेही नामनिर्देशन (Nominee) नोंदवलेले असले तरी, ते केवळ प्रशासकीय सोयीसाठी असून या मृत्यूपत्रातील लाभार्थ्यालाच त्या मालमत्तेची खरी मालकी मिळेल.

७. स्वाक्षरी व साक्षांकन (Attestation Clause):
मी वरील सर्व मजकूर शांतपणे वाचून समजून घेतला असून, तो माझ्या इच्छेनुसार आहे याची खात्री करून मी खालील दोन स्वतंत्र साक्षीदारांच्या उपस्थितीत आज दिनांक [दिनांक] रोजी [ठिकाण] येथे माझी स्वाक्षरी केली आहे.

मृत्युपत्रकर्त्याची स्वाक्षरी / अंगठ्याचा ठसा: _____________________
नाव: श्री/श्रीमती [पूर्ण नाव]

८. साक्षीदारांचे साक्षांकन विधान (Statement by Two Witnesses - Section 63):
आम्ही खाली सही करणारे दोन्ही साक्षीदार याद्वारे प्रमाणित करतो की:
१. मृत्युपत्रकर्ते श्री/श्रीमती [नाव] यांनी आमच्या समक्ष व उपस्थितीत या मृत्यूपत्रावर स्वतःची स्वाक्षरी केली आहे.
२. स्वाक्षरी करताना ते/त्या पूर्णपणे शुद्धीवर, सज्ञान आणि निरोगी मानसिक स्थितीत होते.
३. मृत्युपत्रकर्त्यांच्या विनंतीवरून, त्यांच्या समक्ष आणि आम्ही दोघांनी एकमेकांच्या उपस्थितीत साक्षीदार म्हणून स्वाक्षऱ्या केल्या आहेत.

साक्षीदार क्रमांक १:
स्वाक्षरी: _____________________
पूर्ण नाव: [साक्षीदाराचे नाव]
वय: [वय] वर्षे, व्यवसाय: [व्यवसाय]
पत्ता: [पूर्ण पत्ता]
आधार क्रमांक: [आधार क्र.]

साक्षीदार क्रमांक २:
स्वाक्षरी: _____________________
पूर्ण नाव: [साक्षीदाराचे नाव]
वय: [वय] वर्षे, व्यवसाय: [व्यवसाय]
पत्ता: [पूर्ण पत्ता]
आधार क्रमांक: [आधार क्र.]`;

export const ENGLISH_WILL_TRANSLATION = `॥ SHRI GANESHAYA NAMAH ॥

LAST WILL AND TESTAMENT

I, the undersigned:
Name: Mr./Mrs. [Full Name of Testator]
Age: [Age] years, Occupation: [Occupation], Religion: [Religion]
PAN Number: [PAN No.]
Aadhaar Card Number: [Aadhaar No.]
Present Address: [Full Residential Address]

On this day [Date] at [City/Town], Maharashtra, hereby execute my Last Will and Testament as follows:

1. Sound Mind & Capacity Declaration:
I hereby solemnly declare that I am executing this Will in full consciousness, sound mental health, and disposing mind and memory. I am executing this Will of my own free volition without any coercion, fraud, undue influence, or duress from any person whatsoever.

2. Revocation of All Prior Wills & Codicils:
I hereby absolutely revoke and cancel all previous Wills, Testaments, Codicils, or testamentary dispositions made by me at any time prior to this date. This document shall stand as my sole, final, and conclusive Last Will and Testament.

3. Particulars of Family & Legal Heirs:
My family consists of the following legal heirs:
(a) Spouse: Mr./Mrs. [Name], aged [Age] years.
(b) Son: Mr. [Name], aged [Age] years.
(c) Daughter: Mrs./Ms. [Name], aged [Age] years.

4. Appointment of Executor:
To administer this Will and ensure peaceful distribution of my estate, I hereby nominate and appoint Mr./Mrs. [Full Name of Executor], aged [Age] years, residing at [Address], as the sole Executor of this my Last Will. In the event of their inability to act, Mr./Mrs. [Alternate Executor Name] shall act as the Alternate Executor.

5. Schedule of Self-Acquired Properties:
I am the sole, absolute, and undisputed owner of the following self-acquired movable and immovable assets acquired through my own earnings and resources:

(a) Immovable Property:
Residential Flat No. [Flat No.], [Floor], in building known as [Building Name], situated at [Society Full Name] Co-operative Housing Society Limited, [Street/Area], [City], Pin [PIN Code], CTS No. [CTS No.], Survey No. [Survey No.], admeasuring approximately [Area] sq. ft. built-up.

(b) Movable Property:
1. Balance in Savings Bank Account No. [Account No.] with State Bank of India, Branch [Branch].
2. Fixed Deposit Receipts bearing No. [FD No.] with [Bank Name].
3. Demat Account No. [Demat No.] with [Depository Name] holding shares and mutual funds.
4. Gold and silver ornaments lying in Bank Locker No. [Locker No.], [Bank Branch].
5. Motor Vehicle bearing Registration No. [Vehicle No.].

6. Devolution and Bequests:
Upon my demise, my estate shall devolve as follows:
(a) The absolute registered ownership and possession of my residential flat described in Clause 5(a) shall devolve solely upon my [Relation & Name of Beneficiary]. The Co-operative Housing Society shall transfer the share certificate and flat in their name.
(b) Movable properties listed in Clause 5(b) shall devolve upon [Beneficiary Name].
(c) Clarification on Nomination: Any nomination recorded in bank accounts or housing society records is solely for administrative convenience. True beneficial ownership shall strictly vest in the beneficiaries designated under this Will.

7. Testator Execution & Attestation:
Having read and understood the entire contents, I have affixed my signature to this Will in the presence of the two attesting witnesses named below on this day [Date] at [Place].

Signature / Thumb Impression of Testator: _____________________
Name: Mr./Mrs. [Full Name]

8. Attestation by Two Independent Witnesses (Section 63 ISA, 1925):
We, the undersigned attesting witnesses, hereby certify that:
1. The Testator signed this Will in our joint presence.
2. The Testator was of sound mind, memory, and understanding at the time of execution.
3. We have signed our names as attesting witnesses in the presence of the Testator and in the presence of each other.

Witness 1: Signature, Name, Age, Address, Aadhaar No.
Witness 2: Signature, Name, Age, Address, Aadhaar No.`;

export const DOCTOR_CERTIFICATE_TEXT = `वैद्यकीय सक्षमतेचे प्रमाणपत्र (MEDICAL FITNESS CERTIFICATE)
(मृत्यूपत्र करणाऱ्या व्यक्तीच्या मानसिक सक्षमतेसाठी डॉक्टरचे प्रमाणपत्र)

मी डॉ. [डॉक्टरांचे पूर्ण नाव], पदवी: [उदा. M.B.B.S. / M.D. Medicine],
महाराष्ट्र मेडिकल कौन्सिल नोंदणी क्रमांक (MMC Reg. No.): [नोंदणी क्र.],
दवाखाना/हॉस्पिटल पत्ता: [पत्ता]

याद्वारे वैद्यकीय तपासणीअंती प्रमाणित करतो की:
आज दिनांक [तपासणी दिनांक] रोजी वेळ [वेळ] वाजता मी श्री/श्रीमती [मृत्युपत्रकर्त्याचे पूर्ण नाव], वय वर्षे [वय], राहणार [पत्ता] यांची प्रत्यक्ष शारीरिक व मानसिक तपासणी केली आहे.

तपासणीअंती माझे स्पष्ट वैद्यकीय मत असे आहे की:
१. सदर व्यक्ती पूर्णपणे शुद्धीवर, सज्ञान आणि मानसिकदृष्ट्या सक्षम (Of Sound Disposing Mind and Memory) आहे.
२. सदर व्यक्ती स्वतःच्या मालमत्तेचे स्वरूप समजून घेण्यास आणि त्याच्या वाटपाचे कायदेशीर परिणाम जाणून घेण्यास पूर्णतः समर्थ आहे.
३. सदर व्यक्ती कोणत्याही मानसिक दुर्बलता, स्मृतिभ्रंश (Dementia/Alzheimer's) किंवा कोमासदृश अवस्थेत नाही.

ठिकाण: [शहर]
दिनांक: [दिनांक]

डॉक्टरांची स्वाक्षरी व शिक्का: _____________________
नाव: डॉ. [पूर्ण नाव]
नोंदणी क्रमांक: [MMC Reg No.]`;
