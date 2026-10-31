// ── Dossier de compétences ───────────────────────────────────────────
// Chaque compétence renvoie aux projets qui la prouvent. Le nombre de projets
// est calculé depuis PROJECTS (projets-data.js) et l'ancienneté depuis
// l'année de début : rien à retoucher à la main quand un projet s'ajoute ou
// qu'une année passe.
//
// `depuis` se déduit du parcours : 2011 pour ce qui date de l'entrée chez
// Net.Com, 2017 pour ce qui vient du poste de référente Drupal 8+.
// `vedettes` fixe les trois projets montrés en preuve ; `preuve` sélectionne
// ceux qui sont comptés.

// Texte d'un projet où chercher une pratique : ce qui a été fait, pas le
// contexte du client.
const texteRealise = p => [p.role, p.contribution, p.highlight, ...(p.actions || []).map(a => a.text)]
    .filter(Boolean).join(" ");
const aStack = nom => p => (p.stack || []).includes(nom);
const mentionne = motif => p => motif.test(texteRealise(p));

const COMPETENCES = {
    techniques: [
        { nom: "PHP", icon: "fa-brands fa-php", depuis: 2011,
          detail: "Du legacy aux versions actuelles, typage strict et analyse statique.",
          preuve: aStack("PHP"), vedettes: ["polytechnique", "unml", "quartiers-plus"] },
        { nom: "Drupal", icon: "fa-brands fa-drupal", depuis: 2011,
          detail: "Drupal 7 puis référente Drupal 8+ : modules et thèmes sur-mesure, usines à sites.",
          preuve: p => p.tech === "drupal", vedettes: ["polytechnique", "ip-paris", "chu-grenoble"] },
        { nom: "Symfony", icon: "fa-brands fa-symfony", depuis: 2017,
          detail: "Applications métier et Doctrine ; certifiée. Socle de mes projets personnels.",
          preuve: p => p.tech === "symfony" || aStack("Symfony")(p), vedettes: ["quartiers-plus"], perso: "Symfony" },
        { nom: "WordPress", icon: "fa-brands fa-wordpress", depuis: 2011,
          detail: "Gutenberg, Elementor, Genesis ; thèmes enfants, extranets métier, API.",
          preuve: p => p.tech === "wordpress", vedettes: ["charot", "unml", "la-madeleine"] },
        { nom: "Usines à sites", icon: "fa-solid fa-diagram-project", depuis: 2017,
          detail: "Socles mutualisés multi-sites, thème parent et thèmes enfants.",
          preuve: p => (p.format || []).includes("usine"), vedettes: ["ip-paris", "polytechnique"] },
        { nom: "Migrations & reprises", icon: "fa-solid fa-arrow-right-arrow-left", depuis: 2017,
          detail: "Contenus, médias, multilingue, URLs ; imports massifs.",
          preuve: mentionne(/migrat|reprise|import/i), vedettes: ["polytechnique", "centrale-lyon", "enpc"] },
        { nom: "SQL (MySQL / PostgreSQL)", icon: "fa-solid fa-database", depuis: 2011,
          detail: "Modélisation, reprises de données. PostgreSQL sur mes projets personnels.",
          preuve: mentionne(/base de données|données|synchronis/i), vedettes: [], perso: "PostgreSQL" },
    ],
    transverses: [
        { nom: "Cadrage & relecture de cahiers", icon: "fa-solid fa-clipboard-check", depuis: 2011,
          detail: "Traduire un besoin métier en spécifications tenables ; faisabilité et alertes avant chiffrage.",
          preuve: mentionne(/cahier|cadrage|spécifi|besoin/i), vedettes: ["ensae", "ch-niort-intranet", "arb-cvl"] },
        { nom: "Intégration d'API & échanges de données", icon: "fa-solid fa-plug", depuis: 2011,
          detail: "API tierces et internes, SSO, synchronisations entre sites.",
          preuve: mentionne(/API|SSO|Keycloak|synchronis|OAI/i), vedettes: ["unml", "polytechnique", "ush-collab"] },
        { nom: "Sécurité & gestion des droits", icon: "fa-solid fa-shield-halved", depuis: 2017,
          detail: "Accès par profil, authentification, mises à jour et veille sur les failles.",
          preuve: mentionne(/sécurit|droits|SSO|Keycloak|authentif|accès/i), vedettes: ["unml", "ush-collab"] },
        { nom: "Accessibilité (RGAA / DSFR)", icon: "fa-solid fa-universal-access", depuis: 2017,
          detail: "Recettes accessibilité avant livraison, gabarits conformes au DSFR.",
          preuve: p => aStack("RGAA")(p) || aStack("DSFR")(p) || mentionne(/accessib/i)(p), vedettes: ["asp-public", "chu-grenoble"] },
        { nom: "Maintenance dans la durée", icon: "fa-solid fa-screwdriver-wrench", depuis: 2011,
          detail: "Mises à jour, correctifs, évolutions : des sites suivis sur plusieurs années.",
          preuve: mentionne(/maintenance/i), vedettes: ["ip-paris", "ch-niort-intranet", "onera"] },
        { nom: "Accompagnement & formation", icon: "fa-solid fa-chalkboard-user", depuis: 2011,
          detail: "Prise en main des équipes client ; montée en autonomie des recrues, revues de code.",
          preuve: mentionne(/accompagn|formation|autonom|prise en main/i), vedettes: ["ip-paris", "mnhn", "la-madeleine"] },
    ],
};


const byId=id=>PROJECTS.find(p=>p.id===id);
/* ───── Page compétences (sans niveau : ancienneté et preuves) ───── */
COMPETENCES.ia=[
 {nom:'Claude Code',icon:'fa-wand-magic-sparkles',detail:'Usage quotidien, avec mes propres agents, règles et skills de standards de code',preuve:()=>false,vedettes:[],perso:'Claude Code',depuisTexte:'agents et skills écrits et maintenus par moi'},
 {nom:'Mistral AI',icon:'fa-wand-magic-sparkles',detail:'Traduction et analyse de pertinence d’articles dans Vigil, intégration d’API IA',preuve:()=>false,vedettes:[],perso:'Mistral AI',depuisTexte:'projets personnels'}];
const annee=new Date().getFullYear(),plur=(n,m)=>`${n} ${m}${n>1?'s':''}`;
function skill(c,ia){
  const n=PROJECTS.filter(p=>c.preuve(p)||c.vedettes.includes(p.id)).length;
  const perso=c.perso?PERSONAL_PROJECTS.filter(p=>p.stack.includes(c.perso)).length:0;
  const meta=[c.depuis?`depuis ${c.depuis}, ${plur(annee-c.depuis,'an')}`:c.depuisTexte,n?plur(n,'projet')+' client':'',perso?plur(perso,'projet')+' perso':''].filter(Boolean);
  const v=c.vedettes.map(byId).filter(Boolean);
  return `<article class="card skill"><div class="top"><span class="tile ${ia?'ia':''}">${fa(c.icon)}</span><h3>${c.nom}</h3></div><p>${t(c.detail)}</p>
  <div class="meta">${meta.map(m=>`<span>${m}</span>`).join('')}</div>
  ${v.length?`<div class="links">${v.map(p=>`<a href="projets.html#${p.id}">${p.title}</a>`).join('')}</div>`:''}</article>`;
}
$('#c-tech').innerHTML=COMPETENCES.techniques.map(c=>skill(c)).join('');
$('#c-ia').innerHTML=COMPETENCES.ia.map(c=>skill(c,true)).join('');
$('#c-trans').innerHTML=COMPETENCES.transverses.map(c=>skill(c)).join('');

