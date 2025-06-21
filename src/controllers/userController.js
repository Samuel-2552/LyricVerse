import User from '../models/User.js';
import Workspace from '../models/Workspace.js';

// @route   GET /user/me
// @desc    Get current user's profile
// @access  Private
export const getMe = async (req, res) => {
    try {
        // req.user.id is coming from the authMiddleware
        const user = await User.findById(req.user.id).select('-password').populate('wp_id');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @route   PATCH /user/update
// @desc    Update user profile
// @access  Private
export const updateUser = async (req, res) => {
    const { name, ph_no, purpose, plan } = req.body;
    const updateFields = {};
    if (name) updateFields.name = name;
    if (ph_no) updateFields.ph_no = ph_no;
    if (purpose) updateFields.purpose = purpose;
    if (plan) updateFields.plan = plan;

    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /user/workspaces
// @desc    Get user's workspaces
// @access  Private
export const getUserWorkspaces = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wp_id');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ workspaces: user.wp_id, plan: user.plan });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}; 