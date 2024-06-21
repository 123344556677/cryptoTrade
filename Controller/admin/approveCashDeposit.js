const CashDeposit = require('../../models/CashDeposit')
const { NotFoundError, BadRequestError } = require('../../errors')
const User = require('../../models/User')
const { distributeReferralBonus } = require('../../HelpingFunctions/nodemailer')


const approveCashDeposit = async (req, res) => {

    //Adding 1 for Admin

    const AdminId = req.user.userId

    const admin = await User.findById(AdminId)

    admin.balance += 1;

    await admin.save()

    //---------------------------

    const id = req.params.id

    const { status, additionalAmount } = req.body

    const cashDeposit = await CashDeposit.findById(id)

    if (cashDeposit.status == 'approved') {
        throw new BadRequestError('Cash Deposit is already Approved')
    }

    cashDeposit.status = status

    await cashDeposit.save()

    const userId = cashDeposit.userId

    const user = await User.findById(userId)

    if (!user) {
        throw new NotFoundError('User not Found!')
    }

    // Find total number of direct referrals
    const directReferrals = await User.find({ _id: { $in: user.directReferrals } }).countDocuments();

    // Find total number of indirect referrals
    const indirectReferrals = await User.find({ _id: { $in: user.indirectReferrals } }).countDocuments();

    // Calculate total number of referrals
    const totalReferrals = directReferrals + indirectReferrals;

    var level = 0;
    if (totalReferrals >= 1 && totalReferrals <= 2) {
        level = cashDeposit.amount * 0.022
    } else if (totalReferrals >= 3 && totalReferrals <= 4) {
        level = cashDeposit.amount * 0.023
    } else if (totalReferrals >= 5 && totalReferrals <= 9) {
        level = cashDeposit.amount * 0.024
    } else if (totalReferrals >= 10 && totalReferrals <= 14) {
        level = cashDeposit.amount * 0.035
    } else if (totalReferrals >= 15 && totalReferrals <= 19) {
        level = cashDeposit.amount * 0.04
    } else if (totalReferrals >= 20) {
        level = cashDeposit.amount * 0.045
    }

    var totalAmount = additionalAmount + cashDeposit.amount + level

    totalAmount -= 1

    user.balance += totalAmount


    //Passing To Referral
    await distributeReferralBonus(user, level);

    await user.save()

    res.status(200).json({ status: 'success', cashDeposit, message: 'Balance is successfully updated' });

};

module.exports = { approveCashDeposit }