const Exam = require('../models/Exam');

// @desc    Get exam data by type (e.g. upsc, ssc)
// @route   GET /api/exams/:examType
// @access  Public
const getExamByType = async (req, res) => {
  try {
    const examType = req.params.examType.toLowerCase();
    const exam = await Exam.findOne({ examType });
    
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({}).select('examType name icon color description');
    res.json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create or update an exam
// @route   POST /api/exams
// @access  Private/Admin
const createOrUpdateExam = async (req, res) => {
  try {
    const { examType, name, icon, color, description, syllabus, mockTests, currentAffairs } = req.body;

    let exam = await Exam.findOne({ examType: examType.toLowerCase() });

    if (exam) {
      // Update
      exam.name = name || exam.name;
      exam.icon = icon || exam.icon;
      exam.color = color || exam.color;
      exam.description = description || exam.description;
      if (syllabus) exam.syllabus = syllabus;
      if (mockTests) exam.mockTests = mockTests;
      if (currentAffairs) exam.currentAffairs = currentAffairs;

      await exam.save();
      return res.json({ message: 'Exam updated successfully', exam });
    }

    // Create
    exam = await Exam.create({
      examType: examType.toLowerCase(),
      name,
      icon,
      color,
      description,
      syllabus,
      mockTests,
      currentAffairs
    });

    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getExamByType,
  getAllExams,
  createOrUpdateExam
};
