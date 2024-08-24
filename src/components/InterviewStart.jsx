import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewsByMockIdThunk } from '@/redux/interviewSlice';
import { LoaderCircle } from 'lucide-react';
import QuestionSection from './QuestionSection';
import RecordAnswer from './RecordAnswer';

export default function InterviewStart() {
  const { mockId } = useParams();
  const dispatch = useDispatch();
  const { interviews, status, error } = useSelector((state) => state.interview);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
 console.log("Mock Id",mockId);
  useEffect(() => {
    if (mockId) {
      dispatch(getInterviewsByMockIdThunk(mockId)); // Fetch interview data with mockId
    }
  }, [dispatch, mockId]);

  if (status === 'loading') return <LoaderCircle className="animate-spin" />;
  if (status === 'failed') return <p>Error: {error}</p>;

  // Find the interview data based on mockId
  const interviewData = interviews.find(interview => interview.mockId === mockId);
  const mockInterviewQuestions = interviewData?.jsonMockRes || [];
  console.log(mockId);
  return (
    <div className='max-w-[1080px] p-3 mx-auto flex flex-col md:flex-row gap-4 '>
      <div className='max-w-[500px]'>
        <QuestionSection
          questions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
      </div>
      <div className='max-w-[600px]'>
        <RecordAnswer 
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          mockId={mockId}
        />
      </div>
    </div>
  );
}
