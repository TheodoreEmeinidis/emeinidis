import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

const files = [
  'index.html',
  'erga.html',
  'anakainiseis.html',
  'epikoinwnia.html',
  'styles.css',
  'responsive.css',
  'pages.css',
  'script.js',
];

await rm(dist, { force: true, recursive: true });
await mkdir(dist, { recursive: true });

for (const file of files) {
  await cp(join(root, file), join(dist, file));
}

await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true });

await writeFile(
  join(dist, '404.html'),
  `<!doctype html>
<html lang="el">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Η σελίδα δεν βρέθηκε | Eminidis Projects</title>
  <link rel="stylesheet" href="/styles.css?v=black9">
  <link rel="stylesheet" href="/responsive.css?v=black9">
  <link rel="stylesheet" href="/pages.css?v=black72">
</head>
<body>
  <main class="page-main">
    <section class="page-hero section-grid">
      <div class="section-label"><span>404</span><span>ΣΕΛΙΔΑ</span></div>
      <div class="page-hero-copy">
        <p class="eyebrow">EMINIDIS PROJECTS</p>
        <h1>Η σελίδα<br><i>δεν βρέθηκε.</i></h1>
        <p>Επιστρέψτε στην αρχική σελίδα για να συνεχίσετε την περιήγηση.</p>
        <a class="button button-light" href="/">Αρχική</a>
      </div>
    </section>
  </main>
</body>
</html>
`,
);

console.log('Static site built in dist/');
