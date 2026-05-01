import { CoppaAgeBand } from './types';

export const COPPA_CONSENT_TEXT_VERSION = 'v2026-05-parent-portal';

export function getStudentAge(dateOfBirth: Date): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  const birthdayHasPassed =
    monthDifference > 0 ||
    (monthDifference === 0 && today.getDate() >= dob.getDate());

  if (!birthdayHasPassed) {
    age -= 1;
  }

  return age;
}

export function getCoppaAgeBand(age: number): CoppaAgeBand {
  if (age < 13) {
    return 'under-13';
  }

  if (age <= 17) {
    return '13-17';
  }

  return '18-plus';
}

export function getCoppaBandLabel(ageBand: CoppaAgeBand): string {
  if (ageBand === 'under-13') {
    return 'Under 13';
  }

  if (ageBand === '13-17') {
    return 'Age 13-17';
  }

  return 'Age 18+';
}

export function getCoppaPolicySummary(ageBand: CoppaAgeBand): string {
  if (ageBand === 'under-13') {
    return 'Verifiable parental consent is required before processing student data.';
  }

  if (ageBand === '13-17') {
    return 'Parent/guardian authorization tracking is required and retained for audit records.';
  }

  return 'No parental COPPA consent requirement applies to this age band.';
}
