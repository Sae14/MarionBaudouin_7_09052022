const { Like } = require("../models/index");
const { Sequelize, Op } = require("sequelize");

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
  // [Op.and]: [{a: 5}, {b: 6}]
  // const userId = req.body.userId;
  // const postId = req.params.id;
  const userId = req.auth.userId;
  const postId = req.body.postId;

  Like.findAll({
    // where: { [Op.and]: [{ userId: userId }, { postId: postId }] },
    where: { userId: userId, postId: postId },
    // $and: [{ userId: userId }, { postId: postId }],
  }).then((result) => {
    if (result == false) {
      Like.create({
        userId: userId,
        postId: postId,
      })
        .then(() => {
          res.status(201).json({ number: 1, message: "Like du post ajouté" });
        })
        .catch((error) => res.status(404).json({ error }));
      // return;
      //         else if (like.postId == likeObject.postId)
      // likes.map((like) => {
      //   if (like.postId !== likeObject.postId)
      //   }
    }
    // else if ({ [Op.not]: result }) {
    else {
      // Like.destroy({ where: { postId: postId } })

      Like.destroy({
        where: { postId: postId, userId: userId },
      })
        .then(() => {
          res.status(200).json({ number: 0, message: "Like du post retiré" });
        })
        .catch((error) => res.status(404).json({ error }));

      // } else if (likes.postId != req.params.id) {
    }
  });
};
// if (!likes) {
// Like.create({ userId: req.auth.userId, postId: req.params.id })
//   .then(() => {
//     res.status(200).json({ message: "Like du post ajouté" });
//   })
//   .catch((error) => res.status(404).json({ error }));
// // } else
// likes.map((like) => {

// find one
// this.getAllLikes.findOne({})
// if (likes.postId == req.params.id) {
