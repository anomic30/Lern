const express = require('express');
const router = express.Router();
require("dotenv").config();
const User = require('../models/user.model');
const Course = require('../models/course.model');
const Quiz = require('../models/quiz.model');
const authMiddleware = require('../middlewares/authMiddleware');
const {generateCourse, generateChapter, generateQuiz} = require('../services/generator');

//Route for sending user data
router.get("/data", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    try {
        const userData = await User.findOne({
            magic_id: magicId
        });
        if (!userData) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        return res.status(200).json({
            userData
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})

//Route to generate Course
router.post("/generateCourse", authMiddleware, async (req, res) => {
    const magicId = req.magicId;
    const topic = req.body.topic;

    try{
        const userData = await User.findOne({
            magic_id: magicId
        });
        if (!userData) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        console.log("Course generator called")
        let course = await generateCourse(topic);
        console.log("Course generator ended")
        console.log(course.syllabus);

        let chapters = [];
        for (let chapter of course.syllabus) {
            console.log("Chapter generator called for: ", chapter);
            let chapterDetails = await generateChapter(chapter);
            console.log("Chapter generator ended")
            console.log(chapterDetails);
            
            //save the quiz id in the chapter object
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
        userData.courses.push({
            courseId: newCourse._id,
            title: course.title,
            startedAt: new Date().toISOString()
        });

        await userData.save();

        return res.status(200).json({
            newCourse
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

//Route to generate a quiz
router.post("/generateQuiz", authMiddleware, async (req, res) => {
    const topic = req.body.topic;
    const courseId = req.body.courseId;

    try {
        console.log("Quiz generator called for: ", topic);
        let quizDetails = await generateQuiz(topic);
        console.log("Quiz generator ended");

        console.log(quizDetails);
        //save the quiz in the Quiz model
        const newQuiz = new Quiz({
            title: quizDetails.title,
            questions: quizDetails.questions
        })
        await newQuiz.save();

        //Find the chapter with title = topic inside the course with courseId and update quizId
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(200).send(
                "Course does not exist"
            );
        }
        for (let chapter of course.chapters) {
            if (chapter.title === topic) {
                chapter.quizId = newQuiz._id;
                break;
            }
        }
        await course.save();
        console.log("Quiz saved!");
        
        return res.status(200).json({
            newQuiz
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

//Route to get a particular course
router.get("/course/:courseId", authMiddleware, async (req, res) => {
    const courseId = req.params.courseId;

    try{
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(200).send(
                "Course does not exist"
            );
        }
        return res.status(200).json({
            course
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

//Route to get a particular quiz
router.get("/quiz/:quizId", authMiddleware, async (req, res) => {
    const quizId = req.params.quizId;

    try{
        const quiz = await Quiz.findById(quizId);
        if(!quiz){
            return res.status(200).send(
                "Quiz does not exist"
            );
        }
        return res.status(200).json({
            quiz
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

//Route to update the user's score of a particular quiz
router.post("/quiz/:quizId", authMiddleware, async (req, res) => {
    const quizId = req.params.quizId;
    const score = req.body.score;
    const magicId = req.magicId;

    try {
        const userData = await User.findOne({
            magic_id: magicId
        });
        if (!userData) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        //Find thge quizId in the userData quizzes array and update the score
        for(let quiz of userData.quizzes){
            if(quiz.quizId == quizId){
                quiz.score = score;
                break;
            }
        }
        await userData.save();
        return res.status(200).json({
            userData
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

//Route to mark a user's course as completed
router.post("/course/:courseId", authMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const magicId = req.magicId;

    try {
        const userData = await User.findOne({
            magic_id: magicId
        });
        if (!userData) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        //Find thge courseId in the userData courses array and update the completedAt
        for(let course of userData.courses){
            if(course.courseId == courseId){
                course.completedAt = new Date().toISOString();
                course.completed = true;
                break;
            }
        }
        await userData.save();
        return res.status(200).json({
            userData
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

//Route to get user analytics
router.get("/analytics", authMiddleware, async (req, res) => {
    const magicId = req.magicId;

    try {
        const userData = await User.findOne({
            magic_id: magicId
        });
        if (!userData) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        let completedCourses = 0;
        let completedQuizzes = 0;
        let totalScore = 0;
        let totalQuizzes = 0;
        let totalTimeTaken = 0;
        for(let course of userData.courses){
            if(course.completed){
                completedCourses++;
            }
            totalTimeTaken += course.timeTaken;
        }
        for(let quiz of userData.quizzes){
            if(quiz.score != null){
                completedQuizzes++;
                totalScore += quiz.score;
            }
            totalQuizzes++;
        }
        let averageQuizScore = totalScore/totalQuizzes;

        //To help visualize the user's progress and identify patterns in their quiz performance.
        let quizScoreOverTheTime = [];
        for(let quiz of userData.quizzes){
            if(quiz.score != null){
                let obj = {
                    x: quiz.timeTaken,
                    y: quiz.score
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
                };

                completedCoursesOverTime.push(obj);
            }
        }
        
        return res.status(200).json({
            completedCourses,
            completedQuizzes,
            averageQuizScore,
            quizScoreOverTheTime,
            completedCoursesOverTime
        });
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;