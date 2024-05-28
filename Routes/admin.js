const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')
const isAdmin = require('../middleware/isAdmin');

//Router
const router = express.Router()

//Controllers
const { getApprovedCashDeposited } = require('../Controller/admin/getApprovedCashDeposited')
const { getPendingCashDeposited } = require('../Controller/admin/getPendingCashDeposited')
const { approvedPendingCashDeposit } = require('../Controller/admin/approvedPendingCashDeposit')
const { getInformation } = require('../Controller/admin/getInformation')


router.get('/getInformation', Authentication, isAdmin ,getInformation)
router.get('/getApprovedCashDeposited', Authentication, isAdmin ,getApprovedCashDeposited)
router.get('/getPendingCashDeposited', Authentication, isAdmin ,getPendingCashDeposited)
router.patch('/getPendingCashDeposited/:id', Authentication, isAdmin , approvedPendingCashDeposit)

module.exports = router