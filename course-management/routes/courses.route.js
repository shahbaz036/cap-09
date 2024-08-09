const express = require('express');

const router = express.Router();

const Course = require('../model/course.model');

//GET

router.get('/', async(req,res) => {
    const {page = 1, limit = 10, category, difficulty} =req.query;

    const filter = {};
    if(category) filter.category = category;
    if(difficulty) filter.difficulty = difficulty;

    try{
        const courses = await Course.find(filter)
        .limit(limit * 1)
        .skip((page - 1) * limit);
        const count = await Course.countDocuments(filter);

        res.json({
            courses,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});
module.exports = router;