import mongoose from 'mongoose';
import Counter from './Counter.js';

const userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ph_no: { type: String, required: true },
  purpose: { type: String },
  active: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  deactivated_at: { type: Date, default: null },
  plan: { type: Number, default: 5 },
  blocked: { type: Boolean, default: false },
  wp_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
}, {
  _id: false,
  timestamps: { createdAt: 'created_at' }
});

userSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'userId' },
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

const User = mongoose.model('User', userSchema);

export default User; 