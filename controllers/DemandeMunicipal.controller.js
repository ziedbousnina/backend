
const demandeMunicipalInputValidator = require("../validation/profile")

const DemandeMunicipalModel = require("../models/DemandeMunicipal.model")



const AddDemandeMunicipal = async (req, res) => {
  const { isValid, errors } = demandeMunicipalInputValidator(req.body);
  console.log(req.body);
  
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const demandeMunicipal = await DemandeMunicipalModel.findOne({
        user: req.user.id,
      });
      if (!demandeMunicipal) {
        const telExist = await DemandeMunicipalModel.findOne({ tel: req.body.tel });
        if (telExist) {
          errors.tel = "tel already exist";
          res.status(404).json(errors);
        } else {
          req.body.user = req.user.id;
          req.body.status="in progress"
          const data = await DemandeMunicipalModel.create(req.body);
          res.status(200).json({ data, success: true });
        }
      } else {
        if (demandeMunicipal.tel !== req.body.tel) {
          const telExist = await DemandeMunicipalModel.findOne({ tel: req.body.tel });
          if (telExist) {
            errors.tel = "tel already exist";
            res.status(404).json(errors);
          } else {
            const result = await DemandeMunicipalModel.findOneAndUpdate(
              { user: req.user.id },
              req.body,
              { new: true }
            );
            var tel = result.tel;
            res.status(200).json(result);
          }
        } else {
          const result = await DemandeMunicipalModel.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true }
          );
          var tel = result.tel;
          res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message1: "error2", message: error.message });
  }
};

const findDemandeInProgress = async(req, res)=>{
  // res.status(200).json("data")
  try {
    const data = await DemandeMunicipalModel.find({
      status: "in progress",
    })
    .populate('user', ['name', 'email', 'role'])
    .sort({ createdAt: 'desc' }) // Sort by date in ascending order
    .exec();
    res.status(200).json(data)
     
 } catch (error) {
     res.status(500).json({message: error.message})
     
 }
}



const findAllDemande = async(req, res)=>{
  // res.status(200).json("data")
  try {
    const data = await DemandeMunicipalModel.find({}).
    populate('user', ['name', 'email', 'role'])
    res.status(200).json({...data})
     
 } catch (error) {
     res.status(500).json({message: error.message})
     
 }
}
const findSingleRequest = async(req, res)=>{
  var userId = req.query.id;
  
  try {
     const data = await DemandeMunicipalModel.find({user: req.user.id}).populate('user', ['name', 'email', 'role'])
     res.status(200).json(...data)
      
  } catch (error) {
      res.status(500).json({message: error.message})
      
  }
}

const AcceptDemande = async (req, res) => {
  const demandeId = req.params.id; // Get the ID of the demand from the request parameters
  const { status } = req.body; // Get the new status from the request body

  try {
    // Check if the demand exists
    const demande = await DemandeMunicipalModel.findById(demandeId);
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


module.exports = {
  AddDemandeMunicipal,
  findDemandeInProgress,
  findAllDemande,
  AcceptDemande,
  findSingleRequest
};