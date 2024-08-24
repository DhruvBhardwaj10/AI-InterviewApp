// models/UserAnswerModel.js
const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
  mockId: {
    type: String,
   required:true,
  },
  question: {
    type: String,
    required: true,
  },
  correctAns: {
    type: String,
    required: true,
  },
  userAns: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  required:true,
  },
  rating: {
    type: Number,
   required:true,
  },
  userEmail: {
    type: String,
    required: true,
   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;
