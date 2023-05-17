const express = require('express');
const connectDB = require('./config/db');
const formData = require('express-form-data');

require('colors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const profiles = require('./routes/profiles.route');
const demandeMunicipal = require('./routes/demandeMunicipal.route');
const binRoute = require('./routes/bin.route');
const cleaningService = require('./routes/cleaningService.route');
const PointbinRoute = require('./routes/pointBin.route');
const site = require('./routes/Sites.route');


const morgan = require('morgan');
const { forgotPassword, resetPassword } = require('./controllers/userController');
const { isResetTokenValid } = require('./security/Rolemiddleware');
const passport = require('passport');
const governoratesModel = require('./models/governorates.model');
const access = require('./routes/access.route');
const BinModel = require('./models/Bin.model');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// passport
app.use(passport.initialize())
require('./security/passport')(passport)
connectDB();


app.use(formData.parse());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


app.post("/forgot-password", forgotPassword )
// router.post("/reset-password", resetPassword )
app.post("/reset-password",isResetTokenValid,  resetPassword )
app.use('/api/users', userRoutes);

app.use('/api/profile', profiles);
app.use('/api/access', access);
app.use('/api/site', site);
app.use('/api/bin', binRoute);
app.use('/api/cleaning', cleaningService);
app.use('/api/Pointbin', PointbinRoute);
app.use('/api/demande-municipal', demandeMunicipal);
app.get('/api/governorates', (req, res)=>{
  governoratesModel.find()
  .then(governorates => res.json(governorates))
  .catch(err => res.status(400).json('Error: ' + err));
  
  
})

app.get('/health', function(req,res) {
  res.status(200).json({msg: 'Server is running'})
})
// -------------------------------------------------------------------------------
const mqtt = require("mqtt");
const client = mqtt.connect('tls://9942400369fe41cea9a3c9bb8e6d23d5.s2.eu.hivemq.cloud', {
  username: 'amaltlili',
  password: 'Amaltlili91'
});

// function fetchDataAndSubscribe() {
//   // Fetch data from binModel
//   BinModel.find({}, (err, bins) => {
//     if (err) {
//       console.error('Error fetching data:', err);
//       return;
//     }

//     // Iterate over the fetched bins
//     bins.forEach(bin => {
//       const topicOuv = bin.topicOuv;
//       const topicGaz = bin.topicGaz;
//       const topicNiv = bin.topicNiv;

//       // Subscribe to the topics
//       client.subscribe(topicOuv, (err) => {
//         if (err) {
//           console.error(`Error subscribing to topic ${topicOuv}:`, err);
//           return;
//         }
//         console.log(`Subscribed to topic ${topicOuv}`);
//       });

//       client.subscribe(topicGaz, (err) => {
//         if (err) {
//           console.error(`Error subscribing to topic ${topicGaz}:`, err);
//           return;
//         }
//         console.log(`Subscribed to topic ${topicGaz}`);
//       });

//       client.subscribe(topicNiv, (err) => {
//         if (err) {
//           console.error(`Error subscribing to topic ${topicNiv}:`, err);
//           return;
//         }
//         console.log(`Subscribed to topic ${topicNiv}`);
//       });

//       // Handle incoming messages for the subscribed topics
//       client.on('message', (topic, message) => {
//         if (topic === topicOuv) {
//           // Update the value for topicOuv in the bin or perform any other actions
//           bin.valueOuv = message.toString(); // Update the valueOuv property with the received message
//         } else if (topic === topicGaz) {
//           // Update the value for topicGaz in the bin or perform any other actions
//           bin.gaz = message.toString(); // Update the valueGaz property with the received message
//         } else if (topic === topicNiv) {
//           // Update the value for topicNiv in the bin or perform any other actions
//           bin.niv = message.toString(); // Update the valueNiv property with the received message
//         }

//         bin.save((err) => {
//           if (err) {
//             console.error('Error saving bin:', err);
//             return;
//           }
//           console.log('Bin updated:', bin);
//         });
//       });
//     });
//   });
// }
// function fetchDataAndSubscribe() {
//   BinModel.find({}, (err, bins) => {
//     if (err) {
//       console.error('Error fetching data:', err);
//       return;
//     }

//     bins.forEach(bin => {
//       const topicOuv = bin.topicOuv;
//       const topicGaz = bin.topicGaz;
//       const topicNiv = bin.topicNiv;

//       client.subscribe(topicOuv, (err) => {
//         if (err) {
//           console.error(`Error subscribing to topic ${topicOuv}:`, err);
//           return;
//         }
//         console.log(`Subscribed to topic ${topicOuv}`);
//       });

//       client.subscribe(topicGaz, (err) => {
//         if (err) {
//           console.error(`Error subscribing to topic ${topicGaz}:`, err);
//           return;
//         }
//         console.log(`Subscribed to topic ${topicGaz}`);
//       });

//       client.subscribe(topicNiv, (err) => {
//         if (err) {
//           console.error(`Error subscribing to topic ${topicNiv}:`, err);
//           return;
//         }
//         console.log(`Subscribed to topic ${topicNiv}`);
//       });

//       let saving = false; // Flag to track saving state

//       client.on('message', (topic, message) => {
//         if (topic === topicOuv) {
//           if (!saving) {
//             saving = true; // Set the saving flag
//             bin.valueOuv = message.toString();
//             bin.save((err) => {
//               if (err) {
//                 console.error('Error saving bin:', err);
//                 saving = false; // Reset the saving flag
//                 return;
//               }
//               console.log('Bin updated:', bin);
//               saving = false; // Reset the saving flag
//             });
//           }
//         } else if (topic === topicGaz) {
//           // Handle topicGaz updates similarly
//           if (!saving) {
//             saving = true; // Set the saving flag
//             bin.gaz = message.toString();
//             bin.save((err) => {
//               if (err) {
//                 console.error('Error saving bin:', err);
//                 saving = false; // Reset the saving flag
//                 return;
//               }
//               console.log('Bin updated:', bin);
//               saving = false; // Reset the saving flag
//             });
            
//           }
//         } else if (topic === topicNiv) {
//           if (!saving) {
//             saving = true; // Set the saving flag
//             bin.niv = message.toString();
//             bin.save((err) => {
//               if (err) {
//                 console.error('Error saving bin:', err);
//                 saving = false; // Reset the saving flag
//                 return;
//               }
//               console.log('Bin updated:', bin);
//               saving = false; // Reset the saving flag
//             });
//           }
          
//           // Handle topicNiv updates similarly
//         }
//       });
//     });
//   });
// }
function fetchDataAndSubscribe() {
  BinModel.find({}, (err, bins) => {
    if (err) {
      console.error('Error fetching data:', err);
      return;
    }

    bins.forEach(bin => {
      const topicOuv = bin.topicOuv;
      const topicGaz = bin.topicGaz;
      const topicNiv = bin.topicNiv;

      client.subscribe(topicOuv, (err) => {
        if (err) {
          console.error(`Error subscribing to topic ${topicOuv}:`, err);
          return;
        }
        console.log(`Subscribed to topic ${topicOuv}`);
      });

      client.subscribe(topicGaz, (err) => {
        if (err) {
          console.error(`Error subscribing to topic ${topicGaz}:`, err);
          return;
        }
        console.log(`Subscribed to topic ${topicGaz}`);
      });

      client.subscribe(topicNiv, (err) => {
        if (err) {
          console.error(`Error subscribing to topic ${topicNiv}:`, err);
          return;
        }
        console.log(`Subscribed to topic ${topicNiv}`);
      });

      client.on('message', (topic, message) => {
        if (topic === topicOuv) {
          bin.valueOuv = message.toString();
          bin.save((err) => {
            if (err) {
              // console.error('Error saving bin:', err);
              return;
            }
            console.log('Bin updated:', bin);
          });
        } else if (topic === topicGaz) {
          bin.gaz = message.toString();
          bin.save((err) => {
            if (err) {
              // console.error('Error saving bin:', err);
              return;
            }
            console.log('Bin updated:', bin);
          });
        } else if (topic === topicNiv) {
          bin.niv = message.toString();
          bin.save((err) => {
            if (err) {
              // console.error('Error saving bin:', err);
              return;
            }
            console.log('Bin updated:', bin);
          });
        }
      });
    });
  });
}
// Call the function to fetch data and subscribe to topics
fetchDataAndSubscribe();
// -------------------------------------------------------------------------------


app.get('*', function(req, res){
  res.status(404).json({
    msg: "Api path not found."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.red,
  ),
);



// hosted server https://news-app-native.herokuapp.com/