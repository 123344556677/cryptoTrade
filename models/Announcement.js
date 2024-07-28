const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    announcement: {
        type: String
    }
});

const AnnouncementListSchema = new mongoose.Schema({
    announcements: [AnnouncementSchema]
});

module.exports = mongoose.model('Announcement', AnnouncementListSchema);
