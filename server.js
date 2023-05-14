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