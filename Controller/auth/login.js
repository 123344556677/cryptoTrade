const { NotFoundError, UnauthorizedError } = require('../../errors')
const User = require('../../models/User')


const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new NotFoundError('No Account created with this email!')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Password is incorrect!')
    }
    const token = user.createToken()

    await user.save()

    const data = { ...user.toObject(), token }

    res.status(200).json({ status: 'success', data })
}

module.exports = { login }


