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
        text: 'ScholarArena is an online academic competition platform that hosts the ORQE — Online Regional Qualifying Exam — for Science Bee, History Bee, and Geography Bee. Students in grades 4 through 12 can take free online qualifying exams to compete for spots in regional and national academic competitions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ORQE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ORQE (Online Regional Qualifying Exam) is a free online exam administered by ScholarArena that qualifies students for Science Bee, History Bee, and Geography Bee competitions. Students answer 50 multiple-choice questions within a 20-minute time limit. A score of 70% or higher earns qualification. The exam is open to students in grades 4 through 12, automatically placed into grade bands: 4th & Under, 5th–6th, 7th–8th, or 9th–12th.',
      },
    },
    {
      '@type': 'Question',
      name: 'What subjects are available in the ORQE qualifying exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The ORQE currently offers qualifying exams for three subjects: Science Bee (covering biology, chemistry, physics, earth science, astronomy, and mathematics), History Bee (covering U.S. and world history), and Geography Bee (covering world geography, capitals, and physical features).',
      },
    },
    {
      '@type': 'Question',
      name: 'What grades are eligible to take the ORQE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students in grades 4 through 12 are eligible to take the ORQE. Students are automatically placed into one of four grade bands based on their current grade: 4th Grade & Under, 5th–6th Grade, 7th–8th Grade, or 9th–12th Grade. Each grade band has its own set of questions appropriate to that level.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I take the ORQE online qualifying exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To take the ORQE, go to scholararena.com/exam, enter your name, email address, current grade, and select your subject (Science, History, or Geography). The exam consists of 50 multiple-choice questions with a 20-minute time limit. Your result is shown immediately after submission. A score of 70% or higher qualifies you for competition.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the ORQE free to take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the ORQE online qualifying exam on ScholarArena is completely free to take. There is no registration fee or subscription required to access or complete the qualifying exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'What score do I need to pass the ORQE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students need to score 70% or higher (35 out of 50 questions correct) to pass the ORQE and earn qualification for academic bee competitions. Results are displayed immediately upon exam submission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ScholarArena COPPA compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, ScholarArena\'s Parent Portal is COPPA-compliant, requiring parental consent for registering children under 13. Students aged 14 and above can use the Student Portal for self-registration. The ORQE exam itself collects only the minimum information necessary (name, email, grade, subject) to administer the qualifying exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the portals available on ScholarArena?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScholarArena features four portals: 1) Exam Portal — where students take the ORQE online qualifying exam at scholararena.com/exam; 2) Parent Portal — COPPA-compliant portal for parents to register and manage their children; 3) Teacher Portal — for bulk student registration and classroom management; and 4) Admin Portal — for organization administrators to manage events, registrations, and results.',
      },
    },
    {
      '@type': 'Question',
      name: 'What academic competitions can I qualify for through ScholarArena?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Through the ORQE on ScholarArena, students can qualify for Science Bee, History Bee, and Geography Bee regional and national competitions. The platform is designed to support the full competition pathway from online qualifying exams through regional, national, and international academic competitions.',
      },
    },
  ],
}

export default faqSchema
