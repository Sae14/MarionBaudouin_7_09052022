const express = require("express");
const helmet = require("helmet");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");

const app = express();

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
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
