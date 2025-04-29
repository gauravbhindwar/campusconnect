import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

// Move viewport to its own export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Crewsity Connect | Showcase, Collaborate and Grow",
  description: "The platform for student innovators to showcase, collaborate and grow. Join Crewsity Connect to build your portfolio, find teammates, and access opportunities.",
  keywords: [
    "Crewsity",
    "Crewsity Connect",
    "student platform",
    "campus connect",
    "student projects",
    "hackathons",
    "student collaboration",
    "campus ambassador",
    "education",
    "student innovation",
    "project showcase",
    "collaborate",
    "find teammates",
    "project portfolio",
    "student opportunities",
    "Ravi",
    "Crewsity Team",
    "Gaurav",
    "Bhindwar"
  ],
  authors: [{ name: "Crewsity", url: "https://crewsity.com" }],
  creator: "Crewsity Team",
  publisher: "Crewsity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crewsity.com",
    siteName: "Crewsity Connect",
    title: "Crewsity Connect | Showcase, Collaborate and Grow",
    description: "The platform for student innovators to showcase, collaborate and grow.",
    images: [
      {
        url: "/images/og-image.png", // Updated path to use the generated image
        width: 1200,
        height: 630,
        alt: "Crewsity Connect - The student innovation platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crewsity Connect | Showcase, Collaborate and Grow",
    description: "The platform for student innovators to showcase projects, find teammates, and grow their skills.",
    creator: "@crewsity",
    images: ["/images/twitter-image.png"], // Updated path
  },
  icons: {
    icon: [
      { url: "/images/favicon-32x32.png", sizes: "32x32" },
      { url: "/images/favicon-16x16.png", sizes: "16x16" }
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180" }
    ],
    shortcut: "/images/favicon.ico",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://crewsity.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://crewsity.com/",
              "name": "Crewsity Connect",
              "description": "The platform for student innovators to showcase, collaborate and grow.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://crewsity.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
