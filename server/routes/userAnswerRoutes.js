// routes/userAnswerRoutes.js
const express = require('express');
const router = express.Router();
const { createUserAnswer, getUserAnswers, getUserAnswersByMockId } = require('../controllers/userAnswerController');

// Route to create a new user answer
router.post('/create', createUserAnswer);

// Route to get all user answers
router.get('/get', getUserAnswers);

// Route to get user answers by mockId
router.get('/:mockId', getUserAnswersByMockId);

module.exports = router;
