const Attempt = require('../models/Attempt');
const Test = require('../models/Test');

// @desc    Submit a test attempt
// @route   POST /api/attempts
// @access  Private
const submitAttempt = async (req, res) => {
  try {
    const { test_id, answers, time_taken } = req.body;
    const user_id = req.user._id;

    // Fetch the test to grade the answers
    const test = await Test.findById(test_id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let score = 0;
    const marksPerQuestion = test.questions.length > 0 ? (test.total_marks / test.questions.length) : 0;

    // Calculate score
    for (let i = 0; i < test.questions.length; i++) {
        // answers object comes as { "0": 2, "1": 1 }
        const studentAnswer = answers[i.toString()]; 
        if (studentAnswer !== undefined && studentAnswer === test.questions[i].correct_answer) {
            score += marksPerQuestion;
        }
    }

    const attempt = await Attempt.create({
      user_id,
      test_id,
      answers,
      score,
      total_marks: test.total_marks,
      time_taken
    });

    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting attempt', error: error.message });
  }
};

// @desc    Get attempt result
// @route   GET /api/attempts/:attemptId
// @access  Private
const getAttemptResult = async (req, res) => {
  try {
    const attempt = await Attempt.findOne({ 
      _id: req.params.attemptId,
      user_id: req.user._id // Verify it belongs to the user
    });

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Fetch full test with correct answers and explanations
    const test = await Test.findById(attempt.test_id);

    res.json({
      attempt,
      test
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attempt result', error: error.message });
  }
};

module.exports = {
  submitAttempt,
  getAttemptResult
};
