import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WhySection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const features = [
    {
      id: 1,
      title: "Showcase Your Projects",
      description: "Build an impressive portfolio that highlights your technical skills, collaborative projects, and academic achievements to stand out to potential employers and collaborators.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-blue-600 to-cyan-600",
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800/30",
      stats: [
        { label: "Projects Showcased", value: "2,800+" },
        { label: "Avg. Profile Views", value: "150/month" }
      ],
      features: [
        "Custom project showcases with media",
        "Technology stack highlighting",
        "Integration with GitHub repositories",
        "Contribution analytics and insights"
      ]
    },
    {
      id: 2,
      title: "Find Your Dream Team",
      description: "Our intelligent matching algorithm connects you with like-minded students who complement your skills and share your passion for innovation and collaboration.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-purple-600 to-indigo-600",
      lightBg: "bg-indigo-50",
      darkBg: "dark:bg-indigo-900/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
      borderColor: "border-indigo-200 dark:border-indigo-800/30",
      stats: [
        { label: "Teams Formed", value: "1,200+" },
        { label: "Match Success Rate", value: "92%" }
      ],
      features: [
        "AI-powered skill compatibility matching",
        "Team formation for hackathons & projects",
        "Personality & work style preference matching",
        "In-app team communication tools"
      ]
    },
    {
      id: 3,
      title: "Learn and Grow Together",
      description: "Access mentor guidance, industry-relevant resources, and a supportive community of peers to accelerate your personal and professional development journey.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: "from-teal-600 to-emerald-600",
      lightBg: "bg-teal-50",
      darkBg: "dark:bg-teal-900/20",
      textColor: "text-teal-600 dark:text-teal-400",
      borderColor: "border-teal-200 dark:border-teal-800/30",
      stats: [
        { label: "Learning Resources", value: "5,000+" },
        { label: "Mentor Network", value: "350+" }
      ],
      features: [
        "Personalized learning paths & recommendations",
        "Peer-to-peer knowledge sharing sessions",
        "Industry mentor connections & guidance",
        "Skill verification & digital badges"
      ]
    }
  ];

  return (
    <section id="why" className="py-24 bg-gradient-to-br from-white via-gray-50 to-sky-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl dark:from-purple-900/20 dark:to-indigo-900/20"></div>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-tr from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl dark:from-teal-900/20 dark:to-emerald-900/20"></div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-medium rounded-full"
          >
            Why Choose Us
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why CampusConnect?
          </motion.h2>
          
          <motion.p
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of students who are building their future with our platform.
            We provide the tools, community, and opportunities you need to thrive.
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border ${feature.borderColor} group transition-all duration-300 h-full flex flex-col`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Top gradient bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${feature.color}`}></div>
              
              <div className="p-8">
                {/* Icon and title */}
                <div className="flex items-start mb-6">
                  <div className={`mr-4 p-3 rounded-lg ${feature.lightBg} ${feature.darkBg} ${feature.textColor}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Stats */}
                <div className="flex justify-between mb-8">
                  {feature.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-xl font-bold ${feature.textColor}`}>{stat.value}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Features list */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Key Features:</h4>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={activeCard === feature.id ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <div className={`flex-shrink-0 h-5 w-5 ${feature.textColor} mr-2`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* CTA button */}
              <div className="mt-auto p-6 pt-0">
                <motion.button
                  className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${feature.color} text-white font-medium transition-all duration-300`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom testimonial */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative mb-8">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl text-gray-200 dark:text-gray-700">
              &ldquo;
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic relative z-10">
              CampusConnect completely transformed how I approached my college projects and career planning.
              I found an incredible team and built connections that led directly to my dream internship.
            </blockquote>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold mr-4">
              RD
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 dark:text-white">Rahul Desai</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Computer Science, IIT Delhi</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
