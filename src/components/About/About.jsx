import React, { useState, useEffect } from "react";

// Tab button component with animations
function TabButton({ tab, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative px-6 py-3 text-lg font-medium transition-all duration-300 focus:outline-none ${
        activeTab === tab
          ? "text-blue-400"
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {tab}
      {activeTab === tab && (
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 animate-underline" />
      )}
    </button>
  );
}

// Fade-in animation wrapper
function FadeIn({ children, delay }) {
  return (
    <div
      className="opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Profile details component
function ProfileDetails() {
  return (
    <FadeIn delay={100}>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Professional Profile
        </h2>
        <p className="text-gray-300 leading-relaxed">
          I am a passionate Computer Engineer specializing in full-stack development
          and system architecture. With {new Date().getFullYear() - 2018}+ years of
          professional experience, I excel at crafting robust, scalable solutions
          that bridge technical innovation with business objectives. My expertise
          spans cloud-native applications, microservices architecture, and
          performance optimization.
        </p>
      </div>
    </FadeIn>
  );
}

// Education details component
function EducationDetails() {
  return (
    <FadeIn delay={100}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Education
        </h2>
        <div className="space-y-4">
          <div className="pl-4 border-l-4 border-blue-400">
            <h3 className="text-xl font-semibold text-gray-100">
              B.Tech in Computer Engineering
            </h3>
            <p className="text-gray-400">Pimpri Chinchwad College of Engineering</p>
            <p className="text-gray-400">• 2022-2026</p>
            <p className="mt-2 text-gray-300">
              GPA: 7.0
            </p>
            <p className="mt-2 text-gray-300">
              • Coursework: Advanced Algorithms, Distributed Systems,
              Machine Learning
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// Experience details component
function ExperienceDetails() {
  return (
    <FadeIn delay={100}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        <div className="space-y-4">
          <div className="p-6 bg-gray-800 rounded-lg transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-xl font-semibold text-gray-100">
              Senior Software Engineer @ TechCorp
            </h3>
            <p className="text-gray-400">2022-Present</p>
            <ul className="mt-3 space-y-2 text-gray-300 list-disc list-inside">
              <li>Led migration of legacy systems to cloud-native architecture</li>
              <li>Developed high-performance API gateway handling 10k+ RPM</li>
            </ul>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// Skills details component
function SkillsDetails() {
  const skills = [
    { name: "Frontend", tech: "React, Next.js, TypeScript, Tailwind" },
    { name: "Backend", tech: "Node.js, Python, GraphQL, REST" },
    { name: "Cloud", tech: "AWS, Docker, Kubernetes, Terraform" },
    { name: "Data", tech: "PostgreSQL, MongoDB, Redis, Elasticsearch" },
  ];

  return (
    <FadeIn delay={100}>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <h3 className="text-lg font-semibold text-blue-400">{skill.name}</h3>
              <p className="mt-2 text-gray-300">{skill.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export default function About({ setActiveSession }) {
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => document.documentElement.style.overflow = 'auto';
  }, []);

  return (
    <div className="h-[90vh] bg-black overflow-hidden">
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Tab Navigation */}
        <nav className="flex space-x-8 border-b border-gray-700 py-6 mb-8">
          {["Profile", "Education", "Experience", "Skills"].map((tab) => (
            <TabButton
              key={tab}
              tab={tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </nav>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pb-12 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          <div className="space-y-12">
            {activeTab === "Profile" && <ProfileDetails />}
            {activeTab === "Education" && <EducationDetails />}
            {activeTab === "Experience" && <ExperienceDetails />}
            {activeTab === "Skills" && <SkillsDetails />}
          </div>
        </div>

        {/* Back Button */}
        <div className="py-6 border-t border-gray-700">
          <button
            onClick={() => setActiveSession("Home")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105"
          >
            Return to Overview
          </button>
        </div>
      </div>
    </div>
  );
}