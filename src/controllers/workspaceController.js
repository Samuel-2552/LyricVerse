import Workspace from '../models/Workspace.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

// --- Core Workspace Functions ---

export const createWorkspace = async (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ msg: 'Workspace name is required.' });
    }
    const { name } = req.body;
    const userId = req.user.id; // Get userId securely from auth middleware

    try {
        const newWorkspace = new Workspace({
            name,
            created_by: userId,
            members: [{ user_id: userId, role: 'admin' }]
        });
        await newWorkspace.save();

        await User.findByIdAndUpdate(userId, { $push: { wp_id: newWorkspace._id } });
        res.status(201).json(newWorkspace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const getWorkspaceById = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id).populate('members.user_id', 'name email');
        if (!workspace) {
            return res.status(404).json({ msg: 'Workspace not found' });
        }
        res.json(workspace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// --- Invitation and Member Management ---

export const inviteMembers = async (req, res) => {
    const { invites, inviterId } = req.body;
    const { id: workspaceId } = req.params;
    
    if (!inviterId) {
        return res.status(400).json({ msg: 'An inviterId must be provided.' });
    }

    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) return res.status(404).json({ msg: 'Workspace not found' });

        const admin = workspace.members.find(member => member.user_id.toString() === inviterId && member.role === 'admin');
        if (!admin) return res.status(403).json({ msg: 'You do not have permission to invite members.' });
        
        for (const invite of invites) {
            const inviteToken = jwt.sign({ email: invite.email, workspaceId }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const inviteLink = `https://dev.oilnwine.tech/join-workspace?token=${inviteToken}`;
            const message = `<h1>You're Invited!</h1><p>You have been invited to join the "${workspace.name}" workspace.</p><a href="${inviteLink}">Join Workspace</a>`;
            await sendEmail({ email: invite.email, subject: `Invitation to join ${workspace.name}`, html: message });
            workspace.invited_users.push({ email: invite.email, role: invite.role });
        }
        await workspace.save();
        res.json({ msg: 'Invitations sent successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const acceptInvitation = async (req, res) => {
    const { inviteToken } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ msg: 'A userId must be provided to accept an invitation.' });
    }

    try {
        const decoded = jwt.verify(inviteToken, process.env.JWT_SECRET);
        const { email, workspaceId } = decoded;

        const user = await User.findById(userId);
        if (!user || user.email !== email) {
            return res.status(403).json({ msg: 'This invitation is for a different user.' });
        }

        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ msg: 'Workspace not found.' });
        }

        if (workspace.members.some(m => m.user_id.toString() === userId)) {
            return res.status(400).json({ msg: 'You are already a member of this workspace.' });
        }

        const invitedUser = workspace.invited_users.find(inv => inv.email === email);
        if (!invitedUser) {
            return res.status(400).json({ msg: 'Invitation not found or has been revoked.' });
        }

        workspace.members.push({ user_id: userId, role: invitedUser.role });
        user.wp_id.push(workspace._id);

        workspace.invited_users = workspace.invited_users.filter(inv => inv.email !== email);

        await workspace.save();
        await user.save();

        res.send('Successfully joined the workspace!');

    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Invalid or expired invitation token.' });
    }
};

export const updateMemberPermissions = async (req, res) => {
    const { role, requesterId } = req.body;
    const { id: workspaceId, memberUserId } = req.params;
    
    if (!requesterId) {
        return res.status(400).json({ msg: 'A requesterId must be provided.' });
    }

    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) return res.status(404).json({ msg: 'Workspace not found' });
        
        const admin = workspace.members.find(m => m.user_id.toString() === requesterId && m.role === 'admin');
        if (!admin) return res.status(403).json({ msg: 'You do not have permission to change roles.' });

        const memberToUpdate = workspace.members.find(m => m.user_id.toString() === memberUserId);
        if (!memberToUpdate) return res.status(404).json({ msg: 'Member not found in this workspace.' });
        
        memberToUpdate.role = role;
        await workspace.save();
        res.json(workspace.members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const removeMember = async (req, res) => {
    const { requesterId } = req.body;
    const { id: workspaceId, memberUserId } = req.params;
    
    if (!requesterId) {
        return res.status(400).json({ msg: 'A requesterId must be provided.' });
    }
    
    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) return res.status(404).json({ msg: 'Workspace not found' });

        const admin = workspace.members.find(m => m.user_id.toString() === requesterId && m.role === 'admin');
        if (!admin) return res.status(403).json({ msg: 'You do not have permission to remove members.' });

        if (requesterId === memberUserId) {
            return res.status(400).json({ msg: "Admins cannot remove themselves." });
        }
        
        workspace.members = workspace.members.filter(m => m.user_id.toString() !== memberUserId);
        await workspace.save();
        await User.findByIdAndUpdate(memberUserId, { $pull: { wp_id: workspaceId } });
        res.json({ msg: 'Member removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const removeInvite = async (req, res) => {
    const { requesterId } = req.body;
    const { id: workspaceId, inviteEmail } = req.params;

    if (!requesterId) {
        return res.status(400).json({ msg: 'A requesterId must be provided.' });
    }
    
    try {
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) return res.status(404).json({ msg: 'Workspace not found' });

        const admin = workspace.members.find(m => m.user_id.toString() === requesterId && m.role === 'admin');
        if (!admin) return res.status(403).json({ msg: 'You do not have permission to remove invites.' });

        workspace.invited_users = workspace.invited_users.filter(inv => inv.email !== inviteEmail);
        await workspace.save();
        res.json({ msg: 'Invitation removed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// --- Other Placeholder Functions ---

export const getWorkspaceSongs = async (req, res) => res.status(501).json({ msg: 'Not implemented yet.' });
export const displayWorkspace = async (req, res) => res.status(501).json({ msg: 'Not implemented yet.' });
export const getWorkspaceControl = async (req, res) => res.status(501).json({ msg: 'Not implemented yet.' });
export const jamWorkspace = async (req, res) => res.status(501).json({ msg: 'Not implemented yet.' }); 