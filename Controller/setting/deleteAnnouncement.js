const Announcement = require('../../models/Announcement');
const { NotFoundError } = require('../../errors');

// Delete an image from the slider
const deleteAnnouncement = async (req, res) => {
    const { announcementId } = req.params;

    // Find the ImageSlider document
    let TotalAnnouncements = await Announcement.findOne();
    if (!TotalAnnouncements) {
        throw new NotFoundError('Announcements are not created yet.' );
    }

    // Find the index of the image to be deleted
    const announcementIndex = TotalAnnouncements.announcements.findIndex(annc => annc._id.toString() === announcementId);
    if (announcementIndex === -1) {
        throw new NotFoundError('Announcement not found' );
    }

    // Remove the image from the images array
    TotalAnnouncements.announcements.splice(announcementIndex, 1);

    // Save the updated ImageSlider
    await TotalAnnouncements.save();

    res.status(200).json({ status: 'success', message: 'Announcement deleted successfully', announcements :TotalAnnouncements.announcements });
};

module.exports = { deleteAnnouncement };
