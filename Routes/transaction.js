const express = require('express');
const { body } = require('express-validator');

//Middlewares

const Authentication = require('../middleware/authentication')
const validatorMiddleware = require('../middleware/Validator-MiddleWare');

//Router
const router = express.Router()


//Controllers
const { createCashDeposit } = require('../Controller/transaction/createCashDeposit')
const { checkWalletAddress } = require('../Controller/transaction/checkWalletAddress')
const { createCashWithDrawal } = require('../Controller/transaction/createCashWithDrawal')
const { getAdminWalletAddress } = require('../Controller/transaction/getAdminWalletAddress')
const { getHistory } = require('../Controller/transaction/getHistory')
const { getLevel } = require('../Controller/transaction/getLevel')

router.post('/createCashDeposit', Authentication, [
    body('transactionNumber').not().notEmpty().isString().withMessage('Invalid Transaction Number'),
    body('amount').not().notEmpty().not().isString().withMessage('Amount should not be String').isNumeric().withMessage('Invalid Amount'),
    body('image').not().notEmpty().isString().withMessage('Invalid Image')
],
    validatorMiddleware, createCashDeposit)

router.post('/checkWalletAddress', Authentication, [
    body('walletAddress').not().notEmpty().isString().withMessage('Invalid Wallet Address'),
    body('fundPassword').not().notEmpty().isString().withMessage('Invalid Fund Password')
],
    validatorMiddleware, checkWalletAddress)

router.post('/createCashWithDrawal', Authentication, [
    body('walletAddress').not().notEmpty().isString().withMessage('Invalid Wallet Adress'),
    body('amount').not().notEmpty().isNumeric().withMessage('Invalid amount'),
    body('type').not().notEmpty().isString().withMessage('Invalid type'),
    body('fundPassword').not().notEmpty().isString().withMessage('Invalid Fund Password')
],
    validatorMiddleware, createCashWithDrawal)

router.get('/getAdminWalletAddress', Authentication, getAdminWalletAddress)
router.get('/getHistory', Authentication, getHistory)
router.get('/getLevel', Authentication, getLevel)

module.exports = router