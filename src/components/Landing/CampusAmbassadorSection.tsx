import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scaleUp } from '../../utils/animations';

// Predefined particles to avoid hydration mismatch
const PARTICLES = [
  { size: 7.5, x: 68, y: 46, type: 0 },
  { size: 6.4, x: 4, y: 70, type: 1 },
  { size: 5.4, x: 83, y: 37, type: 2 },
  { size: 10.6, x: 26, y: 92, type: 0 },
  { size: 7.9, x: 67, y: 92, type: 1 },
  { size: 8.7, x: 35, y: 87, type: 2 },
  { size: 7.3, x: 74, y: 11, type: 0 },
  { size: 9.4, x: 92, y: 80, type: 1 },
  { size: 8.6, x: 69, y: 24, type: 2 },
  { size: 11.4, x: 15, y: 30, type: 0 },
  { size: 5.4, x: 40, y: 55, type: 1 },
  { size: 7.8, x: 96, y: 35, type: 2 },
  { size: 7.8, x: 19, y: 54, type: 0 },
  { size: 7.2, x: 60, y: 12, type: 1 },
  { size: 6.7, x: 52, y: 23, type: 2 },
  { size: 10.0, x: 45, y: 52, type: 0 },
  { size: 8.5, x: 82, y: 80, type: 1 },
  { size: 10.1, x: 62, y: 48, type: 2 },
  { size: 11.1, x: 56, y: 22, type: 0 },
  { size: 9.7, x: 22, y: 69, type: 1 },
];

const CampusAmbassadorSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="section py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              particle.type === 0 ? 'bg-blue-400' : particle.type === 1 ? 'bg-indigo-400' : 'bg-teal-400'
            } opacity-10 dark:opacity-20`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + (i % 10), // Deterministic but varied durations
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Large decorative blobs */}
      <motion.div 
        className="absolute -top-40 left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full opacity-30 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 right-20 w-96 h-96 bg-teal-200 dark:bg-teal-900/30 rounded-full opacity-30 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -15, 0],
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <motion.div 
          className="relative bg-white/90 dark:bg-gray-800/90 p-10 md:p-16 rounded-3xl shadow-xl backdrop-blur-sm overflow-hidden border border-white/50 dark:border-gray-700/50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleUp}
          onMouseEnter={() => isClient && setIsHovered(true)}
          onMouseLeave={() => isClient && setIsHovered(false)}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            y: -5,
            transition: { duration: 0.4 }
          }}
        >
          {/* Animated gradient border */}
          <motion.div 
            className="absolute inset-0 opacity-30 -z-10"
            animate={{ 
              background: isClient && isHovered 
                ? [
                    "linear-gradient(45deg, #3b82f6 0%, #0ea5e9 50%, #14b8a6 100%)",
                    "linear-gradient(225deg, #3b82f6 0%, #0ea5e9 50%, #14b8a6 100%)",
                    "linear-gradient(45deg, #3b82f6 0%, #0ea5e9 50%, #14b8a6 100%)"
                  ]
                : "linear-gradient(45deg, #3b82f6 0%, #0ea5e9 50%, #14b8a6 100%)"
            }}
            transition={{ duration: 5, repeat: isClient && isHovered ? Infinity : 0 }}
          />
          
          {/* Card decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 -mt-12 -mr-12">
            <motion.div 
              className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/20 to-teal-400/20 blur-xl"
              animate={{ 
                scale: isClient && isHovered ? [1, 1.2, 1] : 1,
                rotate: isClient && isHovered ? [0, 90, 180, 270, 360] : 0
              }}
              transition={{ duration: 10, repeat: isClient && isHovered ? Infinity : 0, ease: "linear" }}
            />
          </div>
          
          <div className="absolute bottom-0 left-0 w-24 h-24 -mb-8 -ml-8">
            <motion.div 
              className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 blur-xl"
              animate={{ 
                scale: isClient && isHovered ? [1, 1.3, 1] : 1,
                rotate: isClient && isHovered ? [0, -90, -180, -270, -360] : 0
              }}
              transition={{ duration: 12, repeat: isClient && isHovered ? Infinity : 0, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div 
              className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 dark:from-blue-500/20 dark:to-teal-500/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Student Leadership Program
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Become a Campus Ambassador
            </motion.h2>
            
            <motion.div 
              className="h-1 w-16 md:w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-8 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Represent CampusConnect in your college, organize tech events, build leadership skills, 
              and unlock exclusive perks including mentorship, networking opportunities, and special recognition.
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Leadership Skills', 'Tech Events', 'Exclusive Perks', 'Network Access'].map((benefit, i) => (
                <motion.span 
                  key={i}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.4 }}
                  whileHover={{ scale: 1.05, backgroundColor: i % 2 === 0 ? "#e0f2fe" : "#d1fae5" }}
                >
                  <svg className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {benefit}
                </motion.span>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.a 
                href="#apply" 
                className="inline-flex items-center px-8 py-4 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Apply Now</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 group-hover:ml-3 transition-all duration-300" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "mirror", 
                    duration: 1.5 
                  }}
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampusAmbassadorSection;
