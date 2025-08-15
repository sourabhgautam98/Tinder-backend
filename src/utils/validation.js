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

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "skills",
    "gender",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
