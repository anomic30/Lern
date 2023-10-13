import { completeChapter, completeCourse, getCourse, handleCourseGeneration } from "../services/course.js";
import { catchAsync } from "../utils/catchAsync.js";

export const generateCourseHandler = catchAsync(async (req, res) => {
  try {
    const magicId = req.magicId;
    const topic = req.body.topic;
    const { newCourse, courseMetadata } = await handleCourseGeneration(magicId, topic);
    return res.status(200).json({ newCourse, courseMetadata });
  } catch (error) {
    console.error("❌ Error inside generateCourseHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const getCourseHandler = catchAsync(async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await getCourse(courseId);
    return res.status(200).json({ course });
  } catch (error) {
    console.error("❌ Error inside getCourseHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const courseCompleteHandler = catchAsync(async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const magicId = req.magicId;
    const userData = await completeCourse(magicId, courseId);
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("❌ Error inside courseCompleteHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const chapterCompleteHandler = catchAsync(async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const chapterId = req.body.chapterId;
    if(!courseId || !chapterId) {
      return res.status(400).send("Course and chapter IDs are required");
    }
    const course = await completeChapter(courseId, chapterId);
    return res.status(200).json({ course });
  } catch (error) {
    console.error("❌ Error inside chapterCompleteHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});