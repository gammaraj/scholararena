import { User, Student, School, Event, Registration, Qualification, Result } from './types';

const REGISTRATION_STORAGE_KEY = 'scholararena-registrations';

// Mock users for demo
export const mockUsers: User[] = [
  {
    id: 'parent-1',
    email: 'parent@demo.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'parent',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'student-1',
    email: 'michael.smith@email.com',
    firstName: 'Michael',
    lastName: 'Smith',
    role: 'student',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'teacher-1',
    email: 'teacher@demo.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: 'teacher',
    schoolId: 'school-001',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'admin-1',
    email: 'admin@demo.com',
    firstName: 'IAC',
    lastName: 'Admin',
    role: 'admin',
    createdAt: new Date('2025-01-01'),
  },
];

// Mock students
export const mockStudents: Student[] = [
  {
    id: 'student-001',
    firstName: 'Emma',
    lastName: 'Smith',
    dateOfBirth: new Date('2012-05-15'),
    grade: 7,
    schoolId: 'school-001',
    parentId: 'parent-1',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'student-002',
    firstName: 'Michael',
    lastName: 'Smith',
    dateOfBirth: new Date('2009-08-22'),
    grade: 10,
    schoolId: 'school-001',
    parentId: 'parent-1',
    email: 'michael.smith@email.com',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'student-003',
    firstName: 'Sophia',
    lastName: 'Chen',
    dateOfBirth: new Date('2011-11-10'),
    grade: 8,
    schoolId: 'school-002',
    email: 'sophia.chen@email.com',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'student-004',
    firstName: 'Jackson',
    lastName: 'Williams',
    dateOfBirth: new Date('2013-03-18'),
    grade: 6,
    schoolId: 'school-001',
    parentId: 'parent-1',
    createdAt: new Date('2025-01-01'),
  },
  {
    id: 'student-005',
    firstName: 'Isabella',
    lastName: 'Rodriguez',
    dateOfBirth: new Date('2010-07-25'),
    grade: 9,
    schoolId: 'school-002',
    email: 'isabella.rodriguez@email.com',
    createdAt: new Date('2025-01-01'),
  },
];

