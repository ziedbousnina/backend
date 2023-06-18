const mongoose = require('mongoose')
const { Schema } = mongoose

const governorateSchema = new Schema({
  name: String,
  municipalities: [String],

})
   

module.exports = mongoose.model('Governorate', governorateSchema)
