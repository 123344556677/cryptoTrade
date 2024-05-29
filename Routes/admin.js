const express = require('express');
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')
const isAdmin = require('../middleware/isAdmin');

//Router
const router = express.Router()

//Controllers
const { getApprovedCashDeposited } = require('../Controller/admin/getApprovedCashDeposited')
const { getApprovedCashWithDrawal } = require('../Controller/admin/getApprovedCashWithDrawal')
const { getPendingCashDeposited } = require('../Controller/admin/getPendingCashDeposited')
const { getPendingCashWithDrawal } = require('../Controller/admin/getPendingCashWithDrawal')
const { approveCashDeposit } = require('../Controller/admin/approveCashDeposit')
const { approveCashWithDrawal } = require('../Controller/admin/approveCashWithDrawal')
const { getInformation } = require('../Controller/admin/getInformation')
const { getAllUsers } = require('../Controller/admin/getAllUsers')
const { deleteUser } = require('../Controller/admin/deleteUser')
const { deleteCashDeposit } = require('../Controller/admin/deleteCashDeposit')
const { deleteCashWithDrawal } = require('../Controller/admin/deleteCashWithDrawal')

router.get('/getInformation', Authentication, isAdmin ,getInformation)
router.get('/getApprovedCashDeposited', Authentication, isAdmin ,getApprovedCashDeposited)
router.get('/getPendingCashDeposited', Authentication, isAdmin ,getPendingCashDeposited)
router.patch('/approveCashDeposit/:id', Authentication,
[
    param('id').not().notEmpty().isMongoId().withMessage('Invalid CashDeposit Id')
], validatorMiddleware,
isAdmin , approveCashDeposit)

router.get('/getAllUsers', Authentication, isAdmin, getAllUsers)

router.delete('/deleteUser/:userId', Authentication, [
    param('userId').not().notEmpty().isMongoId().withMessage('Invalid userId')
], validatorMiddleware, isAdmin ,deleteUser)

router.delete('/deleteCashDeposit/:CashDepositId', Authentication, [
    param('CashDepositId').not().notEmpty().isMongoId().withMessage('Invalid CashDeposit Id')
], validatorMiddleware, isAdmin ,deleteCashDeposit)

//Cash WithDrawal

router.get('/getApprovedCashWithDrawal', Authentication, isAdmin ,getApprovedCashWithDrawal)
router.get('/getPendingCashWithDrawal', Authentication, isAdmin ,getPendingCashWithDrawal)

router.patch('/approveCashWithDrawal/:id', Authentication,
[
    param('id').not().notEmpty().isMongoId().withMessage('Invalid cash withDrawal Id'),
    body('status').not().notEmpty().isString().withMessage('Invalid status')
], validatorMiddleware,
isAdmin , approveCashWithDrawal)

router.delete('/deleteCashWithDrawal/:CashWithDrawalId', Authentication, [
    param('CashWithDrawalId').not().notEmpty().isMongoId().withMessage('Invalid Cash WithDrawal Id')
], validatorMiddleware, isAdmin ,deleteCashWithDrawal)


module.exports = router