#!/usr/bin/env bash
# Script de déploiement — À INSTALLER SUR LE SERVEUR, pas exécuté depuis la CI.
#
# Il vit sur l'hôte et non dans le workflow (stack-conventions.md, §22) : les
# chemins et les secrets restent sur le serveur, et la clé confiée à GitHub est
# restreinte à ce seul script par forced command dans `authorized_keys` — elle
# ne peut donc rien lancer d'autre.
#
# Installation (voir README.docker.md, section « Déploiement ») :
#   sudo install -m 0755 docker/deploy-mmagny.sh /usr/local/bin/deploy-mmagny
#
# Appelé par la CI ainsi :  deploy-mmagny <sha>
set -euo pipefail

PROJET_DIR="${MMAGNY_DIR:-/srv/mmagny}"
BRANCHE="main"

# Avec une forced command, l'argument réel arrive dans SSH_ORIGINAL_COMMAND.
sha="${1:-}"
if [ -z "$sha" ] && [ -n "${SSH_ORIGINAL_COMMAND:-}" ]; then
  # shellcheck disable=SC2086
  set -- $SSH_ORIGINAL_COMMAND
  sha="${2:-}"
fi

cd "$PROJET_DIR"

echo "==> Récupération de $BRANCHE"
git fetch --prune origin "$BRANCHE"

if [ -n "$sha" ]; then
  echo "==> Bascule sur $sha"
  git checkout --detach "$sha"
else
  git checkout "$BRANCHE"
  git reset --hard "origin/$BRANCHE"
fi

# `--env-file` REMPLACE le `.env` racine (§3) : ce fichier porte toutes les
# clés. Il n'est pas dans le dépôt et se renseigne une fois, ici.
if [ ! -f .env.prod.local ]; then
  echo "Absent : $PROJET_DIR/.env.prod.local" >&2
  echo "Le créer à partir de .env.prod.local.dist et le renseigner." >&2
  exit 1
fi

compose() {
  docker compose --env-file .env.prod.local \
    -f compose.yml -f compose.prod.yml "$@"
}

echo "==> Construction de l'image de production"
compose build

# `--wait` bloque jusqu'à l'état healthy : si le conteneur ne devient jamais
# sain, la commande échoue et le déploiement remonte en rouge dans la CI.
echo "==> Démarrage"
compose up -d --wait

echo "==> Nettoyage des images orphelines"
docker image prune -f >/dev/null

echo "==> Déployé : $(git rev-parse --short HEAD)"
