const BinModel = require("../models/Bin.model");



const CreateBin2 = async (req, res) => {
  console.log(req.body)
  try {
    const {
      name,
      location,
      address,
      lat,
      long,
      type,
      capacity,
      // status,
      gaz,
      niv,
      topicGaz,
      topicNiv,
      topicOuv
    } = req.body;

    // Create a new instance of Bin1 using the request body data
    const newBin = new BinModel({
      name,
      location,
      address,
      lat,
      long,
      type,
      capacity,
      status: false,
      gaz,
      niv,
      topicGaz,
      topicNiv,
      topicOuv
    });

    // Save the newBin instance to the database
    await newBin.save();

    res.status(201).json({ success: true, message: 'Bin created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create bin' });
  }
};




module.exports = 
{
  CreateBin2
}