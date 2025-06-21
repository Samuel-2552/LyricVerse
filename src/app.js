// src/app.js
const express = require('express');
const cors = require('cors');
const { connectToMongo, getDb } = require('./db/mongoClient'); // Added getDb import

const songRoutes = require('./routes/songRoutes');
const userSongRoutes = require('./routes/userSongRoutes');
const planRoutes = require('./routes/planRoutes');

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
app.use('/api/plans', planRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('LyricVerse backend is running!');
});

// ... existing code ...

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const db = getDb();
    const collections = await db.listCollections().toArray();
    res.json({
      success: true,
      collections: collections.map(c => c.name),
      message: 'Database connected successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ... rest of your code ...

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