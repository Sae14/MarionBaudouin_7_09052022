const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const path = require("path");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const { sequelize } = require("./models/index");

const app = express();

// Vérification de la connexion entre sequelize et la base de données mysql :
try {
  sequelize.authenticate();
  console.log("Connection to database successfull");
} catch (error) {
  console.error("Connection to dabase failed", error);
}

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
