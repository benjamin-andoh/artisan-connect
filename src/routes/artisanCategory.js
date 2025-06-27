const express = require('express');
const { assignCategoriesToArtisan } = require('../controllers/artisanCategoryController');
const authenticateToken = require('../middleware/auth');
// const artisanProfileController = require('../controllers/artisanProfileController');
const router = express.Router();

router.post('/assign', authenticateToken, assignCategoriesToArtisan);
// router.get('/:name/artisans', artisanProfileController.getArtisansByCategory);

module.exports = router;
