'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStudents, mockRegistrations, mockQualifications, mockResults, getRegistrationsByStudent, getQualificationsByStudent, getResultsByStudent } from '@/lib/mockData';
import { Student, Registration, Qualification, Result } from '@/lib/types';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [studentProfile, setStudentProfile] = useState<Student | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'student') {
      router.push('/demo');
      return;
    }

    // Find student profile - in real app, this would be linked to user
    const profile = mockStudents.find(s => s.email === user.email);
    if (profile) {
      setStudentProfile(profile);
      setRegistrations(getRegistrationsByStudent(profile.id));
      setQualifications(getQualificationsByStudent(profile.id));
      setResults(getResultsByStudent(profile.id));
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/demo');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const upcomingEvents = registrations.filter(r => 
    new Date(r.event.date) > new Date() && r.status === 'confirmed'
  );

  const unusedQualifications = qualifications.filter(q => !q.used);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Student Portal</h1>
              <p className="text-sm text-slate-600">
                Welcome, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Profile Card */}
        {studentProfile && (
          <Card className="p-6 mb-8 bg-card border-2 border-border">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {studentProfile.firstName} {studentProfile.lastName}
                </h2>
                <div className="space-y-1 text-sm text-slate-600">
                  <div>📚 Grade {studentProfile.grade}</div>
                  <div>🎂 Born: {formatDate(studentProfile.dateOfBirth)}</div>
                  {studentProfile.email && <div>📧 {studentProfile.email}</div>}
                </div>
              </div>
              <div className="text-right space-y-2">
                <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                  {registrations.length} Events
                </Badge>
                {unusedQualifications.length > 0 && (
                  <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
                    🏆 {unusedQualifications.length} Qualified
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Active Qualifications */}
        {unusedQualifications.length > 0 && (
          <Card className="p-6 mb-8 bg-accent/10 border-2 border-accent/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🏆</span>
              <h3 className="text-xl font-bold text-slate-900">You're Qualified!</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Congratulations! You've qualified for the following competitions. Register now to secure your spot.
            </p>
            <div className="space-y-3">
              {unusedQualifications.map(qual => (
                <div key={qual.id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-900">{qual.qualifiedFor}</div>
                      <div className="text-sm text-slate-600">
                        Qualified on {formatDate(qual.qualifiedDate)} • Score: {qual.qualifyingScore}
                      </div>
                    </div>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Register Now →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Upcoming Competitions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Upcoming Competitions ({upcomingEvents.length})
          </h3>
          {upcomingEvents.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No upcoming competitions</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.map(reg => (
                <Card key={reg.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-3">
                    <h4 className="font-bold text-slate-900 mb-1">{reg.event.name}</h4>
                    <div className="text-sm text-slate-600 space-y-1">
                      <div>📅 {formatDate(reg.event.date)}</div>
                      <div>📍 {reg.event.location}</div>
                    </div>
                  </div>
                  
                  {/* Show selected bees for multi-bee events */}
                  {reg.selectedBees && reg.selectedBees.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-slate-700 mb-1">Your Bees:</div>
                      <div className="flex gap-2 flex-wrap">
                        {reg.selectedBees.map(bee => (
                          <Badge key={bee} className="bg-accent/20 text-accent-foreground border-accent/30 text-xs">
                            {bee.charAt(0).toUpperCase() + bee.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Show selected exams */}
                  {reg.selectedExams && reg.selectedExams.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-slate-700 mb-1">
                        Written Exams ({reg.selectedExams.length}):
                      </div>
                      <div className="text-xs text-slate-600">
                        {reg.selectedExams.slice(0, 3).join(', ')}
                        {reg.selectedExams.length > 3 && ` +${reg.selectedExams.length - 3} more`}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="outline" className="text-xs">
                      {reg.event.division}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {reg.selectedQuestionSet || reg.event.questionSet} Set
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/30 text-lg px-4 py-2">
                      ✓ Confirmed
                    </Badge>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        QR Code
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Competition History */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Competition History</h3>
          {registrations.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-slate-500">No competition history yet</p>
            </Card>
          ) : (
            <Card className="p-6">
              <div className="space-y-3">
                {registrations.map(reg => {
                  const result = results.find(r => r.eventId === reg.eventId);
                  const isPast = new Date(reg.event.date) < new Date();
                  
                  return (
                    <div key={reg.id} className="border-b border-slate-100 pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{reg.event.name}</div>
                          <div className="text-sm text-slate-600">
                            {formatDate(reg.event.date)} • {reg.event.location}
                          </div>
                          {result && (
                            <div className="mt-2 flex gap-2 items-center">
                              <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                                {result.placement === 1 ? '🥇' : result.placement === 2 ? '🥈' : result.placement === 3 ? '🥉' : `#${result.placement}`}
                              </Badge>
                              <span className="text-sm text-slate-700">
                                Score: {result.score}
                              </span>
                              {result.qualified && (
                                <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                                  ✓ Qualified for Nationals
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          {isPast ? (
                            <Badge variant="outline" className="text-xs border-border">
                              Completed
                            </Badge>
                          ) : (
                            <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">
                              Upcoming
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Statistics Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{registrations.length}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{upcomingEvents.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{qualifications.length}</div>
            <div className="text-sm text-muted-foreground">Qualifications</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {results.filter(r => r.placement <= 3).length}
            </div>
            <div className="text-sm text-muted-foreground">Medals</div>
          </Card>
        </div>
      </main>
    </div>
  );
}
