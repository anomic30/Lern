import { generateNewQuiz, getQuiz, updateQuizScore } from "../services/quiz.js";
import { catchAsync } from "../utils/catchAsync.js";

export const generateQuizHandler = catchAsync(async (req, res) => {
  try {
    const magicId = req.magicId;
    const { topic, courseId, chapterId } = req.body;
    if(!topic || !courseId || !chapterId) {
      return res.status(400).send("Topic, course and chapter IDs are required");
    }
    const { newQuiz, quizMetadata } = await generateNewQuiz(magicId, topic, courseId, chapterId);
    return res.status(200).json({ newQuiz, quizMetadata });
  } catch (error) {
    console.error("❌ Error inside generateQuizHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const getQuizHandler = catchAsync(async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await getQuiz(quizId);
    return res.status(200).json({ quiz });
  } catch (error) {
    console.error("❌ Error inside getQuizHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const quizScoreHandler = catchAsync(async (req, res) => {
  try {
    const magicId = req.magicId;
    const quizId = req.params.quizId;
    const totalScore = req.body.totalScore;
    const userData = await updateQuizScore(magicId, quizId, totalScore);
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("❌ Error inside quizScoreHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});