// User roles for the platform
export type UserRole = 'parent' | 'student' | 'teacher' | 'admin';

// User profile
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
}

// Parent-specific profile
export interface Parent extends User {
  role: 'parent';
  phone: string;
  children: Student[];
}

// Student profile
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  grade: number;
  schoolId?: string;
  parentId?: string;
  email?: string; // For students 14+
  createdAt: Date;
}

// School/Institution
export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Competition types
export type CompetitionType = 
  | 'history-bee' 
  | 'history-bowl' 
  | 'geography-bee' 
  | 'science-bee' 
  | 'model-un'
  | 'shg-bee'; // Science, History, Geography combined

export type QuestionSet = 'Red' | 'White' | 'Blue' | 'Gold' | 'A' | 'B' | 'C';

export type Division = 
  | 'Varsity' 
  | 'Junior Varsity' 
  | 'Middle School'
  | 'Grade 8'
  | 'Grade 7'
  | 'Grade 6'
  | 'Grade 5'
  | 'Grade 4 and Under'
  | 'Elementary';

export type CoppaVerificationMethod =
  | 'credit-card'
  | 'government-id'
  | 'signed-form'
  | 'knowledge-based';

export type CoppaAgeBand = 'under-13' | '13-17' | '18-plus';

export interface CoppaConsentRecord {
  required: boolean;
  parentalTrackingRequired: boolean;
  granted: boolean;
  trackingAcknowledged: boolean;
  studentAge: number;
  studentAgeBand: CoppaAgeBand;
  grantedAt: Date;
  verifiedBy?: CoppaVerificationMethod;
  consentTextVersion: string;
}

// Event/Competition
export interface Event {
  id: string;
  name: string;
  competitionType: CompetitionType;
  questionSet: QuestionSet;
  division: Division;
  date: Date;
  location: string;
  capacity: number;
  registrationDeadline: Date;
  registrationFee: number;
  currentRegistrations: number;
  status: 'open' | 'closed' | 'waitlist' | 'completed';
  description: string;
  // Multi-bee options (for SHG combined events)
  availableBees?: ('science' | 'history' | 'geography')[];
  // Written exam options
  writtenExams?: string[];
  // Available question sets for this event
  availableQuestionSets?: QuestionSet[];
}

// Registration
export interface Registration {
  id: string;
  studentId: string;
  student: Student;
  eventId: string;
  event: Event;
  registeredBy: string; // User ID (parent, teacher, or self)
  registeredAt: Date;
  status: 'confirmed' | 'waitlist' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  checkInStatus: 'not-checked-in' | 'checked-in';
  checkInTime?: Date;
  qrCode: string;
  // For multi-bee events
  selectedBees?: ('science' | 'history' | 'geography')[];
  selectedExams?: string[];
  selectedQuestionSet?: QuestionSet;
  coppaConsent?: CoppaConsentRecord;
}

// Qualification record
export interface Qualification {
  id: string;
  studentId: string;
  competitionType: CompetitionType;
  qualifiedFor: string; // Event name or level (e.g., "National Championship")
  qualifiedDate: Date;
  qualifyingScore?: number;
  used: boolean; // Whether they've registered for the qualified event
}

// Competition results
export interface Result {
  id: string;
  studentId: string;
  eventId: string;
  placement: number;
  score: number;
  medals?: string; // Gold, Silver, Bronze
  qualified?: boolean; // Did they qualify for next level?
}
