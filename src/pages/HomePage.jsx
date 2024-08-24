import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Lightbulb, Users } from 'lucide-react'
import NavBar from '@/components/NavBar'
import { Link } from 'react-router-dom'

import { useUser } from '@clerk/clerk-react'

export default function HomePage() {
  const features = [
    { icon: Code, title: "AI-Powered Interviews", description: "Experience realistic interview scenarios powered by advanced AI technology." },
    { icon: Users, title: "Expert Feedback", description: "Receive detailed feedback and insights to improve your interview performance." },
    { icon: Lightbulb, title: "Personalized Learning", description: "Tailored interview questions based on your experience and job role." },
  ]
   
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const {isSignedIn}=useUser();

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
     

      <main className="container mx-auto px-6 py-12">
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Master Your Interview Skills
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Prepare for your dream job with our AI-powered interview practice platform. Get real-time feedback and improve your chances of success.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/dashboard">
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
              Get Started <ArrowRight className="ml-2" />
            </Button>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section 
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
            hidden: { opacity: 0, y: 50 }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}>
              <Card className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-colors h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <feature.icon className="w-16 h-16 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold  text-gray-400">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            {['Sign Up', 'Choose Interview', 'Practice', 'Get Feedback'].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-2xl font-bold mb-2">
                  {index + 1}
                </div>
                <p className="text-lg font-semibold">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to ace your next interview?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview skills with InterviewAI
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            { isSignedIn ?
              <div></div>
              :
            <Link to="/signup">
            
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg">
                Sign Up Now
              </Button>

            
            </Link>
}
          </motion.div>
        </motion.section>
      </main>

     
    </div>
  )
}