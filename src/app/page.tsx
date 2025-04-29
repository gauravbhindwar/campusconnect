import type { Metadata } from 'next';
// import HeaderSection from '../components/Landing/HeaderSection';
// import FeaturesSection from '../components/Landing/FeaturesSection';
// import AboutUsSection from '../components/Landing/AboutUsSection';
// import CampusAmbassadorSection from '../components/Landing/CampusAmbassadorSection';
// import FooterSection from '../components/Landing/FooterSection';
import { OrganizationStructuredData, FAQStructuredData } from '../components/SEO/StructuredData';
import HomePage from '../components/HomePage/HomePage';

export const metadata: Metadata = {
  title: 'Crewsity Connect | Student Innovation Platform',
  description: 'Crewsity Connect is the platform for student innovators to showcase projects, collaborate with peers, and grow their skills and opportunities. Join our community to expand your network and find new opportunities.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Crewsity Connect | Student Innovation Platform',
    description: 'Crewsity Connect is the platform for student innovators to showcase projects, collaborate with peers, and grow their skills and opportunities.',
    images: ['/images/og-image.png'],
  }
};

// Sample FAQ data for structured data
const faqItems = [
  {
    question: "What is Crewsity Connect?",
    answer: "Crewsity Connect is a platform designed for student innovators to showcase their projects, collaborate with peers, and access growth opportunities in the academic ecosystem."
  },
  {
    question: "How can I become a Campus Ambassador?",
    answer: "You can apply to become a Campus Ambassador through our dedicated application form. As an ambassador, you'll represent Crewsity Connect at your college, organize tech events, and gain access to exclusive perks."
  },
  {
    question: "Is Crewsity Connect free to use?",
    answer: "Yes, Crewsity Connect offers a free tier with essential features for students. Premium features may be available through educational partnerships."
  },
  {
    question: "How can my college partner with Crewsity Connect?",
    answer: "Colleges can partner with Crewsity Connect by contacting our team. We offer special programs for educational institutions to enhance student collaboration and project visibility."
  }
];

export default function Home() {
  return (
    <main>
      {/* Add structured data for SEO */}
      <OrganizationStructuredData
        name="Crewsity Connect"
        url="https://crewsity.com"
        logo="https://crewsity.com/crewsity.svg"
        sameAs={[
          "https://www.linkedin.com/company/crewsity/",
          "https://www.instagram.com/crewsity/",
          "https://twitter.com/crewsity"
        ]}
        description="The platform for student innovators to showcase, collaborate and grow."
      />
      
      <FAQStructuredData items={faqItems} />
      <HomePage/>
      {/* <HeaderSection />
      <FeaturesSection />
      <AboutUsSection />
      <CampusAmbassadorSection />
      <FooterSection /> */}
    </main>
  );
}