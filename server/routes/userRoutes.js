const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);
router.get('/me',userController.getUser);
router.post('/login',userController.login);
router.post('/signup',userController.signup)

  // .route('/:id')
  // .get(userController.getUser)
  // .patch(userController.updateUser)
  // .delete(userController.deleteUser);

module.exports = router;
