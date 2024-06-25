const PhoneNumber = require('../../models/PhoneNumber');
const { NotFoundError } = require('../../errors');

// Delete an image from the slider
const deletePhoneNumber = async (req, res) => {
    const { phoneNumberId } = req.params;

    // Find the ImageSlider document
    let TotalPhoneNumber = await PhoneNumber.findOne();
    if (!TotalPhoneNumber) {
        throw new NotFoundError('Announcements are not created yet.' );
    }

    // Find the index of the image to be deleted
    const PhoneNumberIndex = TotalPhoneNumber.numbers.findIndex(num => num._id.toString() === phoneNumberId);
    if (PhoneNumberIndex === -1) {
        throw new NotFoundError('Announcement not found' );
    }

    // Remove the image from the images array
    TotalPhoneNumber.numbers.splice(PhoneNumberIndex, 1);

    // Save the updated ImageSlider
    await TotalPhoneNumber.save();

    res.status(200).json({ status: 'success', message: 'Phone number deleted successfully', numbers: TotalPhoneNumber.numbers });
};

module.exports = { deletePhoneNumber };
