const express = require('express');
const router = express.Router();
const scaleController = require('../controllers/scaleController');

// GET /scales
router.get('/', scaleController.getAllScales);

module.exports = router;