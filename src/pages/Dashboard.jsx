import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AddNewInterview from './AddNewInterview';
import InterviewList from '@/components/InterviewList';
import { useUser } from '@clerk/clerk-react';
import { Briefcase, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const location = useLocation();
  const { mockId } = location.state || {};
  
  const { user } = useUser();
   const {isSignedIn}=useUser();
  const createdBy = user?.emailAddresses?.[0]?.emailAddress || 'unknown';

  const statsData = [
    { title: 'Total Interviews', value: '24', icon: Briefcase },
    { title: 'Hours Practiced', value: '36', icon: Clock },
    { title: 'Avg. Score', value: '8.5', icon: Users },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
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
      <div className='max-w-7xl mx-auto'>
        <motion.h1 
          variants={itemVariants}
          className='font-bold text-4xl md:text-5xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
        >
          Welcome back, {user?.firstName}
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className='text-gray-400 mb-12 text-xl'
        >
          Ready to ace your next interview? Let's get started!
        </motion.p>

        {/* <motion.div 
          variants={itemVariants}
          className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center">
                <stat.icon className="h-12 w-12 text-cyan-400 mr-4" />
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        <motion.div variants={itemVariants} className='mb-12'>
          <h2 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Start a New Interview</h2>
          { 
          isSignedIn ?
          <div >
          <AddNewInterview createdBy={createdBy} />
          </div>
          :
          <div>
            <Link to="/signup">
            <h2 className='text-gray-400  text-xl'>Sign Up First to Start your interview :</h2>
            <Button className="mt-4 bg-gray-700">Sign Up</Button>
            </Link>
          </div>

          

}
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>Your Recent Interviews</h2>
          <InterviewList createdBy={createdBy} mockId={mockId} />
        </motion.div>
      </div>
    </motion.div>
  );
}
