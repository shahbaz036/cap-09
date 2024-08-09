const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    enrolledCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
});

module.exports = mongoose.model('User', userSchema);