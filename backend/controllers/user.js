const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
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
    .then((user) => {
      const userObject = {
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        id: user.id,
        name: user.name,
        role: user.role,
        image: user.image,
      };
      res.status(200).json(userObject);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (req.auth.userId == user.id || req.auth.userRole == "ADMIN") {
        if (req.file && user.image) {
          const userObject = {
            bio: req.body.bio,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          const filename = user.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            User.update(
              {
                ...userObject,
              },
              { where: { id: req.params.id } }
            )
              .then(() => {
                res.status(200).json({
                  userObject,
                  message: "Utilisateur modifié avec remplacement de l'image",
                });
              })
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          const userObject = {
            bio: req.body.bio,
          };
          if (req.file) {
            userObject.image = `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`;
          } else {
            userObject.image = user.image;
          }
          User.update(userObject, {
            where: {
              id: req.params.id,
            },
          })
            .then(() =>
              res.status(200).json({
                userObject,
                message: "Utilisateur modifié",
              })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      } else {
        return res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (req.auth.userId == user.id || req.auth.userRole == "ADMIN") {
        if (user.image) {
          const filename = user.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            User.destroy({ where: { id: req.params.id } })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Utilisateur supprimé avec son image" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          User.destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({ message: "Utilisateur supprimé" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      } else {
        res.status(403).json({ message: "Unauthorized request" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
