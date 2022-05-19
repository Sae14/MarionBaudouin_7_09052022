const { Sequelize, DataTypes } = require("sequelize");

MY_DB_NAME = process.env.DB_NAME;
MY_DB_USERNAME = process.env.DB_USERNAME;
MY_DB_PASSWORD = process.env.DB_PASSWORD;

// Initialisation de notre instance de sequelize afin de le lier à la BDD mysql :
const sequelize = new Sequelize(MY_DB_NAME, MY_DB_USERNAME, MY_DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    // allownull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    //  allownull: false,
  },
  password: {
    type: DataTypes.STRING,
    // allownull: false,
  },
  role: {
    type: DataTypes.ENUM("USER", "ADMIN"),
    defaultValue: "USER",
  },
  bio: {
    type: DataTypes.STRING,
  },
});

const Post = sequelize.define("post", {
  content: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

const Log = sequelize.define("log");

const Comment = sequelize.define("comment", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Log);
Log.belongsTo(User);

User.hasMany(Post, {
  onDelete: "cascade",
});
Post.belongsTo(User);

Post.hasMany(Comment, { onDelete: "cascade" });
Comment.belongsTo(Post);

User.hasMany(Comment, { onDelete: "cascade" });
Comment.belongsTo(User);

// (async () => {
//   await sequelize.sync({ force: false, alter: true });
//   console.log("Tables for all models were just (re)created!");
// })();

module.exports = { sequelize, User, Post, Log, Comment };
