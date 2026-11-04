# WhatsApp Message Templates — WillDrafting.in

Ready to submit in **WhatsApp Manager → Message templates → Create template** (or through your BSP).
Each template has an English (`en`) and Hindi (`hi`) version. Add both languages under the **same template name**.

| # | Template name | Category | Submit |
|---|---|---|---|
| 1 | `login_code` | Authentication | Now |
| 2 | `optin_confirmation` | Utility | Now |
| 3 | `account_setup_steps` | Utility | Now |
| 4 | `draft_progress_saved` | Utility | Now |
| 5 | `payment_pending` | Utility | Now |
| 6 | `payment_failed` | Utility | Now |
| 7 | `payment_receipt` | Utility | Now |
| 8 | `will_ready_to_verify` | Utility | Now |
| 9 | `will_verified_download` | Utility | Now |
| 10 | `lawyer_review_update` | Utility | Later: the app has no lawyer-review screen yet |
| 11 | `consultation_confirmed` | Utility | Later: the app has no consultation booking yet |

Variables use positional format (`{{1}}`, `{{2}}` …), which every BSP supports. Button variables are numbered separately from body variables.

## Header images

Templates 2–11 use an **Image** header (Authentication templates can't have one). Each has an English and a Hindi image in `public/images/whatsapp/`, 1200×628 JPG, all under 50 kB:

| Template | English | Hindi |
|---|---|---|
| `optin_confirmation` | `optin_confirmation-en.jpg` | `optin_confirmation-hi.jpg` |
| `account_setup_steps` | `account_setup_steps-en.jpg` | `account_setup_steps-hi.jpg` |
| `draft_progress_saved` | `draft_progress_saved-en.jpg` | `draft_progress_saved-hi.jpg` |
| `payment_pending` | `payment_pending-en.jpg` | `payment_pending-hi.jpg` |
| `payment_failed` | `payment_failed-en.jpg` | `payment_failed-hi.jpg` |
| `payment_receipt` | `payment_receipt-en.jpg` | `payment_receipt-hi.jpg` |
| `will_ready_to_verify` | `will_ready_to_verify-en.jpg` | `will_ready_to_verify-hi.jpg` |
| `will_verified_download` | `will_verified_download-en.jpg` | `will_verified_download-hi.jpg` |
| `lawyer_review_update` | `lawyer_review_update-en.jpg` | `lawyer_review_update-hi.jpg` |
| `consultation_confirmed` | `consultation_confirmed-en.jpg` | `consultation_confirmed-hi.jpg` |

- **When creating a template:** choose Header → Image and upload the matching file as the sample.
- **When sending:** pass the public link as the header parameter, e.g. `https://www.willdrafting.in/images/whatsapp/payment_pending-hi.jpg` (live once deployed).
- **To change wording or colours:** edit `scripts/generate-whatsapp-images.mjs` and run `node scripts/generate-whatsapp-images.mjs` (needs Google Chrome).

---

## Rules that keep these templates in the Utility category

1. **No offers, discounts, urgency or praise.** Avoid words like "hurry", "don't miss", "limited", "special", "exclusive", "best".
2. **Send each template once per real event** (one order, one session, one verification). Never re-send the same template on a timer as a nudge.
3. **Only to people who ticked the WhatsApp consent box** (except `login_code`, which they request themselves).
4. **Quiet hours:** send only between 9:00 and 21:00 IST. Hold anything triggered outside that window until 9:00.
5. **STOP handling:** if someone replies STOP or taps "Stop updates", set `unsubscribedAt` and `marketingConsent: false` on the lead or user, and send nothing more except `login_code` and payment messages they cause themselves.
6. **Language:** use `hi` if the user used the Hindi toggle in the form, otherwise `en`.
7. **Every quick-reply tap opens a free 24-hour service window.** Reply in person (or with a free-form message) during that window. This is where most conversions will happen.

If Meta re-labels a template as Marketing, request a review first and don't edit the wording blindly. Repeated misuse can restrict **all** utility templates for 7–30 days, payment messages included.

---

## 1. `login_code` — Authentication

Authentication templates use Meta's fixed wording. You cannot write your own body text.

- **Category:** Authentication
- **Languages:** `en`, `hi` (Meta supplies the translated preset text)
- **Code delivery:** Copy code
- **Add security recommendation:** On ("For your security, do not share this code.")
- **Add expiry time:** On, **10 minutes** (matches `OTP_TTL_MS` in `src/lib/otp.ts`)
- **Button text:** `Copy code` / Hindi: `कोड कॉपी करें`
- **Variable:** `{{1}}` = 6-digit code, sample `482913`

**When:** popup or login, in place of (or alongside) the email code. Proving the code also proves the number is on WhatsApp.

---

## 2. `optin_confirmation` — Utility

**When:** right after the user ticks "Send me updates about my will on WhatsApp". Send once.

**Body (en)**
```
Hi {{1}}, WhatsApp updates are now on for your WillDrafting.in account.

We will message you here only about your will draft, payments and lawyer reviews. You can turn these updates off at any time.
```

**Body (hi)**
```
नमस्ते {{1}}, आपके WillDrafting.in खाते के लिए WhatsApp अपडेट चालू हो गए हैं।

हम यहाँ केवल आपकी वसीयत के ड्राफ़्ट, भुगतान और वकील की समीक्षा से जुड़े संदेश भेजेंगे। आप ये अपडेट कभी भी बंद कर सकते हैं।
```

**Footer:** `WillDrafting.in` (both languages)

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (static) | Open my will | मेरी वसीयत खोलें | `https://www.willdrafting.in/start/dashboard` |
| Quick reply | Talk to support | सहायता से बात करें | — |
| Quick reply | Stop updates | अपडेट बंद करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First word of `lead.name` / `user.name` | Ankur |

---

## 3. `account_setup_steps` — Utility

**When:** once, 10 minutes after signup (`email_verified` event), only if the user has consented. Meta lists "profile setup steps" as utility.

**Body (en)**
```
Hi {{1}}, your WillDrafting.in account is set up.

To complete your will, it helps to keep these ready:
1. Names and dates of birth of your family members
2. A list of your main assets, such as a house, bank accounts or shares
3. The name of one person you trust to act as executor

Your draft saves automatically, so you can fill it in parts.
```

**Body (hi)**
```
नमस्ते {{1}}, आपका WillDrafting.in खाता तैयार है।

वसीयत पूरी करने के लिए ये जानकारी पास रखना उपयोगी होगा:
1. परिवार के सदस्यों के नाम और जन्म तिथि
2. आपकी मुख्य संपत्तियों की सूची, जैसे घर, बैंक खाते या शेयर
3. एक भरोसेमंद व्यक्ति का नाम, जो आपकी वसीयत का प्रबंधक (executor) बने

आपका ड्राफ़्ट अपने आप सेव होता है, इसलिए आप इसे थोड़ा-थोड़ा करके भर सकते हैं।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (dynamic) | Open my will | मेरी वसीयत खोलें | `https://www.willdrafting.in/start/{{1}}` — sample `01` |
| Quick reply | I have a question | मेरा एक सवाल है | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| Body `{{1}}` | First name | Tarlochan |
| URL `{{1}}` | `getUrlForStep(will.furthestStep ?? 2)` without `/start/` | `01` |

---

## 4. `draft_progress_saved` — Utility

**When:** once per session, 2 hours after the user's last save, only if the draft is not complete. At most once every 3 days and at most 3 times in total per person. **This one is the most likely to be re-labelled, so keep the wording factual.**

**Body (en)**
```
Hi {{1}}, your will draft was last saved on {{2}}.

Completed: {{3}}
Still to fill: {{4}}

You can continue from the same step whenever you like.
```

**Body (hi)**
```
नमस्ते {{1}}, आपकी वसीयत का ड्राफ़्ट आख़िरी बार {{2}} को सेव हुआ था।

पूरे हो चुके हिस्से: {{3}}
बाक़ी हिस्से: {{4}}

आप जब चाहें उसी चरण से आगे भर सकते हैं।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (dynamic) | Continue my draft | ड्राफ़्ट आगे भरें | `https://www.willdrafting.in/start/{{1}}` — sample `03` |
| Quick reply | Help with this step | इस चरण में मदद | — |
| Quick reply | Talk to support | सहायता से बात करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| Body `{{1}}` | First name | Ankur |
| Body `{{2}}` | `will.updatedAt`, formatted `2 Nov 2026` | 2 Nov 2026 |
| Body `{{3}}` | `analyzeWillState(...).filledSections` joined with ", " | About You, Family, Executor |
| Body `{{4}}` | `analyzeWillState(...).missingSections` joined with ", " | Assets, Allocations |
| URL `{{1}}` | `getUrlForStep(will.lastStep ?? will.furthestStep)` without `/start/` | `03` |

For Hindi, translate the section names using `hindiTitle` from `QUESTIONNAIRE_STEPS`.

---

## 5. `payment_pending` — Utility

**When:** an order stays in `created` / `pending` for 30 minutes. Send once per order, and only for the account's latest order.

**Body (en)**
```
Hi {{1}}, your order {{2}} for the {{3}} plan (₹{{4}}) has not been paid yet.

If money was deducted from your account, reply to this message and we will check it for you. To complete the payment, use the link below.
```

**Body (hi)**
```
नमस्ते {{1}}, आपके ऑर्डर {{2}} ({{3}} प्लान, ₹{{4}}) का भुगतान अभी नहीं हुआ है।

अगर आपके खाते से पैसे कट गए हैं, तो इस संदेश का जवाब दें, हम आपके लिए इसकी जाँच करेंगे। भुगतान पूरा करने के लिए नीचे दिए गए लिंक का इस्तेमाल करें।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (static) | Complete payment | भुगतान पूरा करें | `https://www.willdrafting.in/start/12` |
| Quick reply | Money was deducted | पैसे कट गए हैं | — |
| Quick reply | Talk to support | सहायता से बात करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First name | Bhavya |
| `{{2}}` | `order.txnId` | WD20261014A7F3 |
| `{{3}}` | `PLANS[order.planId].name` | Auto Verified (Essential Will) |
| `{{4}}` | `order.amount` | 2,490 |

---

## 6. `payment_failed` — Utility

**When:** the payment gateway reports a failure (`payment_failed` event). Send once per order.

**Body (en)**
```
Hi {{1}}, the payment for your order {{2}} ({{3}} plan, ₹{{4}}) did not go through.

Reason: {{5}}.

If any amount was deducted, reply to this message and we will check it for you. You can try the payment again using the link below.
```

**Body (hi)**
```
नमस्ते {{1}}, आपके ऑर्डर {{2}} ({{3}} प्लान, ₹{{4}}) का भुगतान पूरा नहीं हो पाया।

कारण: {{5}}।

अगर कोई राशि कट गई है, तो इस संदेश का जवाब दें, हम आपके लिए इसकी जाँच करेंगे। आप नीचे दिए गए लिंक से फिर से भुगतान कर सकते हैं।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (static) | Try payment again | फिर से भुगतान करें | `https://www.willdrafting.in/start/12` |
| Quick reply | Money was deducted | पैसे कट गए हैं | — |
| Quick reply | Talk to support | सहायता से बात करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First name | Bhavya |
| `{{2}}` | `order.txnId` | WD20261014A7F3 |
| `{{3}}` | `PLANS[order.planId].name` | Auto Verified (Essential Will) |
| `{{4}}` | `order.amount` | 2,490 |
| `{{5}}` | `order.failureReason`, or "not shared by the bank" / "बैंक ने कारण नहीं बताया" | Transaction declined by bank |

---

## 7. `payment_receipt` — Utility

**When:** `payment_succeeded` event. Send once per order.

**Body (en)**
```
Hi {{1}}, we have received your payment of ₹{{2}} for the {{3}} plan. Order number: {{4}}.

Your invoice has been sent to {{5}}. Your next step is to finish your will and verify your details to download it.
```

**Body (hi)**
```
नमस्ते {{1}}, हमें आपका ₹{{2}} का भुगतान {{3}} प्लान के लिए मिल गया है। ऑर्डर नंबर: {{4}}।

आपका इनवॉइस {{5}} पर भेज दिया गया है। अगला चरण है अपनी वसीयत पूरी करना और डाउनलोड करने के लिए अपनी जानकारी की पुष्टि करना।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (dynamic) | Open my will | मेरी वसीयत खोलें | `https://www.willdrafting.in/start/{{1}}` — sample `04` |
| Quick reply | Talk to support | सहायता से बात करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| Body `{{1}}` | First name | Kirtima |
| Body `{{2}}` | `order.amount` | 2,490 |
| Body `{{3}}` | `PLANS[order.planId].name` | Auto Verified (Essential Will) |
| Body `{{4}}` | `order.txnId` | WD20261013C21B |
| Body `{{5}}` | `user.email` | kirtima@example.com |
| URL `{{1}}` | `getUrlForStep(will.furthestStep ?? 2)` without `/start/` | `04` |

---

## 8. `will_ready_to_verify` — Utility

**When:** a paid user has reached step 13 or later (`will.furthestStep >= 13`) but `detailsVerified` is still false 1 hour later. Send once.

**Body (en)**
```
Hi {{1}}, all sections of your will draft are filled in.

The last step is to check your details and confirm them with a one-time code. After this, your will is locked and ready to download.
```

**Body (hi)**
```
नमस्ते {{1}}, आपकी वसीयत के ड्राफ़्ट के सभी हिस्से भर गए हैं।

आख़िरी चरण है अपनी जानकारी जाँचना और एक बार के कोड (OTP) से उसकी पुष्टि करना। इसके बाद आपकी वसीयत लॉक हो जाएगी और डाउनलोड के लिए तैयार होगी।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (static) | Review and verify | जाँचें और पुष्टि करें | `https://www.willdrafting.in/start/14` |
| Quick reply | I need help | मुझे मदद चाहिए | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First name | Ankur |

---

## 9. `will_verified_download` — Utility

**When:** `will_verified` event. Send once per verification.

**Body (en)**
```
Hi {{1}}, your will was verified and locked on {{2}}. You can download the final document using the link below.

To make it valid, print it and sign it in front of two witnesses, who must also sign it. Keep the original safe and tell your executor where it is.
```

**Body (hi)**
```
नमस्ते {{1}}, आपकी वसीयत {{2}} को सत्यापित और लॉक हो गई है। आप नीचे दिए गए लिंक से अंतिम दस्तावेज़ डाउनलोड कर सकते हैं।

इसे मान्य बनाने के लिए इसका प्रिंट लें और दो गवाहों के सामने इस पर हस्ताक्षर करें, और दोनों गवाह भी इस पर हस्ताक्षर करें। मूल प्रति सुरक्षित रखें और अपने प्रबंधक (executor) को बताएँ कि वह कहाँ रखी है।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (static) | Download my will | मेरी वसीयत डाउनलोड करें | `https://www.willdrafting.in/start/14` |
| Quick reply | Questions on signing | हस्ताक्षर पर सवाल | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First name | Kirtima |
| `{{2}}` | `will.detailsVerifiedAt`, formatted `13 Oct 2026` | 13 Oct 2026 |

---

## 10. `lawyer_review_update` — Utility (submit later)

**When:** the will status changes to `clarification_requested` or `approved` on the Lawyer Verified or Premium plan. **The app has no lawyer-review screen yet.** Submit this once that feature ships, and point the button at the page where users read the lawyer's notes.

**Body (en)**
```
Hi {{1}}, there is an update on the lawyer review of your will.

Status: {{2}}

Please open your account to see the details.
```

**Body (hi)**
```
नमस्ते {{1}}, आपकी वसीयत की वकील द्वारा समीक्षा पर एक अपडेट है।

स्थिति: {{2}}

विवरण देखने के लिए कृपया अपना खाता खोलें।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| URL (static) | View review | समीक्षा देखें | `https://www.willdrafting.in/dashboard` |
| Quick reply | Talk to support | सहायता से बात करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First name | Annie |
| `{{2}}` | Fixed phrase by status (see below) | The lawyer has a question about your Assets section |

Status phrases:
- `clarification_requested`: "The lawyer has a question about your {{section}} section" / "वकील का आपके {{section}} हिस्से के बारे में एक सवाल है"
- `approved`: "The lawyer has approved your will" / "वकील ने आपकी वसीयत को मंज़ूरी दे दी है"

---

## 11. `consultation_confirmed` — Utility (submit later)

**When:** a lawyer call is booked, and again 1 hour before the call. **The app has no booking feature yet** (`consultationBookings` exists in the will data but nothing writes to it).

**Body (en)**
```
Hi {{1}}, your call with {{2}} is confirmed for {{3}}.

Topic: {{4}}

Please keep your will draft open during the call so you can make changes together.
```

**Body (hi)**
```
नमस्ते {{1}}, {{2}} के साथ आपकी कॉल {{3}} के लिए तय है।

विषय: {{4}}

कृपया कॉल के दौरान अपनी वसीयत का ड्राफ़्ट खुला रखें, ताकि आप साथ मिलकर बदलाव कर सकें।
```

**Footer:** `WillDrafting.in`

**Buttons**
| Type | en | hi | Value |
|---|---|---|---|
| Quick reply | Reschedule | समय बदलें | — |
| Quick reply | Talk to support | सहायता से बात करें | — |

**Variables**
| Var | Source | Sample |
|---|---|---|
| `{{1}}` | First name | Adish |
| `{{2}}` | `booking.lawyerName` | Adv. Kirtima Pandey |
| `{{3}}` | `booking.dateTime`, formatted `6 Nov 2026, 4:00 PM IST` | 6 Nov 2026, 4:00 PM IST |
| `{{4}}` | `booking.topic` | Dividing ancestral property |

---

## What utility can't cover

These moments need **Marketing** templates (about ₹1.02 per message including GST). Meta lists them as retargeting "even if requested by users":
- A second reminder to someone who signed up and never typed anything
- A reminder after `draft_progress_saved` has already gone out
- Any coupon or discount at checkout

Until you decide to add marketing templates, cover these with the free service window. Every quick-reply tap above opens one, and a person replying from your side converts better than any template.

## Submission checklist

- [ ] Create a WhatsApp Business account, verify the business in Meta Business Manager, and add the sender number
- [ ] Submit templates 1–9 in both `en` and `hi`, using the sample values in the tables
- [ ] For dynamic URL buttons, give the full sample URL (for example `https://www.willdrafting.in/start/03`)
- [ ] Subscribe to the `template_category_update` webhook so a re-label doesn't go unnoticed
- [ ] Add the consent checkbox (unticked) to the popup and signup before sending templates 2–9
