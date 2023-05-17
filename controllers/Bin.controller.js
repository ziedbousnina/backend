const BinModel = require("../models/Bin.model");
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

const getBinsCount = async (req, res) => {
  const currentDate = new Date();
  const lastDayDate = new Date();
  lastDayDate.setDate(currentDate.getDate() - 1);

  const currentDayBinsCount = await BinModel.countDocuments({
    createdAt: { $gte: lastDayDate, $lt: currentDate }
  });

  const totalBinsCount = await BinModel.countDocuments({});

  const percentageIncrease = totalBinsCount ? ((currentDayBinsCount - totalBinsCount) / totalBinsCount) * 100 : 0;

  res.json({
    currentDayCount: currentDayBinsCount,
    totalCount: totalBinsCount,
    percentageIncrease
  });
};

module.exports = 
{

  CreateBin,
  getAllBins,
  getBinsCount
}