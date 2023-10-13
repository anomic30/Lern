import express from 'express';
import magic from "../utils/magic.cjs";
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

const router = express.Router();

dotenv.config();

// Register user
router.post("/register", async (req, res) => {
    const { email, userName } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }
        const newUser = new User({
            email,
            userName,
        });
        await newUser.save();
        return res.status(201).send("User created successfully");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Check if user email exists in the database
router.post("/check", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(200).json({ status: false });
        }
        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const didToken = req.headers.authorization.substring(7);
        await magic.token.validate(didToken);
        console.log("User is authenticated");
        const issuer = await magic.token.getIssuer(didToken);
        console.log(issuer);
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(200).send(
                "User does not exist"
            );
        }
        // Update the magicId
        user.magic_id = issuer;
        await user.save();
        // Get metadata of user
        const metadata = await magic.users.getMetadataByIssuer(issuer);

        return res.status(200).json({ authenticated: true, metadata, user });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

export default router;