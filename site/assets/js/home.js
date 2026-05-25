// ── Données des projets phares (page d'accueil) ──────────────────────

const HOME_PROJECTS = {
    "polytechnique": {
        title: "École Polytechnique",
        role: "Référente technique · Développeur principal",
        badge: '<span class="chip"><i class="fa-brands fa-drupal"></i> Drupal</span>',
        context: "Conception d'un socle Drupal mutualisé pour 5 sites institutionnels en multi-sites, avec architecture thème parent/enfants pour concilier mutualisation et personnalisation par entité, dans un contexte auto-hébergé sans CI/CD industrialisée.",
        actions: [
            { icon: "fa-magnifying-glass", color: "text-sky-600", text: "Développement de modules sur mesure en complément de modules communautaires (Paragraphs, Entity Share), avec intégration API Algolia pour l'indexation et la recherche transverse." },
            { icon: "fa-truck-fast",       color: "text-sky-600", text: "Conception et exécution de scripts de migration et d'import massif pour la reprise de contenus hétérogènes à forte volumétrie (pages, actualités, événements)." },
            { icon: "fa-gears",            color: "text-sky-600", text: "Mise en place d'un workflow de déploiement Composer/Drush adapté aux contraintes d'un environnement auto-hébergé." },
            { icon: "fa-layer-group",      color: "text-sky-600", text: "Conception d'un Page Builder sur mesure offrant flexibilité éditoriale sur un cadre de structuration homogène." }
        ],
        result: "Socle industrialisé et évolutif, ouvrant vers une logique d'usine à sites pour d'autres entités du client.",
        stack: ["Drupal 10", "PHP", "Algolia", "Paragraphs", "Entity Share", "Composer", "Drush", "Git"]
    },

    "ush-collab": {
        title: "USH — Espaces collaboratifs",
        role: "Référente technique · Développeur principal",
        badge: '<span class="chip"><i class="fa-brands fa-drupal"></i> Drupal</span>',
        context: "Conception d'une plateforme collaborative Drupal reposant sur une architecture d'usine à sites : génération automatisée d'espaces métiers configurables (fonctionnalités, droits, identité visuelle) via interfaces d'administration, sur socle mutualisé.",
        actions: [
            { icon: "fa-diagram-project", color: "text-sky-600", text: "Développement du moteur d'usine à sites permettant aux équipes métiers de créer et administrer leurs espaces en autonomie, tout en maintenant un socle technique commun." },
            { icon: "fa-key",             color: "text-sky-600", text: "Intégration d'un système d'authentification hybride Drupal + SSO Keycloak, avec gestion fine des rôles/permissions et enrichissement des profils utilisateurs via API Keycloak (photo, données de profil, y compris hors connexion)." },
            { icon: "fa-comments",        color: "text-sky-600", text: "Mise en place d'un système de commentaires natif Drupal avec gestion des droits d'accès et modération, intégré au contexte collaboratif multi-espaces." }
        ],
        result: "Automatisation de la création d'espaces, centralisation de la maintenance, forte autonomie des équipes métiers.",
        stack: ["Drupal 10", "PHP", "Keycloak", "SSO", "Drush", "GitLab"]
    },

    "mnhn": {
        title: "MNHN — Publications scientifiques",
        role: "Référente technique · Développeur principal",
        badge: '<span class="chip"><i class="fa-brands fa-drupal"></i> Drupal</span>',
        context: "Conception d'une plateforme e-commerce et éditoriale sur Drupal Commerce pour la gestion, valorisation et distribution d'un patrimoine scientifique : catalogue produits, gestion des stocks et règles de vente métier spécifiques au domaine éditorial.",
        actions: [
            { icon: "fa-rss",           color: "text-indigo-600", text: "Intégration d'un flux OAI-PMH pour l'alimentation et la synchronisation d'un catalogue structuré de publications scientifiques." },
            { icon: "fa-file-pdf",      color: "text-indigo-600", text: "Développement d'un système de génération PDF à la volée (HTML2PDF) pour fiches produits et catalogues, couplé à un workflow Print on Demand avec personnalisation dynamique des couvertures selon commande et contexte client." },
            { icon: "fa-scale-balanced",color: "text-indigo-600", text: "Gestion de règles métier complexes (TVA, frais de port) via le module Rules." }
        ],
        result: "Centralisation du catalogue éditorial et structuration des données de production/vente dans un système unique, toujours en production 10 ans après sa mise en ligne — refonte ultérieure confiée à la même équipe.",
        stack: ["Drupal Commerce", "PHP", "OAI-PMH", "HTML2PDF", "Rules", "Drush", "Git"]
    },

    "charot": {
        title: "Charot",
        role: "Développeur principal",
        badge: '<span class="chip"><i class="fa-brands fa-wordpress"></i> WordPress</span>',
        context: "Refonte du site vitrine et développement d'un extranet métier d'aide à la décision pour l'orientation produits, sur WordPress/Genesis avec modélisation des entités complexes via Pods.",
        actions: [
            { icon: "fa-lock",               color: "text-slate-700", text: "Développement de fonctionnalités extranet sur mesure (sans dépendance à des solutions clé en main) pour répondre aux contraintes spécifiques du domaine industriel." },
            { icon: "fa-wand-magic-sparkles", color: "text-slate-700", text: "Conception d'un moteur de recommandation produit basé sur des questionnaires dynamiques Gravity Forms : règles conditionnelles, calculs et logiques métier complexes." },
            { icon: "fa-arrows-rotate",       color: "text-slate-700", text: "Mise en place de traitements automatisés d'import et synchronisation quotidienne des données, avec déclenchement manuel via l'administration." }
        ],
        result: "Centralisation et fiabilisation des données produits, réduction des opérations manuelles, système d'aide à la décision directement exploitable par les équipes métiers.",
        stack: ["WordPress", "Genesis", "Pods", "Gravity Forms", "PHP", "Git"]
    },

    "quartiers-plus": {
        title: "Quartiers Plus",
        role: "Développeur · Interlocutrice technique",
        badge: '<span class="chip"><i class="fa-brands fa-symfony"></i> Symfony</span>',
        context: "Conception et développement d'une plateforme métier Symfony 6 pour la gestion et l'analyse de données du parc immobilier social : architecture modulaire, modélisation des entités avec Doctrine, gestion des migrations.",
        actions: [
            { icon: "fa-file-export", color: "text-indigo-600", text: "Développement de formulaires métier complexes (Symfony Form) et de fonctionnalités d'import/export multi-formats (CSV, Excel, PDF) via PhpSpreadsheet et DomPDF." },
            { icon: "fa-terminal",    color: "text-indigo-600", text: "Mise en place de Console Commands pour l'exécution manuelle ou planifiée des traitements de mise à jour des référentiels." },
            { icon: "fa-chart-bar",   color: "text-indigo-600", text: "Intégration de tableaux de bord et visualisations via Chart.js pour l'analyse des données métier." },
            { icon: "fa-arrows-spin", color: "text-indigo-600", text: "Chaîne CI/CD industrialisée, revues de code et tests automatisés ; gestion Agile/Jira avec échanges directs Product Owner." }
        ],
        result: "Projet en évolution continue avec livraisons mensuelles.",
        stack: ["Symfony 6", "PHP", "Doctrine", "PhpSpreadsheet", "DomPDF", "Chart.js", "Git"]
    }
};

