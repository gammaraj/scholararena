// FAQ Schema for Answer Engine Optimization (AEO)
// This structured data helps AI answer engines like Google AI Overview, Perplexity, etc.

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ScholarArena?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScholarArena is an upcoming digital platform for academic competition management. It is designed to serve debate competitions, academic bowls, olympiads, and knowledge competitions. Built on Brakto\'s proven infrastructure, it will feature four specialized portals for parents, students, teachers, and organization administrators.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of academic competitions does ScholarArena support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScholarArena will support History Bee, Science Bee, Geography Bee, Citizenship Bee, Academic Bowl competitions, debate tournaments, olympiads, and various knowledge-based competitions across multiple academic subjects including history, science, geography, civics, mathematics, and humanities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the four portals in ScholarArena?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScholarArena features four specialized portals: 1) Parent Portal (COPPA-compliant for minor registration), 2) Student Portal (ages 14+ for self-registration and tracking), 3) Teacher Portal (bulk registration and team management), and 4) Organization Admin Portal (event creation, registration processing, and reporting).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ScholarArena COPPA compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, ScholarArena\'s Parent Portal is designed to be COPPA-compliant, requiring parental consent for registering minor children (under 13). Students aged 14 and above can use the separate Student Portal for self-registration.',
      },
    },
    {
      '@type': 'Question',
      name: 'When will ScholarArena launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScholarArena is currently in development. We are building the platform with a coming soon status. Interested organizations can join our waitlist to be notified when we launch and receive early access information.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Brakto and how is it related to ScholarArena?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brakto is a proven tournament management infrastructure platform. ScholarArena is built on Brakto\'s infrastructure, leveraging its reliability and scalability while focusing specifically on academic competitions. Brakto.com handles sports tournament management, while ScholarArena focuses on academic competitions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I join the ScholarArena waitlist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can join the ScholarArena waitlist by visiting scholararena.com and clicking the "Join Waitlist" button. For partnership opportunities or enterprise inquiries, contact us at info@scholararena.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What features will ScholarArena offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScholarArena will offer multi-organization architecture, qualification intelligence (tracking Regional → National → International pathways), real-time operations with QR check-in, live scoring, room assignments, enterprise-grade reliability with 99.9% uptime SLA, SOC 2 Type II compliance, automatic backups, and dedicated support.',
      },
    },
  ],
}

export default faqSchema
