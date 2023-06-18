const mongoose = require('mongoose')
const { Schema } = mongoose

const QuoteModel = new Schema({
 name: {
    type:String,
    // required:true,
 },
  email: {  
    type:String,
    // required:true,
    
  },
  tel: {
    type:String,
    // required:true,
    // minlength:8,
    // maxlength:8
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
    // required:true,
  },
  city: {
    type:String,
    // required:true,
  },
  size: {
    type:String,
    // required:true,
  },
  quantity : {
    type:String,
    // required:true,

  },
  powerSupply : {
    type:String,
    // required:true,
  },
  connectivity: {
    type:String,
    // required:true,
  },
  disinfection : [
    {
      type:String,
      // required:true,
    },
  ],
  sensors: [
    {
      type:String,
      // required:true,
    }
  ],
  graphicWraps : {
    type:String,

  },
  advertisementSignage: {
    type:String,
  },
  caracteristique: [
    {
      type:String,
    }
  ],


  status: {
    type:String,
    default: 'in progress',
  }
},
   {timestamps:true}
    );

   




   

module.exports = mongoose.model('Quote', QuoteModel)
