# TikTok Clone - Multi-User Platform

Une application TikTok complète et authentique avec support multi-utilisateurs, vidéos, interactions sociales et bien plus.

## 🎯 Fonctionnalités

### Authentification & Profil
- ✅ Inscription/Connexion sécurisée (JWT)
- ✅ Profil utilisateur personnalisé
- ✅ Follow/Unfollow
- ✅ Gestion du compte

### Contenu Vidéo
- ✅ Upload de vidéos (MP4, WebM, etc.)
- ✅ Feed vertical infini (scrolling)
- ✅ Lecture fluide avec contrôles
- ✅ Compression automatique

### Interactions Sociales
- ✅ Likes/Unlikes
- ✅ Commentaires en temps réel
- ✅ Partage de vidéos
- ✅ Notifications

### Découverte
- ✅ Fil d'actualité personnalisé
- ✅ Onglet Découverte
- ✅ Tendances
- ✅ Recherche d'utilisateurs/vidéos

## 📋 Architecture

```
tiktok-clone/
├── server/                 # Backend Node.js/Express
│   ├── models/            # Schémas MongoDB
│   ├── routes/            # Endpoints API
│   ├── controllers/        # Logique métier
│   ├── middleware/         # Auth, validation
│   └── index.js           # Entry point
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/        # Pages principales
│   │   ├── services/     # API calls
│   │   ├── styles/       # Styling
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js v14+
- MongoDB local ou cloud
- npm ou yarn

### Setup

1. **Cloner le repo**
```bash
git clone https://github.com/aenorlenouail267-bot/tiktok-clone.git
cd tiktok-clone
```

2. **Configuration**
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

3. **Installer dépendances backend**
```bash
npm install
```

4. **Installer dépendances frontend**
```bash
cd client
npm install
cd ..
```

5. **Lancer l'application**
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

Ou les deux ensemble :
```bash
npm run dev-full
```

## 📱 Endpoints API

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/logout` - Se déconnecter

### Utilisateurs
- `GET /api/users/:id` - Profil utilisateur
- `PUT /api/users/:id` - Mettre à jour profil
- `POST /api/users/:id/follow` - Suivre
- `POST /api/users/:id/unfollow` - Arrêter de suivre

### Vidéos
- `POST /api/videos/upload` - Uploader une vidéo
- `GET /api/videos/feed` - Fil d'actualité
- `GET /api/videos/:id` - Détails vidéo
- `DELETE /api/videos/:id` - Supprimer vidéo

### Interactions
- `POST /api/videos/:id/like` - Liker
- `POST /api/videos/:id/unlike` - Retirer like
- `POST /api/videos/:id/comment` - Commenter
- `GET /api/videos/:id/comments` - Lire commentaires

## 🎨 Technologies

**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (Upload)

**Frontend:**
- React 18
- Tailwind CSS
- Axios
- React Router
- Socket.io (temps réel)

## 📝 Licence

MIT
