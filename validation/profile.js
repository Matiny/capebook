const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  // Convert to string for validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.alignment = !isEmpty(data.alignment) ? data.alignment : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.username, { min: 2, max: 20 })) {
    errors.username = "Name must be 2 to 20 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Profile name is required";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "A list of skills is required";
  }

  if (validator.isEmpty(data.alignment)) {
    errors.alignment = "Moral alignment is required";
  }

  // URL checks

  if (!isEmpty(data.profilePic)) {
    if (!validator.isURL(data.profilePic)) {
      errors.profilePic = "Invalid URL";
    }
  }

  return {
    errors, // Also written as errors: errors
    isValid: isEmpty(errors)
  };
};
