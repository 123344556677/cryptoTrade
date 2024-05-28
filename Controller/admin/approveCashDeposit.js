const CashDeposit = require('../../models/CashDeposit')
const User = require('../../models/User')

const approveCashDeposit = async (req, res) => {

    const id = req.params.id

    const { status } = req.body

    const cashDeposit = await CashDeposit.findById(id)

    cashDeposit.status = status

    await cashDeposit.save()

    const userId = cashDeposit.userId

    const user = await User.findById(userId)

    user.balance += cashDeposit.amount

    await user.save()
    

    res.status(200).json({ status: 'success', cashDeposit , message: 'Balance is successfully updated'});

};

module.exports = { approveCashDeposit }