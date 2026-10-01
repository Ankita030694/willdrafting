import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardFooterProps {
  onBack?: () => void;
  onNext?: () => void;
  isSubmit?: boolean;
}

export default function WizardFooter({ onBack, onNext, isSubmit }: WizardFooterProps) {
  return (
    <div className="wizard-mobile-sticky-footer">
      {onBack && (
        <button type="button" onClick={onBack} className="btn-mobile-back">
          <ArrowLeft size={16} /> Back
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
