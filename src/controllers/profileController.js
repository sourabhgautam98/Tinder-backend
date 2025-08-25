const { validateProfileEditData } = require("../utils/validation");

// View Profile
exports.viewProfile = async (req, res) => {
  try {
    const { firstName, lastName, photoUrl, skills, gender, age } = req.user;

    res.json({
      firstName,
      lastName,
      photoUrl,
      skills,
      gender,
      age,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit Profile
exports.editProfile = async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your profile updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
