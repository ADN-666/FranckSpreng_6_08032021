require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const headers = require("./middleware/headers");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const likeRoutes = require("./routes/like");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const Ddos = require("ddos");
const ddos = new Ddos({ burst: 10, limit: 15 });

app.use(helmet());
app.use(mongoSanitize());
app.use(ddos.express);

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(headers);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes, likeRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
