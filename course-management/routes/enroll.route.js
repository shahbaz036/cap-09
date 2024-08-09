const express = require('express');
const router = express.Router();
const User = require('../model/user.model');
const Course = require('../model/course.model')
const auth = require('../middleware/auth.middleware')

//POST enroll

router.post('/enroll', auth, async(req, res) => {
    const {CourseId } =req.body;

    try{
       const user = await User.findById(req.user._id);
       if(!user) return res.status(404).json({message: 'user not foud'});

       if (user.enrolledCourses.includes(CourseId)){
        return res.status(400).json({message: 'Already enrolled in the course'});
       }

       user.enrolledCourses.push(CourseId);
       await user.save();

       res.json({message: 'successful enroll in the course'});
    }catch(err){
        res.status(500).json({message: err.message});

    }
});

//POST cancel enroll

router.post('/cancel-enroll', auth, async(req, res) => {
    const {CourseId } =req.body;

    try{
       const user = await User.findById(req.user._id);
       if(!user) return res.status(404).json({message: 'user not foud'});

       user.enrolledCourses.pull(CourseId);
       await user.save();

       res.json({message: 'successful cancel in the enroll'});
    }catch(err){
        res.status(500).json({message: err.message});

    }
});

// GET

router.get('/my-course', auth, async(req, res) => {

    try{
       const user = await User.findById(req.user._id).populate('enrolledCourses');
       if(!user) return res.status(404).json({message: 'user not foud'});

       res.json({courses: user.enrolledCourses});
    }catch(err){
        res.status(500).json({message: err.message});

    }
});

module.exports = router;
