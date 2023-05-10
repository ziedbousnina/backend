const express = require('express');
const passport = require('passport');
const { ROLES, isRole } = require('../security/Rolemiddleware');

const { CreatePointBin, getAllPointBins, AddBinToPointBin } = require('../controllers/pointBin.controller');

const router = express.Router()


router.route('/').post( CreatePointBin )
router.route('/getAllBins').get( getAllPointBins )
router.route('/AddBinToPointBin').put( AddBinToPointBin )









module.exports = router