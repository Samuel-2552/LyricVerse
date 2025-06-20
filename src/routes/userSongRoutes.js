const express = require('express');
const router = express.Router();
const userSongController = require('../controllers/userSongController');

// User Song APIs
router.get('/', userSongController.getAllUserSongs);
router.post('/', userSongController.createUserSong);
router.get('/:id', userSongController.getUserSongById);
router.patch('/:id', userSongController.updateUserSong);

// User Song Versions
router.get('/:id/versions', userSongController.getUserSongVersions);
router.post('/:id/versions', userSongController.addUserSongVersion);

module.exports = router;