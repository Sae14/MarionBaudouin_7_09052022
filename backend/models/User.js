const sequelize = require("./index");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    // unique: true, allownull : false
  },
  password: {
    type: DataTypes.STRING,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bio: {
    type: DataTypes.STRING,
  },
});

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await User.sync({ force: false, alter: true });
//   console.log("The table for the User model was just (re)created!");
// })();

module.exports = User;
