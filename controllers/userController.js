// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// An aggregate function to get the number of users overall
// const userCount = async () => {
//   const numberOfUsers = await User.aggregate();
//   return numberOfUsers;
// }

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      // const userObj = {
      //   users,
      //   userCount: await userCount(),
      // };
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //create a user's friend
  async addUserFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No friends!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user friend
  async deleteUserFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'No friends!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get a user's friend
  async getFriend(req, res) {
    try {
      // Find the user by ID
      const user = await User.findOne({ _id: req.params.userId });

      // Find the user's friend by ID
      const friend = await User.find({ _id: { $in: user.friend } });

      res.json(friend);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Oh no! That user has no friends :( ' });
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body }, //sets the new values for the fields specified in the req.body object
        { runValidators: true, new: true } //enables validation of the update operation and to return the modified document after the update
      );

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a user and delete their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      const thoughts = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};