// Mock schools
export const mockSchools: School[] = [
  {
    id: 'school-001',
    name: 'Lincoln Middle School',
    address: '123 Education Lane',
    city: 'College Park',
    state: 'MD',
    zipCode: '20740',
  },
  {
    id: 'school-002',
    name: 'Thomas Jefferson High School for Science & Technology',
    address: '6560 Braddock Road',
    city: 'Alexandria',
    state: 'VA',
    zipCode: '22312',
  },
  {
    id: 'school-003',
    name: 'Montgomery Blair High School',
    address: '51 University Blvd East',
    city: 'Silver Spring',
    state: 'MD',
    zipCode: '20901',
  },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: 'event-shg-001',
    name: 'National Science, History & Geography Bee Championship 2026',
    competitionType: 'shg-bee',
    questionSet: 'Red', // Default, but multiple available
    division: 'Varsity',
    date: new Date('2026-11-15'),
    location: 'Washington, DC - Walter E. Washington Convention Center',
    capacity: 500,
    registrationDeadline: new Date('2026-10-30'),
    registrationFee: 130,
    currentRegistrations: 498,
    status: 'open',
    description: 'Our biggest competition! Students can register for 1, 2, or all 3 Bees (Science, History, Geography). All grade levels welcome with divisions: Varsity, JV, Grade 8, 7, 6, 5, and 4 & Under. Register for up to 12 different written exams. Top 1/2 qualify for Nationals, Top 1/3 qualify for Internationals. Choose from 4 Question Sets (Red, White, Blue, Gold) - students can compete up to 4 times!',
    availableBees: ['science', 'history', 'geography'],
    writtenExams: [
      'World History Exam',
      'U.S. History Exam',
      'Ancient Civilizations Exam',
      'Modern History Exam',
      'Biology Exam',
      'Chemistry Exam',
      'Physics Exam',
      'Earth Science Exam',
      'World Geography Exam',
      'U.S. Geography Exam',
      'Physical Geography Exam',
      'Cultural Geography Exam'
    ],
    availableQuestionSets: ['Red', 'White', 'Blue', 'Gold'],
  },
  {
    id: 'event-001',
    name: 'Maryland Regional History Bee 2026',
    competitionType: 'history-bee',
    questionSet: 'C',
    division: 'Middle School',
    date: new Date('2026-09-15'),
    location: 'University of Maryland, College Park, MD',
    capacity: 120,
    registrationDeadline: new Date('2026-09-03'),
    registrationFee: 75,
    currentRegistrations: 118,
    status: 'open',
    description: 'Individual competition testing knowledge of U.S. and world history. Top 1/2 qualify for Nationals, top 1/3 qualify for Internationals.',
  },
  {
    id: 'event-002',
    name: 'Maryland Regional History Bowl 2026',
    competitionType: 'history-bowl',
    questionSet: 'B',
    division: 'Varsity',
    date: new Date('2026-09-16'),
    location: 'University of Maryland, College Park, MD',
    capacity: 32,
    registrationDeadline: new Date('2026-09-04'),
    registrationFee: 200,
    currentRegistrations: 32,
    status: 'open',
    description: 'Team-based quiz bowl competition. Teams of 4 players compete in 5 matches. Top 1/2 qualify for Nationals.',
  },
  {
    id: 'event-003',
    name: 'Varsity & JV National Championships 2026',
    competitionType: 'history-bee',
    questionSet: 'A',
    division: 'Varsity',
    date: new Date('2027-04-25'),
    location: 'Arlington, VA',
    capacity: 200,
    registrationDeadline: new Date('2027-04-10'),
    registrationFee: 150,
    currentRegistrations: 198,
    status: 'open',
    description: 'National championship for qualified students. Five Bee events, Three Bowl events, and twelve written exams. Stay-to-play requirement applies. Top half qualify for Internationals.',
  },
  {
    id: 'event-004',
    name: 'Virginia Regional Science Bee 2026',
    competitionType: 'science-bee',
    questionSet: 'Red',
    division: 'Junior Varsity',
    date: new Date('2026-10-20'),
    location: 'Richmond Convention Center, VA',
    capacity: 100,
    registrationDeadline: new Date('2026-10-08'),
    registrationFee: 80,
    currentRegistrations: 98,
    status: 'waitlist',
    description: 'Individual science competition covering biology, chemistry, physics, and earth science. Top 1/2 qualify for Nationals.',
  },
  {
    id: 'event-005',
    name: 'National Geography Bee - Mid-Atlantic Regional',
    competitionType: 'geography-bee',
    questionSet: 'Blue',
    division: 'Grade 7',
    date: new Date('2026-11-05'),
    location: 'Philadelphia Convention Center, PA',
    capacity: 150,
    registrationDeadline: new Date('2026-10-24'),
    registrationFee: 70,
    currentRegistrations: 148,
    status: 'open',
    description: 'Geography knowledge competition for 7th graders. Can register for up to 3 Bees and 12 written exams. Top 1/2 qualify for Nationals.',
  },
  {
    id: 'event-006',
    name: 'Middle & Elementary National Championships 2027',
    competitionType: 'shg-bee',
    questionSet: 'Gold',
    division: 'Grade 8',
    date: new Date('2027-05-29'),
    location: 'Orlando, FL',
    capacity: 300,
    registrationDeadline: new Date('2027-05-15'),
    registrationFee: 175,
    currentRegistrations: 296,
    status: 'open',
    description: 'Memorial Day national championship. Ten Bee events, Two Bowl events, 24 written exams, eight Model UN events. Divisions for grades 8, 7, 6, 5, 4 and under. Top half qualify for Internationals.',
  },
  {
    id: 'event-007',
    name: 'Model UN Regional Competition',
    competitionType: 'model-un',
    questionSet: 'A',
    division: 'Middle School',
    date: new Date('2026-12-12'),
    location: 'Washington, DC',
    capacity: 80,
    registrationDeadline: new Date('2026-11-30'),
    registrationFee: 90,
    currentRegistrations: 78,
    status: 'open',
    description: 'Model United Nations debate competition. Morning and afternoon committee sessions. Can register for up to 6 written exams. Top students qualify for Nationals.',
  },
  {
    id: 'event-008',
    name: 'International Geography Championships 2026',
    competitionType: 'geography-bee',
    questionSet: 'Gold',
    division: 'Varsity',
    date: new Date('2026-07-15'),
    location: 'International Location TBA',
    capacity: 250,
    registrationDeadline: new Date('2026-06-30'),
    registrationFee: 500,
    currentRegistrations: 245,
    status: 'open',
    description: 'International championship for top qualified students. Flat fee includes student program. Friends and Family program available separately. Must have qualified at Nationals.',
  },
  {
    id: 'event-009',
    name: 'Spring Regional Championships 2026 - Northeast',
    competitionType: 'shg-bee',
    questionSet: 'Blue',
    division: 'Varsity',
    date: new Date('2026-03-20'),
    location: 'Boston, MA',
    capacity: 400,
    registrationDeadline: new Date('2026-03-05'),
    registrationFee: 125,
    currentRegistrations: 385,
    status: 'completed',
    description: 'Major regional event covering all three Bees plus written exams.',
  },
  {
    id: 'event-010',
    name: 'Spring Regional Championships 2026 - Southeast',
    competitionType: 'shg-bee',
    questionSet: 'White',
    division: 'Varsity',
    date: new Date('2026-03-22'),
    location: 'Atlanta, GA',
    capacity: 450,
    registrationDeadline: new Date('2026-03-07'),
    registrationFee: 125,
    currentRegistrations: 438,
    status: 'completed',
    description: 'Major regional event covering all three Bees plus written exams.',
  },
  {
    id: 'event-011',
    name: 'Spring Regional Championships 2026 - Midwest',
    competitionType: 'shg-bee',
    questionSet: 'Red',
    division: 'Varsity',
    date: new Date('2026-03-23'),
    location: 'Chicago, IL',
    capacity: 420,
    registrationDeadline: new Date('2026-03-08'),
    registrationFee: 125,
    currentRegistrations: 412,
    status: 'completed',
    description: 'Major regional event covering all three Bees plus written exams.',
  },
  {
    id: 'event-012',
    name: 'Spring Regional Championships 2026 - West',
    competitionType: 'shg-bee',
    questionSet: 'Gold',
    division: 'Varsity',
    date: new Date('2026-03-24'),
    location: 'Los Angeles, CA',
    capacity: 480,
    registrationDeadline: new Date('2026-03-09'),
    registrationFee: 125,
    currentRegistrations: 475,
    status: 'completed',
    description: 'Major regional event covering all three Bees plus written exams.',
  },
  {
    id: 'event-013',
    name: 'Winter History & Geography Regional 2026',
    competitionType: 'history-bee',
    questionSet: 'A',
    division: 'Middle School',
    date: new Date('2026-02-15'),
    location: 'Multiple Locations',
    capacity: 600,
    registrationDeadline: new Date('2026-02-01'),
    registrationFee: 85,
    currentRegistrations: 587,
    status: 'completed',
    description: 'Large-scale regional event held simultaneously at multiple locations across the country.',
  },
  {
    id: 'event-014',
    name: 'Winter Science Bee Regional 2026',
    competitionType: 'science-bee',
    questionSet: 'B',
    division: 'Junior Varsity',
    date: new Date('2026-02-16'),
    location: 'Multiple Locations',
    capacity: 550,
    registrationDeadline: new Date('2026-02-02'),
    registrationFee: 85,
    currentRegistrations: 542,
    status: 'completed',
    description: 'Large-scale regional event held simultaneously at multiple locations across the country.',
  },
  {
    id: 'event-015',
    name: 'Fall National Championships 2025',
    competitionType: 'shg-bee',
    questionSet: 'A',
    division: 'Varsity',
    date: new Date('2025-11-18'),
    location: 'Washington, DC',
    capacity: 650,
    registrationDeadline: new Date('2025-11-03'),
    registrationFee: 180,
    currentRegistrations: 638,
    status: 'completed',
    description: 'Previous year major national championship. All three Bees, 15 written exams, 4 question sets.',
  },
  {
    id: 'event-016',
    name: 'Elementary & Middle School Nationals 2025',
    competitionType: 'shg-bee',
    questionSet: 'B',
    division: 'Grade 8',
    date: new Date('2025-12-05'),
    location: 'Orlando, FL',
    capacity: 700,
    registrationDeadline: new Date('2025-11-20'),
    registrationFee: 165,
    currentRegistrations: 685,
    status: 'completed',
    description: 'Large national championship for elementary and middle school divisions.',
  },
  {
    id: 'event-017',
    name: 'International History Bowl 2025',
    competitionType: 'history-bowl',
    questionSet: 'Gold',
    division: 'Varsity',
    date: new Date('2025-07-20'),
    location: 'Vienna, Austria',
    capacity: 180,
    registrationDeadline: new Date('2025-07-05'),
    registrationFee: 550,
    currentRegistrations: 172,
    status: 'completed',
    description: 'International team championship with teams from 25+ countries.',
  },
  {
    id: 'event-018',
    name: 'Summer Academic Championships 2025',
    competitionType: 'shg-bee',
    questionSet: 'C',
    division: 'Varsity',
    date: new Date('2025-08-12'),
    location: 'Multiple US Locations',
    capacity: 550,
    registrationDeadline: new Date('2025-07-28'),
    registrationFee: 140,
    currentRegistrations: 528,
    status: 'completed',
    description: 'Major summer event held at 8 regional sites simultaneously nationwide.',
  },
];

