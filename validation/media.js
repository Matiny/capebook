const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateMediaInput = data => {
  let errors = {};

  // Convert to string for validator
  data.title = !isEmpty(data.title) ? data.title : "";
  data.format = !isEmpty(data.format) ? data.format : "";
  data.releaseyear = !isEmpty(data.releaseyear) ? data.releaseyear : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "A title is required";
  }

  if (validator.isEmpty(data.format)) {
    errors.format = "The format is required";
  }

  if (validator.isEmpty(data.releaseyear)) {
    errors.releaseyear = "Release year is required";
  }

  return {
    errors, // Also written as errors: errors
    isValid: isEmpty(errors)
  };
};
