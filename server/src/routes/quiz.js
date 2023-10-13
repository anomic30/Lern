import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { generateQuizHandler, getQuizHandler, quizScoreHandler } from '../controllers/quiz.js';

const router = express.Router();

router.post("/generate", authMiddleware, generateQuizHandler);
router.get("/:quizId", authMiddleware, getQuizHandler);
router.post("/:quizId", authMiddleware, quizScoreHandler );

export default router;