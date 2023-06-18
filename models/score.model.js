const mongoose = require('mongoose')
const { Schema } = mongoose

const scoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  gift: [{
    type: Schema.Types.ObjectId,
    ref: 'Gift',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Score', scoreSchema)
