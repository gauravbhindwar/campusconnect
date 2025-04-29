'use client';
import { useEffect } from 'react';
import { 
  HeaderSection,
  WhySection,
  FeaturesSection,
  StudentSuccessSection,
  // TestimonialsSection,
  // StatsSection,
  SignUpSection,
  CampusAmbassadorSection,
  // TrustedBySection,
  AboutUsSection,
  FooterSection
} from '../Landing';
import { AnimatePresence } from 'framer-motion';

const HomePage = () => {
   // Add smooth scrolling behavior
   useEffect(() => {
    // Add smooth scrolling for anchor links that target page sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if this is an empty href or not a proper section ID
        if (!href || href === "#") return;
        
        try {
          // Only proceed if we can find a matching element 
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        } catch (error) {
          console.warn("Skipping invalid selector:", href);
        }
      });
    });
    
    // Cleanup event listeners on unmount
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', null);
      });
    };
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <AnimatePresence>
        <HeaderSection key="header-section" />
        <WhySection key="why-section" />
        <FeaturesSection key="features-section" />
        <StudentSuccessSection key="student-success-section" />
        {/* <TestimonialsSection key="testimonials-section" /> */}
        {/* <StatsSection key="stats-section" /> */}
        <SignUpSection key="signup-section" />
        <CampusAmbassadorSection key="campus-ambassador-section" />
        {/* <TrustedBySection key="trusted-by-section" /> */}
        <AboutUsSection key="about-us-section" />
        <FooterSection key="footer-section" />
      </AnimatePresence>
    </div>
  );
}

export default HomePage
