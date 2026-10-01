import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ButtonProps {
  onBack?: () => void;
  onNext?: () => void;
  isSubmit?: boolean;
}

export default function WizardButton({ onBack, onNext, isSubmit }: ButtonProps) {
  return (
    <div className="wizard-mobile-sticky-footer">
      {onBack && (
        <button type="button" onClick={onBack} className="btn-mobile-back">
           Back
        </button>
      )}
      <button 
        type={isSubmit ? "submit" : "button"} 
        onClick={!isSubmit ? onNext : undefined} 
        className="btn-mobile-next"
      >
        Save & Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}
