const mongoose = require('mongoose');

const accessSchema = mongoose.Schema(

    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // unique: true

        },
        bins: [

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bin',
                // unique: true,
                // required: false,
                
            }
        ],
        code: {
            type: Number,
            // required: true,
            // unique: true,
        },


    }, {
        timestamps: true
    }
)

// Pre-save hook to generate a unique code
accessSchema.pre('save', async function (next) {
    const access = this;
    if (!access.code) {
        // Generate a random 4-digit code
        let newCode;
        do {
            newCode = Math.floor(Math.random() * 90000) + 10000;
        } while (await Access.findOne({ code: newCode }));
        access.code = newCode;
    }
    next();
});

// module.exports = mongoose.model('Access', accessSchema)
const Access = mongoose.model('Access', accessSchema);
module.exports = Access;