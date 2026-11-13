#!/usr/bin/env bash
# ci-local — rejoue en local les portes de .github/workflows/qualite.yml (hook pre-push).
#
# Mêmes portes que la CI, dans le même ordre : validation HTML, liens internes, cohérence du
# compose de développement (staging et prod exigent des variables Traefik propres au serveur). La construction de l'image de production reste à la CI (étape lente).
# Une porte ajoutée au workflow s'ajoute ici avec la même commande.
# Contournement exceptionnel, à justifier : SKIP_CHECKS=1 git push
set -euo pipefail
cd "$(dirname "$0")/.."
porte() { printf '\n== %s\n' "$1"; }

porte "Cohérence du dépôt"
for f in outils/*.sh .github/scripts/*.sh; do [ -f "$f" ] && bash -n "$f"; done
if command -v docker > /dev/null 2>&1; then
	docker compose --env-file .env config -q
else
	echo "⊘ docker absent : validation des fichiers compose ignorée."
fi

porte "Validation HTML"
# Même version que le workflow (html-validate@9). Node n'est pas requis sur l'hôte : Docker suffit.
if command -v npx > /dev/null 2>&1; then
	npx --yes html-validate@9 "site/**/*.html"
elif command -v docker > /dev/null 2>&1; then
	docker run --rm -v "$PWD:/w" -w /w node:26-slim npx --yes html-validate@9 "site/**/*.html"
else
	echo "ci-local : ni npx ni docker, validation HTML impossible." >&2
	exit 1
fi

porte "Liens internes"
./.github/scripts/check-links.sh site

echo; echo "Toutes les portes locales passent."
