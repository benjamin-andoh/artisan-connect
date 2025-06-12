const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const artisanProfileController = require('../controllers/artisanProfileController');

router.post('/', authMiddleware, artisanProfileController.createProfile);
router.get('/', artisanProfileController.getAllProfiles);
router.get('/:id', artisanProfileController.getProfileById);
router.put('/:id', authMiddleware, artisanProfileController.updateProfile);
router.delete('/:id', authMiddleware, artisanProfileController.deleteProfile);

module.exports = router;
