const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const binSchema1 = mongoose.Schema(
  {
    name: String,
    location: String,
    address: String,
    lat: String,
    long: String,
    type: String,
    capacity: String,
    status: Boolean,
    gaz: String,
    niv: String,
    topicGaz: { type: String, unique: true },
    topicNiv: { type: String, unique: true },
    topicOuv: { type: String, unique: true },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Bin1', binSchema1);
