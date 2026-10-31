# Journal des versions

Les changements notables de ce projet sont consignés ici.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et le
versionnage [SemVer](https://semver.org/lang/fr/). S'agissant d'un site vitrine
et non d'une bibliothèque, « rupture de compatibilité » se lit comme une
refonte visible par le visiteur, et non comme un changement d'API.

## [Non publié]

## [2.0.0] - 2026-10-31

Refonte visuelle complète du site, du CV et de l'accessibilité, d'où le
changement de version majeure : tout ce que voit le visiteur change.

### Ajouté

- Nouvelle direction visuelle : blocs « terminal », violet PHP pour le
  back-end, ambre réservé à l'IA, thème clair et sombre mémorisé, logo `{ mM }`
  conservé.
- Extrait de code tiré au hasard à chaque chargement de l'accueil (10 extraits),
  avec un bouton pour en afficher un autre.
- Section « L'IA dans ma pratique » : la méthode (je cadre, Claude dégrossit, je
  relis, la CI tranche), l'outillage `.claude/` et ce qui n'est pas délégué.
- Page Projets en grille filtrable (technologie, domaine, recherche) : le détail
  s'ouvre dans une fenêtre avec précédent / suivant et flèches du clavier, et
  `projets.html#identifiant` l'ouvre directement.
- Compétence « Montées de version », rubrique « IA appliquée au développement »
  et liens de chaque compétence vers les projets qui la prouvent.
- Parcours complet à l'accueil : expériences détaillées, certifications, autres
  formations, formations en cours, frise chronologique des études.
- Loisirs étoffés : Égypte et Grèce antiques, bouddhisme theravāda et Thaïlande,
  gastronomie d'Asie de l'Est.
