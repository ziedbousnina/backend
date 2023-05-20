const BinModel = require("../models/Bin.model");
const mqtt = require("mqtt");
const pointBinV2 = require("../models/PointBinV2.Model");
const client = mqtt.connect('tls://9942400369fe41cea9a3c9bb8e6d23d5.s2.eu.hivemq.cloud', {
  username: 'amaltlili',
  password: 'Amaltlili91'
});


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


const FetchBinsNotInPointBin = async (req, res) => {
  try {
    // Fetch all bin IDs present in PointBinV2
    const pointBins = await pointBinV2.find().lean();
    const binIdsInPointBinV2 = pointBins.reduce((ids, pointBin) => {
      return ids.concat(pointBin.bins);
    }, []);

    // Fetch all bins that are not in PointBinV2
    const binsNotInPointBinV2 = await BinModel.find({ _id: { $nin: binIdsInPointBinV2 } }).lean();

    res.status(200).json(binsNotInPointBinV2);
  } catch (error) {
    console.error('Error fetching bins not in PointBinV2:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
};
// const updateStatus = async (req, res)=> {
//   try {
//     const { id } = req.params;
//     // const { status } = req.body;
//     const bin = await BinModel.findById(id);

//     if (!bin) {
//       return res.status(404).json({ success: false, error: 'Bin not found' });
//     }
//     console.log(bin.topicOuv)
//     bin.status = !bin.status;
//     await bin.save();
//     client.on("connect", function() {
//           client.publish(bin.topicOuv, !bin.status)
//           console.log("ok")
//         })
    
    

//     res.status(200).json({ success: true, message: 'Bin updated successfully', bin });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to update bin' });
//   }
// }
// const updateStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const bin = await BinModel.findById(id);

//     if (!bin) {
//       return res.status(404).json({ success: false, error: 'Bin not found' });
//     }

//     console.log(bin.topicOuv);
//     bin.status = !bin.status;
//     await bin.save();

//     client.publish(bin.topicOuv, JSON.stringify(!bin.status), (err) => {
//       if (err) {
//         console.error('Failed to publish message:', err);
//       } else {
//         console.log('Message published successfully');
//       }
//     });

//     res.status(200).json({ success: true, message: 'Bin updated successfully', bin });
//   } catch (error) {
//     console.error('Failed to update bin:', error);
//     res.status(500).json({ success: false, error: 'Failed to update bin' });
//   }
// };

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const bin = await BinModel.findById(id);

    if (!bin) {
      return res.status(404).json({ success: false, error: 'Bin not found' });
    }

    console.log(bin.topicOuv);
    bin.status = !bin.status;
    await bin.save();

    client.publish(bin.topicOuv, JSON.stringify(!bin.status), (err) => {
      if (err) {
        console.error('Failed to publish message:', err);
      } else {
        console.log('Message published successfully');
      }
    });

    setTimeout(async () => {
      bin.status = false;
      client.publish(bin.topicOuv, JSON.stringify(bin.status),async (err) => {
        if (err) {
          console.error('Failed to publish message:', err);
        } else {
          console.log('Message published successfully');
          await bin.save();
          console.log('Status updated to false after 20 seconds');
        }
      });
      
      
    }, 10000);

    res.status(200).json({ success: true, message: 'Bin updated successfully', bin });
  } catch (error) {
    console.error('Failed to update bin:', error);
    res.status(500).json({ success: false, error: 'Failed to update bin' });
  }
};





module.exports = 
{
  CreateBin2,
  fetchAllBins,
  updateStatus,
  FetchBinsNotInPointBin
}