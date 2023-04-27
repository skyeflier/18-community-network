const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  // getFriendThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  deleteThoughtReaction
} = require('../../controllers/thoughtController');

// Middleware function to remove a reaction when deleted
// const deleteThoughtReaction = async (req, res, next) => {
//   try {
//     const reactionId = req.params.reactionId;
//     await Thought.updateOne({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: reactionId } } });
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// /api/thought
router
  .route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thought/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(addThoughtReaction)

router
  .route(':thoughtId/reactions/:reactionId')
  .delete(deleteThoughtReaction);

module.exports = router;
