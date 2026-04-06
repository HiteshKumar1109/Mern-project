const Test = require('../models/Test');

// @desc    Get all tests, with optional filters
// @route   GET /api/tests
// @access  Public
const getAllTests = async (req, res) => {
  try {
    const { exam_type, level } = req.query;
    let query = {};
    
    if (exam_type) {
      query.exam_type = new RegExp(exam_type, 'i');
    }
    
    if (level) {
      query.level = level.toLowerCase();
    }
    
    const tests = await Test.find(query).select('-questions.correct_answer -questions.explanation');
    res.json({ tests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests', error: error.message });
  }
};

// @desc    Get test by ID
// @route   GET /api/tests/:testId
// @access  Public
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId).select('-questions.correct_answer -questions.explanation');
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test', error: error.message });
  }
};

module.exports = {
  getAllTests,
  getTestById
};
