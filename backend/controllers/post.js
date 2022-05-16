const Post = require("../models/Post");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const MY_SECRET = process.env.SECRET;

//exports.getAllPosts = (req, res, next) => {};

// exports.getOnePost = (req, res, next) => {};

exports.createPost = (req, res, next) => {
  // const sauceObject = JSON.parse(req.body.sauce);
  Post.create({
    content: req.body.content,
    user_id: req.auth,
    // user_id: req.body.user_id,
    //   ...sauceObject,
    //   imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //     req.file.filename
    //   }`,
  })
    .then((Post) =>
      res
        .status(201)
        .json({ postId: Post.id, message: "Nouveau post sauvegardé" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// exports.modifyPost = (req, res, next) => {};

// exports.deletePost = (req, res, next) => {};
