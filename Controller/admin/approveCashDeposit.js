const CashDeposit = require('../../models/CashDeposit')
const { NotFoundError, BadRequestError } = require('../../errors')
const User = require('../../models/User')
const Quantization = require('../../models/Quantization');
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


    let quantization = await Quantization.findOne({ userId });

    if (!quantization) {
        quantization = new Quantization({userId})
    }

    //Quantization logic for vip
    //var level = 0;
    quantization.vipLevel = 0;
    if ( totalReferrals <= 2) {

        if(user.balance >= 100){
            //level = cashDeposit.amount * 0.022
            quantization.vipLevel = 1;
        }else{

        }

        
    } else if (totalReferrals >= 3 && totalReferrals <= 4) {

        if(user.balance >= 300){
            //level = cashDeposit.amount * 0.023
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            //level = cashDeposit.amount * 0.022
            quantization.vipLevel = 1;
        }else{

        }
        
    } else if (totalReferrals >= 5 && totalReferrals <= 9) {

        if(user.balance >= 1000){
            //level = cashDeposit.amount * 0.024
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            //level = cashDeposit.amount * 0.023
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            //level = cashDeposit.amount * 0.022
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 10 && totalReferrals <= 14) {

        if(user.balance >= 5000){
            //level = cashDeposit.amount * 0.035
            quantization.vipLevel = 4;
        }else if(user.balance >= 1000){
            //level = cashDeposit.amount * 0.024
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            //level = cashDeposit.amount * 0.023
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            //level = cashDeposit.amount * 0.022
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 15 && totalReferrals <= 19) {

        if(user.balance >= 10000){
            //level = cashDeposit.amount * 0.04
            quantization.vipLevel = 5;
        }else if(user.balance >= 5000){
            //level = cashDeposit.amount * 0.035
            quantization.vipLevel = 4;
        }else if(user.balance >= 1000){
            //level = cashDeposit.amount * 0.024
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            //level = cashDeposit.amount * 0.023
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            //level = cashDeposit.amount * 0.022
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 20) {

        if(user.balance >= 20000){
            //level = cashDeposit.amount * 0.045
            quantization.vipLevel = 6;
        }else if(user.balance >= 10000){
            //level = cashDeposit.amount * 0.04
            quantization.vipLevel = 5;
        }else if(user.balance >= 5000){
            //level = cashDeposit.amount * 0.035
            quantization.vipLevel = 4;
        }else if(user.balance >= 1000){
            //level = cashDeposit.amount * 0.024
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            //level = cashDeposit.amount * 0.023
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            //level = cashDeposit.amount * 0.022
            quantization.vipLevel = 1;
        }else{

        }

    }

    await quantization.save()

    var totalAmount = additionalAmount + cashDeposit.amount + level

    totalAmount -= 1

    user.balance += totalAmount


    //Passing To Referral
    await distributeReferralBonus(user, level);

    await user.save();

    res.status(200).json({ status: 'success', cashDeposit, message: 'Balance is successfully updated' });

};

module.exports = { approveCashDeposit }