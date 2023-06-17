const express = require('express');
const router = express.Router();
require("dotenv").config();
const User = require('../models/user.model');
const authMiddleware = require('../middlewares/authMiddleware');

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

    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
});