const User = require('../../models/User')
const { NotFoundError } = require('../../errors');

const updateUserBalance = async (req, res) => {
    const { amount } = req.body;

    const userId = req.params.userId

    const user = await User.findById(userId)

    if(!user){
        throw new NotFoundError('User not Found!')
    }

    user.balance += amount;

    await user.save()

    res.status(200).json({ status: 'success', message: 'Updated new Balance of user' })
}


module.exports = { updateUserBalance }
