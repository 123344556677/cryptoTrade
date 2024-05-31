const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');
const CashWithDrawal = require('../../models/CashWithDrawal')
const User = require('../../models/User')

const createCashWithDrawal = async (req, res) => {
    const { walletAddress, amount, type, fundPassword } = req.body;

    const userId = req.user.userId

    const checkUser = await User.findById(userId)

    if(!checkUser){
        throw new NotFoundError('User not Found!')
    }

    //Checking FundPassword
    const checkfundPassword = await checkUser.compareFundPassword(fundPassword)

    if (!checkfundPassword) {
        throw new UnauthorizedError('Fund Password is incorrect!')
    }

    if(amount > checkUser.balance){
        throw new BadRequestError('Not sufficient balance')
    }

    const cashWithDrawal = new CashWithDrawal({walletAddress, amount, type, userId})

    await cashWithDrawal.save()

    res.status(201).json({ status: 'success', cashWithDrawal ,message: 'Created a Withdrawal Request Sucessfully. Sooner it will be in your wallet' })
}


module.exports = { createCashWithDrawal }
