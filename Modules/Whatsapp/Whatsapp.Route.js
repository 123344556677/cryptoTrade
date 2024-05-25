const express = require('express')
const router = express.Router()

const WhatsappController =   require('./Whatsapp.Controller');
// Retrieve all brand
router.get('/', WhatsappController.findAll); 

// Create a new brand
router.post('/', WhatsappController.create);


module.exports = router
