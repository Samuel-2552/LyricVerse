const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// GET /genres
router.get('/', genreController.getAllGenres);

module.exports = router;