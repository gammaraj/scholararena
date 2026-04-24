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
  title: 'ScholarArena | Academic Competition Management Platform',
  description: 'The premier digital platform for academic competitions. Serving debate tournaments, academic bowls, olympiads, and knowledge competitions. Built on Brakto\'s proven infrastructure, trusted by organizations managing 190+ events and 12,000+ students annually.',
  keywords: ['academic competition platform', 'tournament management', 'history bee', 'science bee', 'geography bee', 'quiz bowl', 'debate tournaments', 'academic olympiad', 'competition software', 'B2B platform'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
