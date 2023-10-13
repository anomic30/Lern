import { Feedback } from "../models/feedback.model.js";
import { User } from "../models/user.model.js"

export const getUser = async (magicId) => {
  try {
    const userData = await User.findOne({ magic_id: magicId });
    if(!userData) {
      throw new Error("Userdata not found!");
    }
    return userData;
  } catch (error) {
    console.error("❌ Error inside getUser:", error);
    throw error;
  }
}

export const submitFeedback = async (magicId, rating, comment) => {
  try {
    const user = await getUser(magicId);
    const newFeedback = new Feedback({
      name: user.userName,
      email: user.email,
      rating,
      comment,
    });
    await newFeedback.save();
    return newFeedback; 
  } catch (error) {
    console.error("❌ Error inside submitFeedback:", error);
    throw error;
  }
}

export const getAnalytics = async(magicId) => {
  try {
    const userData = await getUser(magicId);
    let completedCourses = 0;
    let completedQuizzes = 0;
    let totalScore = 0;
    let totalQuizzes = 0;
    let totalTimeTaken = 0;
    for (let course of userData.courses) {
        if (course.completed) {
            completedCourses++;
        }
        totalTimeTaken += course.timeTaken;
    }
    for (let quiz of userData.quizzes) {
        if (quiz.score != null) {
            completedQuizzes++;
            totalScore += quiz.score;
        }
        totalQuizzes++;
    }
    let averageQuizScore = totalScore / totalQuizzes;

    //To help visualize the user's progress and identify patterns in their quiz performance.
    let quizScoreOverTheTime = [];
    for (let quiz of userData.quizzes) {
        if (quiz.score != null) {
            let obj = {
                x: quiz.takenAt,
                y: quiz.score,
                z: quiz.title,
            }
            quizScoreOverTheTime.push(obj);
        }
    }

    //To help visualize the user's progress and identify patterns in their course completion.
    let completedCoursesOverTime = [];
    let completedCoursesCount = 0;

    userData.courses.sort((a, b) => a.finishedAt - b.finishedAt);

    for (let course of userData.courses) {
        if (course.finished) {
            completedCoursesCount++;

            let obj = {
                x: course.finishedAt,
                y: completedCoursesCount,
                z: course.title,
            };

            completedCoursesOverTime.push(obj);
        }
    }

    return {
        completedCourses,
        completedQuizzes,
        averageQuizScore,
        quizScoreOverTheTime,
        completedCoursesOverTime
    };
  } catch (error) {
    console.error("❌ Error inside getAnalytics:", error);
    throw error;
  }
}