const express = require('express');

module.exports = (videos) => {
  const router = express.Router();

  router.post('/:videoId', (req, res) => {
    const { text, userId } = req.body;
    const video = videos.find(v => v.id === req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.comments += 1;
    res.json({ message: 'Comment added', videoId: req.params.videoId });
  });

  return router;
};
