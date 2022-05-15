// const sequelize = require("./index");
// const { DataTypes } = require("sequelize");

// const Post = sequelize.define("post", {
//   author: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   imgggg: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   useriddd: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//     defaultValue: "employe",
//   },
// });

// // Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await Post.sync({ force: true });
//   console.log("The table for the Post model was just (re)created!");
// })();

// module.exports = Post;
