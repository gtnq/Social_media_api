const router = require('express').Router();
//get user routes from usercontroller
const {getAllUser, getUserById, createUser, updateUserById, deleteUserById, addFriend, deleteFriend} = require('../../controller/userController');

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);

router.route('/friend/:id').put(addFriend).delete(deleteFriend)


module.exports = router;
