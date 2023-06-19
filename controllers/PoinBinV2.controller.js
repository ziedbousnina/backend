
const pointBinV2 = require("../models/PointBinV2.Model");
const validateBinPointInput = require("../validation/PointBinValidation")
var mailer = require('../utils/mailer');
const { plainEmailTemplate } = require("../utils/mail");
const QuoteModel = require("../models/Quote.model");

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
  console.log(req.body)
  const { isValid, errors } = validateBinPointInput(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const { quoteDemande, bins } = req.body;

      // Check if the bin already exists in any other point bin
      const existingPointBin = await pointBinV2.findOne({ bins });
      const quoteReq = await QuoteModel.findById(req.body.quoteDemande)
      console.log(quoteReq)
      if (existingPointBin) {
        res.status(400).json({ success: false, error: 'Bin already in use' });
      } else {
        const pointBin1 = await pointBinV2.create(req.body);
        
        mailer.send(
          {
            to: ['zbousnina@yahoo.com', quoteReq.email],
            subject: 'Point Bin xgenbox',
            html: plainEmailTemplate(
              'Point bin   ',
              `
              <p>Dear customer,</p>
              
              <p>Best regards,</p>
              <p>Team</p>
              <p>xgenbox.netlify.app/</p>
    
              <h2>Point Bin Information:</h2>
              <p>Address: ${pointBin1.address}</p>
              <p>Latitude: ${pointBin1.lat}</p>
              <p>Longitude: ${pointBin1.long}</p>
              <p>Governorate: ${pointBin1.governorate}</p>
              <p>Municipality: ${pointBin1.municipale}</p>
              <p>Code: ${pointBin1.code}</p>
              `
            ),
          },
          (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ success: false, message: 'Error sending email' });
            }
          }
        );
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

const fetchPointBinByID = async (req, res) => {
  const binID = req.params.id; // Assuming the ID is passed as a route parameter

  try {
    const bin = await pointBinV2.findById(binID).populate("bins").populate('quoteDemande');; // Assuming you have a model named 'Bin1' for binSchema1

    if (!bin) {
      // If bin is not found, return an appropriate response
      return res.status(404).json({ error: 'Point Bin not found' });
    }

    // If bin is found, return the bin object in the response
    res.json(bin);
  } catch (error) {
    // If any error occurs during the database query, return an error response
    res.status(500).json({ error: 'Internal server error' });
  }
};

const UpdatePointBin = async (req, res) => {
  const id = req.params.id; // Assuming the bin ID is passed as a parameter
  console.log(req.body)

  try {
    
    const updatedBin = await pointBinV2.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated bin after the update is applied
    );

    res.status(200).json(updatedBin);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the bin.' });
  }
};

const fetchPointBinByMunicipal = async (req, res) => {
  const { municipal } = req.params;

  try {
    // Find point bins by municipal
    const pointBins = await pointBinV2.find({ municipale: municipal }).populate('bins');

    res.status(200).json(pointBins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch point bins by municipal' });
  }
};

const fetchAllPointBin = async(req, res)=> {

  try {
     // Find point bins by municipal
     const pointBins = await pointBinV2.find({}).populate('bins');
 
     res.status(200).json(pointBins);
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Failed to fetch point bins by municipal' });
   }
 }



module.exports = {
  createPointBinV2,
  fetchAllPointBins,
  deletePointBin,
  fetchPointBinByID,
  UpdatePointBin,
  fetchPointBinByMunicipal,
  fetchAllPointBin
}