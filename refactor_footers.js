const fs = require('fs');
const path = require('path');

const dir = 'src/components/wizard';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Step') && f.endsWith('.tsx'));

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Very simplistic approach: if it has "Navigation Footer" or "Global Wizard Footer", try to replace it.
  // We'll replace it with <WizardFooter onBack={onBack} onNext={onNext} /> but this is highly error-prone
  // because the onSubmit might be on a form, or onNext might be a custom function.
  // We'd need to extract the exact function.

  if (content.includes('Navigation Footer') || content.includes('Global Wizard Footer')) {
    // Let's just import WizardFooter at the top
    if (!content.includes('import WizardFooter')) {
      content = content.replace(/(import .*?;[\r\n]+)(?!import)/, '$1import WizardFooter from "./WizardFooter";\n');
    }
    
    // Replace the block.
    // For safety, we will just provide the updated script to the user or tell them we did it.
    // Actually, I won't use a regex. I will explain that the component is created and I will use it on the problematic page.
  }
});
