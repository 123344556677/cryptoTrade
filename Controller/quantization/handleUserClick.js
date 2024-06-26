const Quantization = require('../../models/Quantization');
const User = require('../../models/User');
const { NotFoundError, BadRequestError } = require('../../errors');
const { distributeReferralBonus } = require('../../HelpingFunctions/nodemailer')


const handleUserClick = async (req, res) => {
    const userId = req.user.userId;
    const quantization = await Quantization.findOne({ userId });

    if (!quantization) {
        throw new NotFoundError('Quantization record not found!');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found!');
    }

    if (user.balance < 100 || quantization.vipLevel < 1) {
        throw new BadRequestError('User is not eligible to tap. Please check announcements.');
    }

    // Check if a day has passed since the last tap
    const now = new Date();
    const lastTapDate = new Date(quantization.lastTap);
    const isSameDay = now.getDate() === lastTapDate.getDate() &&
        now.getMonth() === lastTapDate.getMonth() &&
        now.getFullYear() === lastTapDate.getFullYear();

    if (!isSameDay) {
        // Reset clicks and lastTap for the new day
        quantization.clicks = 0;
        quantization.lastTap = now;
    }

    const vipLevelToClicks = {
        1: 30,
        2: 28,
        3: 24,
        4: 22,
        5: 20,
        6: 18
    };

    const vipLevelToRatio = {
        1: 0.022,
        2: 0.023,
        3: 0.024,
        4: 0.035,
        5: 0.04,
        6: 0.045
    };

    const maxClicks = vipLevelToClicks[quantization.vipLevel];
    const ratio = vipLevelToRatio[quantization.vipLevel];

    if (quantization.clicks >= maxClicks) {
        throw new BadRequestError('Daily click limit reached. Please try again tomorrow.');
    }

    // Check if the last tap was at least 2 minutes ago
    const timeDifference = (now - new Date(quantization.lastTap)) / 1000 / 60; // convert milliseconds to minutes

    if (timeDifference < 2) {
        throw new BadRequestError('You can only click once every 2 minutes.');
    }

    quantization.clicks += 1;
    quantization.lastTap = now;

    // Calculate and add earnings for this tap
    const earningsPerClick = (user.balance * ratio) / maxClicks;
    user.balance += earningsPerClick;

    await quantization.save();
    //Passing To Referral
    await distributeReferralBonus(user, earningsPerClick);
    await user.save();

    res.status(200).json({ status: 'success', balance: user.balance, clicks: quantization.clicks, totalClicks: maxClicks });
};

module.exports = { handleUserClick };
