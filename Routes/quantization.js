const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')

//Router
const router = express.Router()

//Controllers
const { handleUserClick } = require('../Controller/quantization/handleUserClick')
const { getCryptoRates } = require('../Controller/quantization/getCryptoRates')

router.get('/handleUserClick', Authentication, handleUserClick)
router.get('/getCryptoRates', Authentication, getCryptoRates)

module.exports = router