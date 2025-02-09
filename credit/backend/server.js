const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const creditReportRoutes = require('./routes/creditReport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://creditreport:4S5vMkMSMsSOHTFo@credit-report.gesjv.mongodb.net/?retryWrites=true&w=majority&appName=credit-report', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/reports', creditReportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});