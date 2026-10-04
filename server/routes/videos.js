const express = require('express');

module.exports = (videos) => {
  const router = express.Router();

  router.get('/feed', (req, res) => {
    res.json(videos);
  });

  router.get('/discover', (req, res) => {
    res.json(videos.sort(() => Math.random() - 0.5));
  });

  router.get('/:id', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  });

  router.post('/:id/like', (req, res) => {
    const video = videos.find(v => v.id === req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.liked = !video.liked;
    video.likes += video.liked ? 1 : -1;
    res.json(video);
  });

  return router;
};
