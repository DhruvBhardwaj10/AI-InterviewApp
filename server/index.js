const express = require('express');
const connectDB = require('./config/db');
const interviewRoutes = require('./routes/interviewRoutes');
const cors = require('cors');
const userAnswerRoutes=require('./routes/userAnswerRoutes')
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to the database
connectDB();

// Routes
app.use('/api/interviews', interviewRoutes);
app.use('/api/userAnswer', userAnswerRoutes);
// Test route
app.get('/', (req, res) => {
  res.send('<h1>This is Homepage</h1>');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
