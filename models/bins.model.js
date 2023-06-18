const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const binSchema = mongoose.Schema(
    {
        name: String,
        location: String,
        lat: Number,
        lng: Number,
        type: String,
        capacity: Number,
        status: String,
       
        

        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // },



    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Bin', binSchema)

