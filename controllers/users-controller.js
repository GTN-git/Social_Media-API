const { User } = require("../models")

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  // get one user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  // createUser
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err))
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" })
          return
        }
        res.json(dbUserData)
      })
      .catch((err) => res.json(err))
  },

  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err))
  },
  //add reaction
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $push: {
          reactions: req.body,
        },
      },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err))
  },
  //delete reaction
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId,
          },
        },
      }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err))
  },
}

module.exports = userController
