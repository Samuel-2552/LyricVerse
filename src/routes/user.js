import express from 'express';
import { getMe, updateUser, getUserWorkspaces } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getMe);
router.patch('/update', authMiddleware, updateUser);
router.get('/workspaces', authMiddleware, getUserWorkspaces);

export default router; 