#!/usr/bin/env sh
# generer-cv — produit site/assets/cv/mylene-magny-cv.pdf depuis outils/cv/cv.html.
#
#   Usage : sh outils/generer-cv.sh
#
# La source du CV est un fichier HTML versionné, à la charte du site (mêmes
# couleurs, mêmes polices, même logo). Chrome en mode headless l'imprime en
# PDF balisé, liens cliquables compris. Les polices viennent de Google Fonts au
# moment de l'impression : une connexion est nécessaire, le PDF les embarque.
#
# Le CV porte un numéro de téléphone et une adresse personnelle : il n'est donc
# jamais copié dans site/ sous forme de HTML, seul le PDF y est publié.
set -eu

racine="$(cd "$(dirname "$0")/.." && pwd)"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
[ -x "$chrome" ] || { echo "generer-cv: Chrome introuvable ($chrome), voir la variable CHROME" >&2; exit 2; }

sortie="$racine/site/assets/cv/mylene-magny-cv.pdf"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir="$tmp/profil" --virtual-time-budget=20000 \
  --print-to-pdf="$tmp/cv.pdf" "file://$racine/outils/cv/cv.html" >"$tmp/chrome.log" 2>&1 \
  || { tail -n 20 "$tmp/chrome.log" >&2; exit 1; }

[ -s "$tmp/cv.pdf" ] || { echo "generer-cv: PDF vide" >&2; exit 1; }
cp "$tmp/cv.pdf" "$sortie"
echo "generer-cv: $sortie ($(wc -c <"$sortie" | tr -d ' ') octets)"