// Mock registrations
export const mockRegistrations: Registration[] = [
  {
    id: 'reg-shg-001',
    studentId: 'student-001',
    student: mockStudents[0],
    eventId: 'event-shg-001',
    event: mockEvents[0],
    registeredBy: 'parent-1',
    registeredAt: new Date('2026-04-18'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-SHG-2026-DC-001-EMMA-SMITH',
    selectedBees: ['history', 'geography'],
    selectedExams: ['World History Exam', 'U.S. Geography Exam', 'Cultural Geography Exam'],
    selectedQuestionSet: 'Blue',
  },
  {
    id: 'reg-shg-002',
    studentId: 'student-002',
    student: mockStudents[1],
    eventId: 'event-shg-001',
    event: mockEvents[0],
    registeredBy: 'parent-1',
    registeredAt: new Date('2026-04-18'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-SHG-2026-DC-002-MICHAEL-SMITH',
    selectedBees: ['science', 'history', 'geography'],
    selectedExams: ['Biology Exam', 'Chemistry Exam', 'Physics Exam', 'World History Exam', 'U.S. History Exam'],
    selectedQuestionSet: 'Red',
  },
  {
    id: 'reg-001',
    studentId: 'student-001',
    student: mockStudents[0],
    eventId: 'event-001',
    event: mockEvents[1],
    registeredBy: 'parent-1',
    registeredAt: new Date('2026-04-20'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-HBE-2026-MD-001-EMMA-SMITH',
  },
  {
    id: 'reg-002',
    studentId: 'student-002',
    student: mockStudents[1],
    eventId: 'event-002',
    event: mockEvents[2],
    registeredBy: 'parent-1',
    registeredAt: new Date('2026-04-21'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-HBW-2026-MD-002-MICHAEL-SMITH',
  },
  {
    id: 'reg-003',
    studentId: 'student-004',
    student: mockStudents[3],
    eventId: 'event-005',
    event: mockEvents[5],
    registeredBy: 'parent-1',
    registeredAt: new Date('2026-04-22'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-GBE-2026-PA-003-JACKSON-WILLIAMS',
  },
  {
    id: 'reg-004',
    studentId: 'student-002',
    student: mockStudents[1],
    eventId: 'event-003',
    event: mockEvents[3],
    registeredBy: 'student-002',
    registeredAt: new Date('2026-04-15'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-NAT-2027-VA-004-MICHAEL-SMITH',
  },
  {
    id: 'reg-005',
    studentId: 'student-003',
    student: mockStudents[2],
    eventId: 'event-006',
    event: mockEvents[6],
    registeredBy: 'student-003',
    registeredAt: new Date('2026-04-18'),
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-NAT-2027-FL-005-SOPHIA-CHEN',
  },
  {
    id: 'reg-006',
    studentId: 'student-005',
    student: mockStudents[4],
    eventId: 'event-004',
    event: mockEvents[4],
    registeredBy: 'student-005',
    registeredAt: new Date('2026-04-23'),
    status: 'waitlist',
    paymentStatus: 'paid',
    checkInStatus: 'not-checked-in',
    qrCode: 'QR-SBE-2026-VA-006-ISABELLA-RODRIGUEZ',
  },
];

// Mock qualifications
export const mockQualifications: Qualification[] = [
  {
    id: 'qual-001',
    studentId: 'student-002',
    competitionType: 'geography-bee',
    qualifiedFor: 'Varsity & JV National Championships 2026',
    qualifiedDate: new Date('2026-03-15'),
    qualifyingScore: 88,
    used: true, // Already registered for event-003
  },
  {
    id: 'qual-002',
    studentId: 'student-003',
    competitionType: 'history-bee',
    qualifiedFor: 'Middle & Elementary National Championships 2027',
    qualifiedDate: new Date('2026-03-20'),
    qualifyingScore: 92,
    used: true, // Already registered for event-006
  },
  {
    id: 'qual-003',
    studentId: 'student-002',
    competitionType: 'history-bowl',
    qualifiedFor: 'International Geography Championships 2026',
    qualifiedDate: new Date('2026-04-26'),
    qualifyingScore: 95,
    used: false,
  },
  {
    id: 'qual-004',
    studentId: 'student-005',
    competitionType: 'science-bee',
    qualifiedFor: 'Varsity & JV National Championships 2026',
    qualifiedDate: new Date('2026-03-28'),
    qualifyingScore: 90,
    used: false,
  },
];

// Mock results (historical data from past competitions)
export const mockResults: Result[] = [
  {
    id: 'result-001',
    studentId: 'student-002',
    eventId: 'event-past-001',
    placement: 3,
    score: 88,
    medals: 'Bronze',
    qualified: true,
  },
  {
    id: 'result-002',
    studentId: 'student-002',
    eventId: 'event-past-002',
    placement: 1,
    score: 95,
    medals: 'Gold',
    qualified: true,
  },
  {
    id: 'result-003',
    studentId: 'student-003',
    eventId: 'event-past-003',
    placement: 2,
    score: 92,
    medals: 'Silver',
    qualified: true,
  },
  {
    id: 'result-004',
    studentId: 'student-001',
    eventId: 'event-past-004',
    placement: 5,
    score: 85,
    medals: undefined,
    qualified: true,
  },
  {
    id: 'result-005',
    studentId: 'student-005',
    eventId: 'event-past-005',
    placement: 4,
    score: 90,
    medals: undefined,
    qualified: true,
  },
];

// Helper functions for demo authentication
export const authenticateUser = (email: string): User | null => {
  return mockUsers.find(user => user.email === email) || null;
};

export const getStudentsByParent = (parentId: string): Student[] => {
  return mockStudents.filter(student => student.parentId === parentId);
};

const reviveRegistration = (registration: Registration): Registration => {
  const revived: Registration = {
    ...registration,
    registeredAt: new Date(registration.registeredAt),
    student: {
      ...registration.student,
      dateOfBirth: new Date(registration.student.dateOfBirth),
      createdAt: new Date(registration.student.createdAt),
    },
    event: {
      ...registration.event,
      date: new Date(registration.event.date),
      registrationDeadline: new Date(registration.event.registrationDeadline),
    },
  };

  if (registration.coppaConsent) {
    revived.coppaConsent = {
      ...registration.coppaConsent,
      grantedAt: new Date(registration.coppaConsent.grantedAt),
    };
  }

  return revived;
};

const hasWindow = () => typeof window !== 'undefined';

const saveRegistrations = (registrations: Registration[]) => {
  if (!hasWindow()) {
    return;
  }

  localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(registrations));
};

export const getAllRegistrations = (): Registration[] => {
  if (!hasWindow()) {
    return mockRegistrations.map(reviveRegistration);
  }

  const stored = localStorage.getItem(REGISTRATION_STORAGE_KEY);
  if (!stored) {
    const seedRegistrations = mockRegistrations.map(reviveRegistration);
    saveRegistrations(seedRegistrations);
    return seedRegistrations;
  }

  try {
    const parsed = JSON.parse(stored) as Registration[];
    return parsed.map(reviveRegistration);
  } catch {
    const seedRegistrations = mockRegistrations.map(reviveRegistration);
    saveRegistrations(seedRegistrations);
    return seedRegistrations;
  }
};

export const getRegistrationById = (registrationId: string): Registration | null => {
  return getAllRegistrations().find((registration) => registration.id === registrationId) ?? null;
};

export interface CreateRegistrationInput {
  studentId: string;
  eventId: string;
  registeredBy: string;
  selectedBees?: ('science' | 'history' | 'geography')[];
  selectedExams?: string[];
  selectedQuestionSet?: Event['questionSet'];
  coppaConsent?: Registration['coppaConsent'];
}

export const createRegistration = (input: CreateRegistrationInput): Registration => {
  const student = mockStudents.find((entry) => entry.id === input.studentId);
  const event = mockEvents.find((entry) => entry.id === input.eventId);

  if (!student || !event) {
    throw new Error('Could not create registration because student or event was not found.');
  }

  const status = event.status === 'waitlist' ? 'waitlist' : 'confirmed';
  const registration: Registration = {
    id: `reg-local-${Date.now()}`,
    studentId: student.id,
    student,
    eventId: event.id,
    event,
    registeredBy: input.registeredBy,
    registeredAt: new Date(),
    status,
    paymentStatus: 'pending',
    checkInStatus: 'not-checked-in',
    qrCode: `QR-${event.id.toUpperCase()}-${student.id.toUpperCase()}-${Date.now()}`,
    selectedBees: input.selectedBees,
    selectedExams: input.selectedExams,
    selectedQuestionSet: input.selectedQuestionSet,
    coppaConsent: input.coppaConsent,
  };

  const registrations = getAllRegistrations();
  registrations.unshift(registration);
  saveRegistrations(registrations);
  return registration;
};

export const getRegistrationsByStudent = (studentId: string): Registration[] => {
  return getAllRegistrations().filter(reg => reg.studentId === studentId);
};

export const getRegistrationsByEvent = (eventId: string): Registration[] => {
  return getAllRegistrations().filter(reg => reg.eventId === eventId);
};

export const getRegistrationsByParent = (parentId: string): Registration[] => {
  const childIds = getStudentsByParent(parentId).map((student) => student.id);
  return getAllRegistrations().filter((registration) => childIds.includes(registration.studentId));
};

export const getQualificationsByStudent = (studentId: string): Qualification[] => {
  return mockQualifications.filter(qual => qual.studentId === studentId);
};

export const getResultsByStudent = (studentId: string): Result[] => {
  return mockResults.filter(result => result.studentId === studentId);
};
