const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const artisanProfileController = require('../controllers/artisanProfileController');
const router = express.Router();

router.post('/', createCategory);         // Admin creates category
router.get('/', getAllCategories);      // Get all categories
router.get('/:name/artisans', artisanProfileController.getArtisansByCategory);

module.exports = router;
