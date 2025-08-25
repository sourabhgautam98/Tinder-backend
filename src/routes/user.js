const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const userController = require("../controllers/userController");

// Routes
router.get("/requests/received", userAuth, userController.getReceivedRequests);
router.get("/connections", userAuth, userController.getConnections);
router.get("/feed", userAuth, userController.getFeed);

module.exports = router;
