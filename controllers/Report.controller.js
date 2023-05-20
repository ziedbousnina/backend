
const reportUser = require("../models/reportUser");
const validateReportUserInput = require("../validation/RepportOnuserValidation")
const cloudinary = require('../utils/uploadImage')
const CreateReportOnuser = async (req, res) => {

  console.log(req?.files?.image?.path)
    const { isValid, errors } = validateReportUserInput(req.body);
    try {
      if (!isValid) {   
        res.status(404).json(errors);
      } else {
        if(req.files?.image?.size > 0){
          const result = await cloudinary.uploader.upload(req.files.image.path, {
              public_id: `${req.user.id}_profile`,
              width: 500,
              height: 500,
              crop: 'fill',
          });
          console.log(result)
          req.body.image = result.secure_url
      }
       
        req.body.repporteur = req.user.id
 
        const data = await reportUser.create(req.body);
        res.status(200).json({ data, success: true });
  
      }
      
    } catch (error) {
      res.status(500).json({ message1: "error2", message: error.message });
    }
   
  };


  module.exports = {
    CreateReportOnuser
  }