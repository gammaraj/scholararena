import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://scholararena.com'),
  title: 'ScholarArena | Academic Competition Management Platform (Coming Soon)',
  description: 'An upcoming digital platform for academic competitions. Designed to serve debate competitions, academic bowls, olympiads, and knowledge competitions. Built on Brakto\'s proven infrastructure.',
  keywords: [
    'academic competition platform',
    'competition management software',
    'history bee platform',
    'science bee registration',
    'geography bee management',
    'quiz bowl software',
    'debate competition platform',
    'academic olympiad management',
    'tournament management system',
    'student competition platform',
    'COPPA compliant registration',
    'academic competition registration',
    'competition scoring software',
    'B2B education platform',
    'school competition management',
    'academic bowl platform',
    'knowledge competition software',
    'education technology',
    'edtech platform',
    'competition infrastructure'
  ],
  authors: [{ name: 'ScholarArena', url: 'https://scholararena.com' }],
  creator: 'ScholarArena',
  publisher: 'ScholarArena',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://scholararena.com',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ScholarArena | Academic Competition Management Platform (Coming Soon)',
    description: 'An upcoming digital platform for academic competitions. Built on Brakto\'s proven infrastructure. Join our waitlist for early access.',
    url: 'https://scholararena.com',
    siteName: 'ScholarArena',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ScholarArena - Academic Competition Management Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScholarArena | Academic Competition Management Platform (Coming Soon)',
    description: 'An upcoming digital platform for academic competitions. Built on Brakto\'s proven infrastructure. Join our waitlist for early access.',
    images: ['/og-image.svg'],
    creator: '@scholararena',
  },
  verification: {
    google: 'verification_token',
  },
  category: 'Education Technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ScholarArena',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Competition Management Software',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/PreOrder',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An upcoming digital platform for academic competitions. Designed to serve debate competitions, academic bowls, olympiads, and knowledge competitions.',
    url: 'https://scholararena.com',
    logo: 'https://scholararena.com/logo.svg',
    image: 'https://scholararena.com/og-image.svg',
    screenshot: 'https://scholararena.com/og-image.svg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '0',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Parent Portal (COPPA-Compliant)',
      'Student Portal (Ages 14+)',
      'Teacher Portal',
      'Organization Admin Portal',
      'Multi-Organization Architecture',
      'Qualification Intelligence',
      'Real-Time Operations',
      'Enterprise-Grade Reliability',
    ],
    potentialAction: {
      '@type': 'RegisterAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://scholararena.com',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ScholarArena',
    url: 'https://scholararena.com',
    logo: 'https://scholararena.com/logo.svg',
    description: 'Academic competition management platform built on Brakto\'s proven infrastructure',
    email: 'info@scholararena.com',
    foundingDate: '2026',
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ScholarArena',
    url: 'https://scholararena.com',
    description: 'Academic Competition Management Platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://scholararena.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
