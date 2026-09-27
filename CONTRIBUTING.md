# Contribuer

Ce dépôt est un site vitrine personnel. Il n'attend donc pas de contributions
de fonctionnalités : son contenu est un parcours professionnel, et lui seul
peut dire ce qu'il doit contenir.

Restent trois choses utiles, et elles sont bienvenues.

## Signaler un défaut

Une faute, un lien mort, un affichage cassé sur un appareil que je n'ai pas
testé : ouvrez une issue en disant **ce que vous avez vu**, **où**, et **avec
quel navigateur**. Une capture vaut mieux qu'une description.

Pour une faille de sécurité, ne pas passer par une issue : voir
[SECURITY.md](SECURITY.md).

## Réutiliser le code

Le code est sous licence MIT, le contenu ne l'est pas : voir
[LICENSE](LICENSE). Concrètement, la configuration Docker, nginx et
l'intégration continue sont reprenables ; les textes, le CV et les projets ne
le sont pas.

Aucune attribution n'est demandée pour le code, mais elle fait toujours
plaisir.

## Proposer un changement

Si vous ouvrez tout de même une demande de fusion :

1. Les deux portes qualité doivent passer en local avant de pousser :

   ```sh
   npx --yes html-validate@9 "site/**/*.html"
   ./.github/scripts/check-links.sh site
   ```

2. Les messages de commit suivent
   [Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/) :
   `type(portée): description`, description récapitulative, sans point final.

3. Une règle `html-validate` ne se désactive jamais sans justification écrite
   dans [.htmlvalidate.md](.htmlvalidate.md).

Le détail du fonctionnement local est dans [README.md](README.md), celui de
l'infrastructure dans [README.docker.md](README.docker.md).
