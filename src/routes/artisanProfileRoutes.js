const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const artisanProfileController = require('../controllers/artisanProfileController');

router.get('/', artisanProfileController.getArtisansByCategory);
router.post('/', authMiddleware, artisanProfileController.createProfile);
router.get('/', artisanProfileController.getAllProfiles);
router.get('/:id', artisanProfileController.getProfileById);
router.put('/:id', authMiddleware, artisanProfileController.updateProfile);
router.delete('/:id', authMiddleware, artisanProfileController.deleteProfile);
router.get('/by-category/:name', authMiddleware, artisanProfileController.getArtisansByCategory);
router.get('/search', artisanProfileController.searchArtisans);


module.exports = router;
