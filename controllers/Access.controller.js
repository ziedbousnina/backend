const accessModel = require("../models/access.model");
const userModel = require("../models/userModel");



const CreateAccess = async (req, res) => {
  try {
    const { companyId } = req.body;

    const existingAccess = await accessModel.findOne({ company: companyId });
    console.log(existingAccess)
    if (existingAccess) {
      return res.status(400).json({
        message: 'Access record with this company already exists',
      });
    }

   const bins =  [];

    const newAccess = new accessModel({
      company: companyId,
      // bins,
    });

    const savedAccess = await newAccess.save();

    res.status(201).json({
      message: 'Access record created successfully',
      data: savedAccess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to create access record',
      error,
    });
  }
};

const addBinToScepcifiqueCompany = async (req, res) => {
  try {
    const { binId } = req.body;

    const access = await accessModel.findOne({company :req.user._id});
    if (!access) {
      return res.status(404).json({
        message: 'Company not found'
      });
    }

    binId? access.bins.push() : null;
    const savedAccess = await access.save();

    res.json({
      message: `Bin ${binId} added to company ${req.user._id}`,
      data: savedAccess
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add bin to company',
      error
    });
  }
};

const getCurentAccess = async(req, res)=> {
  const {_id} = req.user
  console.log(_id)
  try {
    const access = await accessModel.findOne({company:_id}).populate('bins');
    if (!access) {
      return res.status(404).json({
        message: 'Access not found'
      });
    }
    res.json({
      message: 'Access found',
      data: access
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to get access',
      error
    });
  }



}



module.exports = {
  CreateAccess,
  addBinToScepcifiqueCompany,
  getCurentAccess
}