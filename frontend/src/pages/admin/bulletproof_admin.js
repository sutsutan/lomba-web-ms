const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/lomba-web-ms/frontend/src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Enhance Array.isArray(data) ? data : [] to Array.isArray(data) ? data.filter(Boolean) : []
  const regex1 = /setItems\(Array\.isArray\(([^)]+)\) \? \1 : \[\]\)/g;
  if (regex1.test(content)) {
    content = content.replace(regex1, 'setItems(Array.isArray($1) ? $1.filter(Boolean) : [])');
    changed = true;
  }

  // Also enhance any items.filter(i => ... ) to items.filter(i => i && ...)
  // This is a bit tricky, but since we already filtered out nulls at setItems, it's redundant but safe.

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Bulletproofed', file);
  }
}
