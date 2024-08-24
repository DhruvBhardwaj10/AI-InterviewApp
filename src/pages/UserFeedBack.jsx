import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbackData } from '@/redux/feedbackSlice';
import { ChevronsUpDownIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from 'framer-motion';

export default function Component() {
  const { mockId } = useParams();
  console.log(mockId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { feedbackData, loading, error } = useSelector((state) => state.feedback);

  useEffect(() => {
    if (mockId) {
      dispatch(fetchFeedbackData(mockId));
    }
  }, [dispatch, mockId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex justify-center items-center">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-10'
    >
      <div className='max-w-4xl mx-auto'>
        <motion.div variants={itemVariants} className="flex items-center mb-8">
          <CheckCircle className="text-green-500 w-12 h-12 mr-4" />
          <div>
            <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Congratulations!</h2>
            <p className='text-xl text-gray-400'>Here's your interview feedback</p>
          </div>
        </motion.div>
        
        {feedbackData && feedbackData.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Collapsible className='mt-7'>
              <CollapsibleTrigger className='p-4 bg-gray-800 flex justify-between rounded-lg my-2 text-left gap-7 w-full hover:bg-gray-700 transition-all duration-300'>
                <span className="font-semibold">{item.question}</span>
                <ChevronsUpDownIcon className='h-5 w-5 text-cyan-400' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-4 mt-4 bg-gray-800 p-6 rounded-lg'>
                  <div className='p-3 border border-cyan-500 rounded-lg bg-gray-900'>
                    <strong className="text-cyan-400">Rating: </strong>
                    <span className="text-xl font-bold">{item.rating}/10</span>
                  </div>
                  <div className='p-3 border border-red-500 rounded-lg bg-gray-900'>
                    <strong className="text-red-400">Your Answer: </strong>
                    <p className="mt-2 text-gray-300">{item.userAns}</p>
                  </div>
                  <div className='p-3 border border-green-500 rounded-lg bg-gray-900'>
                    <strong className="text-green-400">Correct Answer: </strong>
                    <p className="mt-2 text-gray-300">{item.correctAns}</p>
                  </div>
                  <div className='p-3 border border-blue-500 rounded-lg bg-gray-900'>
                    <strong className="text-blue-400">Feedback: </strong>
                    <p className="mt-2 text-gray-300">{item.feedback}</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        ))}
        
        <motion.div variants={itemVariants} className="mt-8">
          <Button 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            onClick={() => navigate('/dashboard', { state: { mockId } })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}