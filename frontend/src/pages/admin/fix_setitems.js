const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/lomba-web-ms/frontend/src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace setItems(data); with defensive filtering
  if (content.includes('setItems(data);')) {
    content = content.replace(/setItems\(data\);/g, 'setItems(Array.isArray(data) ? data.filter(Boolean) : []);');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Bulletproofed', file);
  }
}
