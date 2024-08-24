const Interview = require('../models/InterviewModel'); // Adjust the path as needed

// Controller method for creating a new interview
const createInterview = async (req, res) => {
  try {
    const { jobPosition, jobDesc, jobExperience, jsonMockRes, createdBy, createdAt, mockId } = req.body;

    // Check if an interview with the same mockId and createdBy exists
   
    // Create a new interview record
    const newInterview = new Interview({
      jobPosition,
      jobDesc,
      jobExperience,
      jsonMockRes,
      createdBy,
      createdAt,
      
      mockId // Use the mockId provided by the middleware
    });

    // Save the interview record to the database
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({ message: 'Error creating interview', error });
  }
};

// Controller method for getting interviews by mockId
const getInterviewsByMockId = async (req, res) => {
  const { mockId } = req.params;

  try {
    
    const interviews = await Interview.find({  mockId});

    if (interviews.length === 0) {
      return res.status(404).json({ message: 'No interviews found with this mockId and createdBy.' });
    }

    res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getInterviewsByUserId = async (req, res) => {
  const { createdBy} = req.params;
  console.log(createdBy);

  try {
    const interviews = await Interview.find({ createdBy });

    if (interviews.length === 0) {
      return res.status(404).json({ message: 'No interviews found for this user.' });
    }

    res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



module.exports = {
  createInterview,
  getInterviewsByMockId,
  getInterviewsByUserId,

};
