const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Post = require("./Post");
// Un post peut avoir plusieurs likes / Un user peut avoir plsrs likes
const Like = sequelize.define("like", {
  count: {
    type: DataTypes.INTEGER,
  },

  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: "id",
    },
  },
});

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await Like.sync();
//   console.log("The table for the Like model was just (re)created!");
// })();

module.exports = Like;
