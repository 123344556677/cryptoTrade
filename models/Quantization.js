const mongoose = require('mongoose');

const QuantizationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastTap: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0 
    },
    vipLevel: {
        type: Number,
        default: 0 
    }
});

module.exports = mongoose.model('Quantization', QuantizationSchema);
