const Announcement = require('../../models/Announcement');
const { BadRequestError } = require('../../errors');

// Update ImageSlider to add an image
const addAnnouncement = async (req, res) => {
    const { announcement } = req.body;

    // Check if an ImageSlider document already exists, if not, create one
    let TotalAnnouncements = await Announcement.findOne();
    if (!TotalAnnouncements) {
        TotalAnnouncements = new Announcement({ images: [] });
    }

    // Add the new image to the images array
    TotalAnnouncements.announcements.push({ announcement });

    // Save the updated ImageSlider
    await TotalAnnouncements.save();

    res.status(200).json({ status: 'success', announcements :TotalAnnouncements.announcements });
};

module.exports = { addAnnouncement };
