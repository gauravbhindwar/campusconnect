"use client"
import React, { useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { fadeIn, staggerContainer, popUp } from '../../utils/animations/animations';

// Define the allowed colors for the FeatureCard
type FeatureCardColor = 'blue' | 'indigo' | 'teal';

// Define the props interface for the FeatureCard component
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: FeatureCardColor;
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const [hover, setHover] = useState(false);
  
  // 3D card effect variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  
  function handleMouseMove(e: React.MouseEvent) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHover(false);
  }
  
  const gradientMap = {
    blue: "from-blue-500 to-blue-700",
    indigo: "from-indigo-500 to-indigo-700",
    teal: "from-teal-500 to-teal-700"
  };
  
  const bgColorMap = {
    blue: "bg-blue-100 dark:bg-blue-900/40 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60",
    indigo: "bg-indigo-100 dark:bg-indigo-900/40 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/60",
    teal: "bg-teal-100 dark:bg-teal-900/40 group-hover:bg-teal-200 dark:group-hover:bg-teal-800/60"
  };
  
  const textColorMap = {
    blue: "text-blue-600 dark:text-blue-300",
    indigo: "text-indigo-600 dark:text-indigo-300",
    teal: "text-teal-600 dark:text-teal-300"
  };
  
  return (
    <motion.div 
      className="relative perspective"
      variants={popUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden group cursor-pointer h-full"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientMap[color]}`}></div>
        
        {/* Animated background shape */}
        <motion.div 
          className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full opacity-5"
          style={{ 
            background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
            color: hover ? "#ffffff" : "#000000",
          }}
          animate={{ 
            scale: hover ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 2, repeat: hover ? Infinity : 0, ease: "easeInOut" }}
        />
        
        <motion.div 
          className={`${bgColorMap[color]} h-20 w-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 transform-gpu z-10 relative`}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)"
          }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className={textColorMap[color]}
            animate={{ 
              rotate: hover ? 360 : 0,
            }}
            transition={{ duration: 3, ease: "easeInOut", repeat: 0 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        
        <motion.h3 
          className="text-xl font-bold mb-3 text-gray-900 dark:text-white relative"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(30px)"
          }}
        >
          {title}
          <motion.span
            className={`absolute -bottom-1 left-0 h-1 ${textColorMap[color]}`}
            initial={{ width: 0 }}
            animate={{ width: hover ? "100%" : 0 }}
            transition={{ duration: 0.4 }}
            style={{ opacity: 0.5 }}
          />
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 relative"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)"
          }}
        >
          {description}
        </motion.p>
        
        <motion.div
          className={`absolute bottom-6 right-6 ${textColorMap[color]} transform-gpu`}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)"
          }}
          animate={{ 
            opacity: hover ? 1 : 0,
            x: hover ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="section py-24 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full opacity-5" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <motion.span 
            className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Platform Features
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Everything You Need
          </motion.h2>
          
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Designed by students, for students. Tools to help you build, connect, and grow.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            title="Student Profile"
            description="Showcase your skills, projects, and achievements in an impressive digital portfolio that stands out to peers and recruiters."
            color="blue"
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            title="Live Chat"
            description="Connect instantly with project teammates, mentors, and fellow students with our real-time messaging platform."
            color="indigo"
          />
          
          <FeatureCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Hackathon Hub"
            description="Discover competitions, form dream teams, and track submission deadlines all in one centralized dashboard."
            color="teal"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
