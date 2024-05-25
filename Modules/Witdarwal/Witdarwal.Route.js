const express = require('express')
const router = express.Router()

const witdarwalController =   require('./Witdarwal.Controller');
// Retrieve all brand
router.get('/', witdarwalController.findAll); 

// Create a new brand
router.post('/', witdarwalController.create);

router.get('/:id', witdarwalController.findByWallet);

router.get('/:id', witdarwalController.findByWitdarwal);

module.exports = router
