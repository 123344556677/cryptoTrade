const express = require('express');
const { body } = require('express-validator');

//Middlewares

const Authentication = require('../middleware/authentication')
const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { createCashDeposit } = require('../Controller/transaction/createCashDeposit')
const { checkWalletAddress } = require('../Controller/transaction/checkWalletAddress')
const { createCashWithDrawal } = require('../Controller/transaction/createCashWithDrawal')

router.post('/createCashDeposit', Authentication, upload.single("TransactionImage"), createCashDeposit)

router.post('/checkWalletAddress', Authentication, [
    body('walletAddress').not().notEmpty().isString().withMessage('Invalid Wallet Address'),
    body('fundPassword').not().notEmpty().isString().withMessage('Invalid Fund Password')
 ],
 validatorMiddleware, checkWalletAddress)

router.post('/createCashWithDrawal', Authentication,[
    body('walletAddress').not().notEmpty().isString().withMessage('Invalid Wallet Adress'),
    body('amount').not().notEmpty().isNumeric().withMessage('Invalid amount'),
    body('type').not().notEmpty().isString().withMessage('Invalid type'),
    body('fundPassword').not().notEmpty().isString().withMessage('Invalid Fund Password')
 ],
 validatorMiddleware, createCashWithDrawal)

module.exports = router