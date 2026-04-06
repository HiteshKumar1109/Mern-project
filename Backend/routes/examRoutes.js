const express = require('express');
const router = express.Router();
const { getExamByType, getAllExams, createOrUpdateExam, uploadSyllabusPdf } = require('../controllers/examController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/syllabuses');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    cb(null, `exam-${req.params.id}-${Date.now()}-${safeName}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

router.get('/', getAllExams);
router.get('/:examType', getExamByType);

// Route to create/update exams. Requires admin privileges.
router.post('/', protect, admin, createOrUpdateExam);

// Route to upload syllabus PDF for a specific exam
router.post('/:id/syllabus-pdf', protect, admin, upload.single('pdf'), uploadSyllabusPdf);

module.exports = router;
