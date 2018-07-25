const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validatePostInput = data => {
  let errors = {};

  // Convert to string for validator
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 5, max: 300 })) {
    errors.text = "Post should be 5 to 300 characters long";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }
  return {
    errors, // Also written as errors: errors
    isValid: isEmpty(errors)
  };
};
