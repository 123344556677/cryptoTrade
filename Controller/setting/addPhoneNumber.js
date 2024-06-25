const PhoneNumber = require('../../models/PhoneNumber');
const { BadRequestError } = require('../../errors');

// Update ImageSlider to add an image
const addPhoneNumber = async (req, res) => {
    const { number } = req.body;

    // Check if an ImageSlider document already exists, if not, create one
    let TotalPhoneNumber = await PhoneNumber.findOne();
    if (!TotalPhoneNumber) {
        TotalPhoneNumber = new PhoneNumber({ images: [] });
    }

    // Add the new image to the images array
    TotalPhoneNumber.numbers.push({ number });

    // Save the updated ImageSlider
    await TotalPhoneNumber.save();

    res.status(200).json({ status: 'success', numbers: TotalPhoneNumber.numbers });
};

module.exports = { addPhoneNumber };
