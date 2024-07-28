const Announcement = require('../../models/Announcement');

// Update ImageSlider to add an image
const getAnnouncement = async (req, res) => {

    const announcements = await Announcement.find({});

    res.status(200).json({ status: 'success', announcements: announcements[0].announcements });
};

module.exports = { getAnnouncement };
