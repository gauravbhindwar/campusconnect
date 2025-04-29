import React from 'react';

interface OrganizationStructuredDataProps {
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  description: string;
}

export const OrganizationStructuredData = ({
  name,
  url,
  logo,
  sameAs,
  description
}: OrganizationStructuredDataProps) => {
  const orgData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    sameAs,
    description
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
    />
  );
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  items: FAQItem[];
}

export const FAQStructuredData = ({ items }: FAQStructuredDataProps) => {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
};

interface WebPageStructuredDataProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export const WebPageStructuredData = ({
  title,
  description,
  url,
  datePublished,
  dateModified
}: WebPageStructuredDataProps) => {
  const webpageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageData) }}
    />
  );
};
