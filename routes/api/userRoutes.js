const router = require('express').Router();
//get user routes from usercontroller
const {getAllUser, getUserById, createUser, updateUserById, deleteUserById} = require('../../controller/userController');

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);


module.exports = router;
