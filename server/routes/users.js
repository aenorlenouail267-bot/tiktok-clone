const express = require('express');

module.exports = (users, videos) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(users.map(u => {
      const { password, ...user } = u;
      return user;
    }));
  });

  router.get('/:username', (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userVideos = videos.filter(v => v.userId === user.id);
    const { password, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      videos: userVideos,
      totalVideos: userVideos.length,
      totalLikes: userVideos.reduce((sum, v) => sum + v.likes, 0)
    });
  });

  router.post('/:username/follow', (req, res) => {
    const user = users.find(u => u.username === req.params.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.followers += 1;
    res.json({ message: 'Followed', user });
  });

  return router;
};
