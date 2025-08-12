const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req.body);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password Hash: ", passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Email and password not correct");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      
      const token = await user.getJWT();

      res.cookie("token", token,{
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Email and password not correct");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
   res.status(400).send("ERROR: " + err.message);
  }
});


app.post("/sendConnecttionRequest", userAuth, async (req, res) => {
const user = req.user;

console.log("Sending a connection request")

res.send( user.firstName + " sent the connect Request ")
})

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
