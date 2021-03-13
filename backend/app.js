require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const headers = require("./middleware/headers");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const likeRoutes = require("./routes/like");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zq7ah.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log("Connexion à MongoDB échouée !");
    console.error(error);
  });

app.use(headers);
app.use(bodyParser.json());
app.use(helmet());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes, likeRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;