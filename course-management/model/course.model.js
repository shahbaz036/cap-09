const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {type: String, require: true},
    category: {type: String, require: true},
    difficulty: {type: String, require: true},
    description: {type: String, require: true}
});

module.exports = mongoose.model('Course', courseSchema);