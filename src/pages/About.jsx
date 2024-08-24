import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, User, Mail } from 'lucide-react';

export default function About() {
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-10'
    >
      <div className='max-w-4xl mx-auto'>
        <motion.h1 
          variants={itemVariants}
          className='font-bold text-4xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
        >
          About AI Interview
        </motion.h1>

        <motion.p variants={itemVariants} className='text-xl text-gray-300 mb-8'>
          AI Interview is a cutting-edge platform designed to revolutionize the way people prepare for job interviews. Created by a passionate developer, this project aims to provide a realistic and personalized interview experience using advanced AI technology.
        </motion.p>

        <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <Code className='text-cyan-400 w-12 h-12 mb-4' />
            <h2 className='text-2xl font-semibold mb-2'>Innovative Technology</h2>
            <p className='text-gray-400'>Utilizing state-of-the-art AI to generate realistic interview questions and provide insightful feedback.</p>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
            <Briefcase className='text-cyan-400 w-12 h-12 mb-4' />
            <h2 className='text-2xl font-semibold mb-2'>Industry-Specific</h2>
            <p className='text-gray-400'>Tailored questions based on job roles, descriptions, and experience levels for a more relevant practice.</p>
          </div>
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className='font-bold text-3xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
        >
          Meet the Developer
        </motion.h2>

        <motion.div variants={itemVariants} className='bg-gray-800 p-6 rounded-lg shadow-lg mb-8'>
          <div className='flex items-center mb-4'>
            <User className='text-cyan-400 w-12 h-12 mr-4' />
            <div>
              <h3 className='text-2xl font-semibold'>Dhruv Bhardwaj</h3>
              <p className='text-gray-400'>Full Stack Developer & Tech Enthusiast</p>
            </div>
          </div>
          <p className='text-gray-300 mb-4'>
            As the sole developer behind AI Interview, Dhruv combines his passion for technology and his experience in the job market to create a tool that truly helps job seekers excel in their interviews.
          </p>
          <div className='flex items-center'>
            <Mail className='text-cyan-400 w-6 h-6 mr-2' />
            <a href="mailto:dhruvbhardwaj12a14@gmail.com" className='text-cyan-400 hover:underline'>dhruvbhardwaj12a14@gmail.com</a>
          </div>
        </motion.div>

       
      </div>
    </motion.div>
  );
}