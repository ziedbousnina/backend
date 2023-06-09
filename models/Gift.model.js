const mongoose = require('mongoose')
const { Schema } = mongoose

const giftSchema = new Schema({
  rechargeNumber: {
    type: String,
    required: true,
  },
  // Other gift properties
}, { timestamps: true });

module.exports = mongoose.model('Gift', giftSchema)
