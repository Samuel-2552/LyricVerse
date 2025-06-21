import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    plan_id: { type: Number, required: true, unique: true },
    permissions: {
        can_manage_workspaces: { type: Boolean, default: false }
    }
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan; 