// Voir outils/prerendre.sh. Exécuté avec NODE_PATH pointant sur jsdom.
const fs = require('fs');
const path = require('path');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');

const site = path.join(__dirname, '..', 'site');
const URL_SITE = 'https://mmagny.fr';

const CONTENEURS = {
  'index.html': ['facts', 'apports', 'ul-resp', 'ul-transv', 'ul-fs1', 'ul-fs2', 'ul-st1', 'ul-st2',
    'featured', 'perso-pub', 'perso-wip', 'ia-projects', 'loisirs'],
  'projets.html': ['pgrid'],
  'competences.html': ['c-tech', 'c-ia', 'c-trans'],
};

// Seuls les fichiers du site se chargent : ni tarteaucitron, ni Matomo, ni polices.
class Local extends ResourceLoader {
  fetch(url, options) {
    if (!url.startsWith('file://') || !url.includes('/site/assets/')) return null;
    const demande = super.fetch(url, options);
    // Un fichier local n'annonce pas son encodage : sans BOM, jsdom lit les scripts
    // en windows-1252 et casse les accents et les regex. Les navigateurs, eux, lisent
    // l'UTF-8 du document.
    const promesse = demande.then((corps) => Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), corps]));
    promesse.abort = () => demande.abort();
    return promesse;
  }
}

function remplacer(html, id, contenu) {
  const motif = new RegExp(`(<!--prerender:${id}-->)[\\s\\S]*?(<!--/prerender:${id}-->)`);
  if (!motif.test(html)) throw new Error(`Marqueur prerender:${id} introuvable`);
  return html.replace(motif, (_, ouvrant, fermant) => `${ouvrant}${contenu}${fermant}`);
}

(async () => {
  for (const [page, ids] of Object.entries(CONTENEURS)) {
    const fichier = path.join(site, page);
    const dom = await JSDOM.fromFile(fichier, {
      runScripts: 'dangerously',
      resources: new Local(),
      pretendToBeVisual: true,
      virtualConsole: (() => { const v = new VirtualConsole(); if (process.env.DEBUG_PRERENDU) v.sendTo(console); return v; })(),
      beforeParse(w) {
        w.matchMedia = w.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
      },
    });
    await new Promise((r) => dom.window.addEventListener('load', r));
    await new Promise((r) => setTimeout(r, 300));

    let html = fs.readFileSync(fichier, 'utf8');
    for (const id of ids) {
      const el = dom.window.document.getElementById(id);
      if (!el || !el.children.length) throw new Error(`${page} : #${id} vide après exécution du JavaScript`);
      html = remplacer(html, id, el.innerHTML);
    }

    if (page === 'projets.html') {
      const projets = dom.window.eval('PROJECTS');
      const ld = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projets de Mylène Magny',
        url: `${URL_SITE}/projets.html`,
        inLanguage: 'fr',
        about: { '@id': `${URL_SITE}/#mylene-magny` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: projets.length,
          itemListElement: projets.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${URL_SITE}/projets.html#${p.id}`,
            name: p.title,
            description: p.highlight,
          })),
        },
      };
      html = remplacer(html, 'ld', `<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
    }

    fs.writeFileSync(fichier, html);
    console.log(`${page} : ${ids.length} bloc(s) pré-rendu(s)`);
    dom.window.close();
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
