const mongoose = require("mongoose");

//define schema for user model

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email:    {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model("User", userSchema)