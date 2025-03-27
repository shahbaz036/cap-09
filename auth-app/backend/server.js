require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());           //enables cross origin resources sharing
app.use(express.json());  //parses json req bodies

//api routes
app.use("/api/auth", authRoutes);

//connect mongodb
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})
.catch((error) => console.error("mongodb connection error:", error)); 



