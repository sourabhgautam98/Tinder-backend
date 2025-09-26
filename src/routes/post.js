const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { createPost, getAllPosts, getMyPosts, deletePost } = require("../controllers/postController");

// 👉 Routes
router.post("/create", userAuth, createPost);
router.get("/allpost", userAuth, getAllPosts);
router.get("/myposts", userAuth, getMyPosts);
router.delete("/delete/:id", userAuth, deletePost);

module.exports = router;
