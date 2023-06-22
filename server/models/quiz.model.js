const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [],
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
