const express = require('express');



const { Addpartnership, FetchAll, FetchAllPartnership, FetchPartnerShipById, AcceptPartnerShip, createContactUS, FetchAllContactUs, FetchContactById, MarkASReadedContactUs, createQuote, createTechAssistance, MarkASReadedPartnerShip, FetchAllQuote, FetchQuoteById, MarkASReadedQuote, FetchTechAssist, FetchTechAssistById, MarkASReadedTechAssist } = require('../controllers/Sites.controller');
const { AddPointScore, findScore } = require('../controllers/Score.controller');
const passport = require('passport');


const router = express.Router()


router.route('/addScore').post(passport.authenticate('jwt', {session: false}), AddPointScore )
router.route('/findScore').get(passport.authenticate('jwt', {session: false}), findScore )











module.exports = router