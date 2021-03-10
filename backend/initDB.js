const { connect, connection } = require("mongoose");
const { config } = require("dotenv");

/*Nous utiliserons module.exports puisque nous voulons importer ce 
fichier dans notre server.js */

module.exports = () => {
  config();
  const uri = process.env.DB_URI;

  connect(uri, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then(() => {
      console.log("Connexion à MongoDB réussie !");
    })
    .catch((error) => {
      console.log("Connexion à MongoDB échouée !");
      console.error(error.message);
    });
};
