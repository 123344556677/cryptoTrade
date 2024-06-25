//Admin settings routes

const express = require('express');
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')
const isAdmin = require('../middleware/isAdmin');

//Router
const router = express.Router()

//Controllers
const { addAnnouncement } = require('../Controller/setting/addAnnouncement')
const { addPhoneNumber } = require('../Controller/setting/addPhoneNumber')
const { deleteAnnouncement } = require('../Controller/setting/deleteAnnouncement')
const { deletePhoneNumber } = require('../Controller/setting/deletePhoneNumber')
const { getAnnouncement } = require('../Controller/setting/getAnnouncement')
const { getPhoneNumber } = require('../Controller/setting/getPhoneNumber')


router.get('/getAnnouncement', Authentication, getAnnouncement)


router.patch('/addAnnouncement', Authentication, [
    body('announcement').not().notEmpty().isString().withMessage('Announcement should be String')
]
, validatorMiddleware, isAdmin ,addAnnouncement)

router.delete('/deleteAnnouncement/:announcementId', Authentication, [
    param('announcementId').not().notEmpty().isMongoId().withMessage('Invalid announcement Id')
], validatorMiddleware, isAdmin ,deleteAnnouncement)

router.patch('/addPhoneNumber', Authentication, [
    body('number').not().notEmpty().isString().withMessage('phoneNumber should be String')
]
, validatorMiddleware, isAdmin ,addPhoneNumber)

router.delete('/deletePhoneNumber/:phoneNumberId', Authentication, [
    param('phoneNumberId').not().notEmpty().isMongoId().withMessage('Invalid phoneNumber Id')
], validatorMiddleware, isAdmin ,deletePhoneNumber)


router.get('/getPhoneNumber', Authentication, getPhoneNumber)

module.exports = router