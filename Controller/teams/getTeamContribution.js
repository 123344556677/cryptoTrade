const User = require('../../models/User');
const EarningsHistory = require('../../models/EarningsHistory');
const { NotFoundError } = require('../../errors');

const getTeamContribution = async (req, res) => {
    const userId = req.user.userId;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Fetch direct referrals
    const directReferrals = await User.find({ _id: { $in: user.directReferrals } }).select('email');
    const directReferralData = await Promise.all(directReferrals.map(async referral => {
        const incomeDocuments = await EarningsHistory.find( { senderUserId: referral._id, receiverUserId: userId });

        const totalIncome = incomeDocuments.reduce((acc, curr) => acc + curr.amount, 0);

        return {
            email: referral.email,
            type: 'Direct',
            income: totalIncome
        };
    }));

    // Fetch indirect referrals
    const indirectReferrals = await User.find({ _id: { $in: user.indirectReferrals } }).select('email');
    const indirectReferralData = await Promise.all(indirectReferrals.map(async referral => {
        console.log(referral._id);
        const incomeDocuments = await EarningsHistory.find( { senderUserId: referral._id, receiverUserId: userId });

        const totalIncome = incomeDocuments.reduce((acc, curr) => acc + curr.amount, 0);

        return {
            email: referral.email,
            type: 'Indirect',
            income: totalIncome
        };
    }));

    // Combine direct and indirect referral data
    const data = [...directReferralData, ...indirectReferralData];

    res.status(200).json({ status: 'success', data });
};

module.exports = { getTeamContribution };
