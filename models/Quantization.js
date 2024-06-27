const mongoose = require('mongoose');

const QuantizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastTap: {
        type: Date,
        default: () => new Date(Date.now() - 3 * 60 * 1000)
    },
    clicks: {
        type: Number,
        default: 0 
    },
    vipLevel: {
        type: Number,
        default: 0 
    },
    maxClicks: {
        type: Number,
        default: 0 
    }
});

module.exports = mongoose.model('Quantization', QuantizationSchema);
