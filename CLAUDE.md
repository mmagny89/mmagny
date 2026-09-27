# mmagny.fr

Site vitrine **statique** : HTML, CSS (Tailwind par CDN), JavaScript vanilla.
Aucun langage serveur, aucune base de données, aucun bundler, aucune dépendance
installée — ni `composer.json`, ni `package.json`.

## Règle qui prime sur tout

`.claude/rules/stack-conventions.md` fait autorité sur l'infrastructure
(manifeste de fichiers, nommage, ports, `.env`, CI). En cas de contradiction
avec ce fichier ou avec le prompt d'un agent, elle gagne, et la contradiction
se signale.

Deux écarts assumés, déjà arbitrés — ne pas les « corriger » :

- Ce projet **n'est ni Symfony, ni Drupal, ni WordPress**. Les agents
  `symfony-docker` / `drupal-docker` / `wordpress-docker`, la bibliothèque
  `.claude/resources/` et les scripts `setup-*.sh` ne s'appliquent pas.
  Pas de FrankenPHP, pas de Caddy, pas d'Ember, pas de `app/`, pas de PHP.
- Il n'y a **pas d'environnement staging** : dev et production seulement.

## Où vit quoi

- `site/` — le site. **Seul dossier de contenu.**
- Racine, `docker/`, `.github/` — infrastructure uniquement.

## Commandes

```sh
docker compose up -d --wait                 # dev, http://localhost:80
docker compose down --remove-orphans --volumes

npx --yes html-validate@9 "site/**/*.html"  # porte 1
./.github/scripts/check-links.sh site       # porte 2
```

Toute commande passe par la **clé de service** `web`, jamais par le
`container_name` : `docker compose exec web ...`.

Les conteneurs, le réseau et le routeur Traefik portent leur environnement
(`mmagny-dev-web`, réseau `mmagny-dev`). `ENV` vient du `.env` racine en
développement et du fichier de secrets en production, en `${ENV:?}` : un
fichier de secrets qui l'oublierait ferait échouer le démarrage plutôt que de
produire `mmagny--web`.

`site/` est monté en lecture seule en dev : une modification de contenu est
visible au rechargement. Un rebuild n'est nécessaire que si `docker/nginx/`
change.

## Conventions

- Standards applicables : skills `web-accessibility-a11y`,
  `web-security-checklist`, `web-performance-optimization`,
  `tailwind-css-standards`. Pas de skill de standards back-end ici.
- Les portes CI sont bloquantes. Avant de rendre la main sur une modification
  de `site/`, jouer les deux commandes ci-dessus.
- Une règle `html-validate` ne se désactive **jamais** sans ajouter sa
  justification dans `.htmlvalidate.md`.

## Pièges connus

- **Le site n'est pas une SPA.** `docker/nginx/default.conf` répond 404 sur une
  URL inconnue, délibérément. Ne pas réintroduire un `try_files ... /index.html`
  hérité de la première version : il ferait indexer l'accueil, en 200, sous
  chaque URL erronée.
- **Deux `<h2>` sont vides dans le source** (`#homeModalTitle`, `#modalTitle`) :
  ce sont les titres des modales, remplis par `site/assets/js/`. Ce n'est pas
  un défaut d'accessibilité, et la règle `empty-heading` est désactivée pour ça.
- **Les cartes de projets apparaissent par animation au défilement.** Une
  capture d'écran automatisée peut les montrer vides sans qu'il y ait de bug —
  vérifier `document.getElementById('projectsGrid').children.length` plutôt que
  de se fier à l'image.
- **Pas de Content-Security-Policy**, parce que les pages portent des scripts
  inline (configuration tarteaucitron). L'ajouter suppose de les externaliser
  ou de leur poser un `nonce` : c'est une modification du site, pas de nginx.
- **Le nom du routeur Traefik est écrit en clair** dans `compose.prod.yml` :
  Compose n'interpole pas les clés d'étiquette, seulement les valeurs. Ne pas
  tenter d'y mettre `${ENV}`.
- **`outils/deployer.sh` est une adaptation, pas une ressource.** Le script de
  référence de `.claude/scripts/` est écrit pour Symfony et joue une migration
  Doctrine. La variante statique de ce projet n'a jamais tourné sur un
  déploiement réel : ne pas la promouvoir en ressource avant (§22c).
- **Les valeurs Traefik de production ne se devinent pas.** `TRAEFIK_NETWORK`,
  `TRAEFIK_ENTRYPOINT` et `TRAEFIK_CERTRESOLVER` se constatent sur le serveur.
  Elles sont volontairement absentes du `.env` et écrites `${VAR:?}` : le stack
  doit échouer bruyamment plutôt que produire des labels ignorés en silence.

## Déploiement

`push` sur `main` → portes qualité → SSH vers le serveur, dont la forced
command lance `outils/deployer.sh prod`. Ce dernier job ne tourne que si la
variable de dépôt `DEPLOIEMENT_ACTIF` vaut `true` ; sinon il est ignoré, sans
faire échouer la CI. Rien de ce que la CI envoie n'influence
ce qui s'exécute là-bas. La CI ne construit ni ne pousse d'image. Procédure
complète et valeurs à constater : `README.docker.md`.

Les quatre secrets GitHub portent des noms normatifs, communs à tous les
dépôts : `DEPLOIEMENT_HOTE`, `DEPLOIEMENT_UTILISATEUR`,
`DEPLOIEMENT_CLE_PRIVEE`, `DEPLOIEMENT_KNOWN_HOSTS`.
