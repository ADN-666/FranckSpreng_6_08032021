const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const valid = require("../middleware/valid");

router.post("/signup", valid, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;