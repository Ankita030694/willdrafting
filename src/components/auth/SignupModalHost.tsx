"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SignupModal from "@/components/auth/SignupModal";

export const OPEN_SIGNUP_EVENT = "open-signup-modal";

/**
 * Single, app-wide SignupModal. Opens when:
 *  - a "open-signup-modal" window event fires, or
 *  - a visitor who isn't signed in clicks any marketing CTA linking to
 *    /contact (footer links and elements with data-no-signup are excluded).
 */
export default function SignupModalHost() {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_SIGNUP_EVENT, onOpen);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
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
      document.removeEventListener("click", onClick, true);
    };
  }, [status]);

  return <SignupModal isOpen={open} onClose={() => setOpen(false)} />;
}
