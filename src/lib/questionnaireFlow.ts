export interface QuestionnaireStepConfig {
  step: number; // 1 to 14
  displayNum?: number; // 1 to 13 for questionnaire steps
  isWelcome?: boolean;
  slug: string; // "" for Welcome, "01" through "13"
  title: string;
  hindiTitle: string;
  path: string; // "/start" for Welcome, "/start/01" through "/start/13"
}

/**
 * Centralized Questionnaire Flow:
 * - Step 1: Welcome & Overview (/start) -> Welcome sign/icon in sidebar
 * - Step 2: About You (/start/01) -> Number 1 in sidebar
 * - Step 3: My Family (/start/02) -> Number 2 in sidebar
 * - Step 4: Assets Register (/start/03) -> Number 3 in sidebar
 * - Step 5: Allocations (/start/04) -> Number 4 in sidebar
 * - Step 6: Executors (/start/05) -> Number 5 in sidebar
 * - Step 7: Testamentary Guardians (/start/06) -> Number 6 in sidebar
 * - Step 8: Special Wishes (/start/07) -> Number 7 in sidebar
 * - Step 9: Emotional Purpose (/start/08) -> Number 8 in sidebar
 * - Step 10: Full Review (/start/09) -> Number 9 in sidebar
 * - Step 11: Legal Health Check (/start/10) -> Number 10 in sidebar
 * - Step 12: Clause Assembly (/start/11) -> Number 11 in sidebar
 * - Step 13: Plan Selection (/start/12) -> Number 12 in sidebar
 * - Step 14: Final Will Document (/start/13 or /start/14) -> PDF step
 */
export const QUESTIONNAIRE_STEPS: QuestionnaireStepConfig[] = [
  { step: 1, isWelcome: true, slug: "", title: "Welcome & Overview", hindiTitle: "स्वागत", path: "/start" },
  { step: 2, displayNum: 1, slug: "01", title: "About You", hindiTitle: "अपनी जानकारी", path: "/start/01" },
  { step: 3, displayNum: 2, slug: "02", title: "My Family", hindiTitle: "परिवार", path: "/start/02" },
  { step: 4, displayNum: 3, slug: "03", title: "Assets Register", hindiTitle: "संपत्ति", path: "/start/03" },
  { step: 5, displayNum: 4, slug: "04", title: "Allocations", hindiTitle: "बंटवारा", path: "/start/04" },
  { step: 6, displayNum: 5, slug: "05", title: "Executors", hindiTitle: "प्रबंधक", path: "/start/05" },
  { step: 7, displayNum: 6, slug: "06", title: "Testamentary Guardians", hindiTitle: "अभिभावक", path: "/start/06" },
  { step: 8, displayNum: 7, slug: "07", title: "Special Wishes", hindiTitle: "उपहार", path: "/start/07" },
  { step: 9, displayNum: 8, slug: "08", title: "Emotional Purpose", hindiTitle: "संदेश", path: "/start/08" },
  { step: 10, displayNum: 9, slug: "09", title: "Full Review", hindiTitle: "समीक्षा", path: "/start/09" },
  { step: 11, displayNum: 10, slug: "10", title: "Legal Health Check", hindiTitle: "कानूनी जांच", path: "/start/10" },
  { step: 12, displayNum: 11, slug: "11", title: "Clause Assembly", hindiTitle: "संकलन", path: "/start/11" },
  { step: 13, displayNum: 12, slug: "12", title: "Plan Selection", hindiTitle: "योजना", path: "/start/12" },
  { step: 14, displayNum: 13, slug: "14", title: "Final Will Document", hindiTitle: "मूल वसीयत", path: "/start/14" },
];

/**
 * Returns internal step number (1-14) given a URL param like "01", "04", "14", or undefined (/start).
 */
export function getStepFromParam(param: string | string[] | undefined | null): number {
  if (!param) return 1; // /start -> Step 1 (Welcome)
  const str = Array.isArray(param) ? param[0] : String(param);
  const num = parseInt(str, 10);
  if (isNaN(num)) return 1;
  if (num >= 13) return 14; // Both /start/13 and /start/14 lead to Step 14 (PDF step)
  return Math.min(14, Math.max(1, num + 1));
}

/**
 * Returns exact URL path for a given internal step number (1 to 14).
 * - Step 1 (Welcome) -> "/start"
 * - Step 2 (About You) -> "/start/01"
 * - Step 5 (Allocations) -> "/start/04"
 * - Step 6 (Executors) -> "/start/05"
 * - Step 14 (Final Will PDF) -> "/start/14"
 */
export function getUrlForStep(step: number): string {
  if (step <= 1) return "/start";
  if (step >= 14) return "/start/14";
  const urlNum = Math.min(13, step - 1);
  return `/start/${String(urlNum).padStart(2, "0")}`;
}

/**
 * Computes next step in the questionnaire flow, accounting for conditions
 * (such as skipping Guardians if there are no minor children).
 */
export function getNextStepNumber(currentStep: number, hasMinors: boolean): number {
  if (currentStep === 6 && !hasMinors) {
    return 8; // Skip Step 7 Guardians if no minor children
  }
  return Math.min(14, currentStep + 1);
}

/**
 * Computes previous step in the questionnaire flow, accounting for conditions.
 */
export function getPrevStepNumber(currentStep: number, hasMinors: boolean): number {
  if (currentStep === 8 && !hasMinors) {
    return 6; // Go back to Step 6 Executors if no minor children
  }
  if (currentStep === 13) {
    return 11; // From Plan Selection back to Health Check / Assembly
  }
  return Math.max(1, currentStep - 1);
}
