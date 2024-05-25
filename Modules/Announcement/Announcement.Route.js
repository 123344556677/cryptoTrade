const express = require('express')
const router = express.Router()

const AnnouncementController =   require('./Announcement.Controller');
// Retrieve all brand
router.get('/', AnnouncementController.findAll); 

// Create a new brand
router.post('/', AnnouncementController.create);


module.exports = router
