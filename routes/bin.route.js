const express = require('express');
const passport = require('passport');
const { ROLES, isRole } = require('../security/Rolemiddleware');
const { addBinToScepcifiqueCompany, CreateAccess } = require('../controllers/Access.controller');
const { CreateBin, getAllBins } = require('../controllers/Bin.controller');

const router = express.Router()


router.route('/').post( CreateBin )
router.route('/getAllBins').get( getAllBins )









module.exports = router