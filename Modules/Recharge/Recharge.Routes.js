const express = require('express')
const router = express.Router()

const rechargeController =   require('./Rechrage.Controller');
// Retrieve all brand
router.get('/', rechargeController.findAll); 

// Create a new brand
router.post('/', rechargeController.create);

router.get('/:id', rechargeController.findById);

module.exports = router
