const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require ('./middleware/logger.middleware');
const errorHandler = require('./middleware/errorHadler.middleware');
const coursesRouter = require('./routes/courses.route');
const authRouter = require('./routes/auth.route');
const enrollRouter = require('./routes/enroll.route');
const dotenv = require('dotenv').config();
const connection = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(logger);
app.use('/courses', coursesRouter);
app.use('/auth', authRouter);
app.use('/enroll', enrollRouter);

app.get('/', (req, res) =>{
    res.send('Hello World!');

});

app.listen(PORT, async() => {
    try{
      await connection
      console.log('Server is running on port ${PORT} and db is also connected');
    } catch (error){
        console.log('Error connecting', error)
          
    }
});