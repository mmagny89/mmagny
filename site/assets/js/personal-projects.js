// ── Projets personnels ───────────────────────────────────────────────

const PERSONAL_PROJECTS = [
{
        id:    "mmagny",
        title: "Site CV",
        desc:  "Ce portfolio, conçu et développé de A à Z pour présenter mon parcours, mes projets et ma stack.",
        stack: ["HTML", "Tailwind CSS", "JavaScript"],
        status: "production",
        url:   "https://github.com/mmagny89/mmagny",
        icon:  "fa-id-card",
    },
,
    {
        id:    "niout",
        title: "Niout",
        desc:  "Jeu de gestion dans l'Égypte du Nouvel Empire : fonder et faire prospérer une ville réelle. Aucune attente en temps réel : la partie n'avance que quand le joueur déclenche un cycle. Plateforme en ligne, en cours de calibrage.",
        stack: ["Symfony", "PostgreSQL", "FrankenPHP"],
        status: ["production", "wip"],
        url:   "https://github.com/mmagny89/niout",
        demo:  "https://niout.mmagny.fr/",
        icon:  "fa-landmark-dome",
    },
,
    {
        id:    "edj",
        title: "Envie de Jouer",
        desc:  "Site de l'association : présentation, gestion des événements et liste des jeux de société apportés lors des manifestations.",
        stack: ["Symfony", "Tailwind CSS"],
        status: "wip",
        url:   "https://github.com/mmagny89/edj",
        icon:  "fa-people-group",
    },
,
    {
        id:    "aqoj",
        title: "À quoi on joue ?",
        desc:  "Recommandation de jeux de société selon les affinités des joueurs, via l'API BoardGameGeek. Intégration IA à venir pour affiner les suggestions.",
        stack: ["Symfony", "React", "Tailwind CSS", "API BGG"],
        status: "wip",
        ai:    true,
        url:   "https://github.com/mmagny89/aqoj",
        icon:  "fa-dice",
    },
,
    {
        id:      "dnd-oracle",
        title:   "D&D Oracle",
        desc:    "Substitut de maître du jeu pour les JDR (type D&D). Génération de campagnes à partir d'un scénario par IA à venir.",
        stack:   ["Symfony", "Tailwind CSS"],
        status:  "wip",
        ai:      true,
        private: true,
        url:     "https://github.com/mmagny89/dnd-oracle",
        icon:    "fa-dragon",
    },
,
    {
        id:      "vigil",
        title:   "Vigil",
        desc:    "Outil de veille dev web : récupération d'articles, analyse et traduction par Mistral AI, filtrage automatique par pertinence.",
        stack:   ["Symfony", "Tailwind CSS", "Mistral AI"],
        status:  "wip",
        ai:      true,
        private: true,
        url:     "https://github.com/mmagny89/Vigil",
        icon:    "fa-eye",
    },
];

// ── Rendu ─────────────────────────────────────────────────────────────

function renderPersonalProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const statusLabel = {
        production: { text: "En ligne",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
        wip:        { text: "En cours",  cls: "bg-sky-50 text-sky-700 border-sky-200"     },
    };

    container.innerHTML = PERSONAL_PROJECTS.map(p => {
        // `status` accepte une valeur ou une liste : un projet peut être en
        // ligne tout en restant en développement.
        const etats = [].concat(p.status ?? "wip")
            .map(cle => statusLabel[cle])
            .filter(Boolean);
        if (etats.length === 0) etats.push(statusLabel.wip);
        return `
        <article class="card p-6 flex flex-col gap-4 border-l-2 border-l-purple-400">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2 min-w-0">
                    <i class="fa-solid ${p.icon} text-sky-500 shrink-0"></i>
                    <h3 class="font-semibold text-base leading-tight">${p.title}</h3>
                </div>
                <div class="flex flex-wrap gap-1.5 shrink-0 justify-end">
                    ${etats.map(e => `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${e.cls}">${e.text}</span>`).join("")}
                    ${p.ai      ? `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200"><i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> IA</span>` : ""}
                    ${p.private ? `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-100 text-slate-500 border-slate-200"><i class="fa-solid fa-lock text-[10px]"></i> Privé</span>` : ""}
                </div>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed">${p.desc}</p>

            <div class="flex flex-wrap gap-2">
                ${p.stack.map(s => `<span class="chip text-xs">${s}</span>`).join("")}
            </div>

            <div class="mt-auto flex flex-wrap gap-2">
                ${p.demo
                    ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-sky-200 text-sky-700 bg-sky-50 hover:bg-sky-100 transition w-fit">
                           <i class="fa-solid fa-arrow-up-right-from-square"></i> Voir le site
                       </a>`
                    : ""}
                ${p.private
                    ? `<span class="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-black/5 text-slate-400 bg-slate-50 cursor-default w-fit select-none">
                           <i class="fa-brands fa-github"></i> Repo privé
                       </span>`
                    : `<a href="${p.url}" target="_blank" rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-black/10 text-slate-700 hover:bg-black/5 transition w-fit">
                           <i class="fa-brands fa-github"></i> Voir sur GitHub
                       </a>`
                }
            </div>
        </article>`;
    }).join("");
}
