const router = require("express").Router()
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller")

// /api/users/<userId>
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser)

// /api/users/
router.route("/").get(getAllUsers).post(createUser)

// /api/users/:userId/friends/:friendId

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

module.exports = router
