const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const requestController = require("../controllers/requestController");

// Routes
router.post("/send/:status/:toUserId", userAuth, requestController.sendRequest);
router.post("/review/:status/:requestId", userAuth, requestController.reviewRequest);

module.exports = router;
