const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const { User } = require("../models/index");
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
            userId: user.id,
            token: jwt.sign({ userId: user.id }, MY_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
