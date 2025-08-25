const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const profileController = require("../controllers/profileController");

// Routes
router.get("/view", userAuth, profileController.viewProfile);
router.patch("/edit", userAuth, profileController.editProfile);

module.exports = router;
