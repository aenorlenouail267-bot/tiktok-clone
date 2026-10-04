# TikTok Clone Premium - Version 2.0

## 🎯 Trois versions complètes

### 1️⃣ Web (React + Vite)
- Interface desktop TikTok 100% fidèle
- Design premium avec animations
- Feed vertical infini
- Profil complet
- Discover / Tendances
- Messages en temps réel
- Upload de vidéos

### 2️⃣ Mobile (React Native + Expo)
- Version native iPhone/Android
- Swipe vertical natif
- Notifications push
- Caméra intégrée
- Share sheet natif
- Performance optimisée

### 3️⃣ Backend (Node + Express + MongoDB)
- Authentification JWT
- Upload fichiers (multer)
- WebSocket temps réel
- Base de données MongoDB
- API RESTful complète
- Gestion utilisateurs multi-comptes

---

## 📦 Installation

### Prérequis
- Node.js v16+
- MongoDB local ou Atlas
- npm/yarn
- Expo CLI (pour mobile)

### Configuration

```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

### Backend

```bash
npm install
npm run dev
```

Le backend tourne sur `http://localhost:5000`

### Web

```bash
cd client
npm install
npm run dev -- --host 0.0.0.0
```

Ouvrir `http://localhost:5173`

### Mobile

```bash
cd mobile
npm install
npm run dev
```

Scanner le QR code avec Expo Go (iOS/Android)

### Tout à la fois

```bash
npm run dev-full
```

---

## 🏗️ Architecture

```
tiktok-clone-premium/
├── server/                    # Backend Node.js
│   ├── models/               # Schémas MongoDB
│   │   ├── User.js
│   │   ├── Video.js
│   │   ├── Comment.js
│   │   └── Message.js
│   ├── routes/               # Endpoints API
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── videos.js
│   │   ├── comments.js
│   │   └── messages.js
│   ├── controllers/          # Logique métier
│   ├── middleware/           # Auth, validation
│   ├── uploads/              # Stockage vidéos/images
│   └── index.js              # Entry point
├── client/                    # Web React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Feed.jsx
│   │   │   ├── VideoCard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── Messages.jsx
│   │   │   └── Upload.jsx
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── mobile/                    # React Native Expo
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── feed.js
│   │   │   ├── discover.js
│   │   │   ├── messages.js
│   │   │   └── profile.js
│   │   └── auth/
│   ├── components/
│   ├── services/
│   ├── app.json
│   └── package.json
├── .env.example
└── README.md
```

---

## 🔌 API Endpoints

### Authentification
- `POST /api/auth/register` - Créer compte
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/logout` - Se déconnecter
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Profil courant

### Utilisateurs
- `GET /api/users` - Tous les utilisateurs
- `GET /api/users/:id` - Profil utilisateur
- `PUT /api/users/:id` - Modifier profil
- `POST /api/users/:id/follow` - Suivre
- `POST /api/users/:id/unfollow` - Arrêter de suivre
- `GET /api/users/:id/followers` - Abonnés
- `GET /api/users/:id/following` - Abonnements

### Vidéos
- `GET /api/videos/feed` - Feed personnalisé
- `GET /api/videos/discover` - Découverte
- `GET /api/videos/:id` - Détails vidéo
- `POST /api/videos/upload` - Uploader vidéo
- `DELETE /api/videos/:id` - Supprimer vidéo
- `GET /api/videos/:id/comments` - Commentaires

### Interactions
- `POST /api/videos/:id/like` - Liker
- `POST /api/videos/:id/unlike` - Retirer like
- `POST /api/videos/:id/comment` - Commenter
- `DELETE /api/comments/:id` - Supprimer commentaire
- `POST /api/videos/:id/share` - Partager

### Messages
- `GET /api/messages` - Conversations
- `GET /api/messages/:conversationId` - Messages conversation
- `POST /api/messages/send` - Envoyer message
- `POST /api/messages/:id/read` - Marquer lu

### Tendances
- `GET /api/trending/hashtags` - Hashtags tendance
- `GET /api/trending/sounds` - Sons tendance
- `GET /api/trending/creators` - Créateurs en tendance

---

## 🎨 Design Premium TikTok

### Palette couleur
- **Primaire**: #000000 (noir)
- **Accent**: #ff2d55 (rose)
- **Secondary**: #25f4ee (cyan)
- **Background**: #07090f (ultra noir)

### Typographie
- **Font**: Inter, -apple-system, BlinkMacSystemFont
- **Weights**: 400, 500, 600, 700, 800

### Composants
- Bottom Tab Navigation (mobile)
- Swipe Cards (feed)
- Floating Action Buttons
- Sheet modals
- Segmented controls
- Avatar badges (verified)

---

## 🚀 Features

✅ **Authentification**
- Signup / Login
- JWT tokens
- Refresh tokens
- Logout

✅ **Profil utilisateur**
- Avatar, bio, verified badge
- Followers / Following
- Videos du profil
- Édition profil

✅ **Vidéos**
- Upload avec progress
- Compression automatique
- Thumbnail
- Durée maximale
- Suppression

✅ **Interactions**
- Like / Unlike
- Commentaires (+ replies)
- Partage
- Bookmarks
- Recherche

✅ **Feed**
- Scroll infini
- Personnalisé (following)
- For You (découverte)
- Pause/Play au scroll

✅ **Discover**
- Hashtags tendance
- Sons populaires
- Créateurs en tendance
- Recherche

✅ **Messaging**
- Conversations
- Messages temps réel (WebSocket)
- État (lu/non lu)
- Notifications

---

## 📱 Versions disponibles

### Web - Desktop/Tablet
- Sidebar navigation
- Feed large
- Profil détaillé
- Responsive design

### Mobile - iOS/Android
- Bottom tab navigation
- Swipe vertical natif
- Caméra intégrée
- Notifications push
- Full-screen video

---

## 🔐 Sécurité

- Passwords hashés (bcryptjs)
- JWT authentication
- CORS configuré
- Validation des inputs
- Limite de fichiers
- Rate limiting (à ajouter)

---

## 📊 Stack Tech

**Backend**
- Express.js 4
- MongoDB + Mongoose
- Socket.io (temps réel)
- Multer (upload)
- bcryptjs (passwords)
- JWT (auth)

**Web**
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS / CSS Modules
- Socket.io client

**Mobile**
- React Native
- Expo
- React Navigation
- Expo Camera
- AsyncStorage
- Notifications Expo

---

## 🎯 Roadmap

- [ ] Livechat
- [ ] Duets et Stitches
- [ ] Filters AR
- [ ] Music library
- [ ] Monetization
- [ ] Analytics créateur
- [ ] Safety features
- [ ] Reporting système

---

## 📝 Licence

MIT
