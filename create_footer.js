const fs = require('fs');
const path = require('path');

const componentCode = `import React from 'react';
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
`;

fs.writeFileSync('src/components/wizard/WizardFooter.tsx', componentCode);

const cssAddition = `
/* Real Mobile Footer Component Styles */
.wizard-mobile-sticky-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  background-color: #FFFFFF;
  border-radius: 14px;
  border: 1px solid rgba(27, 42, 74, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  margin-top: auto;
}

@media (max-width: 900px) {
  .wizard-mobile-sticky-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    border-radius: 0;
    border-top: 1px solid rgba(27, 42, 74, 0.1);
    border-bottom: none;
    border-left: none;
    border-right: none;
    padding: 0.8rem 1rem;
    padding-bottom: calc(0.8rem + env(safe-area-inset-bottom, 0px));
    margin-top: 0;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  }
}

.btn-mobile-back {
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(27, 42, 74, 0.15);
  background-color: #FFFFFF;
  color: var(--color-navy);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-mobile-next {
  padding: 0.65rem 1.85rem;
  border-radius: 999px;
  background-color: #C65378;
  color: #FFFFFF;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex: 1;
  margin-left: 1rem;
  border: none;
}
`;

const globalsCssPath = 'src/app/globals.css';
let cssContent = fs.readFileSync(globalsCssPath, 'utf8');
// Remove the old hacky wizard-footer block if present
cssContent = cssContent.replace(/\/\* Mobile Unified Sticky Navigation Footer \*\/[\s\S]*?(?=\/\* Comprehensive Review Grid)/, cssAddition + '\n\n');
fs.writeFileSync(globalsCssPath, cssContent);

console.log("Component and CSS created.");
