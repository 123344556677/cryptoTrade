const User = require('../../models/User');
const { NotFoundError } = require('../../errors');

const getMyReferral = async (req, res) => {
    const userId = req.user.userId;

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const myReferral = user.myReferral
    const referralLink = `https://uhcstock.com/signup?referral=${myReferral}`;
    

    res.status(200).json({ status: 'success', referralLink });
};

module.exports = { getMyReferral };
