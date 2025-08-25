const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");

exports.signup = async (req, res) => {
  try {
    validateSignUpData(req.body);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Email and password not correct");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("Email and password not correct");

    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const userResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
    };

    res.send(userResponse);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

exports.logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successful");
};
