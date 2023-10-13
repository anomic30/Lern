import express from 'express';
import { register, checkUser, login } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/check", checkUser);
router.post("/login", login);

export default router;