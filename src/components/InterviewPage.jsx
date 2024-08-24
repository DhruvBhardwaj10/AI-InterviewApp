import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoaderCircle, WebcamIcon, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Webcam from 'react-webcam';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewsByMockIdThunk } from '@/redux/interviewSlice';
import { motion } from 'framer-motion';

export default function Component() {
  const { mockId } = useParams();
  const [webCamEnable, setWebCamEnable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { interviews, status, error } = useSelector((state) => state.interview);

  useEffect(() => {
    if (mockId) {
      dispatch(getInterviewsByMockIdThunk(mockId));
    }
  }, [dispatch, mockId]);

  const interviewData = interviews.find((interview) => interview.mockId === mockId);

  if (status === 'loading') return <LoaderCircle className="animate-spin text-cyan-400" />;
  if (status === 'failed') return <p className="text-red-500">Error: {error}</p>;

  return (
    <motion.div 
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {interviewData ? (
        <motion.div 
          className="my-10 flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="font-bold text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Let's Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            <motion.div 
              className="flex flex-col gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              <motion.div 
                className="flex flex-col p-6 rounded-lg border border-gray-700 gap-4 bg-gray-900"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <h2 className="text-xl"><strong className="text-cyan-400">Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                <h2 className="text-xl"><strong className="text-cyan-400">Job Description/TechStack:</strong> {interviewData.jobDesc}</h2>
                <h2 className="text-xl"><strong className="text-cyan-400">Years of Experience:</strong> {interviewData.jobExperience}</h2>
              </motion.div>
              <motion.div 
                className="bg-blue-900 p-4 rounded-lg border border-blue-700"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <h2 className="flex items-center text-lg font-medium mb-2 text-cyan-400"><Lightbulb className="mr-2"/> <strong>Information</strong></h2>
                <p className="text-gray-300">Enable Video Web Cam and Microphone to start your AI-generated mock interview. It has 5 questions which you can answer, and at the end, you'll receive a report based on your responses. <strong>Note:</strong> We never record your video. You can disable webcam access at any time if you wish.</p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {webCamEnable ? (
                <Webcam
                  onUserMedia={() => setWebCamEnable(true)}
                  onUserMediaError={() => setWebCamEnable(false)}
                  mirrored={true}
                  className="rounded-lg shadow-lg"
                  style={{ height: 300, width: 300 }}
                />
              ) : (
                <WebcamIcon className="h-72 w-72 p-16 bg-gray-700 rounded-lg border border-gray-600 mb-4 text-cyan-400" />
              )}
              <Button 
                className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => setWebCamEnable(true)}
              >
                Enable Web Cam and Microphone
              </Button>
              <Button 
                onClick={() => navigate(`/dashboard/interview/${mockId}/start`)} 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Start Interview
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <p className="text-red-500">No interview found.</p>
      )}
    </motion.div>
  );
}