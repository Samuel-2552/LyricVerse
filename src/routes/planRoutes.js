const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const {
  getAllPlans,
  getPlanById,
  updatePlanModules,
  addOrEditModule
} = require('../controllers/planController');

// GET /api/plans - Get all plans + modules (Public)
router.get('/', getAllPlans);

// GET /api/plans/:id - Get plan details (Admin)
router.get('/:id', isAdmin, getPlanById);

// PATCH /api/plans/:id - Update plan modules (Admin)
router.patch('/:id', isAdmin, updatePlanModules);

// POST /api/modules - Add/edit modules (Admin)
router.post('/modules', isAdmin, addOrEditModule);

module.exports = router; 