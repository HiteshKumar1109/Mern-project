const express = require('express');
const router = express.Router();
const { submitAttempt, getAttemptResult } = require('../controllers/attemptController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, submitAttempt);
router.get('/:attemptId', protect, getAttemptResult);

module.exports = router;
