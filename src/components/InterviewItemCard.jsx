import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
export default function InterviewItemCard({ interview ,mockId }) {
  // Extract and format the createdAt date
  const formattedDate = interview?.createdAt
    ? new Date(interview.createdAt).toLocaleDateString()
    : 'Date not available';

  return (
    <div className='p-3 bg-gray-800 border text-gray-400 border-gray-700 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 space-y-1'>
      <h2 className='font-bold text-blue-500'>
        {interview?.jobPosition || 'Job Position not available'}
      </h2>
      <p className='text-gray-300'>
        {interview?.jobDesc
          ? `Job Description: ${interview.jobDesc} `
          : 'Job Desc not available'}
      </p>
      <p className='text-gray-300'>
        {interview?.jobExperience
          ? `Experience: ${interview.jobExperience} years`
          : 'Experience not available'}
      </p>
      <p>Created at: {formattedDate}</p>

      
    </div>
  );
}
