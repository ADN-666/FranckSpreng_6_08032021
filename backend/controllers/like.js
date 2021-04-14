/* Fichier contenant la logique permettant l'attribution d'un like ou dislike
  à une sauce sélectionné ainsi que l'ajout du user id dans le tableau usersliked
  ou usersdisliked correspondant à son choix, selon des conditions définies, puis
  mise é jour de la sauce*/

const Sauce = require("../models/sauce");

exports.createLike = (req, res, next) => {
  Sauce.findById({
    _id: req.params.id,
  })
    .then((sauce) => {
      const like = {};
      const userId = req.body.userId;

      if (
        sauce.usersLiked.includes(userId) ||
        sauce.usersDisliked.includes(userId)
      ) {
        if (sauce.usersLiked.includes(userId)) {
          if (req.body.like === 1) {
            like.$inc = { likes: 0 };
          } else if (req.body.like === 0) {
            like.$inc = { likes: -1 };
            like.$pull = { usersLiked: userId };
          } else if (req.body.like === -1) {
            like.$inc = { dislikes: 1 };
            like.$push = { usersDisliked: userId };
          }
        } else {
          if (req.body.like === 1) {
            like.$inc = { likes: 1 };
            like.$push = { usersLiked: userId };
          } else if (req.body.like === 0) {
            like.$inc = { dislikes: -1 };
            like.$pull = { usersDisliked: userId };
          } else if (req.body.like === -1) {
            like.$inc = { dislikes: 0 };
          }
        }
      } else {
        if (req.body.like === 1) {
          like.$inc = { likes: 1 };
          like.$push = { usersLiked: userId };
        } else if (req.body.like === 0) {
          like.$inc = { likes: 0 };
          like.$pull = {
            usersLiked: userId,
            usersDisliked: userId,
          };
        } else if (req.body.like === -1) {
          like.$inc = { dislikes: 1 };
          like.$push = { usersDisliked: userId };
        }
      }

      Sauce.updateOne({ _id: req.params.id }, like)
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
