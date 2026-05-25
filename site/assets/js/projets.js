// ── Données projets ──────────────────────────────────────────────────

const PROJECTS = [

    // --- Éducation ---
    { id:"polytechnique", title:"École Polytechnique", tech:"drupal", domain:"enseignement", format:["usine"], subtitle:"Drupal 10 • multisite • 5 sites institutionnels",
        context:"Conception d'un socle Drupal mutualisé pour 5 sites institutionnels en multi-sites, avec architecture thème parent/enfants pour concilier mutualisation et personnalisation par entité, dans un contexte auto-hébergé sans CI/CD industrialisée.",
        role:"Référente technique / Développeur principal",
        actions:[
            { icon:"fa-magnifying-glass",    color:"text-sky-600", text:"Développement de modules sur mesure en complément de modules communautaires (Paragraphs, Entity Share), avec intégration API Algolia pour l'indexation et la recherche transverse." },
            { icon:"fa-truck-fast",          color:"text-sky-600", text:"Conception et exécution de scripts de migration et d'import massif pour la reprise de contenus hétérogènes à forte volumétrie (pages, actualités, événements)." },
            { icon:"fa-gears",              color:"text-sky-600", text:"Mise en place d'un workflow de déploiement Composer/Drush adapté aux contraintes d'un environnement auto-hébergé." },
            { icon:"fa-layer-group",         color:"text-sky-600", text:"Conception d'un Page Builder sur mesure offrant flexibilité éditoriale sur un cadre de structuration homogène." },
        ],
        stack:["Drupal 10","PHP","Algolia","Paragraphs","Entity Share","Composer","Drush","Git"],
        highlight:"Socle industrialisé et évolutif, ouvrant vers une logique d'usine à sites pour d'autres entités du client."
    },

    { id:"ip-paris", title:"Institut Polytechnique de Paris", tech:"drupal", domain:"enseignement", format:["usine"], subtitle:"Drupal • plateforme institutionnelle • usine à sites",
        context:"Plateforme web de l'Institut Polytechnique de Paris. Le site institutionnel initial a été étendu en une usine à sites Drupal permettant de créer et gérer une vingtaine de sites autonomes partageant un socle technique commun.",
        role:"Développement back-end et contributions au socle technique de l'usine à sites : modules communs, évolutions fonctionnelles et maintenance de la plateforme. Intervention régulière sur les mises à jour Drupal et modules, et accompagnement technique des équipes.",
        actions:[
            { icon:"fa-diagram-project",     color:"text-sky-600", text:"Contribution à l'architecture de l'usine à sites : mutualisation du socle technique et adaptations fonctionnelles pour les différents sites." },
            { icon:"fa-magnifying-glass",    color:"text-sky-600", text:"Intégration d'Algolia pour un moteur de recherche partagé entre les différents sites de la plateforme." },
            { icon:"fa-cubes",              color:"text-sky-600", text:"Développement et évolution de fonctionnalités spécifiques sur le thème et les modules de la plateforme." },
            { icon:"fa-screwdriver-wrench",  color:"text-sky-600", text:"Maintenance continue : mises à jour Drupal et modules, correctifs et évolutions fonctionnelles." },
        ],
        stack:["Drupal","PHP","Algolia","Drush","Composer","GitLab"],
        highlight:"Plateforme Drupal évolutive pour un grand établissement d'enseignement : usine à sites (~20 sites), recherche Algolia mutualisée et maintenance continue."
    },

    { id:"enpc", title:"École nationale des ponts et chaussées", tech:"drupal", domain:"enseignement", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel de l'École nationale des ponts et chaussées, membre de l'Institut Polytechnique de Paris. Le projet s'appuie sur le socle technique d'IP Paris pour une mise en ligne rapide, avec des adaptations graphiques et fonctionnelles propres à l'école.",
        role:"Développement back-end, intégration des découpes front et adaptation du socle IP Paris aux besoins spécifiques du site. Travail important sur la migration des contenus existants, accompagnement lors de la mise en production et suivi des évolutions.",
        actions:[
            { icon:"fa-paintbrush",          color:"text-sky-600", text:"Adaptation graphique et intégration sur la base du socle IP Paris." },
            { icon:"fa-truck-fast",          color:"text-sky-600", text:"Reprise et migration d'une partie importante des contenus du site précédent." },
            { icon:"fa-cubes",              color:"text-sky-600", text:"Adaptations fonctionnelles spécifiques aux besoins éditoriaux de l'école." },
            { icon:"fa-screwdriver-wrench",  color:"text-sky-600", text:"Maintenance et évolutions continues du site après mise en ligne." },
        ],
        stack:["Drupal","PHP","Twig","Drush","Docker","Git"],
        highlight:"Site institutionnel Drupal basé sur le socle IP Paris : adaptation graphique, migration de contenus et évolutions continues."
    },

    { id:"ensae", title:"ENSAE Paris", tech:"drupal", domain:"enseignement", format:[], subtitle:"Drupal • institutionnel • intégration API",
        context:"Site institutionnel de l'ENSAE Paris, école membre de l'Institut Polytechnique de Paris. Le projet s'appuie sur le socle technique d'IP Paris pour une mise en ligne rapide, avec des besoins fonctionnels propres à l'école : notamment l'exposition du corps enseignant et des formations.",
        role:"Développement back-end, adaptation du socle IP Paris aux besoins spécifiques de l'ENSAE, intégration d'APIs internes et maintenance du site.",
        actions:[
            { icon:"fa-diagram-project",    color:"text-sky-600", text:"Adaptation du socle IP Paris : thème, configuration et modules ajustés aux besoins éditoriaux de l'ENSAE." },
            { icon:"fa-plug",              color:"text-sky-600", text:"Intégration des APIs internes de l'ENSAE : développement d'un module sur-mesure exposant dynamiquement le corps enseignant et les cours associés." },
            { icon:"fa-truck-fast",         color:"text-sky-600", text:"Mise en production et accompagnement client lors des phases de recette et de livraison." },
            { icon:"fa-screwdriver-wrench", color:"text-sky-600", text:"Maintenance et suivi des évolutions post-mise en ligne." },
        ],
        stack:["Drupal","PHP","REST API","Composer","Drush","Git"],
        highlight:"Réutilisation du socle IP Paris pour une mise en ligne rapide, avec développement sur-mesure d'une intégration API pour la gestion dynamique du corps enseignant et des formations."
    },

    { id:"ensea", title:"École nationale supérieure de l'électronique et de ses applications", tech:"drupal", domain:"enseignement", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel de l'École nationale supérieure de l'électronique et de ses applications (ENSEA). Projet mené en équipe, avec des besoins éditoriaux structurés et des exigences de qualité à la livraison.",
        role:"Contribution en appui de l'équipe projet : relecture du cahier fonctionnel, développement back-end, intégration et support. Prise en charge de la maintenance évolutive et préventive du site après mise en ligne.",
        actions:[
            { icon:"fa-file-lines",         color:"text-sky-600", text:"Relecture du cahier fonctionnel et contribution aux échanges techniques en amont du développement." },
            { icon:"fa-code",              color:"text-sky-600", text:"Développement back-end et intégration Twig en appui de l'équipe." },
            { icon:"fa-rocket",             color:"text-sky-600", text:"Accompagnement lors de la mise en production et suivi des retours de recette." },
            { icon:"fa-screwdriver-wrench", color:"text-sky-600", text:"Maintenance évolutive et préventive du site après mise en ligne." },
        ],
        stack:["Drupal","PHP","Twig","Composer","Git"],
        highlight:"Contribution transverse sur un projet en équipe : cadrage fonctionnel, développement, livraison et maintenance dans la durée."
    },

    { id:"centrale-lyon", title:"École Centrale de Lyon", tech:"drupal", domain:"enseignement", format:["usine"], subtitle:"Drupal • multisite • plateforme institutionnelle",
        context:"Plateforme institutionnelle Drupal en multisite regroupant 4 sites. Architecture pensée pour factoriser les développements : fonctionnalités communes mutualisées, thèmes enfants par site et synchronisation de contenus entre les différents sites. Plateforme multilingue avec intégration de DeepL pour la traduction automatique directement depuis le back-office.",
        role:"Développement back-end sur l'ensemble de la plateforme : conception et développement des briques communes, modules personnalisés, intégration des thèmes enfants, migration des contenus existants et accompagnement lors des mises en production.",
        actions:[
            { icon:"fa-diagram-project",    color:"text-sky-600", text:"Architecture Drupal multisite : socle commun et thèmes enfants, avec un découpage fonctionnel permettant la réutilisation entre les 4 sites." },
            { icon:"fa-cubes",             color:"text-sky-600", text:"Développement de modules personnalisés et mise en place de la synchronisation de contenus entre les sites." },
            { icon:"fa-language",           color:"text-sky-600", text:"Intégration de DeepL pour la traduction automatique des contenus multilingues depuis le back-office Drupal." },
            { icon:"fa-truck-fast",         color:"text-sky-600", text:"Migration des anciens contenus et accompagnement aux mises en production." },
            { icon:"fa-screwdriver-wrench", color:"text-sky-600", text:"Maintenance et évolutions continues de la plateforme après mise en ligne." },
        ],
        stack:["Drupal","PHP","Twig","DeepL API","Drush","Composer","Git"],
        highlight:"Plateforme Drupal multisite pour l'École Centrale de Lyon : architecture mutualisée sur 4 sites, synchronisation de contenus, traduction automatique DeepL et migration des contenus existants."
    },

    // --- Santé ---
    { id:"chu-grenoble", title:"CHU Grenoble (CHUGA)", tech:"drupal", domain:"sante", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel du Centre Hospitalier Universitaire de Grenoble. Projet avec des exigences de stabilité, d'accessibilité et de richesse éditoriale propres au secteur de la santé.",
        role:"Développement back-end, intégration, recette interne et maintenance du site.",
        actions:[
            { icon:"fa-shield",             color:"text-emerald-600", text:"Relectures techniques, recette interne et stabilisation avant mise en production." },
            { icon:"fa-cubes",             color:"text-emerald-600", text:"Évolutions back-end et ajustements fonctionnels selon les besoins du client." },
            { icon:"fa-screwdriver-wrench", color:"text-emerald-600", text:"Maintenance et mises à jour Drupal et modules." },
        ],
        stack:["Drupal","PHP","Git"],
        highlight:"Robustesse et qualité de livraison dans un contexte institutionnel santé."
    },

    { id:"ch-niort-web", title:"CH Niort — Site public", tech:"drupal", domain:"sante", format:[], subtitle:"Drupal • site public",
        context:"Site public du Centre Hospitalier de Niort. Projet axé sur la structuration des contenus et leur mise à jour régulière.",
        role:"Développement back-end et maintenance du site.",
        actions:[
            { icon:"fa-screwdriver-wrench", color:"text-emerald-600", text:"Maintenance et évolutions du site après mise en ligne." },
            { icon:"fa-rocket",             color:"text-emerald-600", text:"Accompagnement lors des mises en production et suivi des retours." },
            { icon:"fa-user-gear",          color:"text-emerald-600", text:"Support et conseil auprès du client." },
        ],
        stack:["Drupal","PHP","Drush","Composer"],
        highlight:"Maintenance et support continu sur un site public institutionnel."
    },

    { id:"ch-niort-intranet", title:"CH Niort — Intranet", tech:"drupal", domain:"sante", format:["intranet"], subtitle:"Drupal • intranet",
        context:"Intranet du Centre Hospitalier de Niort. Projet avec des besoins de gestion de contenus internes et de contrôle des accès par profil.",
        role:"Développement back-end, gestion des accès et des rôles, support et maintenance.",
        actions:[
            { icon:"fa-lock",              color:"text-emerald-600", text:"Gestion des accès et des rôles selon les besoins du client." },
            { icon:"fa-cubes",             color:"text-emerald-600", text:"Développements spécifiques et ajustements fonctionnels." },
            { icon:"fa-screwdriver-wrench", color:"text-emerald-600", text:"Maintenance et évolutions du site après mise en ligne." },
        ],
        stack:["Drupal","PHP","Git"],
        highlight:"Intranet institutionnel : gestion des accès et maintenance dans la durée."
    },

    { id:"ch-pgv", title:"CH Paul-Guiraud — Villejuif", tech:"drupal", domain:"sante", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel du Centre Hospitalier Paul-Guiraud de Villejuif. Projet structuré autour de la livraison des gabarits de contenus et de la maintenance.",
        role:"Développement back-end, intégration des découpes front et recette interne.",
        actions:[
            { icon:"fa-code",              color:"text-emerald-600", text:"Intégration des découpes front en Twig." },
            { icon:"fa-check-double",       color:"text-emerald-600", text:"Recette interne et corrections avant mise en production." },
            { icon:"fa-screwdriver-wrench", color:"text-emerald-600", text:"Maintenance et mises à jour après mise en ligne." },
        ],
        stack:["Drupal","PHP","Twig","Composer"],
        highlight:"Livraison maîtrisée et maintenance continue sur un site institutionnel santé."
    },

    // --- Recherche ---
    { id:"onera", title:"ONERA", tech:"drupal", domain:"recherche", format:["usine"], subtitle:"Drupal • plateforme institutionnelle",
        context:"Plateforme web de l'ONERA (Office national d'études et de recherches aérospatiales), composée de plusieurs sites et sections avec un besoin d'harmonisation technique, d'évolutions continues et de mises à jour maîtrisées.",
        role:"Développement back-end, contributions aux briques communes de la plateforme, accompagnement lors des mises en production et maintenance.",
        actions:[
            { icon:"fa-diagram-project",    color:"text-indigo-600", text:"Harmonisation et mutualisation des composants techniques entre les différents sites de la plateforme." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Maintenance et mises à jour Drupal et modules." },
            { icon:"fa-check-double",       color:"text-indigo-600", text:"Recette interne et corrections avant mise en production." },
        ],
        stack:["Drupal","PHP","Composer","Drush"],
        highlight:"Approche plateforme : mutualisation des composants, maintenance et qualité de livraison."
    },

    { id:"onera-carriere", title:"ONERA — Carrières", tech:"drupal", domain:"recherche", format:["carriere"], subtitle:"Drupal • site carrières",
        context:"Espace carrières de l'ONERA : présentation des offres et des métiers, avec des besoins de structuration des contenus et de fiabilité des formulaires.",
        role:"Développement back-end, intégration et maintenance de l'espace carrières.",
        actions:[
            { icon:"fa-briefcase",          color:"text-indigo-600", text:"Mise en place et ajustements fonctionnels de l'espace carrières." },
            { icon:"fa-code",              color:"text-indigo-600", text:"Intégration des gabarits de contenus en Twig." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Évolutions et maintenance après mise en ligne." },
        ],
        stack:["Drupal","PHP","Twig","Git"],
        highlight:"Site carrières : mise en valeur des contenus et fiabilité de la plateforme."
    },

    { id:"onera-iris", title:"ONERA — IRIS", tech:"drupal", domain:"recherche", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site ou section spécifique au sein de l'écosystème institutionnel de l'ONERA, avec des besoins de développement ciblé et de maintenance.",
        role:"Développement back-end, maintenance et support au sein de la plateforme existante.",
        actions:[
            { icon:"fa-cubes",             color:"text-indigo-600", text:"Développements back-end et ajustements spécifiques." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Maintenance et mises à jour." },
            { icon:"fa-user-gear",          color:"text-indigo-600", text:"Support et conseil auprès du client." },
        ],
        stack:["Drupal","PHP","Drush","Composer"],
        highlight:"Interventions ciblées au sein d'une plateforme institutionnelle existante."
    },

    { id:"mnhn", title:"MNHN — Publications scientifiques", tech:"drupal", domain:"recherche", format:[], subtitle:"Drupal Commerce • e-commerce éditorial • publications scientifiques",
        context:"Conception d'une plateforme e-commerce et éditoriale sur Drupal Commerce pour la gestion, valorisation et distribution d'un patrimoine scientifique : catalogue produits, gestion des stocks et règles de vente métier spécifiques au domaine éditorial.",
        role:"Référente technique / Développeur principal",
        actions:[
            { icon:"fa-rss",              color:"text-indigo-600", text:"Intégration d'un flux OAI-PMH pour l'alimentation et la synchronisation d'un catalogue structuré de publications scientifiques." },
            { icon:"fa-file-pdf",          color:"text-indigo-600", text:"Développement d'un système de génération PDF à la volée (HTML2PDF) pour fiches produits et catalogues, couplé à un workflow Print on Demand avec personnalisation dynamique des couvertures selon commande et contexte client." },
            { icon:"fa-scale-balanced",    color:"text-indigo-600", text:"Gestion de règles métier complexes (TVA, frais de port) via le module Rules." },
        ],
        stack:["Drupal Commerce","PHP","OAI-PMH","HTML2PDF","Rules","Drush","Git"],
        highlight:"Toujours en production 10 ans après sa mise en ligne — refonte ultérieure confiée à la même équipe, avec rôle de référente technique et accompagnement à la montée en compétences."
    },

    // --- Institutions ---
    { id:"epsf", title:"EPSF", tech:"drupal", domain:"institutions", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel de l'EPSF (Établissement public de sécurité ferroviaire). Projet avec un cycle long, des besoins d'évolutions régulières et un maintien en condition opérationnelle.",
        role:"Développement back-end, accompagnement client et mises en production.",
        actions:[
            { icon:"fa-people-group",       color:"text-indigo-600", text:"Échanges client et cadrage technique des évolutions." },
            { icon:"fa-rocket",             color:"text-indigo-600", text:"Accompagnement lors des mises en production et suivi des retours." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Maintenance et évolutions du site." },
        ],
        stack:["Drupal","PHP","Git","Drush"],
        highlight:"Projet institutionnel sur cycle long : évolutions régulières et maintien en condition opérationnelle."
    },

    { id:"asp-public", title:"ASP — Site public", tech:"drupal", domain:"institutions", format:[], subtitle:"Drupal • site public",
        context:"Site public de l'Agence de Services et de Paiement. Projet avec des besoins éditoriaux structurés et une maintenance régulière.",
        role:"Développement back-end, intégration, recette interne et support.",
        actions:[
            { icon:"fa-code",              color:"text-indigo-600", text:"Intégration des découpes front en Twig." },
            { icon:"fa-check-double",       color:"text-indigo-600", text:"Recette interne et corrections avant mise en production." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Maintenance et mises à jour après mise en ligne." },
        ],
        stack:["Drupal","PHP","Twig","Git"],
        highlight:"Cycle complet : intégration, recette et maintenance sur un site public institutionnel."
    },

    { id:"ihemi", title:"IHEMI", tech:"drupal", domain:"institutions", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel de l'Institut des Hautes Études du Ministère de l'Intérieur. Projet axé sur la structuration des contenus et la durabilité de la plateforme.",
        role:"Développement back-end, intégration et recette interne.",
        actions:[
            { icon:"fa-cubes",             color:"text-indigo-600", text:"Développement back-end Drupal : configuration et modules." },
            { icon:"fa-check-double",       color:"text-indigo-600", text:"Recette interne et corrections avant mise en production." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Mises à jour et maintenance du site." },
        ],
        stack:["Drupal","PHP","Git"],
        highlight:"Structuration des contenus et durabilité sur un site institutionnel."
    },

    // --- Collectivités ---
    { id:"arb-cvl", title:"ARB Centre-Val de Loire", tech:"drupal", domain:"collectivites", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel de l'Agence Régionale de la Biodiversité Centre-Val de Loire. Projet avec des besoins d'évolutions régulières et de support.",
        role:"Développement back-end, support client et maintenance.",
        actions:[
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Évolutions fonctionnelles et maintenance du site." },
            { icon:"fa-people-group",       color:"text-indigo-600", text:"Échanges client et cadrage des évolutions." },
            { icon:"fa-rocket",             color:"text-indigo-600", text:"Accompagnement lors des mises en production." },
        ],
        stack:["Drupal","PHP","Composer","Drush"],
        highlight:"Maintenance et conseil sur le long terme pour un site institutionnel de collectivité."
    },

    { id:"cdg69", title:"CDG 69", tech:"drupal", domain:"collectivites", format:[], subtitle:"Drupal • site institutionnel",
        context:"Site institutionnel du Centre de Gestion de la Fonction Publique du Rhône. Projet axé sur le maintien en condition opérationnelle et les évolutions régulières.",
        role:"Développement back-end, mises en production et support.",
        actions:[
            { icon:"fa-rocket",             color:"text-indigo-600", text:"Accompagnement lors des mises en production et suivi des retours." },
            { icon:"fa-screwdriver-wrench", color:"text-indigo-600", text:"Maintenance et mises à jour Drupal et modules." },
            { icon:"fa-people-group",       color:"text-indigo-600", text:"Échanges client et cadrage des évolutions." },
        ],
        stack:["Drupal","PHP","Git","Composer"],
        highlight:"Maintien en condition opérationnelle et évolutions régulières sur un site institutionnel."
    },

    { id:"cd-vosges", title:"Conseil Départemental des Vosges", tech:"wordpress", domain:"collectivites", format:[], subtitle:"WordPress • site institutionnel",
        context:"Site institutionnel du Conseil Départemental des Vosges sous WordPress. Projet avec des besoins d'intégration, d'évolutions et de maintenance régulière.",
        role:"Support technique, intégration des découpes front, évolutions et mises à jour.",
        actions:[
            { icon:"fa-code",              color:"text-slate-700", text:"Intégration des découpes front." },
            { icon:"fa-screwdriver-wrench", color:"text-slate-700", text:"Mises à jour WordPress et extensions." },
            { icon:"fa-user-gear",          color:"text-slate-700", text:"Support et conseil auprès du client." },
        ],
        stack:["WordPress","PHP","Git"],
        highlight:"WordPress : intégration, maintenance et support sur un site institutionnel de collectivité."
    },

    { id:"smitom", title:"SMITOM-LOMBRIC", tech:"wordpress", domain:"collectivites", format:[], subtitle:"WordPress • site institutionnel",
        context:"Site institutionnel du SMITOM-LOMBRIC (syndicat de traitement des ordures ménagères). Projet avec des besoins de gestion de contenus et de maintenance.",
        role:"Développement, mises à jour et intégration.",
        actions:[
            { icon:"fa-code",              color:"text-slate-700", text:"Intégration des gabarits de contenus." },
            { icon:"fa-screwdriver-wrench", color:"text-slate-700", text:"Mises à jour WordPress et extensions." },
            { icon:"fa-user-gear",          color:"text-slate-700", text:"Support et conseil auprès du client." },
        ],
        stack:["WordPress","PHP","Git"],
        highlight:"WordPress : maintenance et qualité de service sur un site institutionnel."
    },

    // --- Logement social ---
    { id:"ush-boutique", title:"USH — Boutique", tech:"drupal", domain:"logement_social", format:[], subtitle:"Drupal • plateforme de diffusion",
        context:"Espace de diffusion de ressources (type catalogue/boutique) de l'Union Sociale pour l'Habitat, intégré à un écosystème Drupal existant.",
        role:"Développement back-end, évolutions fonctionnelles, maintenance et support.",
        actions:[
            { icon:"fa-cubes",             color:"text-sky-600", text:"Évolutions back-end selon les besoins du client." },
            { icon:"fa-screwdriver-wrench", color:"text-sky-600", text:"Maintenance et mises à jour." },
            { icon:"fa-people-group",       color:"text-sky-600", text:"Échanges client et support." },
        ],
        stack:["Drupal","PHP","Composer"],
        highlight:"Évolutions et maintenance sur une plateforme de diffusion de ressources."
    },

    { id:"ush-collab", title:"USH — Espaces Collaboratifs", tech:"drupal", domain:"logement_social", format:["usine"], subtitle:"Drupal 10 • usine à sites • plateforme collaborative",
        context:"Conception d'une plateforme collaborative Drupal reposant sur une architecture d'usine à sites : génération automatisée d'espaces métiers configurables (fonctionnalités, droits, identité visuelle) via interfaces d'administration, sur socle mutualisé.",
        role:"Référente technique / Développeur principal",
        actions:[
            { icon:"fa-diagram-project",   color:"text-sky-600", text:"Développement du moteur d'usine à sites permettant aux équipes métiers de créer et administrer leurs espaces en autonomie, tout en maintenant un socle technique commun." },
            { icon:"fa-key",              color:"text-sky-600", text:"Intégration d'un système d'authentification hybride Drupal + SSO Keycloak, avec gestion fine des rôles/permissions et enrichissement des profils utilisateurs via API Keycloak (photo, données de profil, y compris hors connexion)." },
            { icon:"fa-comments",          color:"text-sky-600", text:"Mise en place d'un système de commentaires natif Drupal avec gestion des droits d'accès et modération, intégré au contexte collaboratif multi-espaces." },
        ],
        stack:["Drupal 10","PHP","Keycloak","SSO","Drush","GitLab"],
        highlight:"Automatisation de la création d'espaces, centralisation de la maintenance, forte autonomie des équipes métiers."
    },

    // --- Associatif ---
    { id:"unml", title:"UNML", tech:"wordpress", domain:"associatif", format:[], subtitle:"WordPress • site associatif",
        context:"Site WordPress de l'Union Nationale des Missions Locales. Projet axé sur la publication de contenus et la maintenance régulière de la plateforme.",
        role:"Support technique et suivi des évolutions du site.",
        actions:[
            { icon:"fa-people-group",       color:"text-slate-700", text:"Échanges et support auprès du client." },
            { icon:"fa-screwdriver-wrench", color:"text-slate-700", text:"Maintenance et mises à jour WordPress." },
            { icon:"fa-code",              color:"text-slate-700", text:"Évolutions et intégration." },
        ],
        stack:["WordPress","PHP","Git"],
        highlight:"WordPress : support et maintien en condition opérationnelle sur un site associatif."
    },

    // --- Industrie ---
    { id:"charot", title:"Charot", tech:"wordpress", domain:"industrie", format:[], subtitle:"WordPress • extranet métier • aide à la décision",
        context:"Refonte du site vitrine et développement d'un extranet métier d'aide à la décision pour l'orientation produits, sur WordPress/Genesis avec modélisation des entités complexes via Pods.",
        role:"Développeur principal",
        actions:[
            { icon:"fa-lock",               color:"text-slate-700", text:"Développement de fonctionnalités extranet sur mesure (sans dépendance à des solutions clé en main) pour répondre aux contraintes spécifiques du domaine industriel." },
            { icon:"fa-wand-magic-sparkles", color:"text-slate-700", text:"Conception d'un moteur de recommandation produit basé sur des questionnaires dynamiques Gravity Forms : règles conditionnelles, calculs et logiques métier complexes." },
            { icon:"fa-arrows-rotate",       color:"text-slate-700", text:"Mise en place de traitements automatisés d'import et synchronisation quotidienne des données, avec déclenchement manuel via l'administration." },
        ],
        stack:["WordPress","Genesis","Pods","Gravity Forms","PHP","Git"],
        highlight:"Centralisation et fiabilisation des données produits, réduction des opérations manuelles, système d'aide à la décision directement exploitable par les équipes métiers."
    },

    // --- Application métier ---
    { id:"quartiers-plus", title:"Quartiers Plus", tech:"symfony", domain:"application_metier", format:[], subtitle:"Symfony 6 • plateforme métier • immobilier social",
        context:"Conception et développement d'une plateforme métier Symfony 6 pour la gestion et l'analyse de données du parc immobilier social : architecture modulaire, modélisation des entités avec Doctrine, gestion des migrations.",
        role:"Développeur · Interlocutrice technique",
        actions:[
            { icon:"fa-file-export", color:"text-indigo-600", text:"Développement de formulaires métier complexes (Symfony Form) et de fonctionnalités d'import/export multi-formats (CSV, Excel, PDF) via PhpSpreadsheet et DomPDF." },
            { icon:"fa-terminal",    color:"text-indigo-600", text:"Mise en place de Console Commands pour l'exécution manuelle ou planifiée des traitements de mise à jour des référentiels." },
            { icon:"fa-chart-bar",   color:"text-indigo-600", text:"Intégration de tableaux de bord et visualisations via Chart.js pour l'analyse des données métier." },
            { icon:"fa-arrows-spin", color:"text-indigo-600", text:"Chaîne CI/CD industrialisée, revues de code et tests automatisés ; gestion Agile/Jira avec échanges directs Product Owner." },
        ],
        stack:["Symfony 6","PHP","Doctrine","PhpSpreadsheet","DomPDF","Chart.js","Git"],
        highlight:"Projet en évolution continue avec livraisons mensuelles — interlocutrice technique directe avec le Product Owner."
    },

];

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
    };
    const formatBadges = (p.format || []).map(f => {
        if (f === "usine")    return '<span class="chip"><i class="fa-solid fa-diagram-project"></i> Usine à sites</span>';
        if (f === "intranet") return '<span class="chip"><i class="fa-solid fa-lock"></i> Intranet</span>';
        if (f === "carriere") return '<span class="chip"><i class="fa-solid fa-briefcase"></i> Carrières</span>';
        return '';
    }).join("");
    return (domainMap[p.domain] ?? "") + formatBadges;
}

function render() {
    grid.innerHTML = PROJECTS.map(p => {
        const fmt = (p.format || []).join(" ");
        return `
        <article class="card p-6 project-item cursor-pointer open-modal"
                 data-tech="${p.tech}"
                 data-domain="${p.domain}"
                 data-format="${fmt}"
                 data-project="${p.id}">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="text-lg font-semibold">${p.title}</h3>
            </div>
            <div class="shrink-0">${ICON_TECH[p.tech] ? `<span class="chip">${ICON_TECH[p.tech]} ${p.tech === "drupal" ? "Drupal" : (p.tech === "wordpress" ? "WordPress" : "Symfony")}</span>` : ""}</div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">${fmtBadges(p)}</div>
          <div class="mt-3 flex flex-wrap gap-2">${(p.stack || []).slice(0, 5).map(s => `<span class="chip">${s}</span>`).join("")}</div>
        </article>`;
    }).join("");
}

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
const modalActions  = document.getElementById("modalActions");
const modalStack    = document.getElementById("modalStack");
const modalResult   = document.getElementById("modalResult");

const FEATURED_IDS = ["polytechnique", "ush-collab", "mnhn", "charot", "quartiers-plus"];

let lastActive = null;

function openModal(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;

    lastActive = document.activeElement;
    const isFeatured = FEATURED_IDS.includes(id);

    modalTitle.textContent = p.title;
    modalSubtitle.textContent = isFeatured ? "" : p.subtitle;
    modalSubtitle.classList.toggle("hidden", isFeatured);
    modalBadges.innerHTML = fmtBadges(p);

    const leftCol  = document.getElementById("modalLeftCol");
    const rightCol = document.getElementById("modalRightCol");
    leftCol.classList.toggle("hidden", !isFeatured);
    rightCol.className = isFeatured ? "sm:col-span-5 space-y-4" : "sm:col-span-12 space-y-4";
    document.getElementById("modalResultBlock").classList.toggle("hidden", !isFeatured);
    document.getElementById("modalRoleStrip").classList.toggle("hidden", isFeatured || p.tech !== "drupal");

    modalContext.textContent = p.context || "";
    modalRole.textContent    = p.role    || "";

    modalActions.innerHTML = (p.actions || []).map(a => `
      <li class="flex gap-3 items-start">
        <i class="fa-solid ${a.icon} mt-0.5 ${a.color}"></i>
        <span>${a.text}</span>
      </li>`).join("");

    modalStack.innerHTML  = (p.stack || []).map(s => `<span class="chip">${s}</span>`).join("");
    modalResult.textContent = isFeatured ? (p.highlight || "") : "";

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
