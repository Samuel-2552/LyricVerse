// src/controllers/userSongController.js

const { getDb } = require('../db/mongoClient');
const { ObjectId } = require('mongodb');
const userSongSchema = require('../models/userSongSchema');


//get user's custom songs :)
exports.getAllUserSongs = async (req, res) => {
  try {
    const db = getDb();
    const userId = req.user?.user_id || req.query.user_id; // Get from auth or query
    
    if (!userId) {
        return res.status(400).json({ error: 'User ID required' });
    }

    const songs = await db.collection('userSongDb').find({ user_id: parseInt(userId) }).toArray();
    res.json(songs);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user songs' });
  }
  };
  
  //add a personal song to userSOngDB
  exports.createUserSong = async (req, res) => {
      try {
        // Validate the request body
        const { error, value } = userSongSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.details 
            });
        }

        // Add timestamp
        value.edited_at = new Date().toISOString();

        const db = getDb();
        const result = await db.collection('userSongDb').insertOne(value);
        res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user song' });
    }
  };

  // Get one personal song
  exports.getUserSongById = async (req, res) => {
    try {
      const db = getDb();
      const songId = req.params.id;
      const userId = req.user?.user_id || req.query.user_id;

      if (!userId) {
          return res.status(400).json({ error: 'User ID required' });
      }

      const song = await db.collection('userSongDb').findOne({ 
          _id: new ObjectId(songId),
          user_id: parseInt(userId)
      });

      if (!song) {
          return res.status(404).json({ error: 'User song not found' });
      }

      res.json(song);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user song' });
    }
  };
  
  //edit personal song
exports.updateUserSong = async (req, res) => {
    try {
      const db = getDb();
      const songId = req.params.id;
      const userId = req.user?.user_id || req.query.user_id;
      const update = req.body;

      if (!userId) {
          return res.status(400).json({ error: 'User ID required' });
      }

      // Add timestamp
      update.edited_at = new Date().toISOString();

      const result = await db.collection('userSongDb').updateOne(
          { 
              _id: new ObjectId(songId),
              user_id: parseInt(userId) // Ensure user owns the song
          },
          { $set: update }
      );

      if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'User song not found' });
      }

      res.json({ message: 'User song updated' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user song' });
  }
  };

  // Delete personal song
exports.deleteUserSong = async (req, res) => {
  try {
      const db = getDb();
      const songId = req.params.id;
      const userId = req.user?.user_id || req.query.user_id;

      if (!userId) {
          return res.status(400).json({ error: 'User ID required' });
      }

      // Check if song exists and belongs to user
      const song = await db.collection('userSongDb').findOne({ 
          _id: new ObjectId(songId),
          user_id: parseInt(userId)
      });

      if (!song) {
          return res.status(404).json({ error: 'User song not found' });
      }

      // Delete the song
      const result = await db.collection('userSongDb').deleteOne({ 
          _id: new ObjectId(songId),
          user_id: parseInt(userId)
      });

      // Also delete associated versions
      const versionsResult = await db.collection('userVersion').deleteMany({ 
          songId: new ObjectId(songId) 
      });

      res.json({ 
          message: 'User song deleted successfully',
          deletedSong: result.deletedCount,
          deletedVersions: versionsResult.deletedCount
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user song' });
  }
};

  
// View user versions
exports.getUserSongVersions = async (req, res) => {
  try {
      const db = getDb();
      const songId = req.params.id;
      const userId = req.user?.user_id || req.query.user_id;

      if (!userId) {
          return res.status(400).json({ error: 'User ID required' });
      }

      // First check if the song belongs to the user
      const song = await db.collection('userSongDb').findOne({ 
          _id: new ObjectId(songId),
          user_id: parseInt(userId)
      });

      if (!song) {
          return res.status(404).json({ error: 'User song not found' });
      }

      const versions = await db.collection('userVersion').find({ 
          songId: new ObjectId(songId) 
      }).toArray();

      res.json(versions);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user song versions' });
  }
};
  
// Add user version
exports.addUserSongVersion = async (req, res) => {
  try {
      const db = getDb();
      const songId = req.params.id;
      const userId = req.user?.user_id || req.query.user_id;

      if (!userId) {
          return res.status(400).json({ error: 'User ID required' });
      }

      // First check if the song belongs to the user
      const song = await db.collection('userSongDb').findOne({ 
          _id: new ObjectId(songId),
          user_id: parseInt(userId)
      });

      if (!song) {
          return res.status(404).json({ error: 'User song not found' });
      }

      const version = { 
          ...req.body, 
          songId: new ObjectId(songId),
          userId: parseInt(userId)
      };

      const result = await db.collection('userVersion').insertOne(version);
      res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add user song version' });
  }
};