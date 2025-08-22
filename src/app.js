const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  })
);

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
      console.log("port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
