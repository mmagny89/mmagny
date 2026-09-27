// Données : projets-data.js, chargé avant ce fichier.

// ── Rendu ────────────────────────────────────────────────────────────

const grid = document.getElementById("projectsGrid");

const ICON_TECH = {
    drupal:    '<i class="fa-brands fa-drupal"></i>',
    wordpress: '<i class="fa-brands fa-wordpress"></i>',
    symfony:   '<i class="fa-brands fa-symfony"></i>',
};

function fmtBadges(p) {
    const domainMap = {
        enseignement:       '<span class="chip"><i class="fa-solid fa-graduation-cap"></i> Enseignement</span>',
        sante:              '<span class="chip"><i class="fa-solid fa-hospital"></i> Santé</span>',
        recherche:          '<span class="chip"><i class="fa-solid fa-flask"></i> Recherche</span>',
        institutions:       '<span class="chip"><i class="fa-solid fa-landmark"></i> Institutions</span>',
        collectivites:      '<span class="chip"><i class="fa-solid fa-building-columns"></i> Collectivités</span>',
        logement_social:    '<span class="chip"><i class="fa-solid fa-house-chimney"></i> Logement social</span>',
        associatif:         '<span class="chip"><i class="fa-solid fa-people-group"></i> Associatif</span>',
        industrie:          '<span class="chip"><i class="fa-solid fa-industry"></i> Industrie</span>',
        application_metier: '<span class="chip"><i class="fa-solid fa-gears"></i> Application métier</span>',
        restauration:       '<span class="chip"><i class="fa-solid fa-utensils"></i> Restauration</span>',
    };
    const formatBadges = (p.format || []).map(f => {
        if (f === "usine")    return '<span class="chip"><i class="fa-solid fa-diagram-project"></i> Usine à sites</span>';
        if (f === "intranet") return '<span class="chip"><i class="fa-solid fa-lock"></i> Intranet</span>';
        if (f === "carriere") return '<span class="chip"><i class="fa-solid fa-briefcase"></i> Carrières</span>';
        return '';
    }).join("");
    return (domainMap[p.domain] ?? "") + formatBadges;
}

const BORDER_TECH = {
    drupal:    "border-l-2 border-l-sky-400",
    wordpress: "border-l-2 border-l-slate-400",
    symfony:   "border-l-2 border-l-purple-400",
};

function render() {
    grid.innerHTML = PROJECTS.map(p => {
        const fmt = (p.format || []).join(" ");
        const borderCls = BORDER_TECH[p.tech] || "";
        const techNom = { drupal: "Drupal", wordpress: "WordPress", symfony: "Symfony" }[p.tech] || "";
        return `
        <article class="card p-6 flex flex-col gap-3 project-item cursor-pointer open-modal ${borderCls}"
                 data-tech="${p.tech}"
                 data-domain="${p.domain}"
                 data-format="${fmt}"
                 data-project="${p.id}">

          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-lg font-semibold leading-tight">${p.title}</h3>
              ${p.subtitle ? `<p class="text-xs text-slate-500 mt-1">${p.subtitle}</p>` : ""}
            </div>
            ${techNom ? `<span class="chip shrink-0">${ICON_TECH[p.tech]} ${techNom}</span>` : ""}
          </div>

          <div class="flex flex-wrap gap-2">${fmtBadges(p)}</div>

          <div class="flex flex-wrap gap-2">${(p.stack || []).slice(0, 4).map(t => `<span class="chip">${t}</span>`).join("")}</div>

          ${p.highlight ? `<p class="flex items-start gap-2 text-sm text-slate-600 leading-snug border-t border-black/5 pt-3 mt-auto">
              <i class="fa-solid fa-arrow-trend-up text-emerald-600 mt-0.5 shrink-0"></i>
              <span>${p.highlight}</span>
          </p>` : ""}

          <p class="text-xs font-medium text-sky-700">Voir le détail <i class="fa-solid fa-arrow-right text-[10px]"></i></p>
        </article>`;
    }).join("");
}

// ── Compteurs ────────────────────────────────────────────────────────
// Renseignés depuis PROJECTS plutôt que saisis dans le HTML : les valeurs
// écrites à la main avaient dérivé (18 projets Drupal annoncés pour 21).

