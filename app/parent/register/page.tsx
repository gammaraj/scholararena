'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createRegistration, getStudentsByParent, mockEvents } from '@/lib/mockData';
import {
  COPPA_CONSENT_TEXT_VERSION,
  getCoppaAgeBand,
  getCoppaBandLabel,
  getCoppaPolicySummary,
  getStudentAge,
} from '@/lib/coppa';
import { CoppaVerificationMethod, Event, Student } from '@/lib/types';

export default function ParentRegisterPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [confirmGuardian, setConfirmGuardian] = useState(false);
  const [confirmDataUse, setConfirmDataUse] = useState(false);
  const [confirmTeenTracking, setConfirmTeenTracking] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<CoppaVerificationMethod>('credit-card');

  useEffect(() => {
    if (!user || user.role !== 'parent') {
      router.push('/demo');
      return;
    }

    setEvents(mockEvents.filter(e => e.status === 'open' || e.status === 'waitlist'));
    const parentChildren = getStudentsByParent(user.id);
    setChildren(parentChildren);
    if (parentChildren.length > 0) {
      setSelectedChild(parentChildren[0].id);
    }
  }, [user, router]);

  const handleRegister = () => {
    if (!selectedChild || !selectedEvent) {
      alert('Please select both a child and an event');
      return;
    }

    if (coppaAgeBand === 'under-13' && (!confirmGuardian || !confirmDataUse)) {
      alert('COPPA consent is required. Please complete both parent consent confirmations.');
      return;
    }

    if (coppaAgeBand === '13-17' && !confirmTeenTracking) {
      alert('Parental authorization tracking is required for age 13-17 students.');
      return;
    }

    const studentAge = selectedChildAge ?? 0;
    const coppaConsent = {
      required: coppaAgeBand === 'under-13',
      parentalTrackingRequired: coppaAgeBand === '13-17',
      granted: coppaAgeBand === 'under-13' ? confirmGuardian && confirmDataUse : false,
      trackingAcknowledged: coppaAgeBand === '13-17' ? confirmTeenTracking : false,
      studentAge,
      studentAgeBand: coppaAgeBand,
      grantedAt: new Date(),
      verifiedBy: coppaAgeBand === 'under-13' ? verificationMethod : undefined,
      consentTextVersion: COPPA_CONSENT_TEXT_VERSION,
    };

    const registrationAuditPreview = {
      studentId: selectedChild,
      eventId: selectedEvent,
      coppaConsent,
    };
    console.log('Registration payload preview:', registrationAuditPreview);

    try {
      const registration = createRegistration({
        studentId: selectedChild,
        eventId: selectedEvent,
        registeredBy: user?.id ?? 'parent-unknown',
        coppaConsent,
      });

      router.push(`/parent/register/receipt/${registration.id}`);
    } catch (error) {
      console.error(error);
      alert('Unable to create registration. Please try again.');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const selectedChildProfile = children.find((child) => child.id === selectedChild);
  const selectedChildAge = selectedChildProfile ? getStudentAge(selectedChildProfile.dateOfBirth) : null;
  const coppaAgeBand = selectedChildAge !== null ? getCoppaAgeBand(selectedChildAge) : null;

  useEffect(() => {
    setConfirmGuardian(false);
    setConfirmDataUse(false);
    setConfirmTeenTracking(false);
  }, [selectedChild]);

  const getStatusBadge = (event: Event) => {
    if (event.status === 'waitlist') {
      return <Badge className="bg-accent/20 text-accent-foreground border-accent/30">Waitlist Available</Badge>;
    }
    const spotsLeft = event.capacity - event.currentRegistrations;
    if (spotsLeft < 10) {
      return <Badge className="bg-accent/20 text-accent-foreground border-accent/30">Only {spotsLeft} spots left</Badge>;
    }
    return <Badge className="bg-primary/10 text-primary border-primary/30">{spotsLeft} spots available</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Register for Competition</h1>
              <p className="text-sm text-slate-600">Select a child and event to register</p>
            </div>
            <Button variant="outline" onClick={() => router.push('/parent/dashboard')}>
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Selection */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Registration Details</h2>
              
              {/* Child Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Child
                </label>
                <select 
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm"
                >
                  {children.map(child => (
                    <option key={child.id} value={child.id}>
                      {child.firstName} {child.lastName} (Grade {child.grade})
                    </option>
                  ))}
                </select>
                {selectedChildProfile && (
                  <p className="mt-2 text-xs text-slate-600">
                    Age: {selectedChildAge} • DOB: {formatDate(selectedChildProfile.dateOfBirth)}
                  </p>
                )}
              </div>

              {selectedChildProfile && (
                <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4">
                  <div className="mb-2 text-sm font-semibold text-slate-900">COPPA Compliance</div>
                  {coppaAgeBand === 'under-13' ? (
                    <>
                      <Badge className="mb-3 bg-amber-100 text-amber-900 border-amber-300">Under 13 - Consent Required</Badge>
                      <div className="space-y-3 text-xs text-slate-700">
                        <p>{getCoppaPolicySummary('under-13')}</p>
                        <label className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={confirmGuardian}
                            onChange={(e) => setConfirmGuardian(e.target.checked)}
                            className="mt-0.5 h-4 w-4"
                          />
                          <span>
                            I confirm I am the parent/legal guardian and authorize registration for this child.
                          </span>
                        </label>
                        <label className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={confirmDataUse}
                            onChange={(e) => setConfirmDataUse(e.target.checked)}
                            className="mt-0.5 h-4 w-4"
                          />
                          <span>
                            I consent to the collection and use of my child&apos;s data for event operations, communication, and safety.
                          </span>
                        </label>
                        <div>
                          <label className="mb-1 block font-semibold text-slate-700">Verification Method</label>
                          <select
                            value={verificationMethod}
                            onChange={(e) => setVerificationMethod(e.target.value as CoppaVerificationMethod)}
                            className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                          >
                            <option value="credit-card">Payment Method Verification</option>
                            <option value="government-id">Government ID Verification</option>
                            <option value="signed-form">Signed Consent Form</option>
                            <option value="knowledge-based">Knowledge-Based Verification</option>
                          </select>
                        </div>
                        <p className="text-slate-500">
                          Policy version: {COPPA_CONSENT_TEXT_VERSION}
                        </p>
                      </div>
                    </>
                  ) : coppaAgeBand === '13-17' ? (
                    <>
                      <Badge className="mb-3 bg-blue-100 text-blue-900 border-blue-300">Age 13-17 - Parent Tracking Required</Badge>
                      <div className="space-y-3 text-xs text-slate-700">
                        <p>{getCoppaPolicySummary('13-17')}</p>
                        <label className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            checked={confirmTeenTracking}
                            onChange={(e) => setConfirmTeenTracking(e.target.checked)}
                            className="mt-0.5 h-4 w-4"
                          />
                          <span>
                            I confirm parental authorization/awareness tracking for this 13-17 student and agree to retain this record for compliance review.
                          </span>
                        </label>
                        <p className="text-slate-500">
                          Policy version: {COPPA_CONSENT_TEXT_VERSION}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-slate-700">
                      <Badge className="mb-2 bg-emerald-100 text-emerald-900 border-emerald-300">Age 18+ - COPPA Consent Not Required</Badge>
                      <p>
                        {getCoppaPolicySummary('18-plus')}
                      </p>
                    </div>
                  )}
                  {coppaAgeBand && (
                    <p className="mt-2 text-xs text-slate-500">
                      Age band: {getCoppaBandLabel(coppaAgeBand)}
                    </p>
                  )}
                </div>
              )}

              {/* Event Selection Summary */}
              {selectedEvent && (
                <div className="mb-6 p-4 bg-muted border border-border rounded-lg">
                  <div className="text-sm font-semibold text-foreground mb-2">Selected Event</div>
                  <div className="text-xs text-muted-foreground">
                    {events.find(e => e.id === selectedEvent)?.name}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleRegister}
                disabled={
                  !selectedChild ||
                  !selectedEvent ||
                  (coppaAgeBand === 'under-13' && (!confirmGuardian || !confirmDataUse)) ||
                  (coppaAgeBand === '13-17' && !confirmTeenTracking)
                }
                className="w-full bg-primary hover:bg-primary/90"
              >
                {coppaAgeBand === 'under-13'
                  ? 'Complete Registration with Verified Consent'
                  : coppaAgeBand === '13-17'
                    ? 'Complete Registration with Parent Tracking'
                    : 'Complete Registration'}
              </Button>

              <p className="text-xs text-slate-500 mt-3 text-center">
                Payment will be processed on next step
              </p>
            </Card>
          </div>

          {/* Right Column: Available Events */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Available Competitions</h2>
            
            <div className="space-y-4">
              {events.map(event => (
                <Card 
                  key={event.id} 
                  className={`p-6 cursor-pointer transition-all ${
                    selectedEvent === event.id 
                      ? 'border-2 border-primary bg-primary/5' 
                      : 'hover:border-border'
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {event.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">{event.description}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(event)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-slate-600">📅 Date:</span>
                      <div className="font-semibold text-slate-900">{formatDate(event.date)}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">📍 Location:</span>
                      <div className="font-semibold text-slate-900">{event.location}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">💰 Fee:</span>
                      <div className="font-semibold text-slate-900">${event.registrationFee}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">⏰ Deadline:</span>
                      <div className="font-semibold text-slate-900">{formatDate(event.registrationDeadline)}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {event.division}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {event.questionSet} Set
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {event.competitionType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {event.currentRegistrations}/{event.capacity} registered
                    </Badge>
                  </div>

                  {selectedEvent === event.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-primary font-semibold">
                        ✓ Click "Complete Registration" to proceed with payment
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
