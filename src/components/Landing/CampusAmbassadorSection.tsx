"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scaleUp } from '../../utils/animations/animations';
import axios from 'axios';
import Modal from '../misc/Modal';
// import { toast, ToastContainer } from 'react-toastify';

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
  { size: 9.7, x: 22, y: 69, type: 1 }
];

// Country codes for phone numbers
const COUNTRY_CODES = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+65', country: 'Singapore' },
  { code: '+971', country: 'UAE' },
  { code: '+86', country: 'China' },
  { code: '+49', country: 'Germany' }
];

// Add type for Axios error response
interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const CampusAmbassadorSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    year: '',
    countryCode: '+91',
    phone: '',
    motivation: '',
    resumeLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    institution: '',
    year: '',
    phone: '',
    motivation: '',
    resumeLink: '',
    general: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      institution: '',
      year: '',
      phone: '',
      motivation: '',
      resumeLink: '',
      general: ''
    };
    
    // Name validation - allow only letters, spaces, and common name punctuation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s.'"-]{2,50}$/.test(formData.name.trim())) {
      errors.name = 'Please enter a valid name (2-50 characters, letters only)';
      isValid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Institution validation
    if (!formData.institution.trim()) {
      errors.institution = 'Institution is required';
      isValid = false;
    } else if (formData.institution.trim().length < 3) {
      errors.institution = 'Institution name must be at least 3 characters';
      isValid = false;
    }
    
    // Year validation
    if (!formData.year) {
      errors.year = 'Year of study is required';
      isValid = false;
    }
    
    // Phone validation - check for valid phone number format
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    // Motivation validation
    if (!formData.motivation.trim()) {
      errors.motivation = 'Please tell us why you want to be a Campus Ambassador';
      isValid = false;
    } else if (formData.motivation.trim().length < 50) {
      errors.motivation = 'Please provide at least 50 characters';
      isValid = false;
    }
    
    // Resume link validation
    if (!formData.resumeLink.trim()) {
      errors.resumeLink = 'Resume link is required';
      isValid = false;
    } else if (!/^(https?:\/\/)?(www\.)?(drive\.google\.com|docs\.google\.com|linkedin\.com|github\.com|dropbox\.com|onedrive\.live\.com).*$/.test(formData.resumeLink.trim())) {
      errors.resumeLink = 'Please provide a valid link to Google Drive, LinkedIn, GitHub, Dropbox, or OneDrive';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (name in formErrors && formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }
    
    try {
      setIsSubmitting(true);
      
      // Combine country code and phone number
      const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
      
      // Call our campus ambassador API endpoint
      const response = await axios.post('/api/campus-ambassador', {
        ...formData,
        phone: fullPhoneNumber
      });
      
      if (response.data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          institution: '',
          year: '',
          countryCode: '+91',
          phone: '',
          motivation: '',
          resumeLink: ''
        });
        // toast.success('Application submitted successfully!');
      } else {
        setFormErrors(prev => ({
          ...prev,
          general: response.data.message || 'Failed to submit application. Please try again.'
        }));
        // toast.error(response.data.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      // console.error('Ambassador application error:', error);
      setFormErrors(prev => ({
        ...prev,
        general: error && typeof error === 'object' && 'response' in error
          ? ((error as AxiosErrorResponse).response?.data?.message || 'An error occurred. Please try again later.')
          : 'An error occurred. Please try again later.'
      }));
      // toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSubmitSuccess(false);
    setFormErrors({
      name: '',
      email: '',
      institution: '',
      year: '',
      phone: '',
      motivation: '',
      resumeLink: '',
      general: ''
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    setFormData({
      name: '',
      email: '',
      institution: '',
      year: '',
      countryCode: '+91',
      phone: '',
      motivation: '',
      resumeLink: ''
    });
    setFormErrors({
      name: '',
      email: '',
      institution: '',
      year: '',
      phone: '',
      motivation: '',
      resumeLink: '',
      general: ''
    });
  };

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
              duration: 10 + (i % 10),
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

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
          {/* Card decorative elements */}
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
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.button
                onClick={openModal}
                className="px-8 py-4 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">Apply to be a Campus Ambassador</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Application Form Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Campus Ambassador Application"
        maxWidth="max-w-3xl"
      >
        {!submitSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form introduction */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-blue-800 dark:text-blue-200 text-sm">
              <p className="flex items-center font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                All fields are required. Please provide accurate information.
              </p>
            </div>
            
            {/* General error message */}
            {formErrors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
                {formErrors.general}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g. John Doe"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>
              
              {/* Institution field */}
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Institution <span className="text-red-500">*</span>
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.institution ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Your college/university"
                />
                {formErrors.institution && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.institution}</p>
                )}
              </div>
              
              {/* Year of study field */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year of Study <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.year ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                  <option value="5+">Fifth Year or higher</option>
                </select>
                {formErrors.year && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.year}</p>
                )}
              </div>
              
              {/* Phone number field with country code */}
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-32 px-3 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {COUNTRY_CODES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </option>
                    ))}
                  </select>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="10-digit number"
                  />
                </div>
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phone}</p>
                )}
              </div>
              
              {/* Resume link field - now required */}
              <div className="md:col-span-2">
                <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Resume Link <span className="text-red-500">*</span>
                </label>
                <input
                  id="resumeLink"
                  name="resumeLink"
                  type="url"
                  required
                  placeholder="https://drive.google.com/your-resume"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${formErrors.resumeLink ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                <p className={`mt-1 text-xs ${formErrors.resumeLink ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {formErrors.resumeLink || "Share a Google Drive, LinkedIn, GitHub, Dropbox, or OneDrive link to your resume"}
                </p>
              </div>
            </div>
            
            {/* Motivation field */}
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Why do you want to be a Campus Ambassador? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="motivation"
                name="motivation"
                rows={4}
                required
                value={formData.motivation}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${formErrors.motivation ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'} text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Tell us why you're interested and what makes you a good fit (minimum 50 characters)"
              />
              <div className="mt-1 flex justify-between items-center">
                {formErrors.motivation ? (
                  <p className="text-sm text-red-600 dark:text-red-400">{formErrors.motivation}</p>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Minimum 50 characters required
                  </p>
                )}
                <span className={`text-xs ${formData.motivation.length < 50 ? 'text-red-500' : 'text-green-500'}`}>
                  {formData.motivation.length}/50+ characters
                </span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg shadow transition-all duration-200 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Application Submitted!</h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Thank you for applying to be a Campus Ambassador. We&apos;ve received your application and will review it shortly.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You&apos;ll receive a confirmation email with more details at <span className="font-medium text-blue-600 dark:text-blue-400">{formData.email}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors font-medium"
              >
                Apply with another email
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* <ToastContainer /> */}
    </section>
  );
};

export default CampusAmbassadorSection;
