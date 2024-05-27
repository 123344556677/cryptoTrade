const mongoose = require('mongoose');

const CashDepositSchema = new mongoose.Schema({
  transactionNumber: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status:{
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
  }
},{timestamps: true});

module.exports = mongoose.model('CashDeposit', CashDepositSchema);