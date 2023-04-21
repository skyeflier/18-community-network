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
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getThoughts).post(createThought);

// /api/user/:userId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// router
//   .route('/:thoughtId/friends/:friendID')
//   .get(getFriendThought)

router
  .route('/:thoughtId/reactions')
  .get(addThoughtReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteThoughtReaction);

module.exports = router;
