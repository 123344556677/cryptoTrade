const PhoneNumber = require('../../models/PhoneNumber');

// Update ImageSlider to add an image
const getPhoneNumber = async (req, res) => {

    const TotalPhoneNumber = await PhoneNumber.find({});

    res.status(200).json({ status: 'success', numbers: TotalPhoneNumber[0].numbers });
};

module.exports = { getPhoneNumber };
