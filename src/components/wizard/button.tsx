"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ButtonProps {
  onBack?: () => void;
  onNext?: () => void;
  isSubmit?: boolean;
}

export default function WizardButton({ onBack, onNext, isSubmit }: ButtonProps) {
  const { isHi } = useLanguage();
  return (
    <div className="wizard-mobile-sticky-footer">
      {onBack && (
        <button type="button" onClick={onBack} className="btn-mobile-back">
          {isHi ? "← पीछे" : "Back"}
        </button>
      )}
      <button 
        type={isSubmit ? "submit" : "button"} 
        onClick={!isSubmit ? onNext : undefined} 
        className="btn-mobile-next"
      >
        {isHi ? "सहेजें और आगे बढ़ें" : "Save & Continue"} <ArrowRight size={16} />
      </button>
    </div>
  );
}
