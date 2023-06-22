const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  quizId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    default: null
  }
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  chapters: [ChapterSchema],
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
