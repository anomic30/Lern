import express from "express";
import authRoute from "./auth.js";
import userRoute from "./user.js";
import courseRoute from "./course.js";
import quizRoute from "./quiz.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/course", courseRoute);
router.use("/quiz", quizRoute);

export default router;