//Forget Password
const { NotFoundError, UnauthorizedError } = require("../../errors")
const User = require('../../models/User')
const { sendEmail } = require("../../middleware/nodeMailer");
const { generateRandomCode } = require('../../HelpingFunctions/nodemailer')
require('dotenv').config();

const sendOtpToEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw new NotFoundError('Account is not Created with this Email, Please Signup')
    }

    const generatedCode = generateRandomCode();

    user.code = generatedCode;

    await user.save()

    const subject = 'OPT for ForgetPassword';
    const text = `Your verification code is: ${generatedCode}.This code will expire in 120 seconds`;

    await sendEmail(user.email, subject, text);

    const token = user.createOTPToken()

    const data = { ...user.toObject(), token }

    res.send({ status: 'success', data, message: 'OTP is sent to your email Successfully'})

}


const checkOTP = async (req, res) => {
    const id = req.user.userId;

    const user = await User.findById(id)

    if (!user) {
        throw new NotFoundError('Account is not Created with this Email, Please Signup')
    }

    const { code } = req.body;

    if (user.code != code) {
        throw new UnauthorizedError('Code is incorrect')
    }

    user.code = undefined

    await user.save()

    const token = user.createOTPToken()

    const data = { ...user.toObject(), token }

    res.send({ status: 'success', data, message: 'Code is Correct' })

}

const setNewPassword = async (req, res) => {
    const id = req.user.userId;

    const user = await User.findById(id)

    if (!user) {
        throw new NotFoundError('Account is not Created with this Email, Please Signup')
    }

    const { password } = req.body;

    user.password = password

    await user.save()


    const token = user.createToken()

    const data = { ...user.toObject(), token }

    res.send({ status: 'success', data, message: 'New Password updated Successfully' })

}

module.exports = { sendOtpToEmail, checkOTP, setNewPassword } 