const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// GET /tags
router.get('/', tagController.getAllTags);
router.post('/', tagController.getAllTags);
module.exports = router;
