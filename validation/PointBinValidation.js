const isEmpty = require("./isEmpty");
const validator = require('validator');

module.exports = function validateBinPointInput(data) {
  let errors = {};
  // Add validation rules specific to the BinPoint model
  data.quoteDemande = !isEmpty(data.quoteDemande) ? data.quoteDemande : "";
  data.bins = !isEmpty(data.bins) ? data.bins : [];
  data.lat = !isEmpty(data.lat) ? data.lat : "";
  data.long = !isEmpty(data.long) ? data.long : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (validator.isEmpty(data.quoteDemande)) {
    errors.quoteDemande = "Quote demand is required";
  }
  if (data.bins.length === 0) {
    errors.bins = "At least one bin is required";
  }
  if (validator.isEmpty(data.lat)) {
    errors.lat = "Lat field is required";
  }
  if (validator.isEmpty(data.long)) {
    errors.long = "Long field is required";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "address field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
