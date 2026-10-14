import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Standard date formatter for the entire project.
 * Converts any date format (YYYY-MM-DD, ISO string, Date object) to DD/MM/YYYY.
 */
export function formatDDMMYYYY(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  try {
    if (typeof dateInput === "string") {
      const trimmed = dateInput.trim();
      if (!trimmed) return "";
      // If already DD/MM/YYYY, return directly
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
        return trimmed;
      }
      // If YYYY-MM-DD or ISO timestamp YYYY-MM-DDTHH:mm:ss...
      const matchIso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (matchIso) {
        const [, y, m, d] = matchIso;
        return `${d}/${m}/${y}`;
      }
      // If DD-MM-YYYY
      const matchDash = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})/);
      if (matchDash) {
        const [, d, m, y] = matchDash;
        return `${d}/${m}/${y}`;
      }
    }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return typeof dateInput === "string" ? dateInput : "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return typeof dateInput === "string" ? dateInput : "";
  }
}

