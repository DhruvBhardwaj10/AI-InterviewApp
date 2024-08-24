const { v4: uuidv4 } = require('uuid');
const Interview = require('../models/InterviewModel'); // Adjust the path as needed

const mockIdMiddleware = async (req, res, next) => {
  try {
    // Generate a new mockId for each interview
    req.body.mockId = uuidv4();
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in mockIdMiddleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = mockIdMiddleware;
