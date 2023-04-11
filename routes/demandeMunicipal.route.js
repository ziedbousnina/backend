const express = require('express');
const passport = require('passport');
const router = express.Router()

const { AddDemandeMunicipal, findDemandeInProgress, findAllDemande, AcceptDemande, findSingleRequest } = require('../controllers/DemandeMunicipal.controller');
const { ROLES, isRole } = require('../security/Rolemiddleware');


router.route('/').post(passport.authenticate('jwt', {session: false}), AddDemandeMunicipal)
router.route('/findAll').get( findAllDemande)
router.route('/findDemandeInProgress').get( findDemandeInProgress)
// router.route('/AcceptDemande/:id').put(passport.authenticate('jwt', {session: false}),isRole(ROLES.ADMIN),AcceptDemande)
router.route('/AcceptDemande/:id').put(AcceptDemande)
router.route('/').get( passport.authenticate('jwt', {session: false}),isRole( ROLES.ADMIN, ROLES.MUNICIPAL, ROLES.PRIVATE_COMPANY), findSingleRequest )



module.exports = router