const fs = require('fs');
const dir = 'src/components/wizard';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Step') && f.endsWith('.tsx'));
let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(dir + '/' + file, 'utf8');
  if (content.includes('Navigation Footer')) {
    // We add className="wizard-footer" to the div directly following {/* Navigation Footer */}
    content = content.replace(/\{\/\* Navigation Footer \*\/\}\s*<div/g, '{/* Navigation Footer */}\n          <div className="wizard-footer"');
    fs.writeFileSync(dir + '/' + file, content);
    count++;
  }
});
console.log('Updated ' + count + ' files.');
