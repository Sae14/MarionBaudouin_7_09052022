// const sequelize = require("./index");
// const { DataTypes } = require("sequelize");
// const User = require("./User");
// const Post = require("./Post");

// const Comment = sequelize.define("comment", {
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: "id",
//     },
//   },
//   post_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Post,
//       key: "id",
//     },
//   },
// });

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await Comment.sync();
//   console.log("The table for the Comment model was just (re)created!");
// })();

// module.exports = Comment;
