const { Post, User } = require("../models/index");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id }, include: User })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  // const postObjectt = JSON.parse(req.body);
  const postObjectt = req.body;
  const postObject = {
    ...postObjectt,
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
    .then((post) =>
      res.status(201).json({
        postId: post.id,
        message: "Nouveau post sauvegardé",
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (req.auth.userId == post.userId || req.auth.userRole == "ADMIN") {
        // S'il y a modification de l'image :
        if (req.file) {
          const postObjectFile = {
            // ...JSON.parse(req.body),
            content: req.body.content,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          const filename = post.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.update(
              { ...postObjectFile, id: req.params.id },
              { where: { id: req.params.id } }
            )
              .then(() =>
                res.status(200).json({ message: "Post modifié avec image" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
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
