import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png'; // Adjust path if needed

export default function Navbar({ activeSection, setActiveSection }) {
  const sections = ['Home', 'About', 'Projects', 'Contact'];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="text-blue-400 bg-black p-4 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Rup@ce Logo" className="h-12 w-auto" />
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-3">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-lg font-bold px-5 ${
                  activeSection === section
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {section}
              </button>
            ))}
          </div>
          {/* Mobile Navigation: Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsSidebarOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-64 bg-black text-blue-400 z-50 shadow-lg"
        >
          {/* Close Button positioned at top right */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 bg-red-600 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-4 pt-16">
            <div className="flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleSectionClick(section)}
                  className={`text-lg font-bold px-2 ${
                    activeSection === section
                      ? 'text-accent border-l-4 border-accent pl-2'
                      : 'text-gray-300 hover:text-white'
                  } transition-colors`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
