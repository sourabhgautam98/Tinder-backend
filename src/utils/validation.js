const validator = require("validator");

const validateSignUpData = ({ firstName, lastName, emailId, password }) => {
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

module.exports = {
  validateSignUpData,
};
