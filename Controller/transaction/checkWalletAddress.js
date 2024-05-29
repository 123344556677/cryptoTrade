const validateWalletAddress = require('../../HelpingFunctions/validateWalletAddress')
const User = require('../../models/User')
const { NotFoundError, UnauthorizedError } = require('../../errors');

const checkWalletAddress = async (req, res) => {
    const { walletAddress, fundPassword } = req.body;

    const userId = req.user.userId

    const checkUser = await User.findById(userId)

    if(!checkUser){
        throw new NotFoundError('User not Found!')
    }

    await validateWalletAddress(walletAddress);

    //Checking FundPassword
    const checkfundPassword = await checkUser.compareFundPassword(fundPassword)

    if (!checkfundPassword) {
        throw new UnauthorizedError('Fund Password is incorrect!')
    }

    res.status(200).json({ status: 'success', message: 'Correct Wallet Address' })
}


module.exports = { checkWalletAddress }

