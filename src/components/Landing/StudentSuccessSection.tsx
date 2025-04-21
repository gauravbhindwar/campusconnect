import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { slideInLeft, slideInRight } from '../../utils/animations';

const StudentSuccessSection = () => {
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  
  // Interactive mouse movement for the preview card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateY = useTransform(mouseX, [-300, 300], [10, -10]);
  const rotateX = useTransform(mouseY, [-300, 300], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  const listItems = [
    {
      id: 1,
      text: "Intuitive interface designed by students, for students",
      icon: (
        <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 9L9.99998 16L6.99994 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 2,
      text: "Smart project matching with AI-powered team formation",
      icon: (
        <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 9L9.99998 16L6.99994 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 3,
      text: "Real-time collaboration tools and resource sharing",
      icon: (
        <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 9L9.99998 16L6.99994 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 4,
      text: "Integrated progress tracking and deadline management",
      icon: (
        <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 9L9.99998 16L6.99994 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }
  ];

  return (
    <section className="section py-24 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-40 -mr-40 w-96 h-96 bg-teal-200/30 dark:bg-teal-900/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 -mb-40 -ml-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70" />
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInLeft}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full mb-4"
            >
              Student-Centered Design
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Designed for Student Success
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our platform is built from the ground up with student needs in mind. We&apos;ve interviewed hundreds of students 
              and collaborated with university faculty to create the perfect environment for collaboration and growth.
            </motion.p>
            
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {listItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={`flex items-start p-4 rounded-xl transition-all duration-300 ${
                    hoverItem === item.id ? 'bg-white/80 dark:bg-gray-800/50 shadow-md' : 'bg-transparent'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                  onMouseEnter={() => setHoverItem(item.id)}
                  onMouseLeave={() => setHoverItem(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`flex-shrink-0 mr-4 ${hoverItem === item.id ? 'scale-110' : ''} transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.text}</h3>
                    {hoverItem === item.id && (
                      <motion.p 
                        className="text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {index === 0 ? "User experience designed based on feedback from 1000+ students" : 
                         index === 1 ? "Matching algorithm finds the perfect teammates based on skills and goals" :
                         index === 2 ? "Built-in video, chat, and document sharing features" :
                         "Never miss a deadline with smart reminders and project timelines"}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 perspective-1000"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideInRight}
          >
            <motion.div
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
              }}
            >
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50 bg-white dark:bg-gray-800"
                style={{
                  rotateY,
                  rotateX,
                  transformPerspective: 1000,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-w-4 aspect-h-3 w-full">
                  {/* Top bar with browser controls */}
                  <div className="absolute top-0 left-0 right-0 bg-gray-100 dark:bg-gray-900 flex items-center px-4 py-2 z-10">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-sm text-gray-500 dark:text-gray-400">campusconnect.io</div>
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 mt-8 bg-gradient-to-br from-blue-600 to-teal-500"
                    initial={{ backgroundPosition: '0% 0%' }}
                    animate={{ backgroundPosition: '100% 100%' }}
                    transition={{ repeat: Infinity, duration: 10, repeatType: 'reverse' }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    {/* Mockup UI elements */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="w-full max-w-xs bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-4 mb-4">
                        <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-24 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-3">
                          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-16 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
                        </div>
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-3">
                          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-16 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{ transform: 'skewX(-20deg)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 5, repeatDelay: 3 }}
                />
              </motion.div>
              
              {/* Floating annotations */}
              <motion.div 
                className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 text-sm max-w-[160px] border border-blue-100 dark:border-blue-900/40"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Intuitive Dashboard</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs">Clean interface for easy navigation</div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-4 bottom-1/4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 text-sm max-w-[160px] border border-teal-100 dark:border-teal-900/40"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  delay: 1,
                  duration: 0.5,
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="font-semibold text-teal-600 dark:text-teal-400 mb-1">Team Management</div>
                <div className="text-gray-600 dark:text-gray-300 text-xs">Seamlessly communicate with teammates</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessSection;
