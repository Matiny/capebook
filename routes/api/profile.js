const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');

//Load the validation
const validateProfileInput = require("../../validation/profile");
const validateMediaInput = require("../../validation/media");

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// Customize image upload settings
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage, limits: {
  fileSize: 1024 * 1024
} });

//@route   GET api/profile/test
//@desc    Test profile routes
//@access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Here are the profiles..." });
});

//@route   POST api/profile
//@desc    Create/Edit user profile
//@access  Private
router.post(
  "/",
  upload.single("profilePic"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.file);
    //Validate the fields
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //Return errors with 400 status
      return res.status(400).json(errors);
    }
    //Get all fields
    let profileFields = {};
    profileFields.user = req.user.id;
    // If blocks without curly braces.
    // Assign the value to the profileFields object
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.alignment) profileFields.alignment = req.body.alignment;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.origin) profileFields.origin = req.body.origin;
    if (req.file.path) profileFields.profilePic = req.file.path;
    //Skills will be split into array
    if (typeof req.body.skills !== "undefined")
      profileFields.skills = req.body.skills.split(",");

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update profile!
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create!
        // Check if name exists already
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if (profile) {
            errors.username = "That username already exists";
            res.status(400).json(errors);
          }
          //Save profile!
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route   GET api/profile
//@desc    Get online profile
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found!!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   GET api/name/:name
//@desc    Get profile by name
//@access  Public

router.get("/username/:username", (req, res) => {
  let errors = {};
  Profile.findOne({ username: req.params.username })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Profile not found!!";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json({ err });
    });
});

//@route   GET api/user/:user_id
//@desc    Get profile by user id
//@access  Public

router.get("/user/:user_id", (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Profile not found!!";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

//@route   GET api/profile/all
//@desc    Get all profiles
//@access  Public

router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "email"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "Profiles not found!!";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ noprofiles: "There are no profiles" });
    });
});

//@route   POST api/profile/media
//@desc    Add the featured media
//@access  Private

router.post(
  "/media",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validate the fields
    const { errors, isValid } = validateMediaInput(req.body);
    if (!isValid) {
      //Return errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      let newMedia = {
        title: req.body.title,
        format: req.body.format,
        releaseyear: req.body.releaseyear,
        actor: req.body.actor,
        description: req.body.description
      };
      //Add to the profile's media array
      profile.media.push(newMedia);

      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

//@route   DELETE api/profile/media/:media_id
//@desc    Remove media from profile
//@access  Private
router.delete(
  "/media/:media_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      //Filter the item out of the array
      let mediaArr = profile.media.filter(
        story => story.id !== req.params.media_id
      );
      if (mediaArr.length !== profile.media.length) {
        profile.media = mediaArr;
      }
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route   DELETE api/profile
//@desc    Remove user & profile
//@access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
