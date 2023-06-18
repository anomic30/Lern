const express = require('express');
const router = express.Router();
require("dotenv").config();
const User = require('../models/user.model');
const Course = require('../models/course.model');
const Quiz = require('../models/quiz.model');
const authMiddleware = require('../middlewares/authMiddleware');
const {generateCourse, generateChapter} = require('../services/generator');

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

//Route to generate Syllabus
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
        let syllabus = await generateCourse(topic);
        console.log(syllabus);

        let chapters = [];
        for(let chapter of syllabus){
            let chapterDetails = await generateChapter(chapter);
            let chapterObj = {
                title: chapterDetails.title,
                content: chapterDetails.content,
                quizId: ""
            }
            chapters.push(chapterObj);
        }
        //save the syllabus in the Course model
        const newCourse = new Course({
            title: topic,
            chapters: chapters
        })

        await newCourse.save();

        //save the course id in the user model. userData.cousese is an array
        userData.courses.push({
            courseId: newCourse._id,
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

module.exports = router;