const sequelize = require("./index");
const { DataTypes } = require("sequelize");
// const Sequelize = require("sequelize");
const Log = require("./Log");

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
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bio: {
    type: DataTypes.STRING,
  },
});

// User.hasMany(Log);
// User.hasMany(
// Log
// , { as: "User", foreignKey: "user_id" }
// );
// Log.belongsTo(User);

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
(async () => {
  await User.sync({ force: false, alter: true });
  console.log("The table for the User model was just (re)created!");
})();

module.exports = User;
