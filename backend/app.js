const express = require("express");
const app = express();
require("dotenv").config();
require("./initDB")();
const morgan = require("morgan");

const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");
const likeRoutes = require("./routes/like");

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
app.use(morgan("tiny"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes, likeRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
