// const Post = require("../models/Post");
// const User = require("../models/User");
const { Post } = require("../models/index");
// const User = require("../models/index");
// const fs = require("fs");

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
  // const postObject = JSON.parse(req.body.body);
  Post.create({
    content: req.body.content,
    user_id: req.auth,
    // user_id: req.body.user_id,
    //   ...postObject,
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

exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((Post) => {
      if (req.auth == Post.user_id) {
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
    .then((Post) => {
      if (req.auth == Post.user_id) {
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
