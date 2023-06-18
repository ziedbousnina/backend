const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PointBin = mongoose.Schema(
    {
        name: String,
        location: String,
        lat: Number,
        lng: Number,
        // type: String,    
        // capacity: Number,
        // status: String,
        bins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bin'
            }
        ]
       
        

        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // },



    },{
        timestamps: true
    }
)

module.exports = mongoose.model('PointBin', PointBin)

