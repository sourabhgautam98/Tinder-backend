const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Weak password: " + value);
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: `{VALUE} is not a valid gender`,
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid photo URL: " + value);
      }
    },
  },
  skills: {
    type: [String],
    validate(value) {
      if (value.length > 10) {
        throw new Error("Skills cannot be more than 10");
      }
    },
  },
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id, name: user.firstName , emailId: user.emailId},
    "Sourabh447",
    { expiresIn: "7d" }
  );
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
const user = this;
const passwordHash = user.password

const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
