import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const scriptSource = await readFile(join(root, 'script.js'), 'utf8');
const translationStart = scriptSource.indexOf('const translations = ') + 'const translations = '.length;
const translationEnd = scriptSource.indexOf('\n};\n\nfunction getSavedLanguage', translationStart) + 2;

if (translationStart < 'const translations = '.length || translationEnd < 2) {
  throw new Error('Could not locate the translation dictionary in script.js.');
}

const translations = vm.runInNewContext(`(${scriptSource.slice(translationStart, translationEnd)})`);
const english = translations.en;

const pages = [
  { source: 'index.html', output: 'en/index.html', page: 'home', canonical: 'https://eminidis.gr/en/' },
  { source: 'erga.html', output: 'en/projects/index.html', page: 'projects', canonical: 'https://eminidis.gr/en/projects/' },
  { source: 'anakainiseis.html', output: 'en/renovations/index.html', page: 'renovations', canonical: 'https://eminidis.gr/en/renovations/' },
  { source: 'epikoinwnia.html', output: 'en/contact/index.html', page: 'contact', canonical: 'https://eminidis.gr/en/contact/' }
];

const routeReplacements = new Map([
  ['href="/epikoinwnia"', 'href="/en/contact/"'],
  ['href="/anakainiseis"', 'href="/en/renovations/"'],
  ['href="/erga"', 'href="/en/projects/"'],
  ['href="/"', 'href="/en/"']
]);

const staticReplacements = new Map([
  ['Eminidis Κατασκευαστική, αρχική', 'Eminidis Construction, home'],
  ['alt="Eminidis Κατασκευαστική"', 'alt="Eminidis Construction"'],
  ['aria-label="Κύρια πλοήγηση"', 'aria-label="Main navigation"'],
  ['aria-label="Επιλογή γλώσσας"', 'aria-label="Choose language"'],
  ['aria-label="Επικοινωνία"', 'aria-label="Contact"'],
  ['aria-label="Μεγέθυνση κύριας εικόνας ανακαίνισης"', 'aria-label="Open full-size renovation image"'],
  ['aria-label="Μεγέθυνση σταδίου εργασιών ', 'aria-label="Open full-size renovation stage '],
  ['alt="Πολυκατοικία μετά την ολική ανακαίνιση"', 'alt="Apartment building after complete renovation"'],
  ['alt="Στάδιο εργασιών ', 'alt="Renovation work stage '],
  ['alt="Φωτορεαλιστικό πολυκατοικίας στην Άνω Ηλιούπολη"', 'alt="Architectural rendering of an apartment building in Ano Ilioupoli"'],
  ['<p>Παστέρ 10<br>Πολίχνη Θεσσαλονίκης</p>', '<p>10 Pasteur Street<br>Polichni, Thessaloniki</p>']
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function localizeElements(html) {
  for (const [key, value] of Object.entries(english)) {
    const escapedKey = escapeRegExp(key);
    const elementPattern = new RegExp(`(<([a-z][\\w-]*)\\b[^>]*\\bdata-i18n="${escapedKey}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`, 'gi');
    html = html.replace(elementPattern, `$1${value}$3`);

    const ariaPattern = new RegExp(`<[^>]*\\bdata-i18n-aria-label="${escapedKey}"[^>]*>`, 'gi');
    html = html.replace(ariaPattern, (tag) => tag.replace(/aria-label="[^"]*"/i, `aria-label="${value.replace(/"/g, '&quot;')}"`));
  }

  return html;
}

await rm(join(root, 'en'), { force: true, recursive: true });

for (const page of pages) {
  let html = await readFile(join(root, page.source), 'utf8');
  const title = english[`${page.page}DocumentTitle`] || english.documentTitle;
  const description = english[`${page.page}MetaDescription`] || english.metaDescription;

  html = localizeElements(html)
    .replace('<html lang="el">', '<html lang="en">')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${page.canonical}">`)
    .replace(/data-language-option="en"[^>]*>EN</g, 'data-language-option="el" role="menuitem">ΕΛ<')
    .replace('<span data-language-current>ΕΛ</span>', '<span data-language-current>EN</span>')
    .replace(/href="assets\//g, 'href="/assets/')
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/poster="assets\//g, 'poster="/assets/')
    .replace(/href="(styles|responsive|pages)\.css/g, 'href="/$1.css')
    .replace(/src="script\.js/g, 'src="/script.js');

  for (const [from, to] of routeReplacements) {
    html = html.replaceAll(from, to);
  }

  for (const [from, to] of staticReplacements) {
    html = html.replaceAll(from, to);
  }

  html = html
    .replace(/aria-label="Μεγέθυνση εικόνας [^"]+"/g, 'aria-label="Open full-size project image"')
    .replace(/alt="Ολοκληρωμένη πολυκατοικία[^"]*"/g, 'alt="Completed apartment building in Thessaloniki"')
    .replace(/alt="Ολοκληρωμένη μονοκατοικία[^"]*"/g, 'alt="Completed detached house in Thessaloniki"')
    .replace(/alt="Ολοκληρωμένο συγκρότημα[^"]*"/g, 'alt="Completed residential complex in Thessaloniki"')
    .replace(/alt="Συγκρότημα(?: κατοικιών)?[^"]*"/g, 'alt="Additional view of a residential complex in Thessaloniki"');

  const outputPath = join(root, page.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

console.log('English pages generated in en/.');
