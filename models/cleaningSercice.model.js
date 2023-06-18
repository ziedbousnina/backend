const mongoose = require('mongoose')
const { Schema } = mongoose

const CleaningService = new Schema({
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
  // required:true,
  minlength:8,
  
},

  municipalAccept:{
    type:String,
    required:true,
    enum:[ 'in progress', 'valid', 'denied' ],
    default:'in progress'
},
AdminAccept:{
  type:String,
  required:true,
  enum:[ 'in progress', 'valid', 'denied' ],
  default:'in progress'
},
  reponse:{
    type:String,
    // required:true,
    minlength:1,
    maxlength:1000
},
image: String

  },
   {timestamps:true}
    );

   




   

module.exports = mongoose.model('CleaningService', CleaningService)
