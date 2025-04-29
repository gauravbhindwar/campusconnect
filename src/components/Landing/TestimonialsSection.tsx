import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/animations/animations';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Computer Science, NIT Trichy",
      image: "/avatars/priya.jpg", // You can replace with actual avatar images
      quote: "CampusConnect helped me find my first hackathon team and gave me visibility among recruiters. The platform's intuitive design made collaboration seamless!",
      rating: 5,
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-500"
    },
    {
      id: 2,
      name: "Arjun Mehta",
      role: "AI & Machine Learning, IIIT Hyderabad",
      image: "/avatars/arjun.jpg",
      quote: "I found my internship co-founder here! The project matching algorithm is surprisingly accurate, and we've been building our startup for 6 months now.",
      rating: 5,
      gradientFrom: "from-blue-500",
      gradientTo: "to-teal-500"
    },
    {
      id: 3,
      name: "Zara Khan",
      role: "Design Student, VIT Vellore",
      image: "/avatars/zara.jpg",
      quote: "As a design student, I appreciate the beautiful UI and smooth experience. I've connected with engineering students to bring my app concepts to life!",
      rating: 4,
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300/20 to-teal-300/20 blur-3xl dark:from-blue-900/20 dark:to-teal-900/20" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl dark:from-purple-900/20 dark:to-pink-900/20" />
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Student Success Stories
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hear From Our Community
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Students across the country are building amazing projects and growing their networks with CampusConnect
          </motion.p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="relative"
              variants={fadeIn}
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Quote icon */}
              <div className={`absolute -top-5 -left-2 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r ${testimonial.gradientFrom} ${testimonial.gradientTo} text-white z-10`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 006.75-6.75v-2.25h-2.25v2.25a4.5 4.5 0 01-9 0v-2.25a.75.75 0 01.75-.75h5.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v5.25c0 3.832 1.545 7.307 3.304 11.894z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M19.804 21.644A6.707 6.707 0 0021 21.75a6.721 6.721 0 006.75-6.75v-2.25h-2.25v2.25a4.5 4.5 0 01-9 0v-2.25a.75.75 0 01.75-.75h5.25a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75H17.25a.75.75 0 00-.75.75v5.25c0 3.832 1.545 7.307 3.304 11.894z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className="mb-6 flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {/* You can replace with actual avatar images */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill={i < testimonial.rating ? "currentColor" : "none"} 
                          stroke={i < testimonial.rating ? "none" : "currentColor"}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
            Read more success stories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
