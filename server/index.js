const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const videosRoutes = require('./routes/videos');
const commentsRoutes = require('./routes/comments');
const messagesRoutes = require('./routes/messages');
const trendingRoutes = require('./routes/trending');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [process.env.CLIENT_URL_WEB, process.env.CLIENT_URL_MOBILE],
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL_WEB, process.env.CLIENT_URL_MOBILE],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Mock Users Database
const users = [
  {
    id: '1',
    username: 'nina_harper',
    fullName: 'Nina Harper',
    email: 'nina@tiktok.com',
    password: 'demo123',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    banner: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    followers: 1240000,
    following: 320,
    bio: '💃 Dance • Travel • Vibes • Créatrice de contenu',
    verified: true,
    accent: '#ff2d55',
    website: 'www.nina-harper.com',
    location: 'Paris, France'
  },
  {
    id: '2',
    username: 'leo_martin',
    fullName: 'Leo Martin',
    email: 'leo@tiktok.com',
    password: 'demo123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    banner: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    followers: 890000,
    following: 210,
    bio: '🎬 Cinematic edits • Street style • Tech',
    verified: false,
    accent: '#00f2ea',
    website: 'www.leo-films.com',
    location: 'Lyon, France'
  },
  {
    id: '3',
    username: 'sami_rahman',
    fullName: 'Sami Rahman',
    email: 'sami@tiktok.com',
    password: 'demo123',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    followers: 2300000,
    following: 540,
    bio: '💻 Tech Creator • Coding • Innovation',
    verified: true,
    accent: '#ffd166',
    website: 'www.sami-tech.com',
    location: 'Marseille, France'
  },
  {
    id: '4',
    username: 'zoe_chen',
    fullName: 'Zoe Chen',
    email: 'zoe@tiktok.com',
    password: 'demo123',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
    banner: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    followers: 430000,
    following: 108,
    bio: '✨ Beauty • Lifestyle • Everyday moments',
    verified: false,
    accent: '#9b5de5',
    website: 'www.zoe-beauty.com',
    location: 'Bordeaux, France'
  },
  {
    id: '5',
    username: 'alex_kyd',
    fullName: 'Alex Kyd',
    email: 'alex@tiktok.com',
    password: 'demo123',
    avatar: 'https://images.unsplash.com/photo-1492288991996-827ce089dd14?auto=format&fit=crop&w=400&q=80',
    banner: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80',
    followers: 654000,
    following: 289,
    bio: '🎮 Gaming • Esports • Entertainment',
    verified: false,
    accent: '#ff006e',
    website: 'www.alexkyd.com',
    location: 'Toulouse, France'
  }
];

// Mock Videos Database
const videos = [
  {
    id: '1',
    userId: '1',
    username: 'nina_harper',
    fullName: 'Nina Harper',
    avatar: users[0].avatar,
    title: 'Late night dance in the city',
    caption: 'Late-night dance in the city 🌆 #dance #night #foryoupage #viral',
    song: 'Sunset Vibes - Nina',
    likes: 430000,
    comments: 12400,
    shares: 3820,
    bookmarks: 2100,
    views: 12000000,
    liked: true,
    bookmarked: true,
    duration: '0:28',
    videoUrl: 'https://player.vimeo.com/external/449887584.sd.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date(Date.now() - 86400000),
    soundId: 'sound_1',
    hashtags: ['#dance', '#night', '#foryoupage', '#viral', '#tiktok'],
    verified: true
  },
  {
    id: '2',
    userId: '2',
    username: 'leo_martin',
    fullName: 'Leo Martin',
    avatar: users[1].avatar,
    title: 'Cinematic edit before the rain',
    caption: 'A quick cinematic edit before the rain starts 🌧️ #filmmaking #cinema #edit',
    song: 'Street Movement',
    likes: 510000,
    comments: 9800,
    shares: 2850,
    bookmarks: 1850,
    views: 9800000,
    liked: false,
    bookmarked: false,
    duration: '0:36',
    videoUrl: 'https://player.vimeo.com/external/449887821.sd.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date(Date.now() - 172800000),
    soundId: 'sound_2',
    hashtags: ['#filmmaking', '#cinema', '#edit', '#cinematic'],
    verified: false
  },
  {
    id: '3',
    userId: '3',
    username: 'sami_rahman',
    fullName: 'Sami Rahman',
    avatar: users[2].avatar,
    title: 'My desk setup + focused workflow',
    caption: 'My desk setup + focused workflow ⚙️ #productivity #coding #setup',
    song: 'Creator mode',
    likes: 760000,
    comments: 22400,
    shares: 4300,
    bookmarks: 3200,
    views: 21000000,
    liked: false,
    bookmarked: false,
    duration: '0:33',
    videoUrl: 'https://player.vimeo.com/external/449888199.sd.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date(Date.now() - 259200000),
    soundId: 'sound_3',
    hashtags: ['#productivity', '#coding', '#setup', '#tech'],
    verified: true
  },
  {
    id: '4',
    userId: '4',
    username: 'zoe_chen',
    fullName: 'Zoe Chen',
    avatar: users[3].avatar,
    title: 'Getting ready for a sunny day',
    caption: 'Getting ready for a sunny day ✨ #beauty #getready #makeup #lifestyle',
    song: 'Glow Up',
    likes: 290000,
    comments: 6300,
    shares: 1200,
    bookmarks: 890,
    views: 5400000,
    liked: true,
    bookmarked: true,
    duration: '0:29',
    videoUrl: 'https://player.vimeo.com/external/449887617.sd.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date(Date.now() - 345600000),
    soundId: 'sound_4',
    hashtags: ['#beauty', '#getready', '#makeup', '#lifestyle'],
    verified: false
  },
  {
    id: '5',
    userId: '5',
    username: 'alex_kyd',
    fullName: 'Alex Kyd',
    avatar: users[4].avatar,
    title: 'Gaming stream highlights',
    caption: 'Best moments from today stream 🎮 #gaming #twitch #esports #highlights',
    song: 'Game Over',
    likes: 380000,
    comments: 8900,
    shares: 2100,
    bookmarks: 1450,
    views: 7600000,
    liked: false,
    bookmarked: false,
    duration: '0:45',
    videoUrl: 'https://player.vimeo.com/external/449888400.sd.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1492288991996-827ce089dd14?auto=format&fit=crop&w=900&q=80',
    createdAt: new Date(Date.now() - 432000000),
    soundId: 'sound_5',
    hashtags: ['#gaming', '#twitch', '#esports', '#highlights'],
    verified: false
  }
];

