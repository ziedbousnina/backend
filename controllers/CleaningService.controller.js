



const cleaningSerciceModel = require("../models/cleaningSercice.model");
const cleaningService = require("../validation/cleaningService");

const cloudinary = require('../utils/uploadImage')


const AddCleaningService = async (req, res) => {
console.log(req.body)
console.log(req.user)
console.log(req.files.image.path)
  const { isValid, errors } = cleaningService(req.body);

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
      req.body.user = req.user.id;
      req.body.municipalAccept="in progress"
      req.body.AdminAccept="in progress"
      const data = await cleaningSerciceModel.create(req.body);
      res.status(200).json({ data, success: true });

    }
    
  } catch (error) {
    res.status(500).json({ message1: "error2", message: error.message });
  }
 
};


const findDemandeInProgressAdmin = async(req, res)=>{
  // res.status(200).json("data")
  try {
    const data = await cleaningSerciceModel.find({
      AdminAccept: "in progress",
    })
    .populate('user', ['name', 'email', 'role'])
    .sort({ createdAt: 'desc' }) // Sort by date in ascending order
    .exec();
    res.status(200).json(data)
     
 } catch (error) {
     res.status(500).json({message: error.message})
     
 }
}

const findDemandeInProgressMunicipal = async(req, res)=>{
  // res.status(200).json("data")
  try {
    const data = await cleaningSerciceModel.find({
      municipalAccept: "in progress",
      // AdminAccept: "valid",
    })
    .populate('user', ['name', 'email', 'role'])
    .sort({ createdAt: 'desc' }) // Sort by date in ascending order
    .exec();
    res.status(200).json(data)
     
 } catch (error) {
     res.status(500).json({message: error.message})
     
 }
}

const AcceptCleaningRequestMunicipal = async (req, res) => {
  const demandeId = req.params.id; // Get the ID of the demand from the request parameters
  // const { status } = req.body; // Get the new status from the request body

  try {
    // Check if the demand exists
    const demande = await cleaningSerciceModel.findById(demandeId);
    if (!demande) {
      return res.status(404).json({ message: "Demand not found" });
    }

    // Update the status and save the demand
    demande.municipalAccept = "valid";
    const updatedDemande = await demande.save();

    res.status(200).json({ data: updatedDemande, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllDemande = async(req, res)=>{
  // res.status(200).json("data")
  try {
    const data = await cleaningSerciceModel.find({}).
    populate('user', ['name', 'email', 'role'])
    res.status(200).json({...data})
     
 } catch (error) {
     res.status(500).json({message: error.message})
     
 }
}
const findSingleCleaningService = async(req, res)=>{
  var userId = req.query.id;
  
  try {
     const data = await cleaningSerciceModel.find({user: req.user.id}).populate('user', ['name', 'email', 'role'])
     res.status(200).json(data)
      
  } catch (error) {
      res.status(500).json({message: error.message})
      
  }
}

const AcceptDemande = async (req, res) => {
  const demandeId = req.params.id; // Get the ID of the demand from the request parameters
  const { status } = req.body; // Get the new status from the request body

  try {
    // Check if the demand exists
    const demande = await cleaningSerciceModel.findById(demandeId);
    if (!demande) {
      return res.status(404).json({ message: "Demand not found" });
    }

    // Update the status and save the demand
    demande.status = status;
    const updatedDemande = await demande.save();

    res.status(200).json({ data: updatedDemande, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DeleteRequest = async (req, res) => {
  const { requestId } = req.params;
  console.log(requestId)


  if (!requestId) {
    return res.status(400).json({ message: "requestId is required" });
  }

  try {
    const data = await cleaningSerciceModel.findByIdAndDelete(requestId);
    res.status(200).json({ message: "request deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AddCleaningService,
  findDemandeInProgressAdmin,
  findAllDemande,
  AcceptDemande,
  findSingleCleaningService,
  findDemandeInProgressMunicipal,
  DeleteRequest,
  AcceptCleaningRequestMunicipal
};