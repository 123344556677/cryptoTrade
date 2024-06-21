const User = require('../../models/User');
const { NotFoundError } = require('../../errors');

const getLevel = async (req, res) => {
    const userId = req.user.userId
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

    var level = '';
    if (totalReferrals <= 2) {
        level = 'Vip1';
    } else if (totalReferrals >= 3 && totalReferrals <= 4) {
        level = 'Vip2';
    } else if (totalReferrals >= 5 && totalReferrals <= 9) {
        level = 'Vip3';
    } else if (totalReferrals >= 10 && totalReferrals <= 14) {
        level = 'Vip4';
    } else if (totalReferrals >= 15 && totalReferrals <= 19) {
        level = 'Vip5';
    } else if (totalReferrals >= 20) {
        level = 'Vip6';
    }

    res.status(200).json({ status: 'success', level })
}

module.exports = { getLevel }
