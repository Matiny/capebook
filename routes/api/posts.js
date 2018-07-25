const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Post model
const Post = require("../../models/Post");
//Load Profile model
const Profile = require("../../models/Profile");
//Load Post validator
const validatePostInput = require("../../validation/post");

//@route   GET api/posts/test
//@desc    Test post routes
//@access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Here are the posts..." });
});

//@route   POST api/posts
//@desc    Create a post
//@access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check whether valid
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route   GET api/posts
//@desc    Get posts
//@access  Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ posts: "No posts found" }));
});

//@route   GET api/posts/:id
//@desc    Get post by id
//@access  Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ post: "No posts found with that ID" })
    );
});

//@route   DELETE api/posts/:id
//@desc    Delete post by id
//@access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (post.user.toString() !== req.user.id) {
          // Compare the post user id to logged in user
          return res.status(401).json({ unauthorized: "User is unauthorized" });
        }
        // Remove post
        post
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err => res.status(404).json({ post: "Post not found" }));
      });
    });
  }
);

//@route   POST api/posts/like/:id
//@desc    Add like to post by id
//@access  Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Returns an array that matches like object to user id, hence user has already liked
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ like: "You've already liked this post" });
        }
        //Add user id to post.likes array
        post.likes.push({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);

//@route   POST api/posts/unlike/:id
//@desc    Remove like to post by id
//@access  Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Returns an array that matches like object to user id, hence user has already liked
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ unlike: "You haven't liked this post" });
        }
        //Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        //Splice the like from the array
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);

//@route   POST api/posts/comment/:id
//@desc    Add comment to post
//@access  Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check whether valid
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Create comment from Schema + user input
    Post.findById(req.params.id)
      .then(post => {
        let newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };
        //Add comment to array...
        post.comments.push(newComment);
        //Then save the post to db
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Remove comment from post
//@access  Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Match the logged in user with comments in array
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ comment: "Comment not found" });
        }

        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice from array
        post.comments.splice(removeIndex, 1);

        //Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "No post found" }));
  }
);
module.exports = router;
