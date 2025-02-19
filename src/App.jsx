// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('Home');

  const renderSection = () => {
    switch(activeSection) {
      case 'Home': return <Home setActiveSession={setActiveSection} />;
      case 'About': return <About />;
      case 'Projects': return <Projects />;
      case 'Contact': return <Contact />;
      default: return <Home setActiveSession={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
      />
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
}
