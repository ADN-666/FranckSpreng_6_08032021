/* fonction permettant l'authentification de l'utilisateur au login et permettant la création
d'un jeton qui sera utilisé sur les routes sauces et likes */

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedtoken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedtoken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request !"),
    });
  }
};
