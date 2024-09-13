const User = require('../../models/User')
const Quantization = require('../../models/Quantization');

const getAllUsers = async (req, res) => {

    const users = await User.find({ role: 'user' });

    // Iterate through each user and find their corresponding Quantization document
    const usersWithVipLevel = await Promise.all(users.map(async (user) => {
        // Find the quantization for the current user
        let quantization = await Quantization.findOne({ userId: user._id });

        // If quantization doesn't exist, create a new one
        if (!quantization) {
            quantization = new Quantization({ userId: user._id });
            await quantization.save();
        }

        // Merge vipLevel with user data
        return { ...user.toObject(), vipLevel: quantization.vipLevel };
    }));


    res.status(200).json({ status: 'success', users: usersWithVipLevel });

};

module.exports = { getAllUsers }