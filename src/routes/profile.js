const express = require("express");
const profileRoutes = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");


profileRoutes.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {loggedInUser[key] = req.body[key];});
    loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your profile updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRoutes;
