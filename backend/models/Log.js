const sequelize = require("./index");
const { DataTypes } = require("sequelize");
const User = require("./User.js");

const Log = sequelize.define("log", {
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
//   await Log.sync();
//   console.log("The table for the Log model was just (re)created!");
// })();

module.exports = Log;
