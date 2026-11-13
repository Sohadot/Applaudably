// Static-site integrity and Applaudably commerce truthfulness checks.
// Run: node scripts/validate-site.mjs
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const siteFiles = [];
const visit = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) visit(path);
    else if (path.endsWith('.html')) siteFiles.push(path);
  }
};
visit(root);

const contents = new Map(siteFiles.map((path) => [relative(root, path), readFileSync(path, 'utf8')]));
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const concepts = [
  'beauty-instagram-template-kit.html',
  'skincare-brand-starter-kit.html',
  'luxury-salon-social-media-kit.html',
  'feminine-brand-moodboard-kit.html',
  'product-launch-canva-kit.html',
  'luxury-barber-instagram-template-kit.html',
];

for (const [file, html] of contents) {
  assert.match(html, /<title>[^<]+<\/title>/i, `Missing title: ${file}`);
  assert.match(html, /<meta name="description" content="[^"]+"/i, `Missing description: ${file}`);
  assert.doesNotMatch(html, /siham\.domains@gmail\.com/i, `Private email leaked: ${file}`);
  assert.doesNotMatch(html, /<form\b|\bcheckout\s*button\b/i, `Unexpected onsite form/checkout: ${file}`);

  for (const [, href, label] of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const linkText = label.replace(/<[^>]*>/g, '').trim();
    if (/buy on etsy/i.test(linkText)) {
      assert.match(href, /^https:\/\/(?:[^/]+\.)?etsy\.com\/(?:[^/]*\/)?listing\/\d+/i, `Buy CTA lacks a direct Etsy product listing: ${file}`);
    }
    if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const dest = normalize(join(dirname(join(root, file)), clean));
    assert.ok(dest.startsWith(root + '/') || dest === root, `Link escapes project: ${file} -> ${href}`);
    assert.ok(existsSync(dest), `Broken local link: ${file} -> ${href}`);
  }
}

for (const name of concepts) {
  const path = `products/${name}`;
  const html = contents.get(path);
  assert.ok(html, `Missing legacy concept page: ${path}`);
  assert.match(html, /name="robots" content="noindex,follow"/, `Concept must be noindex: ${path}`);
  assert.match(html, /Not for sale/i, `Concept must state not for sale: ${path}`);
  assert.doesNotMatch(html, /<a\b[^>]*>Buy on Etsy<\/a>|Instant digital download/i, `Concept has misleading sale language: ${path}`);
  assert.ok(!sitemap.includes(`products/${name}`), `Noindex concept in sitemap: ${path}`);
}

const catalog = contents.get('products/index.html');
assert.equal((catalog.match(/class="capability-number"/g) || []).length, 12, 'Catalog should show 12 capability families');
assert.match(contents.get('index.html'), /Nail Studio Visual Business Kit/, 'Missing first commercial focus');
assert.match(contents.get('custom.html'), /mailto:studio@applaudably\.com/, 'Custom inquiry email must be on brand');
assert.match(contents.get('products/index.html'), /No direct product listing URL is configured/, 'Catalog needs honest listing state');
assert.ok(siteFiles.length >= 15, 'Unexpectedly few HTML files checked');

console.log(`PASS: ${siteFiles.length} HTML files, all local links, six noindex concepts, 12 capability families, Etsy-only commerce and branded custom inquiry.`);
