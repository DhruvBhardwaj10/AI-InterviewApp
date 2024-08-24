import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewsByUserIdThunk } from '@/redux/interviewSlice'; // Adjust the import path as needed
import InterviewItemCard from './InterviewItemCard'; // Adjust the import path as needed
import { LoaderCircle } from 'lucide-react';


const InterviewList = ({createdBy,mockId}) => { // Accept userId as a prop
  const dispatch = useDispatch();
  const { interviews, status, error } = useSelector((state) => state.interview); // Make sure to match the slice name

  useEffect(() => {
    if (createdBy) {
      dispatch(getInterviewsByUserIdThunk(createdBy)); // Fetch interview data with createdBy
    }
  }, [dispatch, createdBy]);

  if (status === 'loading') return <LoaderCircle className="animate-spin" />;
  if (status === 'failed') return <p>Error: {error}</p>;

  // Filter interviews based on createdBy if needed
  const interviewData = interviews.filter(interview => interview.createdBy === createdBy);

  return (
    <div className=" p-6 rounded-lg shadow-lg max-w-[800px] bg-slate-800">
      <h1 className="text-xl font-semibold mb-4">Interview List</h1>
      <div className="space-y-4">
        {interviewData.length > 0 ? (
          interviewData.map((interview) => (
            <InterviewItemCard key={interview._id} interview={interview} mockId={mockId}/>
          ))
        ) : (
          <p>No interviews found</p>
        )}
      </div>
    </div>
  );
};

export default InterviewList;
