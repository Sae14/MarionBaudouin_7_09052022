const { Like, Post, User } = require("../models/index");
const { post } = require("../routes/like");

exports.getAllLikes = (req, res, next) => {
  Like.findAll({
    where: { postId: req.params.id },
  })
    .then((likes) => res.status(200).json(likes))
    .catch((error) => res.status(404).json({ error }));
};

//   exports.getOneLike = (req, res, next) => {
//     Like.findOne({
//       where: { id: req.params.id },
//       include: [{ model: User, attributes: ["name"] }],
//     })
//       .then((like) => res.status(200).json(like))
//       .catch((error) => res.status(404).json({ error }));
//   };

exports.handleLike = (req, res, next) => {
  //   const userLike = req.body.like;
  const likeObject = {
    userId: req.body.userId,
    postId: req.body.postId,
    // userId: req.auth.userId,
  };

  Like.findAll({
    where: { userId: req.auth.userId },
  }).then((likes) => {
    if (!likes) {
      Like.create(likeObject)
        .then(() => {
          res.status(200).json({ number: 1, message: "Like du post ajouté" });
        })
        .catch((error) => res.status(404).json({ error }));
    } else {
      likes.map((like) => {
        if (like.postId !== likeObject.postId) {
          Like.create(likeObject)
            .then(() => {
              res
                .status(200)
                .json({ number: 1, message: "Like du post ajouté" });
            })
            .catch((error) => res.status(404).json({ error }));
        } else if (like.postId == likeObject.postId) {
          Like.destroy({ where: { id: like.id } })
            .then(() => {
              res
                .status(200)
                .json({ number: 0, message: "Like du post retiré" });
            })
            .catch((error) => res.status(404).json({ error }));
        }
      });
    }
  });
};
