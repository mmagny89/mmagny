// Icônes SVG en ligne (trait) et petits utilitaires partagés par toutes les pages.
/* ───── Icônes (SVG en ligne, trait) ───── */
const ICONS={
code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
terminal:'<path d="m4 17 6-6-6-6M12 19h8"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
move:'<path d="M17 3l4 4-4 4M21 7H8M7 21l-4-4 4-4M3 17h13"/>',
gears:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
layers:'<path d="m12 2 10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5"/>',
cubes:'<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/>',
diagram:'<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
plug:'<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
shield:'<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M16 7l3 3"/>',
file:'<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 13h6M9 17h6"/>',
palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2-.5-1 0-2 1.5-2H17a4 4 0 0 0 4-4c0-5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="11" r="1"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M17 4.5a3.5 3.5 0 0 1 0 7M22 21c0-3-1.5-5-4-5.7"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4m-7 8 2 2 4-4"/>',
cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 12h11l2-8H6"/>',
chart:'<path d="M4 20V4M4 20h16M9 17v-6M14 17V8M19 17v-3"/>',
map:'<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
rocket:'<path d="M12 15l-3-3a22 22 0 0 1 3-6c2-3 6-3 9-3 0 3 0 7-3 9a22 22 0 0 1-6 3zM9 12H4l2-3h4M12 15v5l3-2v-4M5 15c-1.5 1.500-2 5-2 5s3.500-.5 5-2"/>',
rss:'<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
share:'<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 11 7.6-4M8.2 13l7.6 4"/>',
scale:'<path d="M12 3v18M6 21h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
table:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
sparkles:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
access:'<circle cx="12" cy="4.5" r="2"/><path d="M5 8h14M12 8v6m0 0-3 7m3-7 3 7"/>',
wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.500 2.500-2.500-.7-.7-2.500z"/>',
grad:'<path d="m2 9 10-5 10 5-10 5zM6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500M22 9v6"/>',
hospital:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 8v6M9 11h6M10 21v-3h4v3"/>',
flask:'<path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-10V3M7.500 15h9"/>',
landmark:'<path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M2 10l10-7 10 7z"/>',
building:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/>',
house:'<path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-6h4v6"/>',
factory:'<path d="M3 21V10l6 4v-4l6 4V6h3v15zM3 21h18"/>',
utensils:'<path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M17 21V3c-2 1-3.500 4-3.500 8 0 1.500 1 2 2 2H17"/>',
dice:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/>',
gamepad:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.500 12.500h5"/><circle cx="16" cy="11.500" r="1"/><circle cx="18" cy="14" r="1"/>',
sprout:'<path d="M12 21V11M12 11c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2-5-6-5 0 3 2 5 6 5z"/>',
paw:'<circle cx="6" cy="10" r="1.800"/><circle cx="10" cy="6" r="1.800"/><circle cx="14" cy="6" r="1.800"/><circle cx="18" cy="10" r="1.800"/><path d="M12 12c-3 0-5 3-5 5.500 0 2 2 2.500 5 1.500 3 1 5 .5 5-1.500 0-2.500-2-5.500-5-5.500z"/>',
thermo:'<path d="M14 14.800V4a2 2 0 0 0-4 0v10.800a4 4 0 1 0 4 0z"/>',
idcard:'<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M13 10h5M13 14h4"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
dragon:'<path d="M14.500 3 21 9l-3 1-2 4-5 1-5 5-3-1 3-5 1-5 4-2z"/>',
db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3"/>',
drop:'<path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z"/>',
briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
award:'<circle cx="12" cy="9" r="6"/><path d="m8.500 14-1.500 8 5-3 5 3-1.500-8"/>',
heart:'<path d="M12 21s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 6-8 11-8 11z"/>',
compass:'<circle cx="12" cy="12" r="9"/><path d="m15.500 8.500-2 5-5 2 2-5z"/>',
book:'<path d="M4 4h6a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3"/>',
box:'<path d="M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/>',
repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
hammer:'<path d="m15 12-8.500 8.500a2.100 2.100 0 0 1-3-3L12 9M17.600 15 21 11.600a2 2 0 0 0 0-2.800l-1.500-1.500M13 7l4-4 4 4-4 4z"/>',
github:'<path d="M9 19c-4 1.500-4-2-6-2.500M15 22v-3.500c0-1 .1-1.500-.5-2 3-.3 6-1.500 6-6.500a5 5 0 0 0-1.300-3.500 4.600 4.600 0 0 0-.1-3.500s-1.100-.4-3.600 1.300a12 12 0 0 0-6.400 0C6.600 2.600 5.500 3 5.500 3a4.600 4.600 0 0 0-.1 3.500A5 5 0 0 0 4 10c0 5 3 6.200 6 6.500-.6.500-.6 1.200-.5 2V22"/>',
anchor:'<circle cx="12" cy="5" r="2.500"/><path d="M12 7.500V21M5 12H3a9 9 0 0 0 18 0h-2M8 12h8"/>',
ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
check:'<path d="m5 12 5 5L20 7"/>',
};
const FA={'address-book':'users','arrows-rotate':'repeat','arrows-spin':'repeat','briefcase':'briefcase','bullhorn':'chat','calendar-check':'calendar','cart-shopping':'cart','chart-bar':'chart','check-double':'check','code':'code','code-branch':'share','comments':'chat','cubes':'cubes','diagram-project':'diagram','file-export':'file','file-lines':'file','file-pdf':'file','gears':'gears','key':'key','language':'globe','layer-group':'layers','lock':'lock','magnifying-glass':'search','map-location-dot':'map','paintbrush':'palette','palette':'palette','swatchbook':'palette','people-group':'users','plug':'plug','rocket':'rocket','rss':'rss','scale-balanced':'scale','screwdriver-wrench':'wrench','share-nodes':'share','shield':'shield','table-columns':'table','terminal':'terminal','truck-fast':'move','universal-access':'access','user-gear':'users','user-lock':'lock','wand-magic-sparkles':'sparkles','wordpress-simple':'code','database':'db','clipboard-check':'calendar','chalkboard-user':'users','shield-halved':'shield','arrow-right-arrow-left':'move','landmark-dome':'landmark','layer-group':'layers','people-group':'users','temperature-half':'thermo','id-card':'idcard','dice':'dice','dragon':'dragon','eye':'eye','fa-eye':'eye'};
const svg=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||ICONS.code}</svg>`;
const fa=c=>svg(FA[(c||'').replace(/^fa-(solid |brands )?/,'').replace(/^fa-/,'')]||'code');
const t=s=>(s||'').replace(/\s*\.\s*$/,'');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const DOM={enseignement:['Enseignement','grad'],sante:['Santé','hospital'],recherche:['Recherche','flask'],institutions:['Institutions','landmark'],collectivites:['Collectivités','building'],logement_social:['Logement social','house'],associatif:['Associatif','users'],industrie:['Industrie','factory'],application_metier:['Application métier','gears'],restauration:['Restauration','utensils']};
const TECH={drupal:['Drupal','drop'],wordpress:['WordPress','table'],symfony:['Symfony','cubes']};
const FMT={usine:'Usine à sites',intranet:'Intranet',carriere:'Carrières'};
const $=s=>document.querySelector(s);


/* icônes déclaratives, hydratées une fois le DOM lu */
document.querySelectorAll('[data-ic]').forEach(e=>e.innerHTML=svg(e.dataset.ic));
document.querySelectorAll('svg[data-i]').forEach(e=>{e.setAttribute('viewBox','0 0 24 24');e.innerHTML=ICONS[e.dataset.i]||''});

