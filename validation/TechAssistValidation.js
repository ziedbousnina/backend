const isEmpty = require("./isEmpty");
const validator = require('validator');

module.exports = function validateTechnicalAssistanceInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.tel = !isEmpty(data.tel) ? data.tel : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.productSerialNumber = !isEmpty(data.productSerialNumber) ? data.productSerialNumber : '';

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.tel)) {
    errors.tel = 'Tel field is required';
  } else if (!validator.isLength(data.tel, { min: 8, max: 8 })) {
    errors.tel = 'Tel must be 8 characters';
  }
  if (validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }
  if (validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }
  if (validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }
  if (validator.isEmpty(data.productSerialNumber)) {
    errors.productSerialNumber = 'productSerialNumber field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
