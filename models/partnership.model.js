const mongoose = require('mongoose')
const { Schema } = mongoose

const partnershipModel = new Schema({
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

  },
  companyWebSite: {
    type:String,

  },
  jobTitle: {
    type:String,

  },
  country: {
    type:String,
    required:true,
  },
  city: {
    type:String,
    required:true,
  },
  companyPresentation: {
    type:String,
    required:true,
  },
  partnershipType: {
    type:String,
    required:true,
  },
  TargetMarkets: {
    type:String,
    required:true,

  },
  DistrubutionSrategy: {

    type:String,
    required:true,

  },
  ProjectsForWhichYouPlanToUseTheSolution: {
    type:String,
    required:true,

  },
  status: {
    type:String,
    default: 'in progress',
  }
},
   {timestamps:true}
    );

   




   

module.exports = mongoose.model('Partnership', partnershipModel)
