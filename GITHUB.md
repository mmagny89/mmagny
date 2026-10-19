# Configuration GitHub — mmagny

Tout ce qui se règle **dans l'interface GitHub** pour que ce dépôt construise et
déploie. À faire une fois, dans cet ordre. Le reste de la mise en service —
clone, secrets du serveur, Traefik — est dans `README.docker.md`.

Ce site n'a **qu'un environnement** : la production, depuis `main`. Il n'y a ni
`develop`, ni pré-production, ni secrets `STAGING_*` : ce que le gabarit commun
des autres projets prévoit pour eux n'a pas lieu d'être ici.

Les cases à cocher de la fin résument les étapes.

## 1. La branche

Une seule branche longue, `main`, que le workflow reconnaît par son nom.

Le travail se fait sur des branches `feat/*` ou `fix/*`, fusionnées dans `main`
par pull request. Pousser directement sur `main` déploie en production sans
relecture — si la variable de la section 3 est posée.

## 2. Accès du serveur au dépôt

Le dépôt est **public** : un `git clone` depuis le serveur n'a besoin d'aucune
clé. Si le dépôt devenait privé, il faudrait une *deploy key* en lecture seule
(Settings → Deploy keys, « Allow write access » **décoché**) ou le compte machine
des autres projets.

## 3. Secrets et variable du déploiement

```sh
sh outils/installer-deploiement.sh projet prod       # sur le serveur, depuis le clone de prod
```

Le script affiche exactement ce qu'il faut coller. **Settings → Secrets and
variables → Actions**, onglet **Secrets** :

| Secret | Contenu |
|---|---|
| `DEPLOIEMENT_HOTE` | adresse SSH du serveur, **exactement** celle de connexion |
| `DEPLOIEMENT_UTILISATEUR` | utilisateur de déploiement |
| `DEPLOIEMENT_CLE_PRIVEE` | clé privée dont la publique est dans `authorized_keys` |
| `DEPLOIEMENT_KNOWN_HOSTS` | empreinte du serveur, épinglée |

`outils/renseigner-secrets.sh` les pose sans passer par l'interface web.

Puis l'onglet **Variables** — c'est l'**interrupteur** :

| Variable | Valeur | Effet |
|---|---|---|
| `DEPLOIEMENT_PROD` | `oui` | un push sur `main` déploie la production |

Tant qu'elle est absente ou différente de `oui`, le job `Déploiement production`
est **ignoré** : le dépôt valide et construit, il ne livre rien. La poser **en
dernier**, une fois le déploiement manuel (`sh outils/deployer.sh prod`, sur le
serveur) réussi.

> L'ancien interrupteur `DEPLOIEMENT_ACTIF` (valeur `true`) n'est plus lu. S'il
> existe encore, le supprimer après avoir posé `DEPLOIEMENT_PROD`.

## 4. L'environnement `production`

Le job de déploiement référence l'environnement `production`. **Settings →
Environments → New environment**, nom exact `production` : sans lui, GitHub en
crée un vide à la première exécution.

Le dépôt étant public, les protections d'environnement sont disponibles. Option
recommandée : cocher **Required reviewers** et vous désigner — chaque déploiement
attend alors votre clic « Approve », ce qui évite qu'une fusion distraite parte
en ligne.

## 5. Réglages Actions

**Settings → Actions → General** :

| Réglage | Valeur | Pourquoi |
|---|---|---|
| Fork pull request workflows from outside collaborators | **Require approval for all external contributors** | dépôt public : sans cela, la PR d'un inconnu exécute du code dans votre CI |
| Workflow permissions | **Read repository contents and packages permissions** | le workflow déclare déjà `contents: read` ; ce réglage le garantit aussi pour tout futur workflow |
| Allow GitHub Actions to create and approve pull requests | **décoché** | une approbation automatique viderait de son sens la relecture |

Le déploiement, lui, ne passe pas par le `GITHUB_TOKEN` : il sort en SSH avec une
clé restreinte à un seul script.

## 6. Protection de `main`

Ce workflow n'a **pas** de job agrégateur : les trois portes sont des contrôles
distincts, à exiger chacun par son nom.

**Settings → Rules → Rulesets → New branch ruleset**, cible `main` :

- Require a pull request before merging ;
- Require status checks to pass → **`Validation HTML`**, **`Liens internes`**,
  **`Build image prod`** (ils n'apparaissent dans la liste qu'après une première
  exécution du workflow) ;
- Block force pushes.

Le dépôt étant public, les rulesets sont disponibles sur l'offre gratuite.
Renommer une porte oblige à revoir cette règle : c'est le prix de l'absence
d'agrégateur.

## 7. Sécurité du dépôt

**Settings → Advanced Security** (ou **Code security**) :

| Réglage | Dépôt public, offre gratuite |
|---|---|
| Dependabot alerts | à activer |
| Dependabot security updates | à activer |
| Secret scanning + push protection | **disponible, à activer** |
| Private vulnerability reporting | optionnel — `SECURITY.md` passe aujourd'hui par l'adresse `contact@mmagny.fr` ; l'activer demande d'ajouter ce canal à `SECURITY.md` |

`.github/dependabot.yml` est déjà en place pour les mises à jour de version.

Ce que GitHub ne doit **jamais** voir : les valeurs applicatives (`SITE_DOMAIN`,
valeurs Traefik). Elles vivent dans `.env.prod.local`, **sur le serveur**, hors
du dépôt.

## 8. À vérifier, dans cet ordre

1. **Onglet Actions** : les trois portes tournent et passent.
2. **`Déploiement production`** : ignoré si `DEPLOIEMENT_PROD` manque, exécuté
   sinon. S'il échoue sur « Secrets absents », la section 3 est incomplète.
3. Depuis l'extérieur, et pas depuis le conteneur :

   ```sh
   curl -sI https://<domaine>/ | head -3
   ```

## Récapitulatif

- [ ] `main` poussée, branche par défaut
- [ ] quatre secrets de déploiement
- [ ] `DEPLOIEMENT_PROD` posée à `oui` — ou laissée absente sciemment
- [ ] `DEPLOIEMENT_ACTIF` supprimée si elle existe
- [ ] environnement `production`, avec relecteur requis si souhaité
- [ ] PR de forks : approbation requise
- [ ] `GITHUB_TOKEN` en lecture seule
- [ ] ruleset sur `main` : `Validation HTML`, `Liens internes`, `Build image prod`
- [ ] Dependabot (alertes et mises à jour de sécurité) et secret scanning avec push protection activés
- [ ] le site répond depuis l'extérieur
