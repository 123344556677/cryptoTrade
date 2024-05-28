const CashDeposit = require('../../models/CashDeposit')
const User = require('../../models/User')

const getInformation = async (req, res) => {

    const TotalUsers = await User.countDocuments({role: 'user'})

    const getCashDeposited = await CashDeposit.countDocuments()

    res.status(200).json({ status: 'success', getCashDeposited, TotalUsers });

};

module.exports = { getInformation }