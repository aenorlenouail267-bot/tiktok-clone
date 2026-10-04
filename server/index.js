const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    username: 'nina',
    fullName: 'Nina Harper',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    followers: 124000,
    following: 320,
    bio: 'Dance lover • travel • everyday vibes',
    verified: true,
    accent: '#ff2d55'
  },
  {
    id: 2,
    username: 'leo',
    fullName: 'Leo Martin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    followers: 89000,
    following: 210,
    bio: 'Street style and cinematic edits',
    verified: false,
    accent: '#00f2ea'
  },
  {
    id: 3,
    username: 'sami',
    fullName: 'Sami Rahman',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    followers: 230000,
    following: 540,
    bio: 'Content creator • tech creator',
    verified: true,
    accent: '#ffd166'
  },
  {
    id: 4,
    username: 'zoe',
    fullName: 'Zoe Chen',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
    followers: 43000,
    following: 108,
    bio: 'Beauty, life, and moments',
    verified: false,
    accent: '#9b5de5'
  }
];

const videos = [
  {
    id: 1,
    userId: 1,
    username: 'nina',
    fullName: 'Nina Harper',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    song: 'Sunset Vibes - Nina',
    caption: 'Late-night dance in the city 🌆 #dance #night #tiktokclone',
    likes: 43000,
    comments: 1240,
    shares: 382,
    views: 1200000,
    liked: true,
    duration: '0:28',
    videoUrl: 'https://player.vimeo.com/external/449887584.sd.mp4?s=71cb2b90cd7b5d89f8d0d2ad59ae0f9df6c3d4d7&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    music: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7f41352d2a.mp3?filename=lofi-study-112191.mp3'
  },
  {
    id: 2,
    userId: 2,
    username: 'leo',
    fullName: 'Leo Martin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    song: 'Street Movement',
    caption: 'A quick cinematic edit before the rain starts ☔',
    likes: 51000,
    comments: 980,
    shares: 285,
    views: 980000,
    liked: false,
    duration: '0:36',
    videoUrl: 'https://player.vimeo.com/external/449887821.sd.mp4?s=fe84342f81244db8e8b70d2ff4f38c1823e44190&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    music: 'https://cdn.pixabay.com/download/audio/2022/02/18/audio_f06ec4ca48.mp3?filename=night-drive-17072.mp3'
  },
  {
    id: 3,
    userId: 3,
    username: 'sami',
    fullName: 'Sami Rahman',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    song: 'Creator mode',
    caption: 'My desk setup + focused workflow ⚙️',
    likes: 76000,
    comments: 2240,
    shares: 430,
    views: 2100000,
    liked: false,
    duration: '0:33',
    videoUrl: 'https://player.vimeo.com/external/449888199.sd.mp4?s=4ef36fd7b0ba4b7eb3ef6e77bb5f2db0f6a5f3d5&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    music: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_9c4f71dfcc.mp3?filename=retrowave-12437.mp3'
  },
  {
    id: 4,
    userId: 4,
    username: 'zoe',
    fullName: 'Zoe Chen',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
    song: 'Glow Up',
    caption: 'Getting ready for a sunny day ✨',
    likes: 29000,
    comments: 630,
    shares: 120,
    views: 540000,
    liked: true,
    duration: '0:29',
    videoUrl: 'https://player.vimeo.com/external/449887617.sd.mp4?s=1dca4da4d9d1ac17c75ccbe9ba9a8a0d12d3e8fd&profile_id=164&oauth2_token_id=57447761',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    music: 'https://cdn.pixabay.com/download/audio/2022/04/14/audio_0ffd993d9e.mp3?filename=sunshine-music-15179.mp3'
  }
];

const messages = [
  { id: 1, from: 'sami', to: 'nina', preview: 'Tu as vu la dernière vidéo ?', time: '2m' },
  { id: 2, from: 'leo', to: 'nina', preview: 'Je peux te partager un cut ?', time: '12m' },
  { id: 3, from: 'zoe', to: 'nina', preview: 'On va faire une collab ?', time: '1h' }
];

const discover = [
  { id: 1, title: '#dancechallenge', posts: 982000 },
  { id: 2, title: '#cityvibes', posts: 540400 },
  { id: 3, title: '#creatorlife', posts: 330200 },
  { id: 4, title: '#travel', posts: 680000 },
  { id: 5, title: '#beauty', posts: 240100 }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TikTok clone backend is running' });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/feed', (req, res) => {
  res.json(videos);
});

app.get('/api/discover', (req, res) => {
  res.json(discover);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/api/profile/:username', (req, res) => {
  const user = users.find((item) => item.username === req.params.username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userVideos = videos.filter((video) => video.username === user.username);

  res.json({
    user,
    videos: userVideos,
    totalVideos: userVideos.length
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const matchedUser = users.find((user) => user.username.toLowerCase() === username.toLowerCase());

  if (!matchedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    token: 'fake-jwt-token-for-demo',
    user: matchedUser
  });
});

app.post('/api/auth/register', (req, res) => {
  const { username, fullName, password } = req.body;

  if (!username || !fullName || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const exists = users.some((user) => user.username.toLowerCase() === username.toLowerCase());
  if (exists) {
    return res.status(409).json({ message: 'Username already in use' });
  }

  const newUser = {
    id: Date.now(),
    username,
    fullName,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    followers: 0,
    following: 0,
    bio: 'New creator on TikTok Clone',
    verified: false,
    accent: '#ff2d55'
  };

  users.push(newUser);

  res.status(201).json({
    token: 'fake-jwt-token-for-demo',
    user: newUser
  });
});

app.post('/api/videos/:id/like', (req, res) => {
  const video = videos.find((item) => item.id === Number(req.params.id));

  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  video.liked = !video.liked;
  video.likes += video.liked ? 1 : -1;

  res.json(video);
});

app.post('/api/videos/:id/comment', (req, res) => {
  const video = videos.find((item) => item.id === Number(req.params.id));

  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }

  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Comment cannot be empty' });
  }

  video.comments += 1;

  res.json({
    message: 'Comment added',
    count: video.comments,
    text
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
