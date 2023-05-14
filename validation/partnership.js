const isEmpty = require("./isEmpty")
const validator = require('validator')

module.exports = function validatePartnershipInput(data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.tel = !isEmpty(data.tel) ? data.tel : ""
  data.country = !isEmpty(data.country) ? data.country : ""
  data.city = !isEmpty(data.city) ? data.city : ""
  data.companyPresentation = !isEmpty(data.companyPresentation) ? data.companyPresentation : ""
  data.partnershipType = !isEmpty(data.partnershipType) ? data.partnershipType : ""
  data.TargetMarkets = !isEmpty(data.TargetMarkets) ? data.TargetMarkets : ""
  data.DistrubutionSrategy = !isEmpty(data.DistrubutionSrategy) ? data.DistrubutionSrategy : ""
  data.ProjectsForWhichYouPlanToUseTheSolution = !isEmpty(data.ProjectsForWhichYouPlanToUseTheSolution) ? data.ProjectsForWhichYouPlanToUseTheSolution : ""

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required"
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }
  if (validator.isEmpty(data.tel)) {
    errors.tel = "Tel field is required"
  } else if (!validator.isLength(data.tel, { min: 8, max: 8 })) {
    errors.tel = "Tel must be 8 characters"
  }
  if (validator.isEmpty(data.country)) {
    errors.country = "Country field is required"
  }
  if (validator.isEmpty(data.city)) {
    errors.city = "City field is required"
  }
  if (validator.isEmpty(data.companyPresentation)) {
    errors.companyPresentation = "Company Presentation field is required"
  }
  if (validator.isEmpty(data.partnershipType)) {
    errors.partnershipType = "Partnership Type field is required"
  }
  if (validator.isEmpty(data.TargetMarkets)) {
    errors.TargetMarkets = "Target Markets field is required"
  }
  if (validator.isEmpty(data.DistrubutionSrategy)) {
    errors.DistrubutionSrategy = "Distribution Strategy field is required"
  }
  if (validator.isEmpty(data.ProjectsForWhichYouPlanToUseTheSolution)) {
    errors.ProjectsForWhichYouPlanToUseTheSolution = "Projects for Which You Plan to Use the Solution field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
