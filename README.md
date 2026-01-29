# Article11

Application de **vote citoyen** : actualités, topics par catégorie, questions avec votes (Oui / Neutre / Non) et statistiques.

## Stack

- **Next.js 15** (App Router), **React 19**, **Tailwind CSS 4**
- **Prisma** + **PostgreSQL**
- **NextAuth** (optionnel), auth custom (login / register)

## Démarrage rapide

### 1. Prérequis

- Node.js 20+
- Docker et Docker Compose (pour la base)

### 2. Base de données

```bash
docker compose up -d
```

Puis appliquer le schéma :

```bash
npx prisma db push
```

Optionnel : remplir la base avec des données fictives (news, catégories, questions, utilisateurs, votes) :

```bash
npx prisma db seed
```

Comptes de test : `*@example.com` (ex. `lea.martin@example.com`) / `password123`

### 3. Variables d’environnement

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:example@localhost:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-change-in-production"
```

### 4. Lancer l’app

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Si `npm run dev` échoue avec `EPERM` sur le port 3000 :

```bash
npx next dev --turbopack --hostname 127.0.0.1
```

## Scripts

| Commande       | Description                |
|----------------|----------------------------|
| `npm run dev`  | Dev avec Turbopack         |
| `npm run build`| Build production           |
| `npm run start`| Démarrer en production     |
| `npm run lint` | Linter                     |
| `npm run typecheck` | Vérification TypeScript |
| `npx prisma studio` | Interface BDD          |

## Docker (production)

Build de l’image :

```bash
docker build -t article11 .
```

Lancer **DB + app** via Compose :

```bash
docker compose --profile app up -d
```

> Appliquer le schéma (`prisma db push`) avant le premier run (ex. via job init ou manuellement).

## Health check

- `GET /api/health` → 200 si l’app répond.
- `GET /api/health?db=1` → 200 si app + DB OK, 503 si DB injoignable.

## Voir aussi

- [TOPOS.md](./TOPOS.md) – topo détaillé du projet.
- [README.Docker.md](./README.Docker.md) – build et déploiement Docker.
