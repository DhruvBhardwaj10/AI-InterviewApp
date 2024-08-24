import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser , } from '@clerk/clerk-react';

import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // useLocation from react-router-dom to get current path
  const { isSignedIn } = useUser();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
   
  ];

  return (
    <motion.nav
      className="bg-gray-900 text-white shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <motion.span
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                InterviewAI
              </motion.span>
            </Link>
            <div className="hidden md:block ml-80">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link key={item.name} to={item.path}>
                    <motion.span
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === item.path
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      } cursor-pointer transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {isSignedIn ? (
              <UserButton  />
            ) : (
              <div className="flex space-x-4">
                <SignInButton mode="modal">
                  <Button variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors duration-300">
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white transition-colors duration-300">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <motion.span
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } cursor-pointer transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
            {!isSignedIn && (
              <div className="mt-4 space-y-2">
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors duration-300">
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white transition-colors duration-300">
                    Sign up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
