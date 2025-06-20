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
            query.status = false;
        } 
        // Admins can filter by status, otherwise they see all
        else if (req.user.role === 'admin' && req.query.status) {
            query.status = req.query.status;
        }

        const songs = await db.collection('songs').find(query).toArray();
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

        // Ensure draft is set (defaults to true for new songs)
        if (value.draft === undefined) {
            value.draft = true;
        }


        const db = getDb();
        const song = req.body;
        const result = await db.collection('songs').insertOne(value);
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

        const result = await db.collection('songs').updateOne(
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
        const versions = await db.collection('versions').find({ songId: new ObjectId(songId) }).toArray();
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
        const result = await db.collection('versions').insertOne(version);
        res.status(201).json({ insertedId: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: 'Failed to add version' });
      }
    };