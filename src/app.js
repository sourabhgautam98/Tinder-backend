const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/request");
const  profileRoutes = require("./routes/profile");

app.use("/", authRoutes);
app.use("/", requestRoutes);
app.use("/", profileRoutes);

connectDb()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("my server");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
