const mongoose = require('mongoose')
const { Schema } = mongoose

const DemandeMunicipalSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true

},
governorat:{
    type:String,
    required:true,
    
},
municipal: {
    type:String,
    required:true,

},
  description:{
    type:String,
    required:true,
    minlength:1,
    maxlength:1000
},
tel: {
    type:String,
    required:true,
    minlength:8,
    
},
  status:{
    type:String,
    required:true,
    enum:[ 'in progress', 'valid', 'denied' ]
},
  reponse:{
    type:String,
    // required:true,
    minlength:1,
    maxlength:1000
},
company:String,
postalCode:"string",
  },
   {timestamps:true}
    );

   




   

module.exports = mongoose.model('DemandeMunicipal', DemandeMunicipalSchema)
