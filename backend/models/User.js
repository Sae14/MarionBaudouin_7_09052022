const sequelize = require("./index");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  bio: {
    type: DataTypes.STRING,
  },
});

// Opérations destructrices : à retirer pour la production et remplacer synchronisation par les migrations
// (async () => {
//   await User.sync();
//   console.log("The table for the User model was just (re)created!");
// })();

module.exports = User;
