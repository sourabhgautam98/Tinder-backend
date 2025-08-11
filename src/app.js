const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added success");
  } catch (err) {
    res.status(400).send("error saving the user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
       res.status(404).send("User not found");
    }
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});


app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
   const user = await User.findByIdAndDelete({_id: userId })
   res.send("User deleted Successfully")
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});


app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data,{
      returnDocument: "after",
      runValidators: true,
    })
   res.send("User updated Successfully")
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
  }
});


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
