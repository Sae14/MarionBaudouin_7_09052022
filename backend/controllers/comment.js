// const Comment = require("../models/Comment");
// const Comment = require("../models/index");
const { Comment, Post, User } = require("../models/index");
// const jwt = require("jsonwebtoken");
// const MY_SECRET = process.env.SECRET;

exports.getAllComments = (req, res, next) => {
  Comment.findAll({ include: Post })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id }, include: User })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

exports.createComment = (req, res, next) => {
  // const postObject = JSON.parse(req.body.body);
  Comment.create(
    {
      content: req.body.content,
      userId: req.auth.userId,
      postId: req.body.postId,
      //   postId: comment ?
      // userId: req.body.userId,
    }
    // { include: [{ association: Comment.Post }] }
  )
    .then((comment) =>
      res.status(201).json({
        commentId: comment.id,
        message: "Nouveau commentaire sauvegardé",
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  Comment.findOne({
    where: { id: req.params.id },
    // include: User,
  })
    .then((comment) => {
      if (
        (req.auth.userId == comment.userId) |
        (req.auth.userRole == "ADMIN")
      ) {
        const commentObject = { ...req.body };
        Comment.update(
          { ...commentObject, id: req.params.id },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Commentaire modifié" }))
          .catch((error) => res.status(400).json({ error }));
        // }
      } else {
        return res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      if (
        (req.auth.userId == comment.userId) |
        (req.auth.userRole == "ADMIN")
      ) {
        Comment.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
