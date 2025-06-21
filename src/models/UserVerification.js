import mongoose from 'mongoose';
import Counter from './Counter.js';

const userVerificationSchema = new mongoose.Schema({
    _id: { type: Number },
    user_id: { type: Number, ref: 'User', required: true },
    link: { type: String, required: true },
}, {
    _id: false, // Prevent default ObjectId generation
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'verification'
});

userVerificationSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'userVerificationId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this._id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const UserVerification = mongoose.model('UserVerification', userVerificationSchema);

export default UserVerification; 