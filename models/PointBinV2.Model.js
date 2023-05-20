const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const PointBinV2 = mongoose.Schema(
    {
        // nameOf: String,
        address: String,
        lat:String,
        long: String,
        quoteDemande:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quote',
            required: true,
        },
        bins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Bin1',
                required: true,
                unique: true
            }
        ],
        code: {
          type: Number,
          // required: true,
          // unique: true,
      },

       
        

      


    },{
        timestamps: true
    }
)

PointBinV2.pre('save', async function (next) {
  const access = this;
  if (!access.code) {
      // Generate a random 4-digit code
      let newCode;
      do {
          newCode = Math.floor(Math.random() * 90000) + 10000;
      } while (await pointBinV2.findOne({ code: newCode }));
      access.code = newCode;
  }
  next();
});
const pointBinV2 = mongoose.model('PointBinV2', PointBinV2)
module.exports = pointBinV2;
