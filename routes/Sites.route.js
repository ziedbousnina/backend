const express = require('express');



const { Addpartnership, FetchAll, FetchAllPartnership, FetchPartnerShipById, AcceptPartnerShip, createContactUS, FetchAllContactUs, FetchContactById, MarkASReadedContactUs, createQuote, createTechAssistance, MarkASReadedPartnerShip, FetchAllQuote, FetchQuoteById, MarkASReadedQuote } = require('../controllers/Sites.controller');


const router = express.Router()


router.route('/Addpartnership').post( Addpartnership )
router.route('/AddContactUs').post( createContactUS )
router.route('/createQuote').post( createQuote )
router.route('/createTechAssist').post( createTechAssistance )
router.route('/partnerShip/fetchAll').get( FetchAllPartnership )
router.route('/quote/fetchAll').get( FetchAllQuote )
router.route('/contactUs/fetchAll').get( FetchAllContactUs )
router.route('/contactUs/readed/:id').put( MarkASReadedContactUs )
router.route('/quote/fetchByID/:id').get( FetchQuoteById )
router.route('/partnerShip/readed/:id').put( MarkASReadedPartnerShip )
router.route('/Quote/readed/:id').put( MarkASReadedQuote )


router.route('/contactUs/fetchByID/:id').get( FetchContactById )
router.route('/partnerShip/fetchByID/:id').get( FetchPartnerShipById )
router.route('/partnerShip/Accept/:id').put( AcceptPartnerShip )










module.exports = router