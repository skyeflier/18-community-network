const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  getFriend,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

const Thought = require('../../models/Thought');

// Middleware function to remove a user's associated thoughts when deleted
const deleteUserThoughts = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await Thought.deleteMany({ userId: userId });
    next();
  } catch (err) {
    next(err);
  }
};

// /api/user
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/user/:userId - separate this route 
router
  .route('/:userId')
  .get(getSingleUser)
  .get(getFriend)
  .put(updateUser)
  .delete(deleteUserThoughts, deleteUser);

module.exports = router;