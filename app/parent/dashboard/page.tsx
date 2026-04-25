'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStudents, mockRegistrations, mockQualifications, getStudentsByParent } from '@/lib/mockData';
import { Student, Registration, Qualification } from '@/lib/types';

export default function ParentDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<Student[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'parent') {
      router.push('/demo');
      return;
    }

    // Load parent's children
    const parentChildren = getStudentsByParent(user.id);
    setChildren(parentChildren);

    // Load all registrations for these children
    const childIds = parentChildren.map(c => c.id);
    const childRegistrations = mockRegistrations.filter(reg => 
      childIds.includes(reg.studentId)
    );
    setRegistrations(childRegistrations);

    // Load qualifications
    const childQuals = mockQualifications.filter(qual =>
      childIds.includes(qual.studentId)
    );
    setQualifications(childQuals);
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Parent Portal</h1>
              <p className="text-sm text-slate-600">Welcome, {user?.firstName} {user?.lastName}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push('/parent/register')}>
                + Register Child
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Total Children</div>
            <div className="text-3xl font-bold text-foreground">{children.length}</div>
          </Card>
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Active Registrations</div>
            <div className="text-3xl font-bold text-foreground">
              {registrations.filter(r => r.status === 'confirmed').length}
            </div>
          </Card>
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Qualifications</div>
            <div className="text-3xl font-bold text-foreground">
              {qualifications.filter(q => !q.used).length}
            </div>
          </Card>
        </div>

        {/* Children and Their Registrations */}
        <div className="space-y-6">
          {children.map(child => {
            const childRegs = registrations.filter(r => r.studentId === child.id);
            const childQuals = qualifications.filter(q => q.studentId === child.id && !q.used);
            
            return (
              <Card key={child.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {child.firstName} {child.lastName}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Grade {child.grade} • DOB: {formatDate(child.dateOfBirth)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {childQuals.length > 0 && (
                      <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                        {childQuals.length} Qualified
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Qualifications */}
                {childQuals.length > 0 && (
                  <div className="mb-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-accent-foreground">🏆 Active Qualifications</span>
                    </div>
                    <div className="space-y-2">
                      {childQuals.map(qual => (
                        <div key={qual.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium text-slate-900">{qual.qualifiedFor}</span>
                            <span className="text-slate-600 ml-2">
                              • Score: {qual.qualifyingScore}
                            </span>
                          </div>
                          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            Register Now
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registrations */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Registered Competitions ({childRegs.length})
                  </h4>
                  {childRegs.length === 0 ? (
                    <p className="text-sm text-slate-500 italic">No active registrations</p>
                  ) : (
                    <div className="space-y-3">
                      {childRegs.map(reg => (
                        <div key={reg.id} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-semibold text-slate-900">{reg.event.name}</h5>
                              <div className="text-sm text-slate-600 mt-1 space-y-1">
                                <div>📅 {formatDate(reg.event.date)}</div>
                                <div>📍 {reg.event.location}</div>
                                <div className="flex gap-3 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {reg.event.division}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {reg.event.questionSet} Set
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge 
                                className={
                                  reg.status === 'confirmed' 
                                    ? 'bg-primary/10 text-primary border-primary/30' 
                                    : 'bg-accent/10 text-accent-foreground border-accent/30'
                                }
                              >
                                {reg.status === 'confirmed' ? '✓ Confirmed' : 'Waitlist'}
                              </Badge>
                              <div className="text-sm">
                                <Badge 
                                  className={
                                    reg.paymentStatus === 'paid'
                                      ? 'bg-primary/10 text-primary border-primary/30'
                                      : 'bg-accent/10 text-accent-foreground border-accent/30'
                                  }
                                >
                                  {reg.paymentStatus === 'paid' ? '💳 Paid' : 'Payment Pending'}
                                </Badge>
                              </div>
                              <div className="text-xs text-slate-500 mt-2">
                                Reg: {formatDate(reg.registeredAt)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs">
                              Modify Registration
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs text-slate-600">
                              QR Code
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {children.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-slate-500 mb-4">No children registered yet.</p>
            <Button onClick={() => router.push('/parent/register')}>
              Add Your First Child
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
}
