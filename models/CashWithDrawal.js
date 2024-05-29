const mongoose = require('mongoose');

const CashWithdrawalSchema = new mongoose.Schema({
    walletAddress: {
      type: String,
      required: [true, "Please enter wallet address"],
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount"],
      min: [10, "Amount must be greater than 10"]
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ["USDT-TRC20"], 
      required: [true, "Please select type"]
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending"
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model("CashWithdrawal", CashWithdrawalSchema);