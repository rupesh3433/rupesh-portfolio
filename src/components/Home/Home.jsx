"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "/utils";
import RupeshImage1 from "../../assets/rupesh_suit_final.png";
import { Typewriter } from "react-simple-typewriter";

// LampContainer: Provides the animated lamp background.
export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
      </div>
      {/* Removed negative translation to keep content centered */}
      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

// Home component: Your main content (picture & text) is rendered here.
export default function Home({ setActiveSession }) {
  return (
    <LampContainer>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] w-full px-0 py-8 md:py-16">
        {/* Image Section - Top on mobile, Left on desktop */}
        <motion.div
          className="w-full md:w-2/5 lg:w-1/3 max-w-[400px] mb-0 md:mb-0 md:mr-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-square rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src={RupeshImage1}
              alt="Rupesh Professional Portrait"
              className="h-full w-full object-center"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text Section - Bottom on mobile, Right on desktop */}
        <motion.div
          className="w-full md:w-3/5 lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-sky-400 mb-4 md:mb-7">
            I am a{" "}
            <Typewriter
              words={[
                "Computer Engineer",
                "Full Stack Developer",
                "Tech Enthusiast",
                "Software Architect",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>

          <p className="text-base md:text-lg text-white mb-6 md:mb-10 max-w-[800px]">
            Passionate about creating innovative solutions with modern
            technology. Welcome to my professional portfolio.
          </p>
          <button
            onClick={() => setActiveSession("About")}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="Read more about my background"
          >
            Read More
          </button>
        </motion.div>
      </div>
    </LampContainer>
  );
}
