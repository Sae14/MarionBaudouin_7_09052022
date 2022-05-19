// const Post = require("../models/Post");
// const User = require("../models/User");
const { Post, User } = require("../models/index");
const Sequelize = require("sequelize");
// const User = require("../models/index");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  if (req.file) {
    // json parse ? bug
    // const contentObject = req.body.post;
    Post.create({
      content: req.body.content,
      userId: req.auth.userId,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    })
      .then((post) =>
        res.status(201).json({
          postId: post.id,
          message: "Nouveau post avec image sauvegardé",
        })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    Post.create({
      content: req.body.content,
      userId: req.auth.userId,
      // userId: req.body.userId,
    })
      .then((post) =>
        res
          .status(201)
          .json({ postId: post.id, message: "Nouveau post sauvegardé" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.modifyPost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    // include: User,
    // include: {
    //   model: User,
    //   where: {
    //     id: req.auth,

    // role: Sequelize.col("user.role"),
    // },
    // },
  })
    .then((post) => {
      if ((req.auth.userId == post.userId) | (req.auth.userRole == "ADMIN")) {
        // | (req.auth == Post.hasUser.admin(true))
        // S'il y a modification de l'image :
        // if (req.file) {
        //   const postObjectFile = {
        //     ...JSON.parse(req.body.body),
        //     imageUrl: `${req.protocol}://${req.get("host")}/images/${
        //       req.file.filename
        //     }`,
        //   };
        //   const filename = post.imageUrl.split("/images/")[1];
        //   fs.unlink(`images/${filename}`, () => {
        //     Post.updateOne(
        //       { id: req.params.id },
        //       { ...postObjectFile, id: req.params.id }
        //     )
        //       .then(() => res.status(200).json({ message: "Post modifié" }))
        //       .catch((error) => res.status(400).json({ error }));
        //   });
        // } else {
        // S'il y a modification sans image :
        const postObject = { ...req.body };
        Post.update(
          { ...postObject, id: req.params.id },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Post modifié" }))
          .catch((error) => res.status(400).json({ error }));
        // }
      } else {
        return res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if ((req.auth.userId == post.userId) | (req.auth.userRole == "ADMIN")) {
        // const filename = sauce.imageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé" }))
          .catch((error) => res.status(400).json({ error }));
        // });
      } else {
        res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
