"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animations/animations';
import LegalDialog from '../misc/LegalDialog';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const SignUpSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'terms' | 'privacy'>('terms');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name || !formData.institution) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Send user data to our API with early_access inquiry type
      const response = await axios.post('/api/email', {
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        subject: 'New Early Access Request',
        message: `A new user has signed up for early access:\n\nName: ${formData.name}\nEmail: ${formData.email}\nInstitution: ${formData.institution}`,
        inquiryType: 'early_access'
      });
      
      if (response.data.success) {
        setSubmitted(true);
        toast.success('Successfully joined the waitlist! We\'ll be in touch soon.');
        setFormData({
          name: '',
          email: '',
          institution: ''
        });
      } else {
        setError(response.data.message || 'Failed to submit request. Please try again.');
        toast.error(response.data.message || 'Failed to submit request. Please try again.');
      }
    } catch (error) {
      console.error('Early access sign up error:', error);
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDialog = (type: 'terms' | 'privacy') => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <section id="signup" className="py-20 relative overflow-hidden">
      {/* ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-gray-900 dark:to-indigo-950">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl dark:from-purple-900/20 dark:to-pink-900/20"></div>
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20"></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left section: Content */}
          <motion.div 
            className="w-full lg:w-1/2 max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 mb-6 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full"
            >
              Limited Early Access
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join the Campus Revolution
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Be among the first students to access our platform. Connect with peers, 
              showcase your projects, and discover opportunities all in one place.
            </motion.p>
            
            <motion.ul
              className="mb-8 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              {[
                'Exclusive beta access to all premium features',
                'Priority support and feature requests',
                'Connect with our network of mentors and alumni',
                'Free invitation to our virtual launch event'
              ].map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start" 
                  variants={fadeIn}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          {/* Right section: Sign up form */}
          <motion.div 
            className="w-full lg:w-1/2 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {!submitted ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get Early Access</h3>
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <motion.input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name" 
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <motion.input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.xyz" 
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution</label>
                      <motion.input 
                        type="text" 
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="Enter your institution"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        required
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    
                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    
                    <motion.button 
                      type="submit"
                      className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex justify-center items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Join the Waitlist'
                      )}
                    </motion.button>
                  </motion.form>
                </>
              ) : (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You&apos;re on the list!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We&apos;ve added {formData.email ? formData.email : 'your email'} to our waitlist. We&apos;ll notify you when it&apos;s your turn to join.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  >
                    Add another email
                  </button>
                </motion.div>
              )}
            </motion.div>
            
            <motion.p 
              className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              By signing up, you agree to our <a href="#" onClick={(e) => {
                e.preventDefault();
                openDialog('terms');
              }} className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms</a> and <a href="#" onClick={(e) => {
                e.preventDefault();
                openDialog('privacy');
              }} className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>.
            </motion.p>
          </motion.div>
        </div>
      </div>
      <LegalDialog isOpen={dialogOpen} type={dialogType} onClose={() => setDialogOpen(false)} />
    </section>
  );
};

export default SignUpSection;
