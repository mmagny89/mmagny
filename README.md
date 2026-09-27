# mmagny.fr

Site vitrine de **Mylène Magny**, développeuse back-end (PHP / Drupal /
Symfony) : présentation, compétences, expériences, projets et contact.

[![Qualité](https://github.com/mmagny89/mmagny/actions/workflows/qualite.yml/badge.svg)](https://github.com/mmagny89/mmagny/actions/workflows/qualite.yml)
[![Version](https://img.shields.io/github/v/tag/mmagny89/mmagny?sort=semver&label=version)](CHANGELOG.md)
[![Site](https://img.shields.io/website?url=https%3A%2F%2Fmmagny.fr&label=mmagny.fr&up_message=en%20ligne&down_message=hors%20ligne)](https://mmagny.fr)
[![Licence MIT](https://img.shields.io/badge/licence-MIT%20(code)-blue.svg)](LICENSE)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![nginx](https://img.shields.io/badge/nginx-009639?logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Accessibilité](https://img.shields.io/badge/accessibilit%C3%A9-WCAG%202.2%20AA%20vis%C3%A9-4B5563)

En production : <https://mmagny.fr>

## Contenu du site

| Page | Contenu |
|---|---|
| [Accueil](https://mmagny.fr) | Présentation, compétences, projets phares, parcours, IA, projets perso, contact |
| [Projets](https://mmagny.fr/projets.html) | 27 projets clients filtrables, chacun avec contexte, rôle, livrables et résultat |
| [Compétences](https://mmagny.fr/competences.html) | Dossier de compétences : ancienneté et projets qui prouvent chaque compétence |

## Nature du projet

Site **statique** — HTML, CSS et JavaScript servis tels quels.

- Pas de langage serveur, pas de base de données.
- Pas d'étape de build : aucun bundler, aucun `composer.json`, aucun
  `package.json`. Ce qui est dans `site/` est exactement ce qui est servi.
- Tailwind CSS et Font Awesome sont chargés par CDN, pas compilés.
- Consentement aux cookies géré par [tarteaucitron.js](https://tarteaucitron.io),
  vendu tel quel dans `site/tarteaucitron/`.

Conséquence pratique : modifier une page, c'est éditer un fichier `.html` et
recharger le navigateur. Rien à compiler, rien à installer.

## Structure

```
.                       infrastructure uniquement — aucun code applicatif ici
├── site/               LE SITE (seul dossier de contenu)
│   ├── index.html          accueil
│   ├── projets.html        projets & réalisations
│   ├── competences.html    dossier de compétences
│   ├── assets/             css/ js/ img/ favicon/ cv/
│   └── tarteaucitron/      bandeau de consentement (dépendance vendue)
├── docker/nginx/       image et configuration du serveur
├── .github/            portes qualité et déploiement
└── README.docker.md    documentation d'infrastructure et de déploiement
```

La séparation est stricte : **la racine ne porte que de l'infrastructure**, tout
le contenu vit dans `site/`. C'est ce qui rend impossible qu'un fichier d'infra
ou une variable d'environnement se retrouve servi par erreur.

## Démarrer en local

Docker est la seule dépendance.

```bash
docker compose up -d --wait
```

Le site est sur <http://localhost:80>. `site/` est monté en lecture seule :
toute modification d'un fichier du site est visible au simple rechargement, sans
reconstruire quoi que ce soit.

```bash
docker compose logs -f web                      # journaux nginx
docker compose down --remove-orphans --volumes  # tout arrêter et nettoyer
```

Le port 80 est fixe et volontairement pas déduit de l'état de la machine. S'il
est déjà pris, changer `HTTP_PORT` dans `.env` — c'est une décision explicite,
documentée dans `README.docker.md`.

> Toute commande Docker passe par la clé de service `web`, jamais par le nom du
> conteneur : `docker compose exec web ...`.

## Modifier le site

| Pour changer… | Éditer |
|---|---|
| Le contenu de l'accueil | `site/index.html` |
| La liste des projets | `site/assets/js/projets-data.js` — tableau `PROJECTS` |
| Le dossier de compétences | `site/assets/js/competences.js` — objet `COMPETENCES` |
| Les projets mis en avant sur l'accueil | `site/assets/js/home.js` — objet `HOME_PROJECTS` |
| Les projets personnels | `site/assets/js/personal-projects.js` — tableau `PERSONAL_PROJECTS` |
| Le bascule thème clair/sombre | `site/assets/js/app.js` |
| Les styles propres au site | `site/assets/css/shared.css`, `projets.css` |
| Le CV téléchargeable | `site/assets/cv/mylene-magny-cv.pdf` |

Les cartes de projets et les modales sont construites en JavaScript à partir de
données déclarées dans les fichiers `assets/js/` : ajouter un projet, c'est
ajouter une entrée dans le tableau, pas écrire du HTML.

## Avant de pousser

Les deux portes rapides se jouent en local, en quelques secondes :

```bash
npx --yes html-validate@9 "site/**/*.html"   # validité du balisage
./.github/scripts/check-links.sh site        # aucun lien interne mort
```

Ces deux commandes sont exactement celles qu'exécute la CI : si elles passent
ici, elles passeront là-bas.

Une règle `html-validate` ne se désactive jamais sans ajouter sa justification
dans `.htmlvalidate.md`.

## Mise en production

Un `push` sur `main` déclenche, dans cet ordre : validation du balisage,
vérification des liens, construction et test de l'image, puis déploiement par
SSH sur le serveur. Aucun déploiement n'est déclenché depuis une pull request.

Le déploiement automatique est **désactivé tant que la variable de dépôt
`DEPLOIEMENT_ACTIF` ne vaut pas `true`** : le job est alors ignoré, et la CI
reste verte sur les seules portes qualité.

La procédure complète — préparation du serveur, clé de déploiement restreinte,
secrets GitHub, valeurs Traefik à constater — est dans **`README.docker.md`**.

## Publier une version

Une release GitHub se crée **toute seule** à la poussée d'une étiquette
`vX.Y.Z` : `.github/workflows/release.yml` en reprend les notes dans la section
correspondante de `CHANGELOG.md`.

1. Renommer `## [Non publié]` en `## [X.Y.Z] - AAAA-MM-JJ` dans `CHANGELOG.md`,
   rouvrir un `## [Non publié]` vide au-dessus, mettre à jour les liens du bas.
2. Vérifier les notes telles qu'elles seront publiées :
   `sh outils/extraire-changelog.sh X.Y.Z`
3. Commiter, étiqueter et pousser :
   `git tag -a vX.Y.Z -m "Version X.Y.Z"` puis `git push origin main vX.Y.Z`

Une étiquette poussée avant ce workflow se rattrape depuis l'onglet Actions
(« Publication », *Run workflow*, en indiquant l'étiquette).

## Documentation

| Fichier | Contenu |
|---|---|
| [`README.md`](README.md) | Ce fichier : le projet, son contenu, le développement local. |
| [`README.docker.md`](README.docker.md) | Infrastructure, environnements, déploiement. |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Signaler un défaut, réutiliser le code, proposer un changement. |
| [`SECURITY.md`](SECURITY.md) | Signaler une faille, et ce qui est dans le périmètre. |
| [`CHANGELOG.md`](CHANGELOG.md) | Journal des versions. |
| [`LICENSE`](LICENSE) | MIT sur le code, contenu réservé. |
| [`CLAUDE.md`](CLAUDE.md) | Contexte et pièges du projet, pour Claude Code. |
| [`.htmlvalidate.md`](.htmlvalidate.md) | Règles de validation désactivées et pourquoi. |

## Licence

Le **code** est sous [licence MIT](LICENSE) : configuration Docker et nginx,
scripts, intégration continue, structure des pages. Réutilisable librement.

Le **contenu** ne l'est pas : textes, CV, descriptions de projets, images et
logo restent la propriété de leur autrice. Reprendre la mécanique du site, oui ;
republier le parcours de quelqu'un d'autre, non.
