const express = require('express');
const router = express.Router();
const { getExamByType, getAllExams, createOrUpdateExam } = require('../controllers/examController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getAllExams);
router.get('/:examType', getExamByType);

// Route to create/update exams. Requires admin privileges.
router.post('/', protect, admin, createOrUpdateExam);

module.exports = router;
