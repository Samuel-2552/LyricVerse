import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
    createWorkspace,
    getWorkspaceById,
    inviteMembers,
    updateMemberPermissions,
    acceptInvitation,
    removeMember,
    removeInvite,
    // Placeholders for future tasks
    getWorkspaceSongs,
    displayWorkspace,
    getWorkspaceControl,
    jamWorkspace
} from '../controllers/workspaceController.js';

const router = express.Router();

// Workspace Creation and Retrieval
router.post('/', authMiddleware, createWorkspace);
router.get('/:id', getWorkspaceById);

// Member and Invitation Management
router.patch('/:id/invite', inviteMembers);
router.patch('/:id/permissions/:memberUserId', updateMemberPermissions);
router.delete('/:id/members/:memberUserId', removeMember);
router.delete('/:id/invites/:inviteEmail', removeInvite);
router.get('/join/:workspaceId/:inviteToken', acceptInvitation);

// Other functionality
router.get('/:id/songs', getWorkspaceSongs);
router.get('/:id/display', displayWorkspace); // This might be a public route
router.get('/:id/control', getWorkspaceControl);
router.post('/:id/jam', jamWorkspace);

export default router; 