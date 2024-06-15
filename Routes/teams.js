const express = require('express');

//Middlewares

const Authentication = require('../middleware/authentication')

//Router
const router = express.Router()

//Controllers
const { getTeamData } = require('../Controller/teams/getTeamData')
const { getMyReferral } = require('../Controller/teams/getMyReferral')
const { getTeamPeople } = require('../Controller/teams/getTeamPeople')
const { getTeamContribution } = require('../Controller/teams/getTeamContribution')

router.get('/getTeamData', Authentication, getTeamData)
router.get('/getMyReferral', Authentication, getMyReferral)
router.get('/getTeamPeople', Authentication, getTeamPeople)
router.get('/getTeamContribution', Authentication, getTeamContribution);

module.exports = router