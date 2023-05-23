const express = require('express');
const passport = require('passport');
const { ROLES, isRole } = require('../security/Rolemiddleware');

const { CreatePointBin, getAllPointBins, AddBinToPointBin } = require('../controllers/PointBin.controller');
const { createPointBinV2, deletePointBin, fetchPointBinByID } = require('../controllers/PoinBinV2.controller');
// const { createPointBinV2 } = require('../controllers/PoinBinV2.controller');

const router = express.Router()


router.route('/').post( CreatePointBin )
router.route('/CreatePointBin').post( createPointBinV2 )
router.route('/getAllBins').get( getAllPointBins )
router.route('/AddBinToPointBin').put( AddBinToPointBin )
router.route('/deletePointBinById/:id').delete(deletePointBin)
router.route('/fetchPointBinByID/:id').get( fetchPointBinByID )








module.exports = router