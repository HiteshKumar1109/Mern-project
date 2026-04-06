const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correct_answer: {
    type: Number,
    required: true
  },
  explanation: {
    type: String
  }
});

const TestSchema = new mongoose.Schema({
  exam_type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
    default: 'moderate'
  },
  duration: {
    type: Number,
    required: true // Duration in minutes
  },
  total_marks: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  questions: [QuestionSchema]
}, { timestamps: true });

// Assign an 'id' virtual property for frontend compatibility
TestSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

TestSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Test', TestSchema);
