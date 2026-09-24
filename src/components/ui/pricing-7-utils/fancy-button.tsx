import * as React from "react";
import { cn } from "@/lib/utils";

export interface FancyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg";
}

export const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  ({ className, children, size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl bg-[#C65378] text-white font-medium shadow-sm transition-all duration-200 hover:bg-[#9F3B5C] active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          size === "sm" && "h-9 px-4 text-xs",
          size === "default" && "h-11 px-6 text-sm",
          size === "lg" && "h-12 px-8 text-base font-semibold",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
FancyButton.displayName = "FancyButton";
