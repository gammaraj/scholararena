import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
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
  title: 'ScholarArena | Online Academic Qualifying Exams for Science, History & Geography Bee',
  description: 'Take the ORQE — Online Regional Qualifying Exam for Science Bee, History Bee, and Geography Bee. Free online exams for grades 4–12. Qualify for regional and national academic competitions.',
  keywords: [
    'ORQE online qualifying exam',
    'Science Bee qualifying exam',
    'History Bee qualifying exam',
    'Geography Bee qualifying exam',
    'academic bee online exam',
    'academic competition registration',
    'online qualifying exam grades 4-12',
    'academic competition platform',
    'history bee registration',
    'science bee registration',
    'geography bee registration',
    'academic olympiad online exam',
    'COPPA compliant student registration',
    'student academic competition',
    'school competition management',
    'academic bowl platform',
    'knowledge bee online test',
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
    title: 'ScholarArena | Online Academic Qualifying Exams — Science, History & Geography Bee',
    description: 'Take the ORQE — free online qualifying exams for Science Bee, History Bee, and Geography Bee. Open to grades 4–12. Qualify now at ScholarArena.',
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
    title: 'ScholarArena | Online Academic Qualifying Exams — Science, History & Geography Bee',
    description: 'Take the ORQE — free online qualifying exams for Science Bee, History Bee, and Geography Bee. Open to grades 4–12. Qualify now at ScholarArena.',
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
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'Online Academic Qualifying Exam Platform',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'ScholarArena hosts the ORQE — Online Regional Qualifying Exams for Science Bee, History Bee, and Geography Bee. Free online exams open to students in grades 4–12.',
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
      'ORQE Online Regional Qualifying Exam',
      'Science Bee Online Exam (Grades 4–12)',
      'History Bee Online Exam (Grades 4–12)',
      'Geography Bee Online Exam (Grades 4–12)',
      'Automatic Grade Band Assignment',
      'Instant Pass/Fail Results',
      'Parent Portal (COPPA-Compliant)',
      'Student Portal (Ages 14+)',
      'Teacher Portal',
      'Organization Admin Portal',
    ],
    potentialAction: {
      '@type': 'RegisterAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://scholararena.com/exam',
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
    description: 'ScholarArena hosts the ORQE — free online qualifying exams for Science Bee, History Bee, and Geography Bee, open to students in grades 4–12 across the United States.',
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
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
