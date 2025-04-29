import React from 'react';

type OrganizationProps = {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  description?: string;
};

type FAQItemProps = {
  question: string;
  answer: string;
};

export const OrganizationStructuredData = ({
  name,
  url,
  logo,
  sameAs = [],
  description,
}: OrganizationProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    sameAs,
    ...(description && { description }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const FAQStructuredData = ({ items }: { items: FAQItemProps[] }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const BreadcrumbStructuredData = ({
  items,
}: {
  items: { name: string; item: string }[];
}) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default {
  OrganizationStructuredData,
  FAQStructuredData,
  BreadcrumbStructuredData,
};
