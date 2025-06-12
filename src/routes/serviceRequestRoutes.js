// routes/serviceRequestRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const controller = require('../controllers/serviceRequestController');

router.post('/', authenticateToken, controller.createServiceRequest);
router.get('/', controller.getAllServiceRequests);
router.get('/:id', controller.getServiceRequestById);
router.patch('/:id', authenticateToken, controller.updateServiceRequestStatus);

module.exports = router;
