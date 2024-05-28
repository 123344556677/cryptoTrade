const express = require('express');
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')
const upload = require('../middleware/multer');

//Router
const router = express.Router()

//Controllers
const { login } = require('../Controller/auth/login')
const { signup } = require('../Controller/auth/signup')
const { changePassword } = require('../Controller/auth/changePassword')
const { sendOtpToEmail, checkOTP, setNewPassword } = require('../Controller/auth/forgetPassword')
const { getUser } = require('../Controller/auth/getUser')
const { setProfileImage } = require('../Controller/auth/setProfileImage')
const { updateInformation } = require('../Controller/auth/updateInformation')

router.post('/login',
    [
        body('email').not().notEmpty().isEmail().withMessage('Invalid email address'),
        body('password').not().notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ], validatorMiddleware,
    login)

router.post('/signup', upload.any(),
    // [
    //     body('fname').not().notEmpty().isLength({ min: 3 }).withMessage('Invalid First Name'),
    //     body('lname').not().notEmpty().isLength({ min: 3 }).withMessage('Invalid Last Name'),
    //     body('email').not().notEmpty().isEmail().withMessage('Invalid email address'),
    //     body('password').not().notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    //    ,
    // ], validatorMiddleware,
    signup)

//router.post('/updateCnic',Authentication, upload.single("cnic"), updateCnic)

router.patch('/updateInformation',Authentication,
[
    body('fname').optional().isLength({ min: 3 }).withMessage('Invalid First Name'),
    body('lname').optional().isLength({ min: 3 }).withMessage('Invalid Last Name'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('fundPassword').optional().isNumeric().withMessage('Invalid Fund Password'),
 ],validatorMiddleware, updateInformation)

router.patch('/changePassword', Authentication,
    [
        body('currentpassword').not().notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('newpassword').not().notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ], validatorMiddleware,
    changePassword)

router.post('/forgetPassword/sendOtpToEmail',
    //  [
    //    //body('email').not().notEmpty().isEmail().withMessage('Invalid email address')
    //  ],validatorMiddleware, 
    sendOtpToEmail)

router.post('/forgetPassword/checkOTP', Authentication,
    //  [
    //    // body('code').not().notEmpty().isNumeric().withMessage('Invalid email address')
    //  ],validatorMiddleware, 
    checkOTP)

router.patch('/forgetPassword/setNewPassword', Authentication,
    //  [
    //     body('password').not().notEmpty().isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    //  ],validatorMiddleware,
    setNewPassword)

router.get('/getUser/:userId', Authentication, [
    param('userId').not().notEmpty().isMongoId().withMessage('Invalid userId format')
], getUser)

router.post('/setProfileImage', Authentication, upload.single("profileImage"), setProfileImage)

module.exports = router