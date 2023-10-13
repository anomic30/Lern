import express from 'express';
import { chapterCompleteHandler, courseCompleteHandler, generateCourseHandler, getCourseHandler } from '../controllers/course.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/generate", authMiddleware, generateCourseHandler);
router.get("/:courseId", authMiddleware, getCourseHandler);
router.post("/complete/:courseId", authMiddleware, courseCompleteHandler);
router.post("/chapter/complete", authMiddleware, chapterCompleteHandler);

export default router;