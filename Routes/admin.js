const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { getApprovedCashDeposited } = require('../Controller/admin/getApprovedCashDeposited')
const { getPendingCashDeposited } = require('../Controller/admin/getPendingCashDeposited')
const { approvedPendingCashDeposit } = require('../Controller/admin/approvedPendingCashDeposit')


router.get('/getApprovedCashDeposited', Authentication, getApprovedCashDeposited)
router.get('/getPendingCashDeposited', Authentication, getPendingCashDeposited)
router.patch('/getPendingCashDeposited/:id', Authentication, approvedPendingCashDeposit)

module.exports = router