// Mock Messages Database
const messages = [
  { id: 1, from: 'sami_rahman', to: 'nina_harper', text: 'Tu as vu la dernière vidéo ?', timestamp: new Date(Date.now() - 300000), read: false },
  { id: 2, from: 'leo_martin', to: 'nina_harper', text: 'Je peux te partager un cut ?', timestamp: new Date(Date.now() - 720000), read: true },
  { id: 3, from: 'zoe_chen', to: 'nina_harper', text: 'On va faire une collab ?', timestamp: new Date(Date.now() - 3600000), read: true }
];

// Mock Trending
const trending = {
  hashtags: [
    { id: 1, title: '#dancechallenge', posts: 9820000, color: '#ff2d55' },
    { id: 2, title: '#cityvibes', posts: 5404000, color: '#00f2ea' },
    { id: 3, title: '#creatorlife', posts: 3302000, color: '#9b5de5' },
    { id: 4, title: '#travel', posts: 6800000, color: '#ffd166' },
    { id: 5, title: '#beauty', posts: 2401000, color: '#ff006e' },
    { id: 6, title: '#gaming', posts: 7200000, color: '#00d9ff' },
    { id: 7, title: '#foryoupage', posts: 12400000, color: '#ff2d55' },
    { id: 8, title: '#viral', posts: 8900000, color: '#00f2ea' }
  ],
  sounds: [
    { id: 'sound_1', title: 'Sunset Vibes', artist: 'Nina', uses: 430000 },
    { id: 'sound_2', title: 'Street Movement', artist: 'Leo', uses: 510000 },
    { id: 'sound_3', title: 'Creator mode', artist: 'Sami', uses: 760000 }
  ],
  creators: [
    { id: '1', username: 'nina_harper', fullName: 'Nina Harper', followers: 1240000 },
    { id: '3', username: 'sami_rahman', fullName: 'Sami Rahman', followers: 2300000 },
    { id: '5', username: 'alex_kyd', fullName: 'Alex Kyd', followers: 654000 }
  ]
};

// Routes
app.use('/api/auth', authRoutes(users));
app.use('/api/users', usersRoutes(users, videos));
app.use('/api/videos', videosRoutes(videos, users));
app.use('/api/comments', commentsRoutes(videos));
app.use('/api/messages', messagesRoutes(messages));
app.use('/api/trending', trendingRoutes(trending));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'TikTok Clone Premium Backend v2.0 is running',
    timestamp: new Date(),
    version: '2.0.0'
  });
});

// WebSocket events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('message:send', (data) => {
    io.emit('message:new', data);
  });

  socket.on('video:like', (data) => {
    io.emit('video:updated', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, process.env.HOST || '0.0.0.0', () => {
  console.log(`\n🎬 TikTok Clone Premium v2.0`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🔗 WebSocket: ws://localhost:${PORT}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

module.exports = { app, io };
