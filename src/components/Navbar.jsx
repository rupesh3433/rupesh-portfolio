import React from 'react'

export default function Navbar({ activeSection, setActiveSection }) {
  const sections = ['Home', 'About', 'Projects', 'Contact']
  
  return (
    <nav className="text-blue-400 bg-black p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-blue-300 text-xl font-bold">Rup@ce</span>
        <div className="space-x-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`text-sm font-bold ${
                activeSection === section 
                  ? 'text-accent border-b-2 border-accent' 
                  : 'text-gray-300 hover:text-white'
              } transition-colors`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}