const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

const authRoutes = require("./routes/auth");
const requestRoutes = require("./routes/request");
const  profileRoutes = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/", authRoutes);
app.use("/", requestRoutes);
app.use("/", profileRoutes);
app.use("/", userRouter);

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
