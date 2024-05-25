const express = require('express')
const router = express.Router()

const aboutController =   require('./About.Controller');
// Retrieve all brand
router.get('/', aboutController.findAll); 

// Create a new brand
router.post('/', aboutController.create);


module.exports = router
