const CashDeposit = require('../../models/CashDeposit')
const { NotFoundError, BadRequestError } = require('../../errors')
const User = require('../../models/User')

const approveCashDeposit = async (req, res) => {

    const id = req.params.id

    const { status, additionalAmount } = req.body

    const cashDeposit = await CashDeposit.findById(id)

    if(cashDeposit.status == 'approved'){
        throw new BadRequestError('Cash Deposit is already Approved')
    }

    cashDeposit.status = status

    await cashDeposit.save()

    const userId = cashDeposit.userId

    const user = await User.findById(userId)

    if(!user){
        throw new NotFoundError('User not Found!')
    }

    const totalAmount = additionalAmount + cashDeposit.amount

    user.balance += totalAmount

    await user.save()
    

    res.status(200).json({ status: 'success', cashDeposit , message: 'Balance is successfully updated'});

};

module.exports = { approveCashDeposit }