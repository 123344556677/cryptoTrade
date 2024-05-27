const CashDeposit = require('../../models/CashDeposit')

const getPendingCashDeposited = async (req, res) => {

    const getCashDeposited = await CashDeposit.find({status:'pending'})

    res.status(200).json({ status: 'true', getCashDeposited });

};

module.exports = { getPendingCashDeposited }