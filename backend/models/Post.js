const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const User = require("./User.js");

const Post = sequelize.define("post", {
  user_name: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "name",
    },
  },
  content: {
    type: DataTypes.STRING,
  },
  // file
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await Post.sync({ force: false, alter: true });
//   console.log("The table for the Post model was just (re)created!");
// })();

module.exports = Post;
