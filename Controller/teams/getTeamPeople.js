const User = require('../../models/User');
const TeamCommunity = require('../../models/TeamCommunity');
const EarningsHistory = require('../../models/EarningsHistory');
const { NotFoundError } = require('../../errors');

const getTeamPeople = async (req, res) => {
    const userId = req.user.userId;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Fetch direct referrals
    const directReferrals = await User.find({ _id: { $in: user.directReferrals } }).select('email createdAt');
    const directReferralData = directReferrals.map(referral => ({
        email: referral.email,
        type: 'Direct',
        registrationTime: referral.createdAt
    }));

    // Fetch indirect referrals
    const indirectReferrals = await User.find({ _id: { $in: user.indirectReferrals } }).select('email createdAt');
    const indirectReferralData = indirectReferrals.map(referral => ({
        email: referral.email,
        type: 'Indirect',
        registrationTime: referral.createdAt
    }));

    // Combine direct and indirect referral data
    const data = [...directReferralData, ...indirectReferralData];


    res.status(200).json({ status: 'success', data });
};

module.exports = { getTeamPeople };
