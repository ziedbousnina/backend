const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PointBin = mongoose.Schema(
    {
        name: String,
        location: String,
        bins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bin1'
            }
        ]
       
        

      


    },{
        timestamps: true
    }
)

module.exports = mongoose.model('PointBin', PointBin)

