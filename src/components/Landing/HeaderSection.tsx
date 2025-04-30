"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideInLeft, slideInRight } from '../../utils/animations/animations';
import Image from 'next/image';
import Link from 'next/link';

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
  const [isLightMode, setIsLightMode] = useState(false);

  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);

    // Check if light mode is active
    const checkLightMode = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsLightMode(!isDarkMode);
    };

    checkLightMode();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => setIsLightMode(!e.matches);
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    setMousePosition({
      x: clientX - left,
      y: clientY - top,
    });
  };

  return (
    <header
      className="relative bg-no-repeat bg-center bg-cover min-h-screen flex items-center"
      onMouseMove={handleMouseMove}
      style={
        isLightMode
          ? {
              background: 'linear-gradient(135deg, #f0f4f8 0%, #eef1f5 100%)',
            }
          : undefined
      }
    >
      {/* Logo component with animation */}
      <motion.div
        className="absolute top-6 left-6 md:top-8 md:left-8 z-20"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2,
        }}
        whileHover={{
          scale: 1.05,
          rotate: [0, -5, 5, -3, 0],
          transition: { duration: 0.5 },
        }}
      >
        <Link href="/" className="flex items-center relative group">
          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${
              isLightMode
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
                : 'bg-gradient-to-br from-teal-400 to-blue-500'
            } flex items-center justify-center overflow-hidden relative`}
          >
            <Image
              src="/crewsity.svg"
              alt="Crewsity Campus Connect Platform Logo"
              width={50}
              height={50}
              priority
            />
            <motion.div
              className={`absolute inset-0 ${
                isLightMode ? 'bg-white/30' : 'bg-white/20'
              }`}
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </div>
          <motion.div
            className="ml-2 hidden md:block"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span
              className={`text-lg font-bold ${
                isLightMode
                  ? 'text-blue-700'
                  : 'bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent'
              }`}
            >
              Crewsity
            </span>
          </motion.div>
          <motion.div
            className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
              isLightMode
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                : 'bg-gradient-to-r from-teal-300 to-sky-300'
            } opacity-0 group-hover:opacity-100`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.div>

      {/* Interactive glow effect following mouse */}
      {isClient && (
        <motion.div
          className={`absolute w-96 h-96 rounded-full ${
            isLightMode
              ? 'bg-blue-400/10 blur-3xl'
              : 'bg-sky-400/20 blur-3xl'
          } pointer-events-none`}
          animate={{
            x: mousePosition.x - 192, // Half of width
            y: mousePosition.y - 192, // Half of height
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 80 }}
        />
      )}

      <div className="container mx-auto max-w-7xl px-6 py-28 md:py-36 flex flex-col items-center text-center relative z-10">
        {/* Floating elements animation group */}
        <div className="absolute inset-0 overflow-hidden">
          {FLOATING_ELEMENTS.map((element, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                isLightMode
                  ? element.type === 0
                    ? 'bg-blue-300/20'
                    : element.type === 1
                    ? 'bg-indigo-300/20'
                    : 'bg-violet-300/20'
                  : element.type === 0
                  ? 'bg-teal-300/40'
                  : element.type === 1
                  ? 'bg-blue-300/40'
                  : 'bg-indigo-300/40'
              }`}
              style={{
                width: `${element.size}px`,
                height: `${element.size + (i % 3) * 2}px`,
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [0, i % 2 ? 30 : -30, 0],
                x: [0, i % 3 === 0 ? 20 : -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 5 + (i % 5),
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Main decorative blobs */}
        <motion.div
          className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${
            isLightMode
              ? 'bg-gradient-to-br from-blue-100 to-indigo-200 mix-blend-multiply blur-3xl opacity-50'
              : 'bg-gradient-to-br from-blue-400 to-sky-300 mix-blend-multiply blur-3xl opacity-20'
          }`}
          aria-hidden="true"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className={`absolute -bottom-40 -left-20 w-112 h-112 rounded-full ${
            isLightMode
              ? 'bg-gradient-to-tr from-indigo-100 to-blue-200 mix-blend-multiply blur-3xl opacity-50'
              : 'bg-gradient-to-tr from-teal-400 to-emerald-300 mix-blend-multiply blur-3xl opacity-20'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -15, 0],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: 'easeInOut',
            delay: 1,
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
              <span
                className={`md:text-8xl sm:text-7xl text-6xl ${
                  isLightMode ? 'text-blue-700' : 'text-teal-300'
                } relative`}
              >
                Crewsity&nbsp;
              </span>
            </div>
            <motion.span
              className={`md:text-5xl text-5xl sm:text-3xl ${
                isLightMode
                  ? 'text-gray-800'
                  : 'bg-clip-text bg-gradient-to-r from-white to-sky-100'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Campus Connect
            </motion.span>
          </motion.h1>

          <motion.div
            className={`absolute -z-1 inset-0 blur-md ${
              isLightMode ? 'opacity-20' : 'opacity-40'
            } scale-105`}
            animate={{
              opacity: isLightMode ? [0.1, 0.3, 0.1] : [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span
              className={`text-5xl md:text-8xl font-black bg-clip-text text-transparent ${
                isLightMode
                  ? 'bg-gradient-to-r from-indigo-700 to-blue-600'
                  : 'bg-gradient-to-r from-white to-sky-100'
              }`}
            >
              Ravi
              <span
                className={
                  isLightMode ? 'text-blue-600' : 'text-teal-300'
                }
              >
                Gaurav
              </span>
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
            className={`text-xl md:text-2xl font-light leading-relaxed ${
              isLightMode ? 'text-gray-700' : 'text-white'
            } relative z-10`}
          >
            Empowering students to showcase, collaborate and grow in an
            <motion.span
              className={`inline-block ml-2 font-medium ${
                isLightMode
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent'
              }`}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              interconnected academic ecosystem
            </motion.span>
          </motion.p>

          <motion.div
            className={`w-24 h-24 absolute -right-12 -top-10 ${
              isLightMode ? 'opacity-5' : 'opacity-10'
            }`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0ZM50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z"
                fill={isLightMode ? '#1e40af' : 'white'}
              />
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
            className={`px-10 py-5 rounded-full ${
              isLightMode
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                : 'bg-gradient-to-r from-white to-sky-100 text-blue-700'
            } font-bold shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
            whileHover={{
              scale: 1.05,
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Started</span>
            <motion.span
              className={`absolute inset-0 ${
                isLightMode
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-700'
                  : 'bg-gradient-to-r from-teal-200 to-sky-200'
              } -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              whileHover={{
                x: ['-100%', '0%'],
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.span
              className={`absolute inset-0 blur-md ${
                isLightMode ? 'bg-indigo-400/30' : 'bg-white/30'
              } -z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
          </motion.a>

          <motion.a
            href="#features"
            className={`px-10 py-5 rounded-full ${
              isLightMode
                ? 'border-2 border-blue-600/50 text-blue-800 hover:bg-blue-50/50'
                : 'border-2 border-white/50 text-white hover:bg-white/10'
            } backdrop-blur-sm transition-all duration-300 group relative overflow-hidden font-bold`}
            whileHover={{
              scale: 1.05,
              borderColor: isLightMode
                ? 'rgba(37, 99, 235, 0.8)'
                : 'rgba(255, 255, 255, 0.9)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Learn More</span>
            <motion.span
              className={`absolute bottom-0 left-0 w-full h-[2px] ${
                isLightMode
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  : 'bg-gradient-to-r from-sky-300 to-teal-300'
              }`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
};

export default HeaderSection;
