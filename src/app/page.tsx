import type { Metadata } from 'next';
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
  },
  robots: {
    index: true,
    follow: true,
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
      
      {/* Website structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://crewsity.com",
            "name": "Crewsity Connect",
            "description": "Platform for students to collaborate, find projects, and connect with alumni.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://crewsity.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      <HomePage/>
      {/* <HeaderSection />
      <FeaturesSection />
      <AboutUsSection />
      <CampusAmbassadorSection />
      <FooterSection /> */}
    </main>
  );
}