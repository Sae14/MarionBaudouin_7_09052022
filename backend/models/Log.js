// const sequelize = require("./index");
// const { DataTypes } = require("sequelize");
// const Sequelize = require("sequelize");
// const User = require("./User");

// const Log = sequelize.define(
//   "log"
// , {
// user_id: {
//   type: DataTypes.INTEGER,
// references: {
//   model: User,
//   key: "ID",
// },
// },
// }
// );
// User.hasMany(Log);
// Log.belongsTo(User);
// User.hasMany(Log, {
//   as: "User",
//   // foreignKey: "user_id",
// });

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await Log.sync();
// console.log("The table for the Log model was just (re)created!");
// })();

// module.exports = Log;
