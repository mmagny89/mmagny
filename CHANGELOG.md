# Journal des versions

Les changements notables de ce projet sont consignés ici.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et le
versionnage [SemVer](https://semver.org/lang/fr/). S'agissant d'un site vitrine
et non d'une bibliothèque, « rupture de compatibilité » se lit comme une
refonte visible par le visiteur, et non comme un changement d'API.

## [Non publié]

### Ajouté

- Fichiers de gouvernance attendus d'un dépôt public : licence, politique de
  sécurité, guide de contribution, journal des versions, surveillance des
  dépendances par Dependabot.
- Outillage de déploiement versionné dans `outils/` : installation des accès
  serveur, saisie des secrets GitHub, diagnostic du proxy, script de
  déploiement.

### Modifié

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

[Non publié]: https://github.com/mmagny89/mmagny/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mmagny89/mmagny/releases/tag/v1.0.0
[0.2.0]: https://github.com/mmagny89/mmagny/releases/tag/v0.2.0
[0.1.0]: https://github.com/mmagny89/mmagny/releases/tag/v0.1.0
