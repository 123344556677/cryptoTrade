const User = require('../../models/User')
const { NotFoundError, UnauthorizedError } = require('../../errors');

const getAdminWalletAddress = async (req, res) => {

    const admin = await User.findOne({role: 'admin'})

    if(!admin){
        throw new NotFoundError('User not Found!')
    }

    const adminWalletAddress = admin.walletAddress

    res.status(200).json({ status: 'success', adminWalletAddress })
}


module.exports = { getAdminWalletAddress }