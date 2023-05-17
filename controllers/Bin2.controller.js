const BinModel = require("../models/Bin.model");



// const CreateBin2 = async (req, res) => {
//   console.log(req.body)
//   try {
//     const {
//       name,
//       location,
//       address,
//       lat,
//       long,
//       type,
//       capacity,
//       // status,
//       gaz,
//       niv,
//       topicGaz,
//       topicNiv,
//       topicOuv
//     } = req.body;

//     // Create a new instance of Bin1 using the request body data
//     const newBin = new BinModel({
//       name,
//       location,
//       address,
//       lat,
//       long,
//       type,
//       capacity,
//       status: false,
//       gaz,
//       niv,
//       topicGaz,
//       topicNiv,
//       topicOuv
//     });

//     // Save the newBin instance to the database
//     await newBin.save();

//     res.status(201).json({ success: true, message: 'Bin created successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to create bin' });
//   }
// };
const CreateBin2 = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      location,
      address,
      lat,
      long,
      type,
      capacity,
      gaz,
      niv,
      topicGaz,
      topicNiv,
      topicOuv
    } = req.body;

    // Check if the topics already exist
    const existingBin = await BinModel.findOne({
      $or: [
        { topicGaz },
        { topicNiv },
        { topicOuv }
      ]
    });

    if (existingBin) {
      return res.status(400).json({ success: false, error: 'Topics must be unique' });
    }

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
    res.status(500).json({ success: false, error: 'Topics must be unique' });
  }
};


const fetchAllBins = async (req, res)=> {
  try {
    const bins = await BinModel.find();
    res.status(200).json({ success: true, bins });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch bins' });
  }
}




module.exports = 
{
  CreateBin2,
  fetchAllBins
}