const express = require('express');
const passport = require('passport');
const { ROLES, isRole } = require('../security/Rolemiddleware');
const { addBinToScepcifiqueCompany, CreateAccess, getCurentAccess } = require('../controllers/Access.controller');
const router = express.Router()

router.route('/addBin').put( passport.authenticate('jwt', {session: false}),isRole(ROLES.PRIVATE_COMPANY, ROLES.ADMIN), addBinToScepcifiqueCompany )
router.route('/createAccess').post( CreateAccess )
router.route('/currentAccess').get( passport.authenticate('jwt', {session: false}), getCurentAccess  )









module.exports = router