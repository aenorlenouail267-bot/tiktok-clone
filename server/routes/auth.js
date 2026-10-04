const express = require('express');

module.exports = (users) => {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token: 'fake-jwt-token', user: userWithoutPassword });
  });

  router.post('/register', (req, res) => {
    const { username, fullName, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = {
      id: String(Date.now()),
      username,
      fullName,
      email,
      password,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      followers: 0,
      following: 0,
      bio: 'New creator on TikTok Clone',
      verified: false,
      accent: '#ff2d55'
    };

    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ token: 'fake-jwt-token', user: userWithoutPassword });
  });

  return router;
};
