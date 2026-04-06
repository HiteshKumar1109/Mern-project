const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  answers: {
    type: Map,
    of: Number, // question index -> selected option index
    default: {}
  },
  score: {
    type: Number,
    required: true
  },
  total_marks: {
    type: Number,
    required: true
  },
  time_taken: {
    type: Number,
    required: true // in seconds
  }
}, { timestamps: true });

// Virtual for percentage
AttemptSchema.virtual('percentage').get(function() {
  return ((this.score / this.total_marks) * 100).toFixed(2);
});

// Create attempt_id virtual for frontend mapping
AttemptSchema.virtual('attempt_id').get(function(){
  return this._id.toHexString();
});

AttemptSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Attempt', AttemptSchema);
