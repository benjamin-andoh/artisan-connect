const express = require('express');
const authMiddleware = require('../middleware/auth');


const router = express.Router();

const userController = require('../controllers/userController.js');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

router.get('/me', authMiddleware, userController.getMyProfile);

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);

module.exports = router;
