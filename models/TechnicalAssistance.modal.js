const mongoose = require('mongoose')
const { Schema } = mongoose

const TechnicalAssistanceModel = new Schema({
 name: {
    type:String,
    required:true,
 },
  email: {  
    type:String,
    required:true,
    
  },
  tel: {
    type:String,
    required:true,
    minlength:8,
    maxlength:8
  },
  companyName: {
    type:String,
    // required:true,

  },
  companyWebSite: {
    type:String,
    // required:true,

  },
  jobTitle: {
    type:String,
    // required:true,

  },
  country: {
    type:String,
    required:true,
  },
  city: {
    type:String,
    required:true,
  },
  productSerialNumber: {
    type:String,
    required:true,
  },
  description : {
    type:String,
    required:true,

  },
  
  
  
  
  attachment : {
    type:String,

  },


  status: {
    type:String,
    default: 'in progress',
  }
},
   {timestamps:true}
    );

   




   

module.exports = mongoose.model('TechnicalAssistance', TechnicalAssistanceModel)
