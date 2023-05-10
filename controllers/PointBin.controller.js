const pointBinModel = require("../models/pointBin.model");

const CreatePointBin = async (req, res) => {
  try {
    // Extract the bin details from the request body
    const { name, location, lat, lng, bins } = req.body;

    // Create a new pointBin instance using the PointBin model
    const pointBin = new pointBinModel({
      name,
      location,
      lat,
      lng,
      bins
    });

    // Save the pointBin instance to the database
    await pointBin.save();

    // Return a success response
    return res.status(201).json({
      success: true,
      message: 'PointBin created successfully',
      data: pointBin,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to create PointBin',
      error: error.message,
    });
  }
};

const AddBinToPointBin = async (req, res) => {
  try {
    // Extract the bin details from the request body
    const { binId, pointBinId } = req.body;

    // Find the PointBin instance with the given ID
    const pointBin = await pointBinModel.findById(pointBinId);

    if (!pointBin) {
      // If the PointBin instance does not exist, return an error response
      return res.status(404).json({
        success: false,
        message: 'PointBin not found',
      });
    }

    // Check if the bin already exists in the bins array
    const binExists = pointBin.bins.some((bin) => bin.equals(binId));

    if (binExists) {
      // If the bin already exists in the bins array, return an error response
      return res.status(400).json({
        success: false,
        message: 'Bin already exists in the PointBin',
      });
    }

    // Add the bin to the bins array
    pointBin.bins.push(binId);

    // Save the updated PointBin instance to the database
    await pointBin.save();

    // Return a success response
    return res.status(200).json({
      success: true,
      message: 'Bin added to PointBin successfully',
      data: pointBin,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Unable to add bin to PointBin',
      error: error.message,
    });
  }
};


// const CreatePointBin = async (req, res) => {
//   try {
//     // Extract the bin details from the request body
//     const { name, location, lat, lng, type, capacity, status, bins } = req.body;

//     // Create a new bin instance using the Bin model
//     const Pointbin = new pointBinModel({
//       name,
//       location,
//       lat,
//       lng,
//       type,
//       capacity,
//       status,
//     });

//     // Save the bin instance to the database
//     await Pointbin.save();

//     // Return a success response
//     return res.status(201).json({
//       success: true,
//       message: 'Bin created successfully',
//       data: Pointbin,
//     });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: 'Unable to create bin',
//       error: error.message,
//     });
//   }
// };

const getAllPointBins = async (req, res)=> {
  try {
    const Pointbins = await pointBinModel.find();
    res.json({
      message: 'Bins found',
      data: Pointbins
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

  CreatePointBin,
  getAllPointBins,
  AddBinToPointBin
}