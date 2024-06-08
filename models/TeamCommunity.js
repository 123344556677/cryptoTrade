const mongoose = require('mongoose');

const TeamCommunitySchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalRevenue: { type: Number, default: 0 },
    totalPeople: { type: Number, default: 0 },
    newRegistration: { type: Number, default: 0 },
    addedRecharge: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TeamCommunity', TeamCommunitySchema);
