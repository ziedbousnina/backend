const express = require('express');
const passport = require('passport');
const { ROLES, isRole } = require('../security/Rolemiddleware');
const { addBinToScepcifiqueCompany, CreateAccess } = require('../controllers/Access.controller');
const { CreateBin, getAllBins, getBinsCount } = require('../controllers/Bin.controller');
const { CreateBin2, fetchAllBins, updateStatus, FetchBinsNotInPointBin, fetchBinByID, fetchAccessListBinByUser, OpenBinByIDBin, fetchAllPointBinsAndHerBinsByUserId, deleteBin, UpdateBin, FetchBinsNotInPointBinByMunicipal, FetchBinsNotInPointBins } = require('../controllers/Bin2.controller');
const { fetchAllPointBins } = require('../controllers/PoinBinV2.controller');


const router = express.Router()


router.route('/').post( CreateBin )
router.route('/createBin').post( CreateBin2 )
router.route('/getAllBins').get( getAllBins )
router.route('/FetchAllBins').get( fetchAllBins )
router.route('/FetchAllBinsNotInPointBin').get( FetchBinsNotInPointBin )
router.route('/fetchAllPointBins').get( fetchAllPointBins )
router.route('/getBinsCount').get( getBinsCount )
router.route('/FetchBinsNotInPointBins').get( FetchBinsNotInPointBins )
router.route('/FetchBinsNotInPointBinByMunicipal/:municipal').get( FetchBinsNotInPointBinByMunicipal )
router.route("/fetchCurrentAccessList").get(passport.authenticate('jwt', {session: false}),fetchAccessListBinByUser)
router.route("/fetchAllPointBinsAndHerBinsByUserId").get(passport.authenticate('jwt', {session: false}),fetchAllPointBinsAndHerBinsByUserId)
router.route('/deleteBinById/:id').delete(deleteBin)
router.route("/openBin/:id").put(passport.authenticate('jwt', {session: false}),OpenBinByIDBin)
router.route('/fetchBinByID/:id').get( fetchBinByID )
router.route('/updateStatus/:id').put( updateStatus )
router.route('/updateBin/:id').put( UpdateBin )











module.exports = router