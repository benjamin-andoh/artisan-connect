const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const artisanProfileController = require('../controllers/artisanProfileController');
const router = express.Router();

router.post('/', createCategory);         
router.get('/', getAllCategories);     
router.get('/:name/artisans', artisanProfileController.getArtisansByCategory);

module.exports = router;
