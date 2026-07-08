const fs = require('fs');
const path = require('path');

const dir = 'c:/laragon/www/lomba-web-ms/frontend/src/pages/admin';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('setItems(Array.isArray(data) ? data : []);')) {
    content = content.replace('setItems(Array.isArray(data) ? data : []);', 'setItems(Array.isArray(data) ? data.filter(Boolean) : []);');
    changed = true;
  }
  
  if (content.includes('setItems(Array.isArray(res.data.data) ? res.data.data : []);')) {
    content = content.replace('setItems(Array.isArray(res.data.data) ? res.data.data : []);', 'setItems(Array.isArray(res.data.data) ? res.data.data.filter(Boolean) : []);');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed literally', file);
  }
}
