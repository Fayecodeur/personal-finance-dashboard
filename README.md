# FinTrack — Gestion financière personnelle

Application web full-stack permettant de suivre ses revenus, ses dépenses, son solde et d'analyser ses habitudes financières grâce à un tableau de bord.

Projet universitaire de Master 1 — Développement Web avec Angular.

## Fonctionnalités

- Authentification sécurisée (inscription, connexion, JWT)
- Tableau de bord : solde, revenus, dépenses, graphiques (répartition par catégorie, évolution mensuelle)
- Gestion des transactions (CRUD, recherche, tri, pagination)
- Gestion des catégories (CRUD, recherche, pagination)
- Profil utilisateur (modification des informations, changement de mot de passe)
- Mode sombre persistant
- Interface responsive

## Technologies

**Frontend**

- Angular 21 (Standalone Components, Signals, Reactive Forms)
- Angular Material
- Chart.js (ng2-charts)
- TypeScript, SCSS

**Backend**

- Node.js / Express.js
- TypeScript
- MongoDB (Mongoose) — hébergé sur MongoDB Atlas
- JWT (authentification)
- bcrypt (hachage des mots de passe)

## Architecture

personal-finance-dashboard/
├── frontend/ # Application Angular
│ └── src/app/
│ ├── core/ # Services, guards, interceptors
│ ├── shared/ # Modèles partagés
│ ├── layout/ # Header, sidebar, layout principal
│ └── features/ # Auth, dashboard, transactions, catégories, profil
│
└── backend/ # API Node.js / Express
└── src/
├── config/ # Connexion base de données
├── controllers/ # Logique métier
├── routes/ # Définition des routes API
├── models/ # Schémas Mongoose
└── middlewares/ # Authentification JWT

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- Un compte MongoDB Atlas (ou une instance MongoDB locale)

### Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine de `backend/` :
PORT=5000
MONGO_URI=votre_chaine_de_connexion_mongodb
JWT_SECRET=votre_secret_jwt

Lancer le serveur :

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
ng serve
```

L'application est accessible sur `http://localhost:4200`.

## API — Endpoints principaux

| Méthode             | Route                        | Description                     |
| ------------------- | ---------------------------- | ------------------------------- |
| POST                | `/api/auth/register`         | Inscription                     |
| POST                | `/api/auth/login`            | Connexion                       |
| GET                 | `/api/users/profile`         | Récupérer le profil             |
| PUT                 | `/api/users/profile`         | Modifier le profil              |
| PUT                 | `/api/users/change-password` | Changer le mot de passe         |
| GET/POST/PUT/DELETE | `/api/transactions`          | CRUD transactions               |
| GET/POST/PUT/DELETE | `/api/categories`            | CRUD catégories                 |
| GET                 | `/api/dashboard/stats`       | Statistiques du tableau de bord |

Toutes les routes (sauf `/auth`) nécessitent un token JWT dans le header `Authorization: Bearer <token>`.

## Auteur

Demba — Projet réalisé dans le cadre du cours Web Services, Master 1.
