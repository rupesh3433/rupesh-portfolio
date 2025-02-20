import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Project1 from "../../assets/project1.jpg";
import Project2 from "../../assets/project2.jpg";
import Project3 from "../../assets/project3.jpg";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    category: "Web Development",
    description:
      "A modern portfolio website built with React and Tailwind CSS that showcases my professional experience, projects, and skills.",
    image: Project1,
  },
  {
    id: 2,
    title: "E-commerce Platform",
    category: "Web Development",
    description:
      "A full-stack e-commerce platform featuring secure payment integration, real-time inventory, and a comprehensive admin dashboard.",
    image: Project2,
  },
  {
    id: 3,
    title: "Mobile App",
    category: "Mobile Development",
    description:
      "A cross-platform mobile application developed with React Native, optimized for performance and scalability, and designed for an intuitive user experience.",
    image: Project3,
  },
  {
    id: 4,
    title: "Machine Learning Model",
    category: "Data Science",
    description:
      "A predictive machine learning model that analyzes user behavior to enhance recommendation systems using Python and TensorFlow.",
    image: Project3,
  },
  {
    id: 5,
    title: "Cloud Infrastructure Automation",
    category: "DevOps",
    description:
      "An automated cloud infrastructure solution using AWS, Terraform, and Docker to streamline deployment pipelines and improve scalability.",
    image: Project1,
  },
  {
    id: 6,
    title: "IoT Home Automation System",
    category: "IoT/Embedded Systems",
    description:
      "A robust home automation system integrating IoT devices and sensors to optimize energy usage and enhance home security.",
    image: Project2,
  },
  {
    id: 7,
    title: "Portfolio Website",
    category: "Web Development",
    description:
      "A modern portfolio website built with React and Tailwind CSS that showcases my professional experience, projects, and skills.",
    image: Project1,
  },
  {
    id: 8,
    title: "E-commerce Platform",
    category: "Web Development",
    description:
      "A full-stack e-commerce platform featuring secure payment integration, real-time inventory, and a comprehensive admin dashboard.",
    image: Project2,
  },
  {
    id: 9,
    title: "Mobile App",
    category: "Mobile Development",
    description:
      "A cross-platform mobile application developed with React Native, optimized for performance and scalability, and designed for an intuitive user experience.",
    image: Project3,
  },
  {
    id: 10,
    title: "Machine Learning Model",
    category: "Data Science",
    description:
      "A predictive machine learning model that analyzes user behavior to enhance recommendation systems using Python and TensorFlow.",
    image: Project3,
  },
  {
    id: 11,
    title: "Cloud Infrastructure Automation",
    category: "DevOps",
    description:
      "An automated cloud infrastructure solution using AWS, Terraform, and Docker to streamline deployment pipelines and improve scalability.",
    image: Project1,
  },
  {
    id: 12,
    title: "IoT Home Automation System",
    category: "IoT/Embedded Systems",
    description:
      "A robust home automation system integrating IoT devices and sensors to optimize energy usage and enhance home security.",
    image: Project2,
  },
];

// Container variant for staggering children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Each card will scale up radially from a small size to full size
const cardVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function Projects({ setActiveSession }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Blue Progress Indicator (hidden on small devices) */}
      <div className="hidden md:block fixed right-4 top-15 h-[82vh] z-50">
        <div className="w-2 md:w-2 lg:w-2 bg-gray-700 h-full relative">
          <div
            className="bg-blue-600 transition-all duration-300 absolute top-0 left-0 w-full"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <div className="h-[90vh] bg-black text-white flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="p-6 lg:p-3 border-b border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Project Portfolio
            </h1>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:max-w-md p-2 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-800"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto p-6 lg:p-7">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-600 transition-all duration-50 relative"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 text-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-2">
                      {project.description}
                    </p>
                    <button className="w-full py-2 px-4 bg-gray-800 hover:bg-blue-600 text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-3">
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="3"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-20">
                <div className="text-2xl text-gray-500 mb-4">
                  No projects found
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-700 bg-black">
          <div className="max-w-6xl mx-auto p-3 lg:p-2 flex justify-end">
            <button
              onClick={() => setActiveSession("Home")}
              className="px-6 py-2.5 text-sm bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 flex items-center gap-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="5"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Return to Overview
            </button>
          </div>
        </div>

        {/* Custom Scrollbar Style */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </>
  );
}
