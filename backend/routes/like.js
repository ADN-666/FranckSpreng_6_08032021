/* fichier contenant la déclaration de la route permettant de liker une sauce avec utilisation
de la middleware d'authentification ainsi que du controller like avec sa fonction de création de like */

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");

router.post("/:id/like", auth, likeCtrl.createLike);

module.exports = router;
