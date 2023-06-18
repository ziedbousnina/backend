const profileModels = require("../models/profile.models")
const profileInputValidator = require("../validation/profile2")
const cloudinary = require('../utils/uploadImage')

const FindAllProfile = async(req, res)=>{
    // res.send('ok')
    try {
        const data = await profileModels.find().populate('user', ["name", "email", "role"])
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({message: "error"})
        
    }    
}
const AddProfile = async(req, res)=>{
   
    const {isValid, errors} = profileInputValidator(req.body)
    console.log(req.body)
    
    try {
        if(!isValid) {
            console.log("error is here")
            res.status(404).json(errors)
        } else {   
            if(req.files?.avatar?.size > 0){
                const result = await cloudinary.uploader.upload(req.files.avatar.path, {
                    public_id: `${req.user.id}_profile`,
                    width: 500,
                    height: 500,
                    crop: 'fill',
                });
                console.log(result)
                req.body.avatar = result.secure_url
            }
          
            console.log(req.body)
            const profile = await profileModels.findOne({user: req.user.id})
            if(!profile){
                const telExist = await profileModels.findOne({tel: req.body.tel})
                if(telExist){
                    errors.tel = "tel already exist"
                    res.status(404).json(errors)
                } else {
                    req.body.user = req.user.id
                    const data = await profileModels.create(req.body)
                    res.status(200).json( {data,success: true})
                }
            } else {
                if(profile.tel !== req.body.tel) {
                    const telExist = await profileModels.findOne({tel: req.body.tel})
                    if(telExist){
                        errors.tel = "tel already exist"
                        res.status(404).json(errors)
                    } else {
                        const result = await profileModels.findOneAndUpdate(
                            {user: req.user.id},
                            req.body,
                            {new: true}
                        )
                        var tel = result.tel
                        res.status(200).json(result)
                    }
                } else {
                    const result = await profileModels.findOneAndUpdate(
                        {user: req.user.id},
                        req.body,
                        {new: true}
                    )
                    var tel = result.tel
                    res.status(200).json(result)
                }
            }
        }
    } catch (error) {
        res.status(500).json({message1: "error2", message: error.message})
    }
}

