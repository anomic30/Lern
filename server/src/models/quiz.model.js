import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [],
});

export const Quiz = mongoose.model('Quiz', QuizSchema);

