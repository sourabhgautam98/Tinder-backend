const express = require("express");
require("dotenv").config(); 
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://tinder-frontend-delta.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

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
    app.listen(8080, () => {
      console.log("🚀 Server running on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

module.exports = app;
