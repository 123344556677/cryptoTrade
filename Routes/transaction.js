const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { CashDeposited } = require('../Controller/transaction/cashDeposit')

router.post('/CashDeposited', Authentication, upload.single("TransactionImage"), CashDeposited)

module.exports = router