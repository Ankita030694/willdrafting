"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SignupModal from "@/components/auth/SignupModal";

export const OPEN_SIGNUP_EVENT = "open-signup-modal";

/**
 * Single, app-wide SignupModal. Opens when:
 *  - a "open-signup-modal" window/document event fires, or
 *  - any element with [data-open-signup] is clicked, or
 *  - a visitor who isn't signed in clicks any marketing CTA linking to
 *    /contact (footer links and elements with data-no-signup are excluded).
 */
export default function SignupModalHost() {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    if (typeof window !== "undefined") {
      (window as unknown as { openSignupModal?: () => void }).openSignupModal = onOpen;
    }
    window.addEventListener(OPEN_SIGNUP_EVENT, onOpen);
    window.addEventListener("open-signup-modal", onOpen);
    window.addEventListener("open-login-modal", onOpen);
    document.addEventListener(OPEN_SIGNUP_EVENT, onOpen);
    document.addEventListener("open-signup-modal", onOpen);
    document.addEventListener("open-login-modal", onOpen);

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as Element | null;
      if (target?.closest?.("[data-open-signup]")) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
        return;
      }
      if (e.defaultPrevented) return;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href !== "/contact") return;
      if (a.closest("footer") || a.closest("[data-no-signup]")) return;
      e.preventDefault();
      // Stop next/link's own handler from navigating to /contact.
      e.stopPropagation();
      if (status === "authenticated") {
        // Already signed in: CTAs take them straight to their dashboard.
        router.push("/start/dashboard");
      } else {
        setOpen(true);
      }
    };
    // Capture phase so we run before next/link's click handler.
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener(OPEN_SIGNUP_EVENT, onOpen);
      window.removeEventListener("open-signup-modal", onOpen);
      window.removeEventListener("open-login-modal", onOpen);
      document.removeEventListener(OPEN_SIGNUP_EVENT, onOpen);
      document.removeEventListener("open-signup-modal", onOpen);
      document.removeEventListener("open-login-modal", onOpen);
      document.removeEventListener("click", onClick, true);
    };
  }, [status]);

  return <SignupModal isOpen={open} onClose={() => setOpen(false)} />;
}
