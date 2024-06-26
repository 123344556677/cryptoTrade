const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')

//Router
const router = express.Router()

//Controllers
const { handleUserClick } = require('../Controller/quantization/handleUserClick')
const { getCryptoRates } = require('../Controller/quantization/getCryptoRates')
const { getUnitedHealthStockRate } = require('../Controller/quantization/getUnitedHealthStockRate')

router.get('/handleUserClick', Authentication, handleUserClick)
router.get('/getCryptoRates', Authentication, getCryptoRates)
router.get('/getUnitedHealthStockRate', Authentication, getUnitedHealthStockRate)

module.exports = router