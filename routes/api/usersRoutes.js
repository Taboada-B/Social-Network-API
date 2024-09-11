const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userContoroller');

// /api/users
router.route('/')
  .get(getAllUsers)  //works
  .post(createUser);  //works

// /api/users/:id
router.route('/:id')
  .get(getUserById) //not working
  .put(updateUser) // works
  .delete(deleteUser); //works

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