// ── Modal ────────────────────────────────────────────────────────────

(function () {
    const modal   = document.getElementById("homeProjectModal");
    const btnClose = document.getElementById("homeModalClose");

    function openModal(id) {
        const p = HOME_PROJECTS[id];
        if (!p) return;

        document.getElementById("homeModalTitle").textContent        = p.title;
        document.getElementById("homeModalBadge").innerHTML          = p.badge;
        document.getElementById("homeModalContext").textContent      = p.context;
        document.getElementById("homeModalRoleContent").textContent  = p.role;
        document.getElementById("homeModalActions").innerHTML = (p.actions || []).map(a =>
            `<li class="flex gap-3 items-start"><i class="fa-solid ${a.icon} mt-0.5 ${a.color} shrink-0"></i><span>${a.text}</span></li>`
        ).join("");
        document.getElementById("homeModalResult").textContent = p.result;
        document.getElementById("homeModalStack").innerHTML    = p.stack.map(s =>
            `<span class="chip">${s}</span>`
        ).join("");

        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.classList.add("overflow-hidden");
        btnClose.focus();
    }

    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");
    }

    document.querySelectorAll(".open-modal-home").forEach(el => {
        el.addEventListener("click", () => openModal(el.dataset.project));
    });
    btnClose.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("flex")) closeModal();
    });
})();
