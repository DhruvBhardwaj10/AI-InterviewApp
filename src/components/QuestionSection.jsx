import React from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionSection({ questions, activeQuestionIndex, setActiveQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
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
      className="p-5 rounded-lg border mt-6 flex flex-wrap bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg overflow-y-auto"
    >
      {questions.map((data, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className={`p-2 m-1 rounded-full text-xs md:text-sm text-center cursor-pointer min-w-[100px]
            ${activeQuestionIndex === index ? 'bg-slate-400 text-white' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => setActiveQuestionIndex(index)}
        >
          <h2>Question {index + 1}</h2>
        </motion.div>
      ))}

      <div className="w-full mt-4">
        {questions.length > 0 && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="p-4 border rounded-lg bg-gray-900 text-gray-100 flex flex-col items-start shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-2">
              {`Question ${activeQuestionIndex + 1}`}
            </h2>
            <p>{questions[activeQuestionIndex]?.question}</p>
            <Volume2 
              className="cursor-pointer mt-2 text-blue-400 hover:text-blue-500 transition-all"
              onClick={() => textToSpeech(questions[activeQuestionIndex]?.question || '')}
            />
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="border rounded-lg p-5 bg-blue-800 mt-4 text-blue-300"
        >
          <h2 className="flex items-center">
            <Lightbulb className="mr-2" />
            <strong>Note :</strong>
          </h2>
          <p>
            Click on Record Answer when you want to answer the question. At the end of the interview, we will give you feedback along with the correct answer for each question and your answer to compare.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
