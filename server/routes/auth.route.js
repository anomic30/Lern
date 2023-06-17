const express = require('express');
const router = express.Router();
const { Magic } = require('@magic-sdk/admin');
require("dotenv").config();
const User = require('../models/user.model');

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

//register user
router.post("/register", async (req, res) => {
    const {email, userName } = req.body;
    try {
        const user = await User.findOne({email});
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
        return res.status(500).json({error: error.message});
    }
});

// check if user email exists in database
router.post("/check", async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(200).json({status: false});
        }
        return res.status(200).json({status: true});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

// login user
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
        //update the magicId
        user.magic_id = issuer;
        await user.save();
        //get metadata of user
        const metadata = await magic.users.getMetadataByIssuer(issuer);

        return res.status(200).json({ authenticated: true, metadata, user });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;