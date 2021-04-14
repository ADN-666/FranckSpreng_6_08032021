/* fichier contenant la déclaration de la route permettant d'acceder à une sauce avec utilisation
de la middleware d'authentification ainsi que multer pour la photo de la sauce.
Déclaration du controller sauce avec ses différentes fonctions pour la gestion de la sauce */

const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const saucesCtrl = require("../controllers/sauces");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.get("/", auth, saucesCtrl.getAllSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);

module.exports = router;
