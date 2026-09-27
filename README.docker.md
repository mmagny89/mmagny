# mmagny.fr — infrastructure Docker

Généré le 2026-09-10. Versions vérifiées le 2026-09-10 auprès de Docker Hub
(`library/nginx`).

Site **statique** (HTML, CSS, JS — aucun langage serveur, aucune base de
données), servi par nginx. Le contenu vit dans `site/` ; la racine ne porte que
de l'infrastructure.

## Inventaire des fichiers

| Fichier | Rôle |
|---|---|
| `.env` | Variables Docker Compose. Source de vérité des versions et des ports. Committé, sans secret. |
| `.env.prod.local.dist` | Modèle des variables de production. Committé, secrets vides. |
| `.env.prod.local` | Valeurs réelles de production. **Vit sur le serveur, jamais committé.** |
| `compose.yml` | Socle : ni port, ni bind mount, ni `target`. |
| `compose.dev.yml` | Développement : port publié, `site/` monté en lecture seule. |
| `compose.prod.yml` | Production : image figée, labels Traefik, aucun port publié. |
| `docker/nginx/Dockerfile` | Image multi-stage `base` → `dev` / `prod`. |
| `docker/nginx/default.conf` | Configuration du serveur : routage, cache, en-têtes de sécurité, `/healthz`. |
| `docker/nginx/docker-healthcheck.sh` | Sonde de santé, embarquée dans toutes les images. |
| `outils/deployer.sh` | Script de déploiement, exécuté **sur le serveur** par une forced command. |
| `outils/installer-deploiement.sh` | Pose les accès de déploiement, une fois par serveur puis par projet. |
| `outils/renseigner-secrets.sh` | Renseigne les quatre secrets GitHub du dépôt. |
| `outils/diagnostic-traefik.sh` | Relève la configuration du proxy en place, plutôt que la supposer. |
| `outils/extraire-changelog.sh` | Isole la section d'une version du CHANGELOG, pour une release. |
| `.github/workflows/qualite.yml` | Portes qualité et déploiement. |
| `.github/scripts/check-links.sh` | Porte « liens internes ». Utilisable aussi en local. |
| `.htmlvalidate.json` / `.htmlvalidate.md` | Configuration de la porte HTML et justification des règles désactivées. |
| `.dockerignore` / `.gitignore` | Exclusions de contexte de build et de dépôt. |
| `CLAUDE.md` | Mémoire projet pour Claude Code. |
| `docs/` | Documentation métier — **conditionnel**, n'existe que si le projet en porte. |
| `site/` | Le site lui-même. Seul dossier de contenu. |

## Nommage

| Élément | Valeur |
|---|---|
| Nom de projet Compose | `mmagny-<env>` |
| Clé de service | `web` |
| `container_name` | `mmagny-<env>-web` |
| Réseau projet | `mmagny-<env>` |
| Images | `mmagny-nginx:dev`, `mmagny-nginx:prod` |
| Stages du Dockerfile | `base`, `dev`, `prod` |

**Toute commande utilise la clé de service, jamais le `container_name`** :
`docker compose exec web ...`, jamais `docker compose exec mmagny-web ...`.

## Développement

Le `.env` chaîne `COMPOSE_FILE=compose.yml:compose.dev.yml` : un `up` nu suffit.

```sh
docker compose up -d --wait     # attend l'état healthy, échoue sinon
docker compose logs -f web
docker compose down --remove-orphans --volumes
```

Le site est ensuite sur <http://localhost:80>. `site/` est monté en lecture
seule : toute modification d'un fichier est visible au rechargement, sans
rebuild. Un rebuild n'est nécessaire que si `docker/nginx/` change.

### Ports

| Variable | Valeur | Publié en |
|---|---|---|
| `HTTP_PORT` | `80` | développement uniquement |

Les ports sont **fixes** et ne se déduisent jamais de l'état de la machine : une
valeur choisie d'après les projets voisins change d'un poste à l'autre. Deux
projets ne peuvent donc pas occuper le port 80 simultanément, et c'est voulu.

**Procédure de décalage** — décision humaine, jamais une déduction : modifier
`HTTP_PORT` dans le `.env` du projet à décaler, puis `docker compose up -d`.

En production aucun port n'est publié : Traefik joint le conteneur par le
réseau Docker.

## Routage servi par nginx

| URL | Réponse |
|---|---|
| `/` | `site/index.html` |
| `/projets` | `site/projets.html` — l'extension est optionnelle |
| `/healthz` | `200 ok`, point de sonde du healthcheck |
| URL inconnue | **404** |

