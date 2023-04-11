const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const accessListSchema = mongoose.Schema(

    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'

        },
        bins: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bin'
            }
        ],
        code: Number,


    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('AccessListBins', accessListSchema)
