const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateLoginInput = data => {
  let errors = {};

  // Convert to string for validator
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  //Placing this here shows the message when user enters no email
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  return {
    errors, // Also written as errors: errors
    isValid: isEmpty(errors)
  };
};
