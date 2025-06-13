const express = require('express');
const { assignCategoriesToArtisan } = require('../controllers/artisanCategoryController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/assign', authenticateToken, assignCategoriesToArtisan);

module.exports = router;
