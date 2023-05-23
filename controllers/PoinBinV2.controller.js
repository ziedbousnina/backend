
const pointBinV2 = require("../models/PointBinV2.Model");
const validateBinPointInput = require("../validation/PointBinValidation")


// const createPointBinV2 = async(req, res)=> {
//   const { isValid, errors } = validateBinPointInput(req.body);
//   try {
//     if (!isValid) {
//       res.status(404).json(errors);
//     } else {
      
//     const { quoteDemande, bins } = req.body;
//     const pointBin1 = await pointBinV2.create({ quoteDemande, bins });
//     res.status(201).json({ success: true, message: 'PointBin created successfully', pointBin1 });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to create PointBin' });
//   }
// }

const createPointBinV2 = async (req, res) => {
  const { isValid, errors } = validateBinPointInput(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const { quoteDemande, bins } = req.body;

      // Check if the bin already exists in any other point bin
      const existingPointBin = await pointBinV2.findOne({ bins });
      if (existingPointBin) {
        res.status(400).json({ success: false, error: 'Bin already in use' });
      } else {
        const pointBin1 = await pointBinV2.create(req.body);
        res
          .status(201)
          .json({ success: true, message: 'PointBin created successfully', pointBin1 });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create PointBin' });
  }
};

const deletePointBin = async(req, res)=> {
  const { id } = req.params;
  try {
    const bin = await pointBinV2.findById(id);
    if (!bin) {
      return res.status(404).json({ error: 'Point Bin not found' });
    }
    await bin.remove();
    res.status(200).json({ success: true, message: 'Point Bin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


const fetchAllPointBins = async (req, res)=> {
  try {
    const pointBins = await pointBinV2.find().populate("bins").populate("quoteDemande");
    res.status(200).json({ success: true, pointBins });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch pointBins' });
  }
}



module.exports = {
  createPointBinV2,
  fetchAllPointBins,
  deletePointBin
}