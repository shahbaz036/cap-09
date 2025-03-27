const express  = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return
            res.status(400).json({message: "User already exists"});
        }

    }
    catch(error){

    }
});