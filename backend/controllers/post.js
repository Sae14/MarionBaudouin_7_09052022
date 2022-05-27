const { Post, User } = require("../models/index");
const fs = require("fs");
const { Sequelize } = require("sequelize");

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: { model: User, attributes: ["name"] },
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: { model: User, attributes: ["name"] },
    // include: [{ model: User, attributes: ["name"] }],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  // const postObjectt = JSON.parse(req.body);
  // const postObjectt = req.body;
  const postObject = {
    // ...postObjectt,
    content: req.body.content,
    userId: req.auth.userId,
    // content: JSON.parse(req.body.body),
    // ...JSON.parse(req.body),
    // content: req.body.post,
    // content: JSON.parse(req.body),
  };

  if (req.file) {
    postObject.image = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  // json parse ? bug
  Post.create(postObject)
    .then((post) => {
      Post.findOne({
        where: { id: post.id },
        include: { model: User, attributes: ["name"] },
      }).then((postres) =>
        res.status(201).json({ postres, message: "Post créé avec succès !" })
      );

      // User.findOne({ where: { id: req.auth.userId } }).then((user) => {
      //   const postObjectt = {
      //     id: post.id,
      //     content: post.content,
      //     image: post.image,
      //     createdAt: post.createdAt,
      //     updatedAt: post.updatedAt,
      //     userId: post.userId,
      //     user: user.name,
      //   };
    })

    .catch((error) => res.status(400).json({ error }));
};
// postImage: post.image,
// postContent: post.content,
// message: "Nouveau post sauvegardé",

exports.modifyPost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (req.auth.userId == post.userId || req.auth.userRole == "ADMIN") {
        // S'il y a modification de l'image précédente :
        if (req.file && post.image) {
          const postObject = {
            content: req.body.content,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.update(
              {
                ...postObject,
              },
              { where: { id: req.params.id } }
            )
              .then(() => {
                res.status(200).json({
                  postObject,
                  message: "Post modifié avec remplacement de l'image",
                });
              })
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          const postObject = {
            content: req.body.content,
          };
          if (req.file) {
            postObject.image = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
          }
          Post.update(postObject, {
            where: {
              id: req.params.id,
            },
          })
            .then(() =>
              res.status(200).json({ postObject, message: "Post modifié" })
            )
            .catch((error) => res.status(400).json({ error }));
          // }
        }
      } else {
        return res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (req.auth.userId == post.userId || req.auth.userRole == "ADMIN") {
        if (post.image) {
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { id: req.params.id } })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Post supprimé avec son image" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Post.destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Post supprimé" }))
            .catch((error) => res.status(400).json({ error }));
        }
      } else {
        res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
