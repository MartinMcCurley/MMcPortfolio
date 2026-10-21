const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'info.html', 'n8nfinity.html', 'metamma.html', 'project-1.html', 'project-2.html', 'project-3.html', 'project-4.html'];
const failures = [];
let localLinks = 0;
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  if ((html.match(/<main\b/g) || []).length !== 1) failures.push(`${page}: expected one main landmark`);
  if (/G-XXXXXXXXXX|Photo placeholder|project-image-placeholder|src="js\/locomotive-/.test(html)) failures.push(`${page}: obsolete or placeholder setup`);
  if (html.indexOf('js/logger.js') > html.indexOf('js/main.js', html.indexOf('</head>'))) failures.push(`${page}: logger must load before main.js`);
  for (const [, ref] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(ref)) continue;
    if (ref.startsWith('/')) failures.push(`${page}: root-relative link ${ref}`);
    const target = ref.split('#')[0].split('?')[0];
    if (target && !fs.existsSync(path.join(root, target))) failures.push(`${page}: missing ${target}`);
    localLinks++;
  }
  for (const [, srcset] of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const entry of srcset.split(',')) {
      const file = entry.trim().split(/\s+/)[0];
      if (!fs.existsSync(path.join(root, file))) failures.push(`${page}: missing image ${file}`);
    }
  }
}
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const cards = fs.readFileSync(path.join(root, 'templates/main-projects-section.html'), 'utf8').trim();
assert.equal((cards.match(/class="project-card w-inline-block"/g) || []).length, 3, 'Only three real project cards should be published');
assert.ok(index.includes(cards), 'Homepage fallback must match the project template');
assert.ok(!/project-[234]\.html/.test(cards), 'Placeholder projects must stay off the homepage');
const info = fs.readFileSync(path.join(root, 'info.html'), 'utf8');
const about = fs.readFileSync(path.join(root, 'templates/info-content.html'), 'utf8').trim();
assert.ok(info.includes(about), 'Direct About page must match its SPA template');
assert.equal((about.match(/>About Me</g) || []).length, 1, 'About introduction must not repeat');
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`Passed: ${pages.length} pages, ${localLinks} local references, responsive images, shared About content, and three real projects.`);
