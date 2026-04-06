const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  topics: [{
    type: String
  }]
});

const MockTestSchema = new mongoose.Schema({
  title: String,
  date: String,
  duration: String,
  questions: Number
});

const CurrentAffairSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: String
});

const ExamSchema = new mongoose.Schema({
  examType: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'fa-book'
  },
  color: {
    type: String,
    default: '#00F0FF'
  },
  description: {
    type: String,
    required: true
  },
  syllabusPdf: {
    type: String
  },
  syllabus: [TopicSchema],
  mockTests: [MockTestSchema],
  currentAffairs: [CurrentAffairSchema]
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
