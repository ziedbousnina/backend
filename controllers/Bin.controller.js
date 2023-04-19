const binsModel = require("../models/bins.model");

const CreateBin = async (req, res) => {
  try {
    // Extract the bin details from the request body
    const { name, location, lat, lng, type, capacity, status } = req.body;

    // Create a new bin instance using the Bin model
    const bin = new binsModel({
      name,
      location,
      lat,
      lng,
      type,
      capacity,
      status,
    });

    // Save the bin instance to the database
    await bin.save();

    // Return a success response
    return res.status(201).json({
      success: true,
      message: 'Bin created successfully',
      data: bin,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to create bin',
      error: error.message,
    });
  }
};

const getAllBins = async (req, res)=> {
  try {
    const bins = await binsModel.find();
    res.json({
      message: 'Bins found',
      data: bins
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to get bins',
      error
    });
  }
}

module.exports = 
{

  CreateBin,
  getAllBins,
}