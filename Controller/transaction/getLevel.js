const User = require('../../models/User');
const Quantization = require('../../models/Quantization');
const { NotFoundError } = require('../../errors');

const getLevel = async (req, res) => {
    const userId = req.user.userId
    const user = await User.findById(userId)

    if (!user) {
        throw new NotFoundError('User not Found!')
    }

    let quantization = await Quantization.findOne({ userId });

    if (!quantization) {
        quantization = new Quantization({userId})
    }


    // Find total number of direct referrals
    const directReferrals = await User.find({ _id: { $in: user.directReferrals } }).countDocuments();

    // Find total number of indirect referrals
    const indirectReferrals = await User.find({ _id: { $in: user.indirectReferrals } }).countDocuments();

    // Calculate total number of referrals
    const totalReferrals = directReferrals + indirectReferrals;

    var level = '';
    quantization.vipLevel = 0;
    if (totalReferrals <= 2) {

        if(user.balance >= 100){
            level = 'Vip1';
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 3 && totalReferrals <= 4) {

        if(user.balance >= 300){
            level = 'Vip2';
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            level = 'Vip1';
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 5 && totalReferrals <= 9) {

        if(user.balance >= 1000){
            level = 'Vip3';
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            level = 'Vip2';
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            level = 'Vip1';
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 10 && totalReferrals <= 14) {
        
        if(user.balance >= 5000){
            level = 'Vip4';
            quantization.vipLevel = 4;
        }else if(user.balance >= 1000){
            level = 'Vip3';
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            level = 'Vip2';
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            level = 'Vip1';
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 15 && totalReferrals <= 19) {

        if(user.balance >= 10000){
            level = 'Vip5';
            quantization.vipLevel = 5;
        }else if(user.balance >= 5000){
            level = 'Vip4';
            quantization.vipLevel = 4;
        }else if(user.balance >= 1000){
            level = 'Vip3';
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            level = 'Vip2';
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            level = 'Vip1';
            quantization.vipLevel = 1;
        }else{

        }

    } else if (totalReferrals >= 20) {

        if(user.balance >= 20000){
            level = 'Vip6';
            quantization.vipLevel = 6;
        }else if(user.balance >= 10000){
            level = 'Vip5';
            quantization.vipLevel = 5;
        }else if(user.balance >= 5000){
            level = 'Vip4';
            quantization.vipLevel = 4;
        }else if(user.balance >= 1000){
            level = 'Vip3';
            quantization.vipLevel = 3;
        }else if(user.balance >= 300){
            level = 'Vip2';
            quantization.vipLevel = 2;
        }else if(user.balance >= 100){
            level = 'Vip1';
            quantization.vipLevel = 1;
        }else{

        }

    }

    await quantization.save()

    res.status(200).json({ status: 'success', level })
}

module.exports = { getLevel }
