#!/usr/bin/env sh
# prerendre — réécrit dans site/*.html le contenu que le JavaScript génère
# (listes de projets, compétences, blocs de l'accueil), pour que les moteurs de
# recherche et les robots d'IA le lisent sans exécuter de script.
#
#   Usage : sh outils/prerendre.sh
#
# Les conteneurs concernés portent des marqueurs <!--prerender:ID--> ; le script
# charge chaque page dans jsdom, laisse le JavaScript du site s'exécuter, puis
# recopie le HTML obtenu entre les marqueurs. À rejouer après toute modification
# de site/assets/js/projets-data.js, personal-projects.js ou competences.js.
# Au chargement, le JavaScript réécrit les mêmes blocs : le pré-rendu n'est qu'un
# repli, jamais une seconde source de vérité.
#
# jsdom (version épinglée : l'API de chargement des ressources change d'une majeure à l'autre)
# est installé dans un dossier temporaire : le dépôt n'a ni package.json
# ni dépendance, et cela ne change pas.
set -eu

racine="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

(cd "$tmp" && npm install --silent --no-audit --no-fund jsdom@26.1.0 >/dev/null)
NODE_PATH="$tmp/node_modules" node "$racine/outils/prerendre.cjs"
