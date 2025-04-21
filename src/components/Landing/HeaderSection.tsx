import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '../../utils/animations';

// Predefined positions to avoid hydration mismatch
const FLOATING_ELEMENTS = [
  { size: 10, x: 25, y: 15, type: 0 },
  { size: 8, x: 85, y: 10, type: 1 },
  { size: 9, x: 65, y: 25, type: 2 },
  { size: 7, x: 15, y: 45, type: 0 },
  { size: 11, x: 40, y: 30, type: 1 },
  { size: 6, x: 70, y: 60, type: 2 },
  { size: 9, x: 30, y: 75, type: 0 },
  { size: 7, x: 80, y: 85, type: 1 },
  { size: 10, x: 55, y: 90, type: 2 },
  { size: 8, x: 20, y: 50, type: 0 },
  { size: 6, x: 60, y: 40, type: 1 },
  { size: 9, x: 90, y: 70, type: 2 },
];

const HeaderSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  
  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    
    setMousePosition({
      x: clientX - left,
      y: clientY - top
    });
  };
  
  return (
    <header 
      className="relative bg-gradient-to-br from-blue-700 via-indigo-600 to-teal-600 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Interactive glow effect following mouse */}
      {isClient && (
        <motion.div 
          className="absolute w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192, // Half of width
            y: mousePosition.y - 192, // Half of height
          }}
          transition={{ type: "spring", damping: 15, stiffness: 80 }}
        />
      )}
      
      <div className="container mx-auto max-w-7xl px-6 py-28 md:py-36 flex flex-col items-center text-center relative z-10">
        {/* Floating elements animation group */}
        <div className="absolute inset-0 overflow-hidden">
          {FLOATING_ELEMENTS.map((element, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                element.type === 0 ? 'bg-teal-300/40' : element.type === 1 ? 'bg-blue-300/40' : 'bg-indigo-300/40'
              }`}
              style={{
                width: `${element.size}px`,
                height: `${element.size + (i % 3) * 2}px`,
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [0, (i % 2 ? 30 : -30), 0],
                x: [0, (i % 3 === 0 ? 20 : -20), 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 5 + i % 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Main decorative blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-sky-300 mix-blend-multiply blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -left-20 w-112 h-112 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 mix-blend-multiply blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -15, 0],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Title with animated text reveal effect */}
        <div className="relative mb-8">
          <motion.h1 
            className="text-5xl md:text-8xl font-black mb-4 relative z-10 tracking-tight"
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
          >
            <div className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-100">
                Campus
              </span>
              <motion.span 
                className="absolute bottom-0 left-0 h-1 bg-white/40" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1.2 }}
              />
            </div>
            <motion.span 
              className="text-teal-300 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Connect
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="absolute -z-1 inset-0 blur-md opacity-40 scale-105"
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-100">
              Campus<span className="text-teal-300">Connect</span>
            </span>
          </motion.div>
        </div>
        
        {/* Subtitle with typing animation */}
        <motion.div
          className="max-w-2xl mx-auto relative mb-14"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
        >
          <motion.p 
            className="text-xl md:text-2xl font-light leading-relaxed text-white relative z-10"
          >
            Empowering students to showcase, collaborate and grow in an 
            <motion.span 
              className="inline-block ml-2 font-medium bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              interconnected academic ecosystem
            </motion.span>
          </motion.p>
          
          <motion.div 
            className="w-24 h-24 absolute -right-12 -top-10 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0ZM50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z" fill="white"/>
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Animated button group */}
        <motion.div 
          className="flex gap-6 flex-col sm:flex-row relative z-10 mt-4"
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#signup"
            className="px-10 py-5 rounded-full bg-gradient-to-r from-white to-sky-100 text-blue-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Started</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-teal-200 to-sky-200 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ 
                x: ["-100%", "0%"],
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.span
              className="absolute inset-0 blur-md bg-white/30 -z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>
          
          <motion.a
            href="#features"
            className="px-10 py-5 rounded-full border-2 border-white/50 text-white font-bold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(255, 255, 255, 0.9)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Learn More</span>
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-300 to-teal-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Bottom wave divider */}
      {/* <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,74.7C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div> */}
    </header>
  );
};

export default HeaderSection;
