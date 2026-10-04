const express = require('express');

module.exports = (messages) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json(messages);
  });

  router.post('/send', (req, res) => {
    const { from, to, text } = req.body;
    const message = {
      id: Date.now(),
      from,
      to,
      text,
      timestamp: new Date(),
      read: false
    };
    messages.push(message);
    res.status(201).json(message);
  });

  return router;
};
