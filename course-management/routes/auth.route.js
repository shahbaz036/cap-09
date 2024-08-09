const express = require ('express');
const router = express.Router();
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST

router.post('/register', async (req, res) => {
    const {username, password } =  req.body;

    try{
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const user = new User({username, password: hashedPassword});
       await user.save();
       res.status(201).json({message: 'User created successfully'});
    } catch(err){
        res.status(500).json({message: err.message});

    }
});

//POST login

router.post('/login', async (req, res) => {
    const {username, password } =  req.body;

    try{
       const user = await User.findOne({username});
       if (!user) return res.status(400).json({message: 'invalid username or password'});

       const validPassword =  await bcrypt.compare(password, user.password);
       if (!validPassword) return res.status(400).json({message: 'invalid username or password'});
       const token = jwt.sign({_id: user._id}, 'your_jwt_secret');
       res.json({token});
    } catch(err){
        res.status(500).json({message: err.message});

    }
});

module.exports = router;