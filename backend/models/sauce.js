const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, match: /^[^@&*";?#\/\$=`<>]+$/g },
  manufacturer: {
    type: String,
    required: true,
    match: /^[^@&*";?#\/\$=`<>]+$/g,
  },
  description: {
    type: String,
    required: true,
    match: /^[^@&*";?#\/\$=`<>]+$/g,
  },
  mainPepper: { type: String, required: true, match: /^[^@&*";?#\/\$=`<>]+$/g },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false },
});

module.exports = mongoose.model("sauce", sauceSchema);
