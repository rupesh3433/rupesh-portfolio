import React, { useEffect } from "react";
import { motion } from "framer-motion";
import RupeshImage1 from "../../assets/my_photo.png";

// FontAwesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

// React Icons Imports
import { FaReact, FaNode, FaAws, FaDocker } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiKubernetes,
  SiMongodb,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";
import { MdApi } from "react-icons/md";

export default function About({ setActiveSession }) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => (document.documentElement.style.overflow = "auto");
  }, []);

  return (
    <div className="h-[90vh] bg-black overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <section className="animate-slide-in-left mb-16">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rupesh Poudel
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Passionate Computer Engineer specializing in full-stack
                development and cloud architecture. Currently pursuing B.Tech at
                PCCOE.
              </p>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="h-6 w-6 text-blue-400"
                  />
                </div>
                <button className="text-white hover:text-blue-400 transition-colors">
                  Download Resume
                </button>
              </div>
              <div className="flex space-x-4">
                <a
                  href="mailto:rupesh.poudel22@pccoepune.org"
                  className="social-link"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
                </a>
                <a href="#" className="social-link">
                  <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                </a>
                <a href="#" className="social-link">
                  <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
                </a>
              </div>
            </div>


            
            {/* <div className="hidden md:block relative group">
              <div className="absolute inset-0 bg-gradient-to-r rounded-2xl transform rotate-3 transition-transform duration-300 group-hover:rotate-2">
                <motion.div
                  className="w-full max-w-[400px] mb-0 md:mb-0 md:mr-12"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 mb-10">
                    <img
                      src={RupeshImage1}
                      alt="Rupesh Professional Portrait"
                      className="h-full w-full object-center"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div> 
            </div>*/}



          </div>
        </section>

        {/* Education Timeline */}
        <section className="animate-slide-in-right mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Education</h2>
          <div className="space-y-8 relative pl-8 border-l-2 border-gray-700">
            <div className="absolute left-[-7px] top-0 w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="relative pl-6">
              <div className="absolute left-[-7px] w-3 h-3 bg-purple-400 rounded-full"></div>
              <h3 className="text-xl font-semibold text-white">
                B.Tech Computer Engineering
              </h3>
              <p className="text-gray-400 mt-1">
                Pimpri Chinchwad College of Engineering
              </p>
              <p className="text-sm text-gray-500 mt-2">
                2022 - 2026 | GPA: 7.0
              </p>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-[-7px] w-3 h-3 bg-purple-400 rounded-full"></div>
              <h3 className="text-xl font-semibold text-white">
                Higher Secondary School
              </h3>
              <p className="text-gray-400 mt-1">ABC Junior College</p>
              <p className="text-sm text-gray-500 mt-2">2020 - 2022 | 85%</p>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section className="animate-fade-in mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Frontend",
                icons: [
                  { Icon: FaReact, label: "React", color: "#61DAFB" },
                  { Icon: SiNextdotjs, label: "Next.js", color: "#000000" },
                  {
                    Icon: SiTailwindcss,
                    label: "Tailwind CSS",
                    color: "#38BDF8",
                  },
                ],
              },
              {
                title: "Backend",
                icons: [
                  { Icon: FaNode, label: "Node.js", color: "#68A063" },
                  { Icon: SiPython, label: "Python", color: "#3776AB" },
                  { Icon: MdApi, label: "REST APIs", color: "#4FC08D" },
                ],
              },
              {
                title: "Cloud",
                icons: [
                  { Icon: FaAws, label: "AWS", color: "#FF9900" },
                  { Icon: FaDocker, label: "Docker", color: "#2496ED" },
                  { Icon: SiKubernetes, label: "Kubernetes", color: "#326CE5" },
                ],
              },
              {
                title: "Database",
                icons: [
                  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
                  { Icon: SiPostgresql, label: "PostgreSQL", color: "#336791" },
                  { Icon: SiRedis, label: "Redis", color: "#DC382D" },
                ],
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  {skill.title}
                </h3>
                <div className="flex justify-start space-x-5">
                  {skill.icons.map(({ Icon, label, color }, iconIndex) => (
                    <div key={iconIndex} className="relative group">
                      <Icon
                        className="h-8 w-8 text-gray-300 transition-colors duration-300"
                        style={{ color: color }}
                      />
                      <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Card */}
        <section className="animate-slide-in-left">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Let's Connect
            </h2>
            <div className="grid md:grid-rows-2 gap-6">
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-4 hover:scale-[1.02] transition-transform duration-300">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-6 w-6 text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <a
                      href="mailto:rupesh.poudel22@pccoepune.org"
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      rupesh.poudel22@pccoepune.org
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-4 hover:scale-[1.02] transition-transform duration-300">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="h-6 w-6 text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400">Phone</p>
                    <a
                      href="tel:+918149992239"
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      +91 81499 92239
                    </a>
                  </div>
                </div>
              </div>
              {/* Social Media Links */}
              <div className="flex flex-wrap gap-1 items-center justify-center md:justify-center">
                {[
                  {
                    icon: faGithub,
                    color: "#181717",
                    url: "#",
                    label: "GitHub",
                  },
                  {
                    icon: faLinkedin,
                    color: "#0A66C2",
                    url: "#",
                    label: "LinkedIn",
                  },
                  {
                    icon: faInstagram,
                    color: "#E4405F",
                    url: "#",
                    label: "Instagram",
                  },
                  {
                    icon: faYoutube,
                    color: "#FF0000",
                    url: "#",
                    label: "YouTube",
                  },
                  {
                    icon: faFacebook,
                    color: "#1877F2",
                    url: "#",
                    label: "Facebook",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block p-3 rounded-xl transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="h-8 w-8 text-white"
                      style={{
                        transition: "color 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = social.color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#fff")
                      }
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveSession("Home")}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Return to Overview
          </button>
        </div>
      </div>
    </div>
  );
}
