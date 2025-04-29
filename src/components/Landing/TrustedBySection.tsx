import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations/animations';

const TrustedBySection = () => {
  // College logos and their details
  const colleges = [
    {
      id: 1,
      name: "IIT Bombay",
      abbreviation: "IITB",
      color: "bg-red-100 dark:bg-red-900/30",
      textColor: "text-red-800 dark:text-red-300",
      borderColor: "border-red-200 dark:border-red-800/30"
    },
    {
      id: 2,
      name: "NIT Trichy",
      abbreviation: "NITT",
      color: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-800 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-800/30"
    },
    {
      id: 3,
      name: "BITS Pilani",
      abbreviation: "BITS",
      color: "bg-amber-100 dark:bg-amber-900/30",
      textColor: "text-amber-800 dark:text-amber-300",
      borderColor: "border-amber-200 dark:border-amber-800/30"
    },
    {
      id: 4,
      name: "VIT Vellore",
      abbreviation: "VIT",
      color: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-800 dark:text-purple-300",
      borderColor: "border-purple-200 dark:border-purple-800/30"
    },
    {
      id: 5,
      name: "IIIT Hyderabad",
      abbreviation: "IIITH",
      color: "bg-teal-100 dark:bg-teal-900/30",
      textColor: "text-teal-800 dark:text-teal-300",
      borderColor: "border-teal-200 dark:border-teal-800/30"
    },
    {
      id: 6,
      name: "Delhi University",
      abbreviation: "DU",
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      textColor: "text-emerald-800 dark:text-emerald-300",
      borderColor: "border-emerald-200 dark:border-emerald-800/30"
    },
    {
      id: 7,
      name: "IIM Ahmedabad",
      abbreviation: "IIMA",
      color: "bg-indigo-100 dark:bg-indigo-900/30",
      textColor: "text-indigo-800 dark:text-indigo-300",
      borderColor: "border-indigo-200 dark:border-indigo-800/30"
    },
    {
      id: 8,
      name: "AIIMS Delhi",
      abbreviation: "AIIMS",
      color: "bg-pink-100 dark:bg-pink-900/30",
      textColor: "text-pink-800 dark:text-pink-300",
      borderColor: "border-pink-200 dark:border-pink-800/30"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} />
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-sm font-medium rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Campus Network
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trusted by Top Institutions
          </motion.h2>
          
          <motion.p
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Students from these prestigious institutions are building their portfolios and finding dream teams on our platform
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {colleges.map((college) => (
            <motion.div 
              key={college.id}
              className={`${college.color} ${college.borderColor} border rounded-xl p-6 flex flex-col items-center justify-center transition-all h-28 md:h-32`}
              variants={fadeIn}
              whileHover={{ 
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                scale: 1.02
              }}
              transition={{ duration: 0.2 }}
            >
              <div className={`text-2xl md:text-3xl font-bold ${college.textColor}`}>
                {college.abbreviation}
              </div>
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mt-2 text-center">
                {college.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-5">
            <span className="font-semibold">10,000+</span> students from <span className="font-semibold">500+</span> colleges across India
          </p>
          
          <motion.a
            href="#register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Your Campus Network
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
