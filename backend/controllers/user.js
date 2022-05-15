// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const MY_SECRET = process.env.SECRET;

// exports.signup = (req, res, next) => {
//   // Inscription du user en hachant le mdp
//   bcrypt.hash(req.body.password, 10).then((hash) => {
//     const user = new User({
//       email: req.body.email,
//       password: hash,
//     });
//   });
// };

// exports.login = (req, res, next) => {};
