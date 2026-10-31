// Accueil : extrait de code aléatoire, listes, projets phares, projets perso.
/* ───── Extraits : 10, un au hasard à chaque chargement ───── */
const SNIPS=[
['MigrerContenus.php',`// Migration Drupal 7 vers 11, épisode 3
foreach ($anciensContenus as $node) {
    if ($node->body === '') {
        $this->logger->notice('Page vide, on la migre quand même');
    }
    $this->importer->importer($node);
}`],
['terminal',`$ drush cr
$ drush cr
$ drush cr   # ça ne coûte rien d'essayer
Cache rebuild complete.`],
['VilleController.php',`#[Route('/ville', name: 'ville_index')]
public function index(Ville $ville): Response
{
    // Pas de temps réel : la partie avance au rythme du joueur
    return $this->render('ville/index.html.twig', [
        'ville' => $ville,
    ]);
}`],
['projet.html.twig',`{# Le PHP décide, le template affiche #}
{% for projet in projets %}
  <li>
    {{ projet.titre }}
  </li>
{% endfor %}`],
['terminal',`$ git commit -m "fix(cache): vider le cache était bien la solution"
$ git log --oneline -1
a3f9c21 fix(cache): vider le cache était bien la solution`],
['compose.yml',`services:
  web:
    container_name: mmagny-\${ENV:?}-web
    security_opt:
      - no-new-privileges:true   # on ne fait confiance à personne
    restart: unless-stopped`],
['orphelins.sql',`-- Retrouver les contenus orphelins avant la migration
SELECT n.nid, n.title
FROM node n
LEFT JOIN node_revision r ON r.nid = n.nid
WHERE r.nid IS NULL;`],
['Candidature.php',`final readonly class Candidature
{
    public function __construct(
        public string $poste = 'Développeuse back-end PHP',
        public string $lieu = 'Yonne ou télétravail',
        public bool $humainAuCentre = true,
    ) {}
}`],
['terminal',`$ claude
> Génère le socle Docker de ce projet Symfony
… 14 fichiers créés
$ git diff   # et là, je relis tout`],
['terminal',`$ composer update "drupal/*" --with-all-dependencies
# Prier n'est pas une stratégie, d'où les tests
$ vendor/bin/phpunit --filter MigrationTest
OK`]];
const KW=/\b(foreach|if|public|function|return|final|readonly|class|string|bool|services|SELECT|FROM|LEFT JOIN|WHERE|ON|IS|NULL|for|endfor|in)\b/g;
function hl(code){
  return esc(code).replace(/(\/\/.*|#(?!\[).*|--.*|\{#.*#\})|(#\[[^\]]*\])|('[^'\n]*'|"[^"\n]*")|(\$\w+)|\b(foreach|if|public|function|return|final|readonly|class|string|bool|SELECT|FROM|LEFT JOIN|WHERE|IS|NULL|for|endfor|in)\b/g,
   (m,c,a,s,v,k)=>c?`<span class="tc">${c}</span>`:a?`<span class="ta">${a}</span>`:s?`<span class="ts">${s}</span>`:v?`<span class="tk">${v}</span>`:`<span class="tk">${k}</span>`);
}
let si=Math.floor(Math.random()*SNIPS.length);
function showSnip(){const [n,c]=SNIPS[si];$('#snipname').textContent=n;$('#snip').innerHTML=hl(c)}
showSnip();
$('#snipnext').onclick=()=>{si=(si+1)%SNIPS.length;showSnip()};

/* ───── Accueil ───── */
$('#facts').innerHTML=`<div><b>15 ans</b> en agence web</div><div><b>100+</b> projets livrés</div><div><b>2017</b> lead dev Drupal</div>`;
$('#allp').innerHTML=`Explorer les ${nbP} projets ${svg('arrow')}`;
const APPORTS=[['drop','Une expertise Drupal','Usines à sites, modules sur-mesure, arbitrages d’architecture'],['move','Les projets hérités','Migrations, reprises de code existant, montées de version'],['shield','Un filet avant la livraison','Relectures, recette, standards de code partagés'],['users','De la transmission','Revues de code, accompagnement des nouvelles recrues'],['chat','L’écoute avant le code','Comprendre le métier, puis choisir la technique']];
$('#apports').innerHTML=APPORTS.map(a=>`<div class="card"><div class="top"><span class="tile">${svg(a[0])}</span><h3>${a[1]}</h3></div><p>${a[2]}</p></div>`).join('')
$('#apports').insertAdjacentHTML('beforeend',`<article class="card link cta"><div class="top"><span class="tile">${svg('award')}</span><h3>Le détail, compétence par compétence</h3></div><p>Ancienneté, nombre de projets et exemples qui le prouvent</p><a class="more" href="./competences.html">Ouvrir le dossier de compétences ${svg('arrow')}</a></article>`);
const L={
resp:[['Lead dev Drupal 8+','une vingtaine de sites institutionnels livrés et maintenus : modules et thèmes sur-mesure, usines à sites'],['Développement et support Symfony','applications sur-mesure, reprise de projets existants'],['Développement et support WordPress','Gutenberg, Elementor, Genesis, thèmes enfants, extranets métier, API'],['Relectures techniques des cahiers fonctionnels','faisabilité, coût réel, alertes avant chiffrage'],['Recettes internes avant livraison','performance, accessibilité, sécurité, conformité au cahier']],
transv:[['Accompagnement des nouvelles recrues','montée en autonomie, revues de code, transmission des pratiques Drupal'],['Pilote RSE de l’agence','conditions de travail, impact, engagement collectif'],['Culture qualité et sécurité côté serveur','standards de code, mises à jour, veille sur les failles'],['Industrialisation du démarrage de projets','socle Docker, conventions d’infrastructure et outillage communs à Symfony, Drupal et WordPress']],
fs1:[['Joomla, WordPress, Drupal 7, CodeIgniter','sites vitrines, boutiques, applications métier'],['Intégration et theming','maquettes converties en thèmes, responsive, compatibilité navigateurs'],['Support client et maintenance','correctifs, évolutions, montées de version']],
fs2:[['Recueil des besoins','traduire une demande métier en spécifications tenables'],['Gestion de projet et cadrage','planning, arbitrages de périmètre, points d’avancement'],['Formation des clients','prise en main de l’administration, documentation, autonomie']],
st1:[['Création d’un site Joomla','premier projet mené de bout en bout'],['Refonte ultérieure sous WordPress','reprise du contenu existant'],['Communication print et assistance formations','supports, mise en page, logistique']],
st2:[['Support matériel et assistance interne','postes de travail, dépannage utilisateurs'],['Amélioration intranet / extranet','outils internes, accès et droits'],['Travaux autour de l’intégration SAGE','gestion commerciale, échanges de données']]};
document.querySelectorAll('[data-ul]').forEach(u=>u.innerHTML=L[u.dataset.ul].map(i=>`<li>${svg('check')}<span><b>${i[0]}</b> ${i[1]}</span></li>`).join(''));

/* cartes projets phares */
const PHARES=['polytechnique','mnhn','ush-collab','unml','charot','quartiers-plus','la-madeleine'];
$('#featured').innerHTML=PHARES.map(byId).filter(Boolean).map(p=>`<article class="card link">
 <div class="top"><span class="tile">${svg(TECH[p.tech][1])}</span><div><h3>${p.title}</h3><span class="label">${TECH[p.tech][0]}</span></div></div>
 <p><b style="color:var(--fg);font-weight:600">${p.role}</b></p><p>${tx(p.highlight)}</p>
 <div class="stackrow">${p.stack.slice(0,4).map(s=>`<span class="chip">${s}</span>`).join('')}</div><button type="button" class="more" data-open="${p.id}">Voir le détail<span class="sr-only"> de ${p.title}</span> ${svg('arrow')}</button></article>`).join('');

$('#featured').insertAdjacentHTML('beforeend',`<article class="card link cta"><div class="top"><span class="tile">${svg('layers')}</span><h3>${nbP} projets détaillés</h3></div><p>Drupal, WordPress, Symfony : filtres par technologie et par domaine, avec le contexte, mon rôle, les livrables et le résultat de chacun</p><div class="stackrow"><span class="chip">${PROJECTS.filter(p=>p.tech==='drupal').length} Drupal</span><span class="chip">${PROJECTS.filter(p=>p.tech==='symfony').length} Symfony</span><span class="chip">${PROJECTS.filter(p=>p.tech==='wordpress').length} WordPress</span></div><a class="more" href="./projets.html">Explorer tous les projets ${svg('arrow')}</a></article>`);

/* projets perso */
const ST={production:'En ligne',beta:'Bêta',wip:'En cours',local:'En local',staging:'En préproduction',calibrage:'En calibrage'};
const pub=p=>[].concat(p.status??'wip').some(s=>s==='production'||s==='beta');
const stat=p=>[].concat(p.status??'wip').map(s=>`<span class="status ${s}">${ST[s]||s}</span>`).join('')+(p.ai?`<span class="chip ia">${svg('sparkles')}IA</span>`:'')+(p.private?`<span class="status">${svg('lock')} Privé</span>`:'');
const links=p=>`<div class="actions">${p.demo?`<a class="btn sm" href="${p.demo}" target="_blank" rel="noopener">${svg('ext')}Voir le site<span class="sr-only"> ${p.title} (nouvel onglet)</span></a>`:''}${p.private?'':`<a class="btn sm" href="${p.url}" target="_blank" rel="noopener">${svg('github')}GitHub<span class="sr-only"> de ${p.title} (nouvel onglet)</span></a>`}</div>`;
const IC={mmagny:'idcard',niout:'landmark','bg-tcg':'layers',edj:'users',chauffage:'thermo',aqoj:'dice','dnd-oracle':'dragon',vigil:'eye'};
const pcard=p=>`<article class="card"><div class="top"><span class="tile ${p.ai?'ia':''}">${svg(IC[p.id]||'code')}</span><h3>${p.title}</h3></div><div class="tags">${stat(p)}</div><p>${tx(p.desc)}</p><div class="stackrow">${p.stack.slice(0,3).map(s=>`<span class="chip">${s}</span>`).join('')}</div>${links(p)}</article>`;
$('#perso-pub').innerHTML=PERSONAL_PROJECTS.filter(pub).map(pcard).join('');
$('#perso-wip').innerHTML=PERSONAL_PROJECTS.filter(p=>!pub(p)).map(p=>`<div class="card" style="background:var(--bg)"><div class="top"><span class="tile sm ${p.ai?'ia':''}">${svg(IC[p.id]||'code')}</span><h4>${p.title}</h4></div><div class="tags">${stat(p)}</div><p>${tx(p.desc)}</p></div>`).join('');
$('#ia-projects').innerHTML=PERSONAL_PROJECTS.filter(p=>p.ai&&!(p.stack||[]).some(s=>/Mistral/.test(s))).map(p=>`<div class="card"><div class="top"><span class="tile ia">${svg(IC[p.id]||'sparkles')}</span><h3>${p.title}</h3></div><p>${tx(p.desc)}</p><div class="tags">${p.stack.map(s=>`<span class="chip ${/Mistral/.test(s)?'ia':''}">${s}</span>`).join('')}</div></div>`).join('');
const LOIS=[
['dice','Jeux de société et jeux de rôle','Le point de départ de la moitié de mes projets perso : un besoin réel, une table, des joueurs. Autour d’une table, on voit vite si une règle tient, et ça me sert aussi pour concevoir une application.'],
['gamepad','Jeux vidéo','Univers immersifs, mécaniques de gameplay, narration interactive. J’y regarde surtout comment un jeu guide le joueur sans le lui dire. Niout vient de là.'],
['landmark','Égypte et Grèce antiques','Mon premier parcours, la licence d’histoire de l’art et archéologie, ne m’a pas quittée. Pharaons du Nouvel Empire, cités grecques, mythes : comprendre comment une civilisation organise sa ville, son écriture et ses croyances.'],
['lotus','Bouddhisme theravāda et Thaïlande','Une tradition ancienne, ses textes et sa pratique, et la Thaïlande qui la porte au quotidien. Une manière de ralentir et de regarder ce qu’on fait.'],
['bowl','Gastronomie d’Asie de l’Est','Cuisines chinoise, japonaise et coréenne : bouillons, fermentations, thé, gestes de coupe et de cuisson. Cuisiner demande de la méthode, et on goûte le résultat tout de suite.'],
['rocket','Espace et exploration','Curiosité scientifique, technologies spatiales, prospective. J’aime les ordres de grandeur : distances, durées, contraintes d’ingénierie.'],
['sprout','Jardinage et bricolage','On ne force pas une plante à pousser plus vite. Un projet non plus. Semer, attendre, tailler, et réparer plutôt que remplacer.'],
['paw','Nos amis les chats','Présents à chaque séance de code, de préférence sur le clavier ou juste à côté. Des relecteurs peu bavards, mais très attachés à ma présence.']];
$('#loisirs').innerHTML=LOIS.map(l=>`<div class="card"><div class="top"><span class="tile sm">${svg(l[0])}</span><h4>${l[1]}</h4></div>${l[2]?`<p>${l[2]}</p>`:''}</div>`).join('')
$('#loisirs').insertAdjacentHTML('beforeend',`<article class="card cta collage"><div class="icons" aria-hidden="true">${LOIS.map(l=>`<span class="tile sm">${svg(l[0])}</span>`).join('')}</div><h4>Tout ça finit dans un projet</h4><p>Une règle de jeu, une carte, un calendrier d’arrosage : l’idée part d’un loisir, le code suit</p></article>`);

