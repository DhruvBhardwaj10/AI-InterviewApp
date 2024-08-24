const UserAnswer = require('../models/UserAnswerModel');

// Create a new user answer entry
exports.createUserAnswer = async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Debugging: Log the request body

    const { mockId, question, correctAns, userAns, feedback, rating, userEmail } = req.body;

    const newUserAnswer = new UserAnswer({
      mockId,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
    });

    const savedUserAnswer = await newUserAnswer.save();
    res.status(201).json({ success: true, data: savedUserAnswer });
  } catch (error) {
    console.error('Error creating user answer:', error); // Debugging: Log the error
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all user answers
exports.getUserAnswers = async (req, res) => {
  try {
    const userAnswers = await UserAnswer.find();
    res.status(200).json({ success: true, data: userAnswers });
  } catch (error) {
    console.error('Error fetching user answers:', error); // Debugging: Log the error
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get user answers by mockId
exports.getUserAnswersByMockId = async (req, res) => {
  try {
    const { mockId } = req.params;
    const userAnswers = await UserAnswer.find({ mockId });

    if (!userAnswers) {
      return res.status(404).json({ success: false, message: 'No user answers found for this mockId' });
    }

    res.status(200).json({ success: true, data: userAnswers });
  } catch (error) {
    console.error('Error fetching user answers by mockId:', error); // Debugging: Log the error
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
