# TikTok Clone

Une application inspirée de TikTok, conçue pour montrer un design authentique et une architecture multi-utilisateurs.

## Fonctionnalités de démonstration

- Interface verticale inspirée de TikTok
- Feed avec plusieurs comptes
- Follower / following panel
- Discover / trending
- Inbox / messages
- Authentification simulée (login/register)
- Likes et commentaires via API backend

## Démarrage rapide

### 1) Installer les dépendances du backend

```bash
npm install
```

### 2) Démarrer le backend

```bash
npm run dev
```

### 3) Démarrer le frontend

```bash
cd client
npm install
npm run dev -- --host 0.0.0.0
```

### 4) Ouvrir l'application

```bash
http://localhost:5173
```

## API disponible

- `GET /api/health`
- `GET /api/users`
- `GET /api/feed`
- `GET /api/discover`
- `GET /api/messages`
- `GET /api/profile/:username`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/videos/:id/like`
- `POST /api/videos/:id/comment`

## Stack

- Express.js
- Vite + React
- CSS custom, design TikTok-like

## Note

Cette version est une démonstration fonctionnelle avec données locales pour simuler un clone TikTok multi-utilisateurs.
