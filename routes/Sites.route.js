const express = require('express');



const { Addpartnership, FetchAll, FetchAllPartnership, FetchPartnerShipById, AcceptPartnerShip, createContactUS, FetchAllContactUs, FetchContactById, MarkASReadedContactUs } = require('../controllers/Sites.controller');


const router = express.Router()


router.route('/Addpartnership').post( Addpartnership )
router.route('/AddContactUs').post( createContactUS )
router.route('/partnerShip/fetchAll').get( FetchAllPartnership )
router.route('/contactUs/fetchAll').get( FetchAllContactUs )
router.route('/contactUs/readed/:id').put( MarkASReadedContactUs )


router.route('/contactUs/fetchByID/:id').get( FetchContactById )
router.route('/partnerShip/fetchByID/:id').get( FetchPartnerShipById )
router.route('/partnerShip/Accept/:id').put( AcceptPartnerShip )










module.exports = router