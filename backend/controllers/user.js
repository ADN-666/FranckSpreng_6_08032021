const User = require("../models/user");
const bcrypt = require("bcrypt"); // module de cryptage du mot de passe
const jwt = require("jsonwebtoken"); // module permettant la création d'un jeton d'authentification
const cryptoJS = require("crypto-js"); // module de cryptage et décryptage de l'adresse mail

exports.signup = (req, res, next) => {
  const emailEncrypt = cryptoJS.AES.encrypt(
    req.body.email,
    process.env.KEYCRYPT
  ).toString();
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: emailEncrypt,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.find()
    .then((users) => {
      for (let user of users) {
        const emailDecrypt = cryptoJS.AES.decrypt(
          user.email,
          process.env.KEYCRYPT
        ).toString(cryptoJS.enc.Utf8);
        if (emailDecrypt === req.body.email) {
          bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
              if (!valid) {
                return res
                  .status(401)
                  .json({ error: "Mot de passe incorrect !" });
              }
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
                  expiresIn: "24h",
                }),
              });
            })
            .catch((error) => res.status(500).json({ error }));
        }
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
