import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { LuWebcam } from 'react-icons/lu';
import { Button } from './ui/button';
import { Mic } from 'lucide-react';
import { toast } from './ui/use-toast';
import { chatSession } from '@/utils/GeminiAIModel';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RecordAnswer({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex, mockId }) {
  const api = axios.create({
    baseURL: 'https://ai-interview-backend-4.onrender.com',
  });

  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedBack] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(results.map(result => result.transcript).join(' '));
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer, isRecording]);

  useEffect(() => {
    if (activeQuestionIndex === mockInterviewQuestions.length) {
      saveAllAnswers();
    }
  }, [activeQuestionIndex]);

  if (error) return <p className="text-red-600 font-semibold">Web Speech API is not available in this browser 🤷‍</p>;

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        toast({
          description: "Your answer is too short. Please record again.",
        });
        setUserAnswer(''); // Clear the userAnswer if it's too short
        return;
      }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please provide rating and feedback in JSON format with 'rating' and 'feedback' fields. Please give a rating out of 10.`;
  
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      console.log('Raw API response:', responseText);
  
      const cleanedResponse = responseText
        .replace(/```json|```/g, '') // Remove code block markers
        .replace(/^\s+|\s+$/g, '') // Trim leading and trailing whitespace
        .replace(/[\u{0080}-\u{FFFF}]/gu, ''); // Remove non-printable characters
      console.log('Cleaned response:', cleanedResponse);
  
      if (!cleanedResponse || cleanedResponse === '{}') {
        console.error("Empty or invalid JSON response:", cleanedResponse);
        toast({
          description: "Received an empty or invalid response. Please try again.",
        });
        return;
      }
  
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(cleanedResponse);
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        toast({
          description: "There was an error processing the AI response. Please try again.",
        });
        return;
      }
  
      setFeedBack(jsonResponse.feedback);
      setRating(jsonResponse.rating);
  
      const userAnswerData = {
        mockId: mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: jsonResponse.feedback,
        rating: jsonResponse.rating,
        userEmail: user.emailAddresses[0].emailAddress,
        createdAt: moment().toISOString(),
      };
  
      console.log("User Data", userAnswerData);
  
      await api.post('/api/userAnswer/create', userAnswerData);
      setLoading(false);
      setUserAnswer('');
      setResults([]); // Clear results to avoid appending answers
  
      console.log("Details of the user saved successfully.");
    } catch (apiError) {
      console.error('Error with API call:', apiError);
      toast({
        description: "Error while saving your answer, please try again.",
      });
    }
  };

  const saveAllAnswers = async () => {
    // Logic for saving all answers if needed
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-gray-900 to-gray-800 border mt-6 border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 max-w-[500px] mx-auto flex flex-col items-center text-white"
    >
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        className="relative w-full mb-4"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <LuWebcam className="text-gray-300" style={{ width: '100px', height: '100px' }} />
        </div>
        <Webcam mirrored={true} style={{ height: '300px', width: '100%', zIndex: 10 }} />
      </motion.div>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        className={`text-white font-semibold rounded-lg transition-all mx-auto ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        <Button
          disabled={loading}
          onClick={StartStopRecording}
          className="text-white bg-cyan-600 hover:bg-cyan-700 font-semibold py-3 px-8 rounded-lg text-lg"
        >
          {isRecording ? (
            <span className="flex items-center">
              <Mic className="mr-2 " />
              Recording...
            </span>
          ) : (
            'Start Recording'
          )}
        </Button>
      </motion.div>

      <div className="flex flex-col w-full mt-6 space-y-4">
        <div className="flex items-center mx-auto gap-3">
          {activeQuestionIndex > 0 &&
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Button  
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                 className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
              >
                Previous
              </Button>
            </motion.div>
          }
          {activeQuestionIndex < mockInterviewQuestions?.length - 1 &&
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
                onClick={() => {
                  setUserAnswer(''); // Clear userAnswer for the next question
                  setResults([]); // Clear results array for the next question
                  setActiveQuestionIndex(activeQuestionIndex + 1);
                }}
              >
                Next
              </Button>
            </motion.div>
          }
          {activeQuestionIndex === mockInterviewQuestions?.length - 1 &&
            <Link to={`/dashboard/interview/${mockId}/feedback`}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                 className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg text-lg"
                >
                  End
                </Button>
              </motion.div>
            </Link>
          }
        </div>
      </div>
    </motion.div>
  );
}
