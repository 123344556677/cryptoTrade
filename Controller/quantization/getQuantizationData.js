
const Quantization = require('../../models/Quantization');
const User = require('../../models/User');

// Update ImageSlider to add an image
const getQuantizationData = async (req, res) => {

    const userId = req.user.userId

    // Ensure the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User not found');
    }

    const quantization = await Quantization.findOne({userId});

    res.status(200).json({ status: 'success', quantization });
};

module.exports = { getQuantizationData };