const EditProfile = async (req, res) => {
    console.log(req.body)
    try {
      const profile = await profileModels.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
  
      const { tel, avatar, address, city, country, postalCode, bio } = req.body;
  
      if (tel) {
        const telExist = await profileModels.findOne({ tel });
        if (telExist && telExist.user.toString() !== req.user.id) {
          return res.status(404).json({ error: "Tel already exists" });
        }
        profile.tel = tel;
      }
  
      if (avatar) {
        // Upload avatar and update profile
        const result = await cloudinary.uploader.upload(avatar.path, {
          public_id: `${req.user.id}_profile`,
          width: 500,
          height: 500,
          crop: "fill",
        });
        profile.avatar = result.secure_url;
      }
  
      if (address) {
        profile.address = address;
      }
  
      if (city) {
        profile.city = city;
      }
  
      if (country) {
        profile.country = country;
      }
  
      if (postalCode) {
        profile.postalCode = postalCode;
      }
  
      if (bio) {
        profile.bio = bio;
      }
  
      const updatedProfile = await profile.save();
  
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
// const AddProfile = async(req, res)=>{
   
//     const {isValid, errors} = profileInputValidator(req.body)
//     const telExist = await profileModels.find({tel: req.body.tel})
//     // console.log(req)
    
// // console.log("result", result)
//    try {
//     if(!isValid) {
//         res.status(404).json(errors)
//     }else{   
      
//         if(req.files?.avatar?.size>0){
//             const result = await cloudinary.uploader.upload(req.files.avatar.path, {
//                 public_id: `${req.user.id}_profile`,
//                 width: 500,
//                 height: 500,
//                 crop: 'fill',
//             });
//             req.body.avatar = result.secure_url
//         }
//         console.log(req.body)
      
        
//         profileModels.findOne({user: req.user.id})
//         .then(async (profile)=>{
//             if(!profile){
//                 if(!(telExist.tel === req.body.tel)){

//                     req.body.user = req.user.id
//                     const data = await profileModels.create(req.body)
//                     // const data = await profileModels.find({user: req.user.id}).populate('user', ['name', 'email', 'role'])
//                     res.status(200).json( {data,success: true})
//                     // res.status(200).json({message: "success"})
//                 }else{
//                     errors.tel = "tel already exist"
//                     res.status(404).json(errors)
//                 }
//             }else{
//                 // if(!(telExist1[0].tel === req.body.tel)){
                    
//                     await profileModels.findOneAndUpdate(
//                         {user: req.user.id},
//                         req.body,
//                         {new: true}
//                         ).then(result=>{
//                             var tel = result.tel
//                             res.status(200).json(result)
//                         }).catch(async (err)=>{
//                             const telExist1 = await profileModels.find({tel: req.body.tel})
//                             console.log(telExist1)
//                             console.log(req.body.tel)
//                             if(telExist1[0]?.tel === req.body.tel) {
//                                 errors.tel = "tel already exist"
//                                 res.status(404).json(errors)
//                             }else{

//                                 res.status(500).json({message: "error"})
//                             }
                            
//                         })
//                     // }else{
//                     //     errors.tel = "tel already exist"
//                     //     res.status(404).json(errors)
//                     // }
//                     }
//                 })
      
            
//     }
    
//    } catch (error) {
//     res.status(500).json({message1: "error2", message: error.message})
    
//    }
// }
// const AddProfile = async(req, res)=>{
//     const {isValid, errors} = profileInputValidator(req.body)
//    try {
//     if(!isValid) {
//         res.status(404).json(errors)
//     }else{   
//         // console.log(req.body)
//         const telExist = await profileModels.find({tel: req.body.tel})
        
//         profileModels.findOne({user: req.user.id})
//         .then(async (profile)=>{
//             if(!profile){
//                 if(!(telExist.tel === req.body.tel)){

//                     req.body.user = req.user.id
//                     await profileModels.create(req.body)
//                     res.status(200).json({message: "success"})
//                 }else{
//                     errors.tel = "tel already exist"
//                     res.status(404).json(errors)
//                 }
//             }else{
//                 // if(!(telExist1[0].tel === req.body.tel)){
                    
//                     await profileModels.findOneAndUpdate(
//                         {user: req.user.id},
//                         req.body,
//                         {new: true}
//                         ).then(result=>{
//                             var tel = result.tel
//                             res.status(200).json(result)
//                         }).catch(async (err)=>{
//                             const telExist1 = await profileModels.find({tel: req.body.tel})
//                             console.log(telExist1)
//                             console.log(req.body.tel)
//                             if(telExist1[0]?.tel === req.body.tel) {
//                                 errors.tel = "tel already exist"
//                                 res.status(404).json(errors)
//                             }else{

//                                 res.status(500).json({message: "error"})
//                             }
                            
//                         })
//                     // }else{
//                     //     errors.tel = "tel already exist"
//                     //     res.status(404).json(errors)
//                     // }
//                     }
//                 })
      
            
//     }
    
//    } catch (error) {
//     res.status(500).json({message: "error2"})
    
//    }
// }

const findSingleProfile = async(req, res)=>{
    var userId = req.query.id;
    
    try {
       const data = await profileModels.find({user: req.user.id}).populate('user', ['name', 'email', 'role'])
       res.status(200).json(...data)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

const DeleteProfile = async(req, res)=>{
   try {
    const userId = req.params.id;
    const deleteProfile = await profileModels.findByIdAndDelete(userId);
    if(!deleteProfile){
        res.status(404).json({message: "profile not found"})
    }else{

        res. status(200).json({message: "profile deleted successfully"})
    }
    
   } catch (error) {
    res.status(500).send('error server')

    
   }
}

module.exports = {
    FindAllProfile,
    AddProfile,
    findSingleProfile,
    DeleteProfile,
    EditProfile
}

