const express = require('express');
const router = express.Router();
const {createInterview,getInterviewsByUserId,getInterviewsByMockId} = require('../controllers/interviewController'); // Adjust the path as needed

const mockIdMiddleware = require('../middleware/mockIdMiddleware') ; // Adjust path as needed

router.post('/create',  createInterview);

// Get interviews for the authenticated user based on mockId
router.get('/getByMockId/:mockId', getInterviewsByMockId);
router.get('/getByUserId/:createdBy', getInterviewsByUserId);



module.exports = router;
