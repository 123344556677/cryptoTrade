const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')

//Router
const router = express.Router()

//Controllers
const { getTeamData } = require('../Controller/teams/getTeamData')
const { getMyReferral } = require('../Controller/teams/getMyReferral')

router.get('/getTeamData', Authentication, getTeamData)
router.get('/getMyReferral', Authentication, getMyReferral)

module.exports = router