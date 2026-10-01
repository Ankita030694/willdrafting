const fs = require('fs');
const dir = 'src/components/wizard';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Step') && f.endsWith('.tsx'));
files.forEach(file => {
  const content = fs.readFileSync(dir + '/' + file, 'utf8');
  if (!content.includes('className="wizard-footer"')) {
    console.log(file);
  }
});