function majCompteurs() {
    const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? "s" : ""}`;
    const parTech = t => PROJECTS.filter(p => p.tech === t).length;
    const ecrire  = (id, valeur) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valeur;
    };

    ecrire("statPresentes",      PROJECTS.length);
    ecrire("statPresentesTexte", PROJECTS.length);
    ecrire("statDrupal",         pluriel(parTech("drupal"), "projet"));
    ecrire("statWordPress",      pluriel(parTech("wordpress"), "projet"));
    ecrire("statSymfony",        pluriel(parTech("symfony"), "projet"));
    ecrire("statDomaines",       new Set(PROJECTS.map(p => p.domain)).size);
}

majCompteurs();

// ── Filtres ──────────────────────────────────────────────────────────

const filters = { tech: "all", domain: "all", format: "all" };

function applyFilters() {
    let idx = 0;
    document.querySelectorAll(".project-item").forEach(item => {
        const okTech   = (filters.tech   === "all") || (item.dataset.tech   === filters.tech);
        const okDomain = (filters.domain === "all") || (item.dataset.domain === filters.domain);
        const fmt      = (item.dataset.format || "").split(" ").filter(Boolean);
        const okFormat = (filters.format === "all") || fmt.includes(filters.format);
        const visible  = okTech && okDomain && okFormat;

        if (visible) {
            item.classList.remove("hidden");
            item.classList.remove("card-animate-in");
            void item.offsetWidth;
            item.style.animationDelay = `${Math.min(idx * 35, 200)}ms`;
            item.classList.add("card-animate-in");
            idx++;
        } else {
            item.classList.add("hidden");
            item.style.animationDelay = "";
        }
    });
}

function setActive(btn) {
    const type = btn.dataset.type;
    btn.parentElement.querySelectorAll(".filter").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    filters[type] = btn.dataset.value;
    applyFilters();
}

document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => setActive(btn));
});

// ── Modal ────────────────────────────────────────────────────────────

const modal      = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle    = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalBadges   = document.getElementById("modalBadges");
const modalContext  = document.getElementById("modalContext");
const modalRole     = document.getElementById("modalRole");
const modalContribution = document.getElementById("modalContribution");
const modalActions  = document.getElementById("modalActions");
const modalStack    = document.getElementById("modalStack");
const modalResult   = document.getElementById("modalResult");

let lastActive = null;

function openModal(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;

    lastActive = document.activeElement;

    // Une seule mise en page pour les vingt-sept projets. Les cinq projets
    // mis en avant avaient seuls droit au contexte, au rôle, aux actions et
    // au résultat ; les vingt-deux autres n'affichaient que leur stack, alors
    // que leurs données sont tout aussi complètes.
    modalTitle.textContent = p.title;
    modalSubtitle.textContent = p.subtitle || "";
    modalSubtitle.classList.toggle("hidden", !p.subtitle);
    modalBadges.innerHTML = fmtBadges(p);

    document.getElementById("modalResultBlock").classList.toggle("hidden", !p.highlight);

    modalContext.textContent = p.context || "";
    modalRole.textContent    = p.role    || "";
    modalContribution.textContent = p.contribution || "";

    modalActions.innerHTML = (p.actions || []).map(a => `
      <li class="flex gap-3 items-start">
        <i class="fa-solid ${a.icon} mt-0.5 ${a.color}"></i>
        <span>${a.text}</span>
      </li>`).join("");

    modalStack.innerHTML  = (p.stack || []).map(s => `<span class="chip">${s}</span>`).join("");
    modalResult.textContent = p.highlight || "";

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
    modalClose.focus();
}

function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
    if (lastActive && typeof lastActive.focus === "function") lastActive.focus();
}

document.addEventListener("click", e => {
    const btn = e.target.closest(".open-modal");
    if (btn) openModal(btn.dataset.project);
});
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("flex")) closeModal();
});

// ── Init ─────────────────────────────────────────────────────────────

render();
applyFilters();

// Lien direct vers une fiche (projets.html#<id>), utilisé par la matrice de
// compétences de l'accueil.
if (location.hash) openModal(decodeURIComponent(location.hash.slice(1)));
