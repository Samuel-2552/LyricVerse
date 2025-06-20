// src/app.js
const express = require('express');
const cors = require('cors');
const { connectToMongo } = require('./db/mongoClient');

const songRoutes = require('./routes/songRoutes');
const userSongRoutes = require('./routes/userSongRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user for testing (add before your routes in app.js)
app.use((req, res, next) => {
    req.user = { role: 'admin' }; // Change to 'user' to test permissions
    next();
  });

app.use('/songs', songRoutes);
app.use('/user-songs', userSongRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('LyricVerse backend is running!');
});

// Connect to MongoDB and start server
connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

module.exports = app;