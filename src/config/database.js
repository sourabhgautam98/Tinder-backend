const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://gautamsourabh98:RuWfJl9WZT17wCgd@cluster0.smiqkh8.mongodb.net/Tinder"
  );
};

module.exports = connectDb; 
