const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  getFriend,
  createUser,
  updateUser,
  deleteUser,
  deleteUserThoughts,
} = require('../../controllers/userController.js');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId Need to separate this route 
router
  .route('/:userId')
  .get(getSingleUser)
  .get(getFriend)
  .put(updateUser)
  .delete(deleteUser);
  .delete (deleteUserThoughts, deleteUser);

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

module.exports = router;