- Référencement et lisibilité par les moteurs d'IA : listes pré-rendues dans le
  HTML (`outils/prerendre.sh`), données structurées schema.org (personne,
  profil, liste des projets, fil d'Ariane), `robots.txt`, `sitemap.xml`,
  `llms.txt`.
- CV PDF regénérable depuis `outils/cv/cv.html` (`outils/generer-cv.sh`), à la
  charte du site, avec photo et un bloc « ce que je fais, ce que je cherche ».
- Interrupteur de déploiement `DEPLOIEMENT_PROD`, durcissement des conteneurs,
  `GITHUB.md` et installateur de déploiement avec utilisateur dédié.
- Numéro de version sur les assets (`?v=`), pour contourner le cache d'une
  heure de la production.

### Modifié

- Tailwind CSS (CDN) et Font Awesome sont remplacés par une feuille de style
  unique, `assets/css/site.css`, et des icônes SVG en ligne. Seules les polices
  restent chargées depuis Google Fonts.
- Intitulé unifié : « Développeuse back-end PHP », « lead dev Drupal 8+ ».
  Ordre des technologies : PHP, Drupal, Symfony, puis WordPress.
- Les nombres s'écrivent en chiffres, sans retour à la ligne entre le nombre et
  son unité.
- Les fiches de projets ne contiennent plus de détails sensibles sur les clients
  (infrastructure, authentification, budget).
- L'interrupteur de déploiement `DEPLOIEMENT_ACTIF` (valeur `true`) devient
  `DEPLOIEMENT_PROD` (valeur `oui`), le nom commun à tous les dépôts. L'ancienne
  variable n'est plus lue : sans la nouvelle, le déploiement est ignoré.
- Projets personnels mis à jour (Chauffage et Envie de Jouer, WordPress au
  niveau de Drupal et Symfony).
- La CI passe à Node 26.

### Corrigé

- Accessibilité : audit axe-core à zéro violation sur les trois pages (clair et
  sombre, 390 et 1280 px) ; contrastes des bordures et du texte secondaire,
  intitulés de liens explicites, nouvel onglet annoncé, hiérarchie des titres,
  clignotement limité à moins de 5 secondes.
- Les compteurs de projets sont calculés depuis les données (27 projets, 21
  Drupal) au lieu de chiffres écrits à la main et périmés.
- Un visiteur au cache chaud ne charge plus l'ancien `home.js` avec le nouveau
  HTML.

### Supprimé

- `assets/js/app.js`, `assets/css/shared.css` et `assets/css/projets.css`.

## [1.1.0] - 2026-09-27

### Ajouté

- Page « Dossier de compétences » : chaque compétence, technique ou
  transverse, avec son ancienneté et les projets qui la prouvent, calculés
  depuis les données des projets.
- Projet personnel BG TCG, en bêta.
- Menu de navigation sur mobile et tablette, qui n'existait pas sous 1024 px.
- Lien d'évitement, zone principale, cartes projets ouvrables au clavier,
  respect de la préférence de mouvement réduit.
- Interrupteur `DEPLOIEMENT_ACTIF` : sans lui, le déploiement est ignoré au
  lieu de faire échouer la CI.
- Fichiers de gouvernance attendus d'un dépôt public : licence, politique de
  sécurité, guide de contribution, journal des versions, surveillance des
  dépendances par Dependabot.
- Outillage de déploiement versionné dans `outils/` : installation des accès
  serveur, saisie des secrets GitHub, diagnostic du proxy, script de
  déploiement.

### Modifié

- Accueil réorganisé en présentation : compétences d'abord, puis projets,
  parcours, et un « côté perso » regroupant l'IA, les projets personnels et
  les loisirs. L'IA a sa propre section.
- Projets personnels regroupés par état : en ligne en cartes, en chantier en
  liste compacte.
- Ancienneté portée à 15 ans.
- Les conteneurs, le réseau et le routeur du proxy portent le nom de leur
  environnement. Sans cela, deux environnements du même projet sur un hôte
  partagé se disputeraient les mêmes ressources.
- Les secrets de déploiement suivent le nommage commun à tous les dépôts,
  `DEPLOIEMENT_*` au lieu de `SSH_*`.

## [1.0.0] - 2026-09-10

Première version dotée d'une infrastructure reproductible et d'un déploiement
automatisé, et refonte éditoriale complète du contenu.

### Ajouté

- Infrastructure Docker : image nginx multi-étapes, socle et overrides par
  environnement, déploiement déclenché par un `push` sur `main`.
- Portes qualité bloquantes : validation du balisage, vérification des liens
  internes, construction et sonde de l'image de production.
- Section « Ce que je cherche », énonçant le type de poste et d'équipe
  recherchés.
- Métadonnées de partage Open Graph et Twitter Card, avec une image dédiée.
- Vingt-septième projet et frise chronologique des études.

### Modifié

- Les résultats de projets remontent sur les cartes, au lieu de rester
  enfermés dans les modales.
- Les compétences passent d'un inventaire à plat à trois niveaux de maîtrise.
- Les fiches de projets affichent toutes leur contenu complet.

### Corrigé

- Une URL inconnue répond 404 au lieu de servir la page d'accueil en 200.
- L'en-tête et les modales sont utilisables sur mobile.
- Les compteurs de projets sont calculés depuis les données, après avoir
  divergé en silence.

### Supprimé

- 2,6 Mo d'images qui n'étaient référencées nulle part.

## [0.2.0] - 2026-05-27

### Ajouté

- CV téléchargeable au format PDF.
- Projets personnels sur la page d'accueil.
- Animations d'apparition des sections au défilement.

### Modifié

- Styles et données de projets extraits du HTML vers des fichiers dédiés.

## [0.1.0] - 2026-03-12

Première mise en ligne.

### Ajouté

- Page d'accueil et page Projets.
- Bandeau de consentement aux cookies et mesure d'audience conditionnelle.
- Jeu d'icônes et manifeste du site.

[Non publié]: https://github.com/mmagny89/mmagny/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/mmagny89/mmagny/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/mmagny89/mmagny/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/mmagny89/mmagny/releases/tag/v1.0.0
[0.2.0]: https://github.com/mmagny89/mmagny/releases/tag/v0.2.0
[0.1.0]: https://github.com/mmagny89/mmagny/releases/tag/v0.1.0
