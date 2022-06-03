const { Like } = require("../models/index");
const { Sequelize } = require("sequelize");

exports.getAllLikes = (req, res, next) => {
  Like.findAll()
    .then((likes) => res.status(200).json(likes))
    .catch((error) => res.status(404).json({ error }));
};

exports.handleLike = (req, res, next) => {
  const userId = req.auth.userId;
  const postId = req.body.postId;

  Like.findAll({
    where: { userId: userId, postId: postId },
  }).then((result) => {
    if (result == false) {
      Like.create({
        userId: userId,
        postId: postId,
      })
        .then((like) => {
          Like.findOne({
            where: { id: like.id },
          }).then((likeobject) =>
            res
              .status(201)
              .json({ likeobject, number: 1, message: "Like du post ajouté" })
          );
        })
        .catch((error) => res.status(404).json({ error }));
    } else {
      Like.destroy({
        where: { postId: postId, userId: userId },
      })
        .then(() => {
          res.status(200).json({
            number: 0,
            message: "Like du post retiré",
          });
        })
        .catch((error) => res.status(404).json({ error }));
    }
  });
};
