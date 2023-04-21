// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

// An aggregate function to get the number of users overall
const userCount = async () => {
  const numberOfUsers = await User.aggregate();
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
        userCount: await userCount(),
      };
      return res.json(userObj);
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
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },


  // get a user's friend
  // async getFriend(req, res) {
  //   try {
  //     const user = await User.findOne({ _id: req.params.userId })
  //   }
  // },

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

      if (!userId) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

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

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      const thoughts = await Thoughts.findOneAndUpdate(
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
  },

//   // Add an reaction to a user
//   async addReaction(req, res) {
//     try {
//       console.log('You are adding an reaction');
//       console.log(req.body);
//       const user = await User.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $addToSet: { reactions: req.body } },
//         { runValidators: true, new: true }
//       );

//       if (!user) {
//         return res
//           .status(404)
//           .json({ message: 'No user found with that ID :(' })
//       }

//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
//   // Delete reaction from a user
//   async deleteReaction(req, res) {
//     try {
//       const user = await User.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $pull: { reaction: { reactionId: req.params.reactionId } } },
//         { runValidators: true, new: true }
//       );

//       if (!user) {
//         return res
//           .status(404)
//           .json({ message: 'No user found with that ID :(' });
//       }

//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
// };
