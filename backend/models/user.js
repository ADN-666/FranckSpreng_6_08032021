const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/.test(
          v
        );
      },
      message: (props) => `${props.value} L'email n'est pas valide !`,
    },
    required: [true, "L'email doit contenir un @ et un point"],
  },
  password: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          v
        );
      },
      message: (props) => `${props.value} Le mot de passe n'est pas valide !`,
    },
    required: [
      true,
      "Le mot de passe doit contenir Huit caractères au moins, au moins une lettre, un chiffre et un caractère spécial",
    ],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
