import { generateContent } from "../llm/chains/contentChain.js";
import { generateCourse } from "../llm/chains/courseChain.js";
import { Course } from "../models/course.model.js";
import { getUser } from "./user.js";

export const handleCourseGeneration = async (magicId, topic) => {
  try {
    const user = await getUser(magicId);
    const course = await generateCourse(topic);
    let chapters = [];
    for (let chapter of course.syllabus) {
        console.log("Chapter generator called for: ", chapter);
        let chapterDetails = await generateContent(chapter);
        console.log("Chapter generator ended")
        console.log(chapterDetails);

        let chapterObj = {
            title: chapter,
            content: chapterDetails,
        }
        chapters.push(chapterObj);
    }

    //save the syllabus in the Course model
    const newCourse = new Course({
      title: course.title,
      chapters: chapters
    })

    await newCourse.save();

    //save the course id in the user model. userData.cousese is an array
    let courseMetadata = {
        courseId: newCourse._id,
        title: course.title,
        startedAt: new Date().toISOString()
    }
    user.courses.push(courseMetadata);
    await user.save();

    return { newCourse, courseMetadata };
  } catch (error) {
    console.error("❌ Error inside handleCourseGeneration:", error);
    throw error;
  }
}

export const getCourse = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    if(!course) {
      throw new Error("Course not found!");
    }
    return course;
  } catch (error) {
    console.error("❌ Error inside getCourse:", error);
    throw error;
  }
};

export const completeCourse = async (magicId, courseId) => {
  try {
    const user = await getUser(magicId);
    for (let course of user.courses) {
      if (course.courseId == courseId) {
          course.completedAt = new Date().toISOString();
          course.finished = true;
          break;
      }
    }
    await user.save();
    return user;
  } catch (error) {
    console.error("❌ Error inside completeCourse:", error);
    throw error;
  }
};

export const completeChapter = async (courseId, chapterId) => {
  try {
    let course = await Course.findById(courseId);
    if (!course) {
        throw new Error("Course does not exist");
    }
    for (let chapter of course.chapters) {
        if (chapter._id == chapterId) {
            chapter.completed = !chapter.completed;
            break;
        }
    }
    await course.save();
    return course;
  } catch (error) {
    console.error("❌ Error inside completeChapter:", error);
    throw error;
  }
};
