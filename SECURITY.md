# Politique de sécurité

## Signaler une faille

Ce dépôt héberge un site vitrine statique : pas de base de données, pas
d'authentification, pas de données personnelles collectées en dehors du choix
de consentement aux cookies, qui reste dans le navigateur du visiteur.

La surface d'attaque est donc réduite, mais elle n'est pas nulle. Si vous
constatez quelque chose :

- **Ne pas ouvrir d'issue publique** pour une faille exploitable.
- Écrire à **contact@mmagny.fr**, en décrivant ce que vous avez observé et
  comment le reproduire.

Réponse sous quelques jours. Ce dépôt est maintenu par une seule personne, en
dehors de son temps de travail : merci d'en tenir compte dans vos attentes de
délai.

## Ce qui est dans le périmètre

- Le contenu servi par nginx (`site/`) et sa configuration (`docker/nginx/`).
- Les workflows d'intégration continue (`.github/workflows/`).
- Les scripts de déploiement (`outils/`).

## Ce qui n'y est pas

- **tarteaucitron.js** (`site/tarteaucitron/`), vendu dans le dépôt :
  signaler directement à <https://github.com/AmauriC/tarteaucitron.js>.
- Les dépendances chargées par CDN (Tailwind, Font Awesome, Google Fonts) :
  elles relèvent de leurs éditeurs respectifs.
- L'infrastructure d'hébergement, qui n'est pas décrite ici.

## Versions supportées

Seule la version en ligne sur <https://mmagny.fr> est maintenue. Il n'y a pas
de branche de maintenance pour les versions antérieures.
