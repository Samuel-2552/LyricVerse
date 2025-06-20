const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const { isAdmin } = require('../middleware/auth'); 


// Master Song APIs
router.get('/', songController.getAllSongs);
router.post('/', isAdmin, songController.createSong); //only admins
router.patch('/:id', isAdmin, songController.updateSong); //only admin access

// Song Versions
router.get('/:id/versions', songController.getSongVersions);
router.post('/:id/versions', songController.addSongVersion);

module.exports = router;