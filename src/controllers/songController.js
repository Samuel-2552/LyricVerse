// src/controllers/songController.js
//all logic for MasterSongDB Functions

const { getDb } = require('../db/mongoClient');
const { ObjectId } = require('mongodb');
const songSchema = require('../models/masterSongSchema');
const { isAdmin } = require('../middleware/auth'); // You’ll create this



//gets all songs from mastersongdb
exports.getAllSongs = async (req, res) => {
    try {
        const db = getDb();
        const query = {};

        // For regular users, only show published songs
        // Assumes you have middleware that sets req.user
        if (!req.user || req.user.role === 'user') {
            query.draft = false;
        } 
        // Admins can filter by status, otherwise they see all
        else if (req.user.role === 'admin' && req.query.status) {
            query.draft = req.query.draft == 'true';
        }

        const songs = await db.collection('masterSongDb').find(query).toArray();
        res.json(songs);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch songs' });
      }
    };
  

    //creates a new song
  exports.createSong = async (req, res) => {
    try {
        // Validate the request body using the schema
        const { error, value } = songSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ 
            error: 'Validation failed', 
            details: error.details 
        });
        }
        // Add timestamps
        const now = new Date().toISOString();
        value.created_at = now;
        value.edited_at = now;

         // Set defaults for new fields
         if (value.draft === undefined) {
            value.draft = true;
        }
        if (value.likes === undefined) {
            value.likes = 0;
        }
        if (value.views === undefined) {
            value.views = 0;
        }

        // Ensure draft is set (defaults to true for new songs)
        if (value.draft === undefined) {
            value.draft = true;
        }


        const db = getDb();
        const song = req.body;
        const result = await db.collection('masterSongDb').insertOne(value);
        res.status(201).json({ insertedId: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: 'Failed to create song' });
      }
    };
  

    //update a songe
  exports.updateSong = async (req, res) => {
    try {
        const db = getDb();
        const songId = req.params.id;
        const update = req.body;

        // Add edited_at timestamp
        update.edited_at = new Date().toISOString();

        const result = await db.collection('masterSongDb').updateOne(
          { _id: new ObjectId(songId) },
          { $set: update }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Song not found' });
        }
        res.json({ message: 'Song updated' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to update song' });
      }
    };
  

    //gets all versions of a song
  exports.getSongVersions = async (req, res) => {
    try {
        const db = getDb();
        const songId = req.params.id;
        const versions = await db.collection('masterVersion').find({ songId: new ObjectId(songId) }).toArray();
        res.json(versions);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch versions' });
      }
    };
  

    //add version to song
  exports.addSongVersion = async (req, res) => {
    try {
        const db = getDb();
        const songId = req.params.id;
        const version = { ...req.body, songId: new ObjectId(songId) };
        const result = await db.collection('masterVersion').insertOne(version);
        res.status(201).json({ insertedId: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: 'Failed to add version' });
      }
    };

    //get specific song by id
    exports.getSongById = async (req, res) => {
        try {
            const db = getDb();
            const songId = req.params.id;
            
            const song = await db.collection('masterSongDb').findOne({ 
                _id: new ObjectId(songId) 
            });
            
            if (!song) {
                return res.status(404).json({ error: 'Song not found' });
            }
    
            // Check if user can view this song (draft songs only for admins)
            if (song.draft && (!req.user || req.user.role !== 'admin')) {
                return res.status(403).json({ error: 'Access denied' });
            }
    
            // Increment views
            await db.collection('masterSongDb').updateOne(
                { _id: new ObjectId(songId) },
                { $inc: { views: 1 } }
            );
    
            res.json(song);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch song' });
        }
    };

    //deleting song
    // Add this to your songController.js

    exports.deleteSong = async (req, res) => {
        try {
            const db = getDb();
            const songId = req.params.id;
            
            // Check if song exists
            const song = await db.collection('masterSongDb').findOne({ 
                _id: new ObjectId(songId) 
            });
            
            if (!song) {
                return res.status(404).json({ error: 'Song not found' });
            }

            // Delete the song
            const result = await db.collection('masterSongDb').deleteOne({ 
                _id: new ObjectId(songId) 
            });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'Song not found' });
            }

            // Also delete all versions associated with this song
            const versionsResult = await db.collection('masterVersion').deleteMany({ 
                songId: new ObjectId(songId) 
            });

            res.json({ 
                message: 'Song deleted successfully',
                deletedSong: result.deletedCount,
                deletedVersions: versionsResult.deletedCount
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete song' });
        }
    };