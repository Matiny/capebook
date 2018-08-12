const express = require("express");
const mongoose = require("mongoose");
const bparser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Middleware for posts
app.use(bparser.urlencoded({ extended: false }));
app.use(bparser.json());
//From config file
let keys = require("./config/keys");
//Connect to DB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB is now connected!"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

// Make the uploads folder public
app.use("/uploads", express.static("uploads"));
//Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  //Now create the catch all route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is now live on port ${port}`));
