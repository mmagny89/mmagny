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
        { nom: "Drupal", icon: "fa-brands fa-drupal", depuis: 2011,
          detail: "Drupal 7 puis référente Drupal 8+ : modules et thèmes sur-mesure, usines à sites.",
          preuve: p => p.tech === "drupal", vedettes: ["polytechnique", "ip-paris", "chu-grenoble"] },
        { nom: "PHP", icon: "fa-brands fa-php", depuis: 2011,
          detail: "Du legacy aux versions actuelles, typage strict et analyse statique.",
          preuve: aStack("PHP"), vedettes: ["polytechnique", "unml", "quartiers-plus"] },
        { nom: "Symfony", icon: "fa-brands fa-symfony", depuis: 2017,
          detail: "Applications métier et Doctrine ; certifiée. Socle de mes projets personnels.",
          preuve: p => p.tech === "symfony" || aStack("Symfony")(p), vedettes: ["quartiers-plus"], perso: "Symfony" },
        { nom: "WordPress", icon: "fa-brands fa-wordpress", depuis: 2011,
          detail: "Sites vitrines, extranets métier, thèmes enfants.",
          preuve: p => p.tech === "wordpress", vedettes: ["unml", "cd-vosges", "la-madeleine"] },
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
          preuve: mentionne(/sécurit|droits|SSO|Keycloak|authentif|accès/i), vedettes: ["unml", "ush-collab", "ch-niort-intranet"] },
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

function renderCompetences() {
    const annee = new Date().getFullYear();
    const parId = id => PROJECTS.find(p => p.id === id);
    const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;

    const ligne = c => {
        const ans = annee - c.depuis;
        // Une vedette compte toujours : elle a été choisie comme preuve.
        const n = PROJECTS.filter(p => c.preuve(p) || c.vedettes.includes(p.id)).length;
        const perso = c.perso && typeof PERSONAL_PROJECTS !== "undefined"
            ? PERSONAL_PROJECTS.filter(p => p.stack.includes(c.perso)).length : 0;
        const vedettes = c.vedettes.map(parId).filter(Boolean);
        const compte = [n ? `${n} projet${n > 1 ? "s" : ""} client` : "", perso ? `${perso} projet${perso > 1 ? "s" : ""} perso` : ""]
            .filter(Boolean).join(" · ");

        return `
        <li class="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
            <div class="h-9 w-9 rounded-2xl bg-sky-50 grid place-items-center shrink-0">
                <i class="${c.icon} text-sky-700"></i>
            </div>
            <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 class="text-sm font-semibold">${c.nom}</h3>
                    <p class="text-xs text-slate-500 whitespace-nowrap">
                        <strong class="text-slate-700">${pluriel(ans, "an")}</strong> · depuis ${c.depuis}
                    </p>
                </div>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">${c.detail}</p>
                ${compte || vedettes.length ? `
                <p class="text-xs mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    ${compte ? `<span class="font-medium text-sky-700">${compte}</span>` : ""}
                    ${vedettes.map(p => `<a href="projets.html#${p.id}" class="text-slate-600 underline decoration-dotted underline-offset-2 hover:text-slate-900">${p.title}</a>`).join('<span aria-hidden="true" class="text-slate-300">·</span>')}
                </p>` : ""}
            </div>
        </li>`;
    };

    for (const [groupe, liste] of Object.entries(COMPETENCES)) {
        const el = document.getElementById(`competences-${groupe}`);
        if (el) el.innerHTML = liste.map(ligne).join("");
    }
}

renderCompetences();
