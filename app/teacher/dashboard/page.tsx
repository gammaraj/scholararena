'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockStudents, mockEvents, mockSchools, mockRegistrations } from '@/lib/mockData';
import { Student, Event, School, Registration } from '@/lib/types';

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [school, setSchool] = useState<School | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      router.push('/demo');
      return;
    }

    // Find teacher's school
    const teacherSchool = mockSchools.find(s => s.id === user.schoolId);
    if (teacherSchool) {
      setSchool(teacherSchool);
      
      // Get students from this school
      const schoolStudents = mockStudents.filter(s => s.schoolId === teacherSchool.id);
      setStudents(schoolStudents);
      
      // Get registrations for these students
      const studentIds = schoolStudents.map(s => s.id);
      const schoolRegs = mockRegistrations.filter(r => studentIds.includes(r.studentId));
      setRegistrations(schoolRegs);
    }

    // Get available events
    setEvents(mockEvents.filter(e => e.status === 'open' || e.status === 'waitlist'));
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/demo');
  };

  if (!user || !school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const confirmedRegistrations = registrations.filter(r => r.status === 'confirmed').length;
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Teacher Portal</h1>
              <p className="text-sm text-muted-foreground">
                {user.firstName} {user.lastName} • {school.name}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card">
            <div className="text-sm font-medium text-muted-foreground">Total Students</div>
            <div className="text-3xl font-bold text-foreground mt-2">{students.length}</div>
          </Card>
          <Card className="p-6 bg-card">
            <div className="text-sm font-medium text-muted-foreground">Total Registrations</div>
            <div className="text-3xl font-bold text-foreground mt-2">{totalRegistrations}</div>
          </Card>
          <Card className="p-6 bg-card">
            <div className="text-sm font-medium text-muted-foreground">Confirmed</div>
            <div className="text-3xl font-bold text-primary mt-2">{confirmedRegistrations}</div>
          </Card>
          <Card className="p-6 bg-card">
            <div className="text-sm font-medium text-muted-foreground">Upcoming Events</div>
            <div className="text-3xl font-bold text-accent mt-2">{upcomingEvents}</div>
          </Card>
        </div>

        {/* School Information */}
        <Card className="p-6 mb-8 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">School Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">School Name</div>
              <div className="text-lg text-foreground">{school.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Location</div>
              <div className="text-lg text-foreground">
                {school.city}, {school.state} {school.zipCode}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Address</div>
              <div className="text-lg text-foreground">{school.address}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Students Enrolled</div>
              <div className="text-lg text-foreground">{students.length} students</div>
            </div>
          </div>
        </Card>

        {/* Students List */}
        <Card className="p-6 mb-8 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Students</h2>
          <div className="space-y-3">
            {students.length === 0 ? (
              <p className="text-muted-foreground">No students enrolled from this school</p>
            ) : (
              students.map(student => {
                const studentRegs = registrations.filter(r => r.studentId === student.id);
                return (
                  <div key={student.id} className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
                    <div>
                      <div className="font-medium text-foreground">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Grade {student.grade} • {studentRegs.length} registration{studentRegs.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {studentRegs.map(reg => (
                        <Badge 
                          key={reg.id}
                          className={
                            reg.status === 'confirmed'
                              ? 'bg-primary/10 text-primary border-primary/30'
                              : 'bg-accent/20 text-accent-foreground border-accent/30'
                          }
                        >
                          {reg.event?.competitionType || 'Event'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Available Events */}
        <Card className="p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Available Events</h2>
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
              Bulk Registration Coming Soon
            </Badge>
          </div>
          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="text-muted-foreground">No events currently available</p>
            ) : (
              events.map(event => (
                <div key={event.id} className="p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{event.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={
                          event.status === 'open'
                            ? 'bg-primary/10 text-primary border-primary/30'
                            : 'bg-accent/20 text-accent-foreground border-accent/30'
                        }
                      >
                        {event.status === 'open' ? 'Open' : 'Waitlist'}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-2">
                        ${event.registrationFee}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.currentRegistrations}/{event.capacity} registered
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
