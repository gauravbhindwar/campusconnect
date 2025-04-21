'use client';
import { useEffect } from 'react';
import { 
  HeaderSection,
  WhySection,
  FeaturesSection,
  StudentSuccessSection,
  TestimonialsSection,
  StatsSection,
  SignUpSection,
  CampusAmbassadorSection,
  TrustedBySection,
  AboutUsSection,
  FooterSection
} from '../Landing';
import { AnimatePresence } from 'framer-motion';

const HomePage = () => {
   // Add smooth scrolling behavior
   useEffect(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <AnimatePresence>
        <HeaderSection key="header-section" />
        <WhySection key="why-section" />
        <FeaturesSection key="features-section" />
        <StudentSuccessSection key="student-success-section" />
        <TestimonialsSection key="testimonials-section" />
        <StatsSection key="stats-section" />
        <SignUpSection key="signup-section" />
        <CampusAmbassadorSection key="campus-ambassador-section" />
        <TrustedBySection key="trusted-by-section" />
        <AboutUsSection key="about-us-section" />
        <FooterSection key="footer-section" />
      </AnimatePresence>
    </div>
  );
}

export default HomePage
