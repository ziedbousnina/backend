const express = require('express');
const { ROLES, isRole, isResetTokenValid } = require('../security/Rolemiddleware');
const router = express.Router()
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addToFav,
  getFavorites,
  removeFavorite,
  resetPassword,
  checkFavExistsOrNot,
  verifyEmail,
  forgotPassword,
  resendOTP,
  getUserByEmail,
  registerGoogleUser,
  resendOTPDeleteAccount,
  DeleteAccount,
  addAccessCode,
  getCurrentAccessList
} = require('../controllers/userController');
const passport = require('passport');
const protect = require('../middleware/authMiddleware.js')

router.route('/').post(registerUser)
router.route('/login').post(authUser)

router
  .route('/:id')
//   .delete(protect, deleteUser)
  .get(getUserById)

  router.route('/getUserByEmail/:email').get(getUserByEmail)
  router.route('/registerGoogleUser').post(registerGoogleUser)
//   .put(protect, updateUser)
router.route('/verifyemail').post(verifyEmail)
router.route('/deleteaccount').post(DeleteAccount)
router.route("/forgot-password").post( forgotPassword )
router.route("/resendotp").post( resendOTP )
router.route("/resendOTPDeleteAccount").post( resendOTPDeleteAccount )
// router.post("/reset-password", resetPassword )
router.post("/reset-password",isResetTokenValid,  resetPassword )
// router.get("/addAccessCode",  addAccessCode )
router.route("/access/addAccess").put(passport.authenticate('jwt', {session: false}),addAccessCode)
router.route("/access/getCurrentAccessList").get(passport.authenticate('jwt', {session: false}),getCurrentAccessList)
router.get("/verify-token", isResetTokenValid, (req, res)=> {
  res.json({success:true})
})

router.route('/profile/password/reset').post(protect ,resetPassword);



module.exports = router