import mongoose from 'mongoose';

const songVersionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lyrics: { type: String },
    // We can add more details like author, key, tempo etc. later
}, {
    collection: 'userVersion' // Explicitly set collection name
});

const SongVersion = mongoose.model('SongVersion', songVersionSchema);

export default SongVersion; 