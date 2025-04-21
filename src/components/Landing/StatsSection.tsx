import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// CountUp component - for animated numbers
const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    
    if (inView) {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      
      animationFrameId = requestAnimationFrame(step);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [inView, end, duration]);
  
  return <span ref={ref} className="text-4xl md:text-5xl font-bold">{count}</span>;
};

// Bar Chart component
const BarChart = ({ data, maxValue, color }: { data: number[], maxValue: number, color: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div ref={ref} className="h-32 flex items-end justify-between gap-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className={`w-full rounded-t-md ${color}`}
          initial={{ height: 0 }}
          animate={inView ? { height: `${(value / maxValue) * 100}%` } : { height: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          whileHover={{ y: -5 }}
        />
      ))}
    </div>
  );
};

// Line Chart component
const LineChart = ({ data, maxValue, color }: { data: number[], maxValue: number, color: string }) => {
  const chartRef = useRef(null);
  const inView = useInView(chartRef, { once: true, amount: 0.3 });
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Generate SVG path from data points
  const generatePath = () => {
    const width = 100 / (data.length - 1);
    return data.map((value, index) => {
      const x = index * width;
      const y = 100 - (value / maxValue) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };
  
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [data]);
  
  return (
    <div ref={chartRef} className="h-32 w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          ref={pathRef}
          d={generatePath()}
          fill="none"
          stroke={color === 'bg-indigo-500' ? '#6366f1' : 
                 color === 'bg-emerald-500' ? '#10b981' : 
                 color === 'bg-fuchsia-500' ? '#d946ef' : '#3b82f6'}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength}
        />
        
        {/* Data points */}
        {data.map((value, index) => {
          const x = index * (100 / (data.length - 1));
          const y = 100 - (value / maxValue) * 100;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill={color === 'bg-indigo-500' ? '#6366f1' : 
                    color === 'bg-emerald-500' ? '#10b981' : 
                    color === 'bg-fuchsia-500' ? '#d946ef' : '#3b82f6'}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Circular Progress component
const CircularProgress = ({ percentage, color }: { percentage: number, color: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const circumference = 2 * Math.PI * 36; // radius = 36
  
  return (
    <div ref={ref} className="relative h-32 flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
        {/* Background circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="36" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="6" 
          className="text-gray-200 dark:text-gray-700" 
        />
        
        {/* Progress circle */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="36" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="8" 
          className={color === 'bg-indigo-500' ? 'text-indigo-500' : 
                    color === 'bg-emerald-500' ? 'text-emerald-500' : 
                    color === 'bg-fuchsia-500' ? 'text-fuchsia-500' : 'text-blue-500'}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { 
            strokeDashoffset: circumference - (percentage / 100) * circumference 
          } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Percentage text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-xl font-bold"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {inView ? (
          <CountUp end={percentage} duration={1.5} />
        ) : 0}%
      </motion.div>
    </div>
  );
};

// Radar Chart data (simplified version)
const RadarChart = ({ data, max, color }: { data: number[], max: number, color: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const categories = ['Engagement', 'Growth', 'Retention', 'Referrals', 'Activity'];
  
  // Generate polygon points
  const getPoints = () => {
    const center = { x: 50, y: 50 };
    const radius = 35;
    
    return data.map((value, i) => {
      const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
      const percent = value / max;
      const x = center.x + radius * percent * Math.cos(angle);
      const y = center.y + radius * percent * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };
  
  return (
    <div ref={ref} className="relative h-40 w-full flex justify-center">
      <svg viewBox="0 0 100 100" className="max-w-full max-h-full">
        {/* Background shape */}
        <polygon 
          points="50,15 85,50 50,85 15,50" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          className="text-gray-300 dark:text-gray-700"
        />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-700" />
        <circle cx="50" cy="50" r="23" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-700" />
        <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300 dark:text-gray-700" />
        
        {/* Data polygon */}
        <motion.polygon 
          points={getPoints()}
          fill={color === 'bg-indigo-500' ? 'rgba(99, 102, 241, 0.2)' : 
                color === 'bg-emerald-500' ? 'rgba(16, 185, 129, 0.2)' : 
                color === 'bg-fuchsia-500' ? 'rgba(217, 70, 239, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
          stroke={color === 'bg-indigo-500' ? '#6366f1' : 
                 color === 'bg-emerald-500' ? '#10b981' : 
                 color === 'bg-fuchsia-500' ? '#d946ef' : '#3b82f6'}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Data points */}
        {data.map((value, i) => {
          const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
          const percent = value / max;
          const radius = 35;
          const x = 50 + radius * percent * Math.cos(angle);
          const y = 50 + radius * percent * Math.sin(angle);
          
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill={color === 'bg-indigo-500' ? '#6366f1' : 
                   color === 'bg-emerald-500' ? '#10b981' : 
                   color === 'bg-fuchsia-500' ? '#d946ef' : '#3b82f6'}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
            />
          );
        })}
        
        {/* Category labels */}
        {categories.map((category, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const radius = 45;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          
          return (
            <motion.text
              key={i}
              x={x}
              y={y}
              fontSize="4"
              textAnchor="middle"
              fill="currentColor"
              className="text-gray-600 dark:text-gray-400"
              dominantBaseline="middle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {category}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
};

// Main component
const StatsSection = () => {
  // Sample data for charts
  const barData = [30, 45, 75, 60, 85, 70, 55];
  const lineData1 = [10, 25, 15, 40, 30, 55, 70, 60, 80];
  const lineData2 = [50, 35, 45, 30, 55, 40, 60, 70, 85];
  const radarData = [75, 85, 65, 90, 70];
  
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-purple-900/20"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20"></div>
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Platform Metrics
          </motion.span>
          
          <motion.h2
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Growing Fast, Together
          </motion.h2>
          
          <motion.p
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our platform is growing rapidly as more students discover the power of collaboration
          </motion.p>
        </div>
        
        {/* Key metrics with animated counters */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { label: "Active Students", value: 5000, icon: "👨‍🎓", color: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" },
            { label: "Projects Showcased", value: 2800, icon: "🚀", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
            { label: "Hackathons Hosted", value: 50, icon: "💻", color: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
            { label: "Colleges", value: 120, icon: "🏫", color: "bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${stat.color} rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * index }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="flex items-baseline mb-2">
                <CountUp end={stat.value} /> 
                <span className="ml-1 text-lg">+</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Data visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Growth chart */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Growth</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last 9 months</div>
            </div>
            
            <LineChart data={lineData1} maxValue={100} color="bg-indigo-500" />
            
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
            </div>
          </motion.div>
          
          {/* Project submissions */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project Submissions</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Weekly</div>
            </div>
            
            <BarChart data={barData} maxValue={100} color="bg-emerald-500" />
            
            <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </motion.div>
        </div>

        {/* Additional visualizations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Engagement metrics */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Engagement Metrics</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
            </div>
            
            <RadarChart data={radarData} max={100} color="bg-fuchsia-500" />
          </motion.div>
          
          {/* Student Retention */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Student Retention</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">30-day</div>
            </div>
            
            <CircularProgress percentage={85} color="bg-blue-500" />
            
            <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">85%</span> of students return monthly
            </div>
          </motion.div>
          
          {/* Collaboration Growth */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Collaboration</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last 9 months</div>
            </div>
            
            <LineChart data={lineData2} maxValue={100} color="bg-indigo-500" />
            
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
