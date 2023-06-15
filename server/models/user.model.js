const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the course model
        required: true,
      },
      finished: {
        type: Boolean,
        default: false,
      },
      startedAt: {
        type: Date,
      },
      finishedAt: {
        type: Date,
      },
    },
  ],

  quizzes: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the course model
        required: true,
      },
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the quiz model
        required: true,
      },
      averageScore: {
        type: Number,
        required: true,
      },
      takenAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
