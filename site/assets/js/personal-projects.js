// ── Projets personnels ───────────────────────────────────────────────

const PERSONAL_PROJECTS = [
{
        id:    "mmagny",
        title: "Site CV",
        desc:  "Ce portfolio, conçu et développé de bout en bout. Site statique servi par nginx, avec un déploiement automatisé à chaque mise à jour.",
        stack: ["HTML", "Tailwind CSS", "JavaScript"],
        status: "production",
        url:   "https://github.com/mmagny89/mmagny",
        icon:  "fa-id-card",
    },
    {
        id:    "niout",
        title: "Niout",
        desc:  "Jeu de gestion dans l'Égypte du Nouvel Empire : fonder une ville réelle et la faire prospérer. Aucune attente en temps réel, la partie n'avance qu'au rythme du joueur.",
        stack: ["Symfony", "PostgreSQL", "FrankenPHP"],
        status: ["production", "calibrage"],
        url:   "https://github.com/mmagny89/niout",
        demo:  "https://niout.mmagny.fr/",
        icon:  "fa-landmark-dome",
    },
    {
        id:      "bg-tcg",
        title:   "BG TCG",
        desc:    "Jeu de cartes à collectionner bâti sur les vrais jeux de société (données BoardGameGeek), pour les membres de l'association Envie de Jouer : boosters, raretés à stock limité, sets et échanges.",
        stack:   ["Symfony", "React", "PostgreSQL"],
        status:  "beta",
        private: true,
        url:     "https://github.com/mmagny89/bg-tcg",
        demo:    "https://bg-tcg.mmagny.fr/",
        icon:    "fa-layer-group",
    },
    {
        id:    "edj",
        title: "Envie de Jouer",
        desc:  "Site de l'association Envie de Jouer. Présentation, agenda des événements et catalogue des jeux apportés lors des manifestations.",
        stack: ["Symfony", "Tailwind CSS"],
        status: "wip",
        url:   "https://github.com/mmagny89/edj",
        icon:  "fa-people-group",
    },
    {
        id:    "aqoj",
        title: "À quoi on joue ?",
        desc:  "Moteur de recommandation de jeux de société selon les affinités des joueurs, à partir de l'API BoardGameGeek. Une couche d'IA affinera les suggestions.",
        stack: ["Symfony", "React", "API BGG"],
        status: "wip",
        ai:    true,
        url:   "https://github.com/mmagny89/aqoj",
        icon:  "fa-dice",
    },
    {
        id:      "dnd-oracle",
        title:   "D&D Oracle",
        desc:    "Assistant de maître du jeu pour les jeux de rôle. Une IA générera les campagnes à partir d'un simple scénario de départ.",
        stack:   ["Symfony", "Tailwind CSS"],
        status:  "wip",
        ai:      true,
        private: true,
        url:     "https://github.com/mmagny89/dnd-oracle",
        icon:    "fa-dragon",
    },
    {
        id:      "vigil",
        title:   "Vigil",
        desc:    "Veille technique pour le développement web : collecte et tri automatique des articles. Traduction et analyse de pertinence confiées à Mistral AI.",
        stack:   ["Symfony", "Tailwind CSS", "Mistral AI"],
        status:  "local",
        ai:      true,
        private: true,
        url:     "https://github.com/mmagny89/Vigil",
        icon:    "fa-eye",
    },
];

// ── Rendu ─────────────────────────────────────────────────────────────
// Deux groupes plutôt qu'une grille uniforme : à sept projets, une grille de
// trois laissait une carte orpheline et mettait un prototype local au même
// rang qu'un site en ligne. Ce qui est ouvert au public passe en cartes, le
// reste en liste compacte.

