const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/lomba-web-ms/frontend/src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // We want to safely convert any `(i.something?.toLowerCase() || '')` or `(i.something || '').toLowerCase()` 
  // to `String(i.something || '').toLowerCase()`

  // Fix 1: (i.something?.toLowerCase() || '') -> String(i.something || '').toLowerCase()
  const regex1 = /\(i\.([a-zA-Z0-9_]+)\?\.toLowerCase\(\) \|\| ''\)/g;
  if (regex1.test(content)) {
    content = content.replace(regex1, "String(i.$1 || '').toLowerCase()");
    changed = true;
  }

  // Fix 2: (i.something || '').toLowerCase() -> String(i.something || '').toLowerCase()
  // But wait, (i.something || '') is already a string IF it's a string. If it's a number, it becomes a number!
  const regex2 = /\(i\.([a-zA-Z0-9_]+) \|\| ''\)\.toLowerCase\(\)/g;
  if (regex2.test(content)) {
    content = content.replace(regex2, "String(i.$1 || '').toLowerCase()");
    changed = true;
  }
  
  // Fix 3: What about (item.major_code?.toUpperCase() || '') ?
  const regex3 = /\(item\.([a-zA-Z0-9_]+)\?\.toUpperCase\(\) \|\| ''\)/g;
  if (regex3.test(content)) {
    content = content.replace(regex3, "String(item.$1 || '').toUpperCase()");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed toString', file);
  }
}
