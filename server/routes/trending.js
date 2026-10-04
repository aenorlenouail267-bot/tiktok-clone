const express = require('express');

module.exports = (trending) => {
  const router = express.Router();

  router.get('/hashtags', (req, res) => {
    res.json(trending.hashtags);
  });

  router.get('/sounds', (req, res) => {
    res.json(trending.sounds);
  });

  router.get('/creators', (req, res) => {
    res.json(trending.creators);
  });

  return router;
};
