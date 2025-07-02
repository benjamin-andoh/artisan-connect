/* These lines of code are setting up a router using the Express framework in a Node.js application. */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const artisanProfileController = require('../controllers/artisanProfileController');

router.get('/', artisanProfileController.getAllProfiles);
router.post('/', authMiddleware, artisanProfileController.createProfile);

// 🚨 Place these FIRST
router.get('/by-category/:name', authMiddleware, artisanProfileController.getArtisansByCategory);
router.get('/search', artisanProfileController.searchArtisans);
router.get('/me', authMiddleware, artisanProfileController.getMyProfile);

// ✅ Then generic :id-based routes
router.get('/:id', artisanProfileController.getProfileById);
router.put('/:id', authMiddleware, artisanProfileController.updateProfile);
router.delete('/:id', authMiddleware, artisanProfileController.deleteProfile);

module.exports = router;
