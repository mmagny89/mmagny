// ── Projets personnels ───────────────────────────────────────────────

const PERSONAL_PROJECTS = [
    {
        id:    "mmagny",
        title: "Site CV",
        desc:  "Ce portfolio — conçu et développé de A à Z pour présenter mon parcours, mes projets et ma stack.",
        stack: ["HTML", "Tailwind CSS", "JavaScript"],
        status: "production",
        url:   "https://github.com/mmagny89/mmagny",
        icon:  "fa-id-card",
    },
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
    {
        id:    "edj",
        title: "Envie de Jouer",
        desc:  "Site de l'association : présentation, gestion des événements et liste des jeux de société apportés lors des manifestations.",
        stack: ["Symfony", "Tailwind CSS"],
        status: "wip",
        url:   "https://github.com/mmagny89/edj",
        icon:  "fa-people-group",
    },
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
    {
        id:    "game",
        title: "Game",
        desc:  "Jeu web de combat au tour par tour : affrontez PNJ et autres joueurs avec gestion de personnage et simulation de combats.",
        stack: ["Symfony", "Tailwind CSS"],
        status: "wip",
        url:   "https://github.com/mmagny89/game",
        icon:  "fa-shield-halved",
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
        const s = statusLabel[p.status] || statusLabel.wip;
        return `
        <article class="card p-6 flex flex-col gap-4 border-l-2 border-l-purple-400">
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2 min-w-0">
                    <i class="fa-solid ${p.icon} text-sky-500 shrink-0"></i>
                    <h3 class="font-semibold text-base leading-tight">${p.title}</h3>
                </div>
                <div class="flex flex-wrap gap-1.5 shrink-0 justify-end">
                    <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${s.cls}">${s.text}</span>
                    ${p.ai      ? `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200"><i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i> IA</span>` : ""}
                    ${p.private ? `<span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-100 text-slate-500 border-slate-200"><i class="fa-solid fa-lock text-[10px]"></i> Privé</span>` : ""}
                </div>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed">${p.desc}</p>

            <div class="flex flex-wrap gap-2">
                ${p.stack.map(s => `<span class="chip text-xs">${s}</span>`).join("")}
            </div>

            ${p.private
                ? `<span class="mt-auto inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-black/5 text-slate-400 bg-slate-50 cursor-default w-fit select-none">
                       <i class="fa-brands fa-github"></i> Repo privé
                   </span>`
                : `<a href="${p.url}" target="_blank" rel="noopener noreferrer"
                      class="mt-auto inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-medium border border-black/10 text-slate-700 hover:bg-black/5 transition w-fit">
                       <i class="fa-brands fa-github"></i> Voir sur GitHub
                   </a>`
            }
        </article>`;
    }).join("");
}
