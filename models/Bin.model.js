const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const binSchema1 = mongoose.Schema(
    {
        name: String,
        location: String,
        address :String,
        lat: String,
        long: String, 
        type: String,
        capacity: String,
        status: Boolean,
        gaz : String,
        niv : String,
        topicGaz :String,
        topicNiv :String,
        topicOuv: String


       
      

    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Bin1', binSchema1)

