const { Sequelize } = require("sequelize");

MY_DB_NAME = process.env.DB_NAME;
MY_DB_USERNAME = process.env.DB_USERNAME;
MY_DB_PASSWORD = process.env.DB_PASSWORD;

// Initialisation de notre instance de sequelize afin de le lier à la BDD mysql :
const sequelize = new Sequelize(MY_DB_NAME, MY_DB_USERNAME, MY_DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

import("./User.js");
// import("./Post.js");
// import("./Comment.js");
// import("./Like.js");
// import("./Log.js");

module.exports = sequelize;
