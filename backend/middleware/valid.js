/* fonction permettant de controler la validité des champs Emails et mots de passe à la création d'un nouvel utilisateur,
utilisation de regex afin de renforcer le mot de passe en obligeant certains caractères. */

const Joi = require("@hapi/joi");

module.exports = (req, res, next) => {
  const valid = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .required(),
    });
    return schema.validate(data);
  };
  const { error } = valid(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
