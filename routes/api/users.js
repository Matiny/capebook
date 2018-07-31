const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const code = require("../../config/keys");
const passport = require("passport");

//Load input validators
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
//Load User model
const User = require("../../models/User");

//@route   GET api/users/test
//@desc    Test user routes
//@access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Here are the users..." });
});

//@route   POST api/users/register
//@desc    Register user
//@access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check validation & show errors
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        profilePic: req.body.profilePic,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route   GET api/users/login
//@desc    Login user / Return JWToken
//@access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check validation & show errors
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //Find the user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found!!";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched, and create payload
        let payload = { id: user.id, name: user.name, profilePic: user.profilePic };
        //Sign Token
        jsonwebtoken.sign(
          payload,
          code.jwtKey,
          { expiresIn: "1h" },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route   GET api/users/online
//@desc    Return logged in uwser
//@access  Private

router.get(
  "/online",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id,
      profilePic: req.user.profilePic
    });
  }
);
module.exports = router;