const STATUS_LABEL = {
    production: { text: "En ligne",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    beta:       { text: "Bêta",         cls: "bg-amber-50 text-amber-700 border-amber-200"       },
    wip:        { text: "En cours",     cls: "bg-sky-50 text-sky-700 border-sky-200"             },
    local:      { text: "En local",     cls: "bg-slate-100 text-slate-600 border-slate-200"      },
    calibrage:  { text: "En calibrage", cls: "bg-sky-50 text-sky-700 border-sky-200"             },
};

// Un projet est « publié » s'il est consultable : en ligne ou en bêta ouverte.
const estPublie = p => [].concat(p.status ?? "wip").some(s => s === "production" || s === "beta");

// `status` accepte une valeur ou une liste : un projet peut être en ligne
// tout en restant en développement.
function badgesProjet(p) {
    const etats = [].concat(p.status ?? "wip").map(cle => STATUS_LABEL[cle]).filter(Boolean);
    if (etats.length === 0) etats.push(STATUS_LABEL.wip);
    const badge = (cls, html) => `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${cls}">${html}</span>`;
    return etats.map(e => badge(e.cls, e.text)).join("")
        + (p.ai      ? badge("bg-purple-50 text-purple-700 border-purple-200", '<i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> IA') : "")
        + (p.private ? badge("bg-slate-100 text-slate-500 border-slate-200", '<i class="fa-solid fa-lock text-[10px]"></i> Privé') : "");
}

function liensProjet(p) {
    const site = p.demo
        ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-sky-200 text-sky-700 bg-sky-50 hover:bg-sky-100 transition w-fit">
               <i class="fa-solid fa-arrow-up-right-from-square"></i> Voir le site
           </a>`
        : "";
    const depot = p.private
        ? ""
        : `<a href="${p.url}" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-black/10 text-slate-700 hover:bg-black/5 transition w-fit">
               <i class="fa-brands fa-github"></i> GitHub
           </a>`;
    return site + depot;
}

// Trois technologies au plus : au-delà, la carte devient un inventaire.
const chipsStack = p => p.stack.slice(0, 3).map(s => `<span class="chip text-xs">${s}</span>`).join("");

function carteProjet(p) {
    return `
        <article class="card p-6 flex flex-col gap-4 border-l-2 border-l-purple-400">
            <div class="flex items-center gap-2 min-w-0">
                <i class="fa-solid ${p.icon} text-sky-500 shrink-0"></i>
                <h3 class="font-semibold text-base leading-tight">${p.title}</h3>
            </div>
            <div class="flex flex-wrap gap-1.5">${badgesProjet(p)}</div>
            <p class="text-sm text-slate-600 leading-relaxed">${p.desc}</p>
            <div class="flex flex-wrap gap-2">${chipsStack(p)}</div>
            <div class="mt-auto flex flex-wrap gap-2">${liensProjet(p)}</div>
        </article>`;
}

function ligneProjet(p) {
    return `
        <li class="flex flex-col sm:flex-row sm:items-start gap-3 py-4 first:pt-0 last:pb-0">
            <div class="h-9 w-9 rounded-2xl bg-sky-50 grid place-items-center shrink-0">
                <i class="fa-solid ${p.icon} text-sky-500"></i>
            </div>
            <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h4 class="font-semibold text-sm">${p.title}</h4>
                    <div class="flex flex-wrap gap-1.5">${badgesProjet(p)}</div>
                </div>
                <p class="text-sm text-slate-600 leading-relaxed mt-1">${p.desc}</p>
                <div class="flex flex-wrap items-center gap-2 mt-2">${chipsStack(p)}${liensProjet(p)}</div>
            </div>
        </li>`;
}

function renderPersonalProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const publies   = PERSONAL_PROJECTS.filter(estPublie);
    const chantiers = PERSONAL_PROJECTS.filter(p => !estPublie(p));

    container.innerHTML = `
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${publies.map(carteProjet).join("")}</div>
        ${chantiers.length ? `
        <div class="card p-6 mt-5">
            <h3 class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <i class="fa-solid fa-person-digging text-slate-400"></i> En chantier
            </h3>
            <ul class="mt-4 divide-y divide-black/5">${chantiers.map(ligneProjet).join("")}</ul>
        </div>` : ""}`;
}
