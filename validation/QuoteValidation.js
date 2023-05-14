const isEmpty = require("./isEmpty");
const validator = require('validator');

module.exports = function validateQuoteInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.tel = !isEmpty(data.tel) ? data.tel : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.size = !isEmpty(data.size) ? data.size : "";
  data.powerSupply = !isEmpty(data.powerSupply) ? data.powerSupply : "";
  data.connectivity = !isEmpty(data.connectivity) ? data.connectivity : "";
  // data.disinfection = !isEmpty(data.disinfection) ? data.disinfection : [];
  // data.sensors = !isEmpty(data.sensors) ? data.sensors : [];
  // data.caracteristique = !isEmpty(data.caracteristique) ? data.caracteristique : [];

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.tel)) {
    errors.tel = "Tel field is required";
  } else if (!validator.isLength(data.tel, { min: 8, max: 8 })) {
    errors.tel = "Tel must be 8 characters";
  }
  if (validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }
  if (validator.isEmpty(data.size)) {
    errors.size = "Size field is required";
  }
  if (validator.isEmpty(data.powerSupply)) {
    errors.powerSupply = "Power supply field is required";
  }
  if (validator.isEmpty(data.connectivity)) {
    errors.connectivity = "Connectivity field is required";
  }
  // if (data.disinfection.length ===0) {
  //   errors.disinfection = "At least one Disinfection  is required";
  // }
  // if (data.sensors.length === 0) {
  //   errors.sensors = "At least one sensor is required";
  // }
  // if (data.caracteristique.length === 0) {
  //   errors.caracteristique = "At least one characteristic is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
