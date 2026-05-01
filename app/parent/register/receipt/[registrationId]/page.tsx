'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getRegistrationById } from '@/lib/mockData';
import { getCoppaBandLabel } from '@/lib/coppa';
import { Registration } from '@/lib/types';

export default function ParentRegistrationReceiptPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams<{ registrationId: string }>();
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'parent') {
      router.push('/demo');
      return;
    }

    const registrationId = params?.registrationId;
    if (!registrationId) {
      router.push('/parent/dashboard');
      return;
    }

    const found = getRegistrationById(registrationId);
    if (!found) {
      router.push('/parent/dashboard');
      return;
    }

    setRegistration(found);
  }, [params, router, user]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!registration) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading receipt...</p>
      </div>
    );
  }

  const consent = registration.coppaConsent;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">COPPA Consent Receipt</h1>
            <p className="text-sm text-slate-600">Registration and compliance audit record</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              Print Receipt
            </Button>
            <Button variant="outline" onClick={() => router.push('/parent/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 border border-slate-200 shadow-sm print:shadow-none print:border-slate-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">ScholarArena Parent Registration Receipt</h2>
              <p className="text-sm text-slate-600">Record ID: {registration.id}</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/30">Compliance Record</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Student</h3>
              <p className="text-slate-900 font-medium">
                {registration.student.firstName} {registration.student.lastName}
              </p>
              <p className="text-sm text-slate-600">Grade {registration.student.grade}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Event</h3>
              <p className="text-slate-900 font-medium">{registration.event.name}</p>
              <p className="text-sm text-slate-600">{registration.event.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Registered At</h3>
              <p className="text-slate-900">{formatDate(registration.registeredAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">QR Reference</h3>
              <p className="text-slate-900 text-sm">{registration.qrCode}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">COPPA and Parent Consent Details</h3>
            {consent ? (
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-slate-700">Age Band:</span>{' '}
                  <span className="text-slate-900">{getCoppaBandLabel(consent.studentAgeBand)} (Age {consent.studentAge})</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Verifiable Consent Required:</span>{' '}
                  <span className="text-slate-900">{consent.required ? 'Yes' : 'No'}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Parental Tracking Required:</span>{' '}
                  <span className="text-slate-900">{consent.parentalTrackingRequired ? 'Yes' : 'No'}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Consent Granted:</span>{' '}
                  <span className="text-slate-900">{consent.granted ? 'Yes' : 'No'}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Tracking Acknowledged:</span>{' '}
                  <span className="text-slate-900">{consent.trackingAcknowledged ? 'Yes' : 'No'}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Verification Method:</span>{' '}
                  <span className="text-slate-900">{consent.verifiedBy ?? 'Not required for this age band'}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Policy Version:</span>{' '}
                  <span className="text-slate-900">{consent.consentTextVersion}</span>
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Recorded Timestamp:</span>{' '}
                  <span className="text-slate-900">{formatDate(consent.grantedAt)}</span>
                </p>
              </div>
            ) : (
              <p className="text-slate-600">No COPPA consent record found for this registration.</p>
            )}
          </div>

          <div className="border-t border-slate-200 pt-6 mt-6 text-xs text-slate-500">
            This receipt is generated for compliance tracking and audit support. Keep this record for your files.
          </div>
        </Card>
      </main>
    </div>
  );
}
