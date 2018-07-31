const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRegisterInput = data => {
  let errors = {};

  // Convert to string for validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be 2 to 20 characters long";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // URL checks

  if (!isEmpty(data.profilePic)) {
    if (!validator.isURL(data.profilePic)) {
      errors.profilePic = "Invalid URL";
    }
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be 6 to 30 characters long";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirmation is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors, // Also written as errors: errors
    isValid: isEmpty(errors)
  };
};
