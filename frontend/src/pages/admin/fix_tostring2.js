const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/lomba-web-ms/frontend/src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const regex = /\(i\?\.([a-zA-Z0-9_]+) \|\| ''\)\.toLowerCase\(\)/g;
  if (regex.test(content)) {
    content = content.replace(regex, "String(i?.$1 || '').toLowerCase()");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed toString (with ?.)', file);
  }
}
