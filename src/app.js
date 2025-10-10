const express = require("express");
require("dotenv").config(); 
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/request");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use("/post", postRoutes);
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);
app.use("/profile", profileRoutes);
app.use("/users", userRoutes);

// Database Connection & Server Start
connectDb()
  .then(() => {
    console.log("✅ Database connection established");
    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

module.exports = app;
