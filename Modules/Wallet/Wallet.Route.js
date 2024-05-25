const express = require('express')
const router = express.Router()

const walletController =   require('./Wallet.Controller');
// Retrieve all brand
router.get('/', walletController.findAll); 

// Create a new brand
router.post('/', walletController.create);


module.exports = router
