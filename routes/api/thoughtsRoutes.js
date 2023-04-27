const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  deleteThoughtReaction
} = require('../../controllers/thoughtController');

router
  .route('/')
  .get(getThoughts)
  .post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(addThoughtReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteThoughtReaction);

module.exports = router;
