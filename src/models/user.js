const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      const genders = ["male", "female", "other"];
      if (!genders.includes(value)) {
        throw new Error("Invalid gender");
      }
    },
  },
  photoUrl: {
    type: String,
    default: "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif",
  },
  skills:{
    type: [String],

  }

});

module.exports = mongoose.model("User", userSchema) 
