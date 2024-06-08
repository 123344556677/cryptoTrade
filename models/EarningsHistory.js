const mongoose = require('mongoose');

const EarningsHistorySchema = new mongoose.Schema({

    senderUserId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    receiverUserId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },

}, { timestamps: true });

module.exports = mongoose.model('EarningsHistory', EarningsHistorySchema);
