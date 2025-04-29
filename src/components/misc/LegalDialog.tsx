import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

const LegalDialog: React.FC<LegalDialogProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const title = type === 'terms' ? 'Terms and Conditions' : 'Privacy Policy';
  const content = type === 'terms' ? termsContent : privacyContent;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby={`${type}-modal`} role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <div className="flex min-h-full items-center justify-center p-4 text-center relative z-20">
            {/* Modal panel */}
            <motion.div
              className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white" id="modal-title">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-2 max-h-[70vh] overflow-y-auto pr-2 text-gray-700 dark:text-gray-300">
                {content}
              </div>
              
              <div className="mt-6 flex justify-end">
                <motion.button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  I Understand
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const termsContent = (
  <div className="space-y-4">
    <p className="mb-4">
      Welcome to Campus Connect! These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Campus Connect mobile and web application (&quot;App&quot;). By registering or using the App, you agree to these Terms.
    </p>
    
    <h4 className="text-lg font-semibold">1. Eligibility</h4>
    <p>
      You must be a student, alumni, faculty member, or verified campus user to access Campus Connect. You represent that the information you provide is accurate and truthful.
    </p>
    
    <h4 className="text-lg font-semibold">2. User Conduct</h4>
    <p>
      You agree not to:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Post harmful, abusive, or misleading content</li>
      <li>Impersonate another individual or misrepresent your identity</li>
      <li>Upload copyrighted or plagiarized content without permission</li>
      <li>Violate any laws or regulations</li>
    </ul>
    
    <h4 className="text-lg font-semibold">3. Content Ownership</h4>
    <p>
      Users retain ownership of the content they post (e.g., projects, portfolios), but grant Campus Connect a non-exclusive, royalty-free license to use, display, and share that content within the app ecosystem for promotional and functional purposes.
    </p>
    
    <h4 className="text-lg font-semibold">4. Termination</h4>
    <p>
      We may suspend or terminate your account at any time for violating these Terms or engaging in activities that harm the platform or its users.
    </p>
    
    <h4 className="text-lg font-semibold">5. Disclaimer</h4>
    <p>
      Campus Connect is provided &quot;as is.&quot; We are not liable for any direct or indirect damages arising from the use of this platform.
    </p>
    
    <h4 className="text-lg font-semibold">6. Modifications</h4>
    <p>
      We reserve the right to update these Terms at any time. Continued use of the app constitutes acceptance of the revised Terms.
    </p>
  </div>
);

const privacyContent = (
  <div className="space-y-4">
    <div className="flex items-center space-x-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      <span className="text-lg font-semibold">Privacy Policy – Campus Connect</span>
    </div>
    <p className="italic text-sm">Effective Date: April 30, 2025</p>
    
    <p>This Privacy Policy explains how we collect, use, and protect your information.</p>
    
    <h4 className="text-lg font-semibold">1. Information We Collect</h4>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>Personal Information:</strong> Name, email, phone number, college name, profile picture.</li>
      <li><strong>Usage Data:</strong> Interactions with the app, project uploads, messages.</li>
      <li><strong>Device Info:</strong> Device type, IP address, OS details.</li>
    </ul>
    
    <h4 className="text-lg font-semibold">2. How We Use Your Data</h4>
    <p>We use the information to:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Enable core features (profiles, messaging, project sharing)</li>
      <li>Match students with similar interests</li>
      <li>Improve the user experience</li>
      <li>Prevent fraud and maintain platform integrity</li>
    </ul>
    
    <h4 className="text-lg font-semibold">3. Data Sharing</h4>
    <p>
      We do not sell your personal data. Data may be shared with:
    </p>
    <ul className="list-disc pl-5 space-y-1">
      <li>Educational institutions (for verifications)</li>
      <li>Service providers (cloud, analytics)</li>
      <li>Legal authorities if required</li>
    </ul>
    
    <h4 className="text-lg font-semibold">4. Data Security</h4>
    <p>
      We implement strong security measures including encryption and limited access controls. However, no system is completely secure.
    </p>
    
    <h4 className="text-lg font-semibold">5. Your Rights</h4>
    <p>You can request to:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>View or update your data</li>
      <li>Delete your account</li>
      <li>Withdraw consent</li>
    </ul>
    
    <h4 className="text-lg font-semibold">6. Children&apos;s Privacy</h4>
    <p>
      The app is intended for users aged 16 and above. If you are under this age, you must have parental consent.
    </p>
    
    <h4 className="text-lg font-semibold">7. Contact</h4>
    <p>
      For any questions, reach out to us at <a href="mailto:ravi.crewsity@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">ravi.crewsity@gmail.com</a>
    </p>
  </div>
);

export default LegalDialog;