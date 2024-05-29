const { BadRequestError, NotFoundError } = require('../../errors')
const CashDeposit = require('../../models/CashDeposit')
const User = require('../../models/User')

const createCashDeposit = async (req, res) => {
    const { transactionNumber, amount } = req.body;

    const userId = req.user.userId

    const checkUser = await User.findById(userId)

    if(!checkUser){
        throw new NotFoundError('User not Found!')
    }

    if (!req.file) {
        throw new BadRequestError('No file provided');
    }

    const image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const cashDeposit = new CashDeposit({transactionNumber, amount, image, userId})

    await cashDeposit.save()

    res.status(201).json({ status: 'success', cashDeposit, message: 'Created a Deposit Request Sucessfully. Check Your Balance after few moments' })
}


module.exports = { createCashDeposit }

