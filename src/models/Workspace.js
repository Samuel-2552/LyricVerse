import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const memberSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' }
}, { _id: false });

const invitedUserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' }
}, { _id: false });

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unique_link: { type: String, default: () => nanoid(10), unique: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [memberSchema],
  invited_users: [invitedUserSchema],
  songs_versions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SongVersion' }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'edited_at' },
  collection: 'workspace'
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace; 