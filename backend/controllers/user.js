const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const { User, Log } = require("../models/index");
const MY_SECRET = process.env.SECRET;
const { Sequelize } = require("sequelize");

exports.signup = (req, res, next) => {
  // Inscription du user en hachant le mdp
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //   const user =
      User.create({
        email: req.body.email,
        name: req.body.name,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // Connexion de l'utilisateur en comparant les informations fournies avec celles de la base de données
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }

          res.status(200).json({
            userRole: user.role,
            userId: user.id,
            token: jwt.sign(
              { userId: user.id, userRole: user.role },
              MY_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
          Log.create({ userId: user.id });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  User.findOne({
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
    .then((user) => {
      if ((req.auth.userId == user.id) | (req.auth.userRole == "ADMIN")) {
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
        const userObject = { ...req.body };
        User.update(
          { ...userObject, id: req.params.id },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
          .catch((error) => res.status(400).json({ error }));
        // }
      } else {
        return res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// delete en cascade pr supprimer posts etc liés
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if ((req.auth.userId == user.id) | (req.auth.userRole == "ADMIN")) {
        // const filename = sauce.imageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
          .catch((error) => res.status(400).json({ error }));
        // });
      } else {
        res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
