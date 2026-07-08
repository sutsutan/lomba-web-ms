const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/lomba-web-ms/frontend/src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('StringString')) {
    content = content.replace(/StringString/g, 'String');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed StringString ->', file);
  }
}
console.log('Done!');
