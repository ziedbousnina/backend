const isEmpty = require("./isEmpty")

const validator = require('validator')
module.exports = function cleaningService(data) {
    let errors = {}
    
    data.governorat = !isEmpty(data.governorat)? data.governorat : ""
    data.municipal = !isEmpty(data.municipal)? data.municipal : ""
    data.description = !isEmpty(data.description)? data.description : ""
 
    // data.bio = !isEmpty(data.bio)? data.bio : ""

   
    if (validator.isEmpty(data.governorat)) {
        errors.governorat = "governorat field is required"
    }
    if (validator.isEmpty(data.municipal)) {
        errors.municipal = "municipal field is required"
    }
    if (validator.isEmpty(data.description)) {
        errors.description = "description field is required"
    }
 
    // if (validator.isEmpty(data.bio)) {
    //     errors.bio = "Bio field is required"
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}






