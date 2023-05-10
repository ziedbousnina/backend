const express = require('express');
const passport = require('passport');
const { ROLES, isRole } = require('../security/Rolemiddleware');
const { AddCleaningService, findSingleCleaningService, findDemandeInProgressMunicipal, findDemandeInProgressAdmin, DeleteRequest } = require('../controllers/CleaningService.controller');



const router = express.Router()


router.route('/').post(passport.authenticate('jwt', {session: false}),isRole(ROLES.USER, ROLES.ADMIN, ROLES.MUNICIPAL, ROLES.PRIVATE_COMPANY), AddCleaningService )
router.route('/findSingleCleaningService').get(passport.authenticate('jwt', {session: false}),isRole(ROLES.USER, ROLES.ADMIN, ROLES.MUNICIPAL, ROLES.PRIVATE_COMPANY), findSingleCleaningService )
// router.route('/AddBinToPointBin').put( AddBinToPointBin )
router.route('/findDemandeInProgressMunicipal').get(findDemandeInProgressMunicipal)
router.route('/findDemandeInProgressAdmin').get(findDemandeInProgressAdmin)
router.route('/delete/:requestId').delete(DeleteRequest)









module.exports = router