Le site n'est pas une SPA : une URL inconnue répond 404 et ne retombe **pas**
sur `index.html`. Un fallback SPA ferait indexer l'accueil sous chaque URL
erronée, avec un code 200.

## Déploiement

Le serveur est **partagé** et porte un **Traefik déjà en place**. La CI ne
construit ni ne pousse d'image : elle appelle par SSH un script qui vit sur le
serveur, lequel reconstruit et redémarre le stack.

### 1. Relever la configuration du proxy

Les valeurs de Traefik se constatent, elles ne se supposent pas. Un outil s'en
charge, à jouer sur le serveur :

```sh
sh outils/diagnostic-traefik.sh
```

Il donne les noms réels de l'entrypoint, du certresolver et du réseau, à
reporter dans `.env.prod.local`.

### 2. Préparer le serveur

Le clone doit porter le nom de l'environnement, car `deployer.sh` en déduit le
projet depuis son propre emplacement :

```sh
sudo git clone https://github.com/mmagny89/mmagny.git /docker/mmagny-prod
cd /docker/mmagny-prod
cp .env.prod.local.dist .env.prod.local
$EDITOR .env.prod.local
```

### 3. Poser les accès de déploiement

Une fois par machine, puis une fois par projet, depuis le clone correctement
nommé :

```sh
sh outils/installer-deploiement.sh serveur
sh outils/installer-deploiement.sh projet prod
```

Le script génère la clé, l'inscrit dans `authorized_keys` derrière une *forced
command* qui fige `outils/deployer.sh prod`, et affiche la clé privée à
recopier dans les secrets GitHub. La clé ne peut rien lancer d'autre : ce que
la CI envoie n'a aucune influence sur ce qui s'exécute.

### 4. Secrets GitHub

`Settings > Secrets and variables > Actions` :

Ces quatre noms sont normatifs et identiques dans tous les dépôts : le préfixe
dit le rôle, pas la machine.

| Secret | Contenu |
|---|---|
| `DEPLOIEMENT_HOTE` | Adresse du serveur, **exactement** celle utilisée pour se connecter |
| `DEPLOIEMENT_UTILISATEUR` | Utilisateur de déploiement |
| `DEPLOIEMENT_CLE_PRIVEE` | Clé privée correspondant à la clé publique posée à l'étape 3 |
| `DEPLOIEMENT_KNOWN_HOSTS` | Sortie de `ssh-keyscan <adresse>` |

`outils/renseigner-secrets.sh` les pose sans passer par l'interface web.

`known_hosts` est indexé par l'adresse **exacte** de connexion : une IP et un
nom de domaine y sont deux entrées distinctes. Un `Host key verification
failed` vient presque toujours de là.

### 5. Déclenchement

Un `push` sur `main` qui passe les trois portes déclenche le déploiement.
Jamais depuis une pull request. Deux déploiements simultanés s'attendent, ils
ne se coupent pas.

Déploiement manuel depuis le serveur, à jouer **avant** le premier
déclenchement automatique : enchaîner les deux mêlerait deux sources d'échec,
le stack et le dispositif SSH.

```sh
sh outils/deployer.sh prod
```

Il vérifie la branche, refuse toute fusion, construit, attend l'état `healthy`,
puis **contrôle que le site répond depuis l'extérieur** : un conteneur sain
derrière un proxy mal configuré reste invisible sans ce dernier point.

## Portes qualité

| Porte | Ce qu'elle vérifie |
|---|---|
| `balisage` | `html-validate` sur `site/**/*.html`. Règles désactivées justifiées dans `.htmlvalidate.md`. |
| `liens` | Chaque `href`/`src` local pointe sur un fichier existant. Aucun appel réseau. |
| `image` | L'image `prod` se construit, démarre, répond sur `/`, `/healthz`, et **404** sur une URL inconnue. |

Les trois se rejouent en local :

```sh
npx --yes html-validate@9 "site/**/*.html"
./.github/scripts/check-links.sh site
docker compose --env-file .env.prod.local.dist -f compose.yml -f compose.prod.yml build
```

## Reste à faire

- **Content-Security-Policy** : absente. Les pages portent des scripts inline
  (configuration tarteaucitron) qu'une CSP stricte bloquerait silencieusement.
  L'ajouter demande de sortir ces scripts dans un fichier ou de leur poser un
  `nonce`, donc une modification du site, pas seulement de nginx.
- **Sous-resource integrity** des CDN tiers (polices, Font Awesome) :
  la règle `require-sri` est désactivée dans `.htmlvalidate.json`.
- **`docs/`** n'existe pas : le projet ne porte pour l'instant aucune règle
  métier qui ne tienne pas dans `CLAUDE.md`.
