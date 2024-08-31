import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { chatSession } from '@/utils/GeminiAIModel';
import moment from 'moment';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch } from 'react-redux';
import { createInterviewThunk } from '@/redux/interviewSlice';
import { motion } from 'framer-motion';

export default function Component({ createdBy }) {
  const [openDialog, setDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    return <p className="text-white">Loading user information...</p>;
  }

  const userId = user.id;

 const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const mockId = uuidv4();
    const inputPrompt = `Based on my Job Position: ${jobPosition}, Job Description: ${jobDesc}, & Years of Experience: ${jobExperience}, generate ${import.meta.env.VITE_INTERVIEW_QUESTION_COUNT} questions and answers in JSON format. Always generate different Question and Answer because a lot of people are gonna use this.`;

    try {
        const result = await chatSession.sendMessage(inputPrompt);
        const responseText = await result.response.text();

        // Attempt to clean and sanitize the response
        const cleanedResponse = responseText.replace(/```json|```/g, '').trim();

        let jsonResponse;
        try {
            // Try parsing JSON
            jsonResponse = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError, 'Response:', cleanedResponse);
            alert('Failed to parse AI response. Please try again.');
            setLoading(false);
            return;
        }

        // Check if the parsed response is an array
        if (!Array.isArray(jsonResponse)) {
            throw new Error("Invalid JSON response format");
        }

        // Construct interview data
        const interviewData = {
            mockId,
            jobPosition,
            jobDesc,
            jobExperience,
            jsonMockRes: jsonResponse,
            createdBy: createdBy,
            createdAt: moment().toISOString(),
        };

        // Dispatch create interview thunk
        const action = await dispatch(createInterviewThunk(interviewData));
        if (createInterviewThunk.fulfilled.match(action)) {
            navigate(`/dashboard/interview/${action.payload.mockId}`);
            setJobPosition('');
            setJobDescription('');
            setJobExperience('');
            setDialog(false);
        } else {
            throw new Error(action.payload.error?.message || 'An unknown error occurred.');
        }
    } catch (error) {
        console.error('Error in submitHandler:', error);
        alert(`There was an error processing your request: ${error.message}`);
    } finally {
        setLoading(false);
    }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="p-10 border border-gray-700 rounded-lg bg-gray-800 shadow-lg hover:shadow-cyan-500/20  duration-300 cursor-pointer transition-all"
        onClick={() => setDialog(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h2 className="font-bold text-lg text-center text-cyan-400 flex items-center justify-center">
          <Plus className="mr-2" /> Add New
        </h2>
      </motion.div>

      <Dialog open={openDialog} onOpenChange={setDialog} >
        <DialogContent className="max-w-2xl bg-gray-900 text-white border border-gray-700 ">
          <DialogHeader>
            <DialogTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Tell us more about your job interview</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <h2 className="text-gray-300 mb-4">Add details about your job position/role, job description, and years of experience</h2>
              <form onSubmit={submitHandler}>
                <motion.div className="space-y-4" initial="hidden" animate="visible" variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}>
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label htmlFor="jobPosition" className="text-cyan-400 block mb-2">Job Role/Job Position</label>
                    <Input
                      id="jobPosition"
                      required
                      placeholder="Ex. Full Stack Developer"
                      value={jobPosition}
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label htmlFor="jobDesc" className="text-cyan-400 block mb-2">Job Description / Tech Stack</label>
                    <Textarea
                      id="jobDesc"
                      placeholder="Ex. React, Angular, Node.js, MySQL"
                      required
                      value={jobDesc}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label htmlFor="jobExperience" className="text-cyan-400 block mb-2">Years of Experience</label>
                    <Input
                      id="jobExperience"
                      required
                      placeholder="Ex. 5"
                      max="40"
                      type="number"
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex gap-5 justify-end mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="button"
                    className="bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={() => setDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin mr-2" /> Generating from AI
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
