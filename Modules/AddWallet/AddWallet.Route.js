const express = require('express')
const router = express.Router()

const witdarwalController =   require('./AddWallet.Controller');
// Retrieve all brand
router.get('/', witdarwalController.findAll); 

// Create a new brand
router.post('/', witdarwalController.create);

router.get('/:id', witdarwalController.findById);

module.exports = router
