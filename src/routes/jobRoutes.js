const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const jobController = require('../controllers/jobController');

router.post('/', authenticateToken, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id',authenticateToken, jobController.getJobById);
router.put('/:id', authenticateToken, jobController.updateJob);
router.delete('/:id', authenticateToken, jobController.deleteJob);

module.exports = router;
