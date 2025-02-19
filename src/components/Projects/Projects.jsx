import React, { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "Web Development",
    description: "A modern portfolio website built with React and Tailwind CSS.",
    image: "/assets/project1.jpg",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A full-stack e-commerce platform with secure payment integration.",
    image: "/assets/project2.jpg",
  },
  {
    id: 3,
    title: "Mobile App",
    category: "Mobile Development",
    description: "A cross-platform mobile app built with React Native.",
    image: "/assets/project3.jpg",
  },
  {
    id: 4,
    title: "Machine Learning Model",
    category: "Data Science",
    description: "A machine learning model designed to predict user behavior.",
    image: "/assets/project4.jpg",
  },
];

export default function Projects({ setActiveSession }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects by title or category (case-insensitive)
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header and Search Bar */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-sm text-gray-400 mb-2">{project.category}</p>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <button
                  // Add an onClick handler if you want to navigate to a detailed project view
                  className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No projects found.
            </div>
          )}
        </div>

        {/* Return Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveSession("Home")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300"
          >
            Return to Overview
          </button>
        </div>
      </div>
    </div>
  );
}
