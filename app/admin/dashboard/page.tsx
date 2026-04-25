'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEvents, mockRegistrations, mockStudents, mockQualifications } from '@/lib/mockData';
import { Event, Registration } from '@/lib/types';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/demo');
      return;
    }

    setEvents(mockEvents);
    setRegistrations(mockRegistrations);
    if (mockEvents.length > 0) {
      setSelectedEvent(mockEvents[0].id);
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

  const totalRegistrations = registrations.length;
  const totalRevenue = registrations.reduce((sum, reg) => sum + reg.event.registrationFee, 0);
  const paidRegistrations = registrations.filter(r => r.paymentStatus === 'paid').length;
  const qualifiedStudents = mockQualifications.filter(q => !q.used).length;

  const selectedEventData = events.find(e => e.id === selectedEvent);
  const eventRegistrations = registrations.filter(r => r.eventId === selectedEvent);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">IAC Admin Portal</h1>
              <p className="text-sm text-slate-600">Event Management & Operations Dashboard</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => alert('Create new event')}>
                + Create Event
              </Button>
              <Button variant="outline" onClick={() => alert('Upload qualifications')}>
                Upload Qualifications
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
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Total Events</div>
            <div className="text-3xl font-bold text-foreground">{events.length}</div>
            <div className="text-xs text-muted-foreground mt-1">Across all competitions</div>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Total Registrations</div>
            <div className="text-3xl font-bold text-foreground">{totalRegistrations}</div>
            <div className="text-xs text-muted-foreground mt-1">{paidRegistrations} paid</div>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Revenue</div>
            <div className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">Platform fees: ${(totalRevenue * 0.05).toFixed(0)}</div>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <div className="text-sm font-semibold text-primary mb-1">Qualified Students</div>
            <div className="text-3xl font-bold text-foreground">{qualifiedStudents}</div>
            <div className="text-xs text-muted-foreground mt-1">Awaiting registration</div>
          </Card>
        </div>

        {/* Event Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">All Events</h3>
              <div className="space-y-2">
                {events.map(event => (
                  <div 
                    key={event.id}
                    onClick={() => setSelectedEvent(event.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedEvent === event.id 
                        ? 'bg-primary/5 border-2 border-primary' 
                        : 'bg-muted border border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 text-sm mb-1">
                      {event.name}
                    </div>
                    <div className="text-xs text-slate-600 mb-2">
                      {formatDate(event.date)}
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge 
                        className={`text-xs ${
                          event.status === 'open' ? 'bg-primary/10 text-primary border-primary/30' :
                          event.status === 'waitlist' ? 'bg-accent/20 text-accent-foreground border-accent/30' :
                          'bg-muted text-muted-foreground border-border'
                        }`}
                      >
                        {event.status}
                      </Badge>
                      <span className="text-xs text-slate-600">
                        {event.currentRegistrations}/{event.capacity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Event Details */}
          <div className="lg:col-span-2">
            {selectedEventData && (
              <div className="space-y-6">
                {/* Event Overview */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {selectedEventData.name}
                      </h3>
                      <p className="text-sm text-slate-600">{selectedEventData.description}</p>
                    </div>
                    <Badge 
                      className={`text-sm ${
                        selectedEventData.status === 'open' ? 'bg-primary/10 text-primary border-primary/30' :
                        selectedEventData.status === 'waitlist' ? 'bg-accent/20 text-accent-foreground border-accent/30' :
                        'bg-muted text-muted-foreground border-border'
                      }`}
                    >
                      {selectedEventData.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-slate-600">Date:</span>
                      <div className="font-semibold text-slate-900">{formatDate(selectedEventData.date)}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Location:</span>
                      <div className="font-semibold text-slate-900">{selectedEventData.location}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Capacity:</span>
                      <div className="font-semibold text-slate-900">
                        {selectedEventData.currentRegistrations} / {selectedEventData.capacity}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-600">Registration Fee:</span>
                      <div className="font-semibold text-slate-900">${selectedEventData.registrationFee}</div>
                    </div>
                    <div>
                      <span className="text-slate-600">Registration Deadline:</span>
                      <div className="font-semibold text-slate-900">
                        {formatDate(selectedEventData.registrationDeadline)}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-600">Revenue:</span>
                      <div className="font-semibold text-slate-900">
                        ${(eventRegistrations.length * selectedEventData.registrationFee).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="outline">{selectedEventData.division}</Badge>
                    <Badge variant="outline">{selectedEventData.questionSet} Set</Badge>
                    <Badge variant="outline">{selectedEventData.competitionType}</Badge>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <Button size="sm" variant="outline">Edit Event</Button>
                    <Button size="sm" variant="outline">Manage Waitlist</Button>
                    <Button size="sm" variant="outline">Download Report</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      QR Check-in Mode
                    </Button>
                  </div>
                </Card>

                {/* Registrations Table */}
                <Card className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">
                    Event Registrations ({eventRegistrations.length})
                  </h4>
                  
                  {eventRegistrations.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">No registrations yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-slate-200">
                          <tr className="text-left">
                            <th className="pb-2 font-semibold text-slate-700">Student</th>
                            <th className="pb-2 font-semibold text-slate-700">Grade</th>
                            <th className="pb-2 font-semibold text-slate-700">School</th>
                            <th className="pb-2 font-semibold text-slate-700">Status</th>
                            <th className="pb-2 font-semibold text-slate-700">Payment</th>
                            <th className="pb-2 font-semibold text-slate-700">Check-in</th>
                            <th className="pb-2 font-semibold text-slate-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventRegistrations.map(reg => {
                            const student = reg.student;
                            const school = student.schoolId ? mockStudents.find(s => s.schoolId === student.schoolId) : null;
                            
                            return (
                              <tr key={reg.id} className="border-b border-slate-100">
                                <td className="py-3">
                                  <div className="font-semibold text-slate-900">
                                    {student.firstName} {student.lastName}
                                  </div>
                                  <div className="text-xs text-slate-500">{reg.qrCode}</div>
                                </td>
                                <td className="py-3 text-slate-600">{student.grade}</td>
                                <td className="py-3 text-slate-600 text-xs">
                                  {student.schoolId || 'Individual'}
                                </td>
                                <td className="py-3">
                                  <Badge 
                                    className={`text-xs ${
                                      reg.status === 'confirmed' 
                                        ? 'bg-primary/10 text-primary border-primary/30' 
                                        : 'bg-accent/20 text-accent-foreground border-accent/30'
                                    }`}
                                  >
                                    {reg.status}
                                  </Badge>
                                </td>
                                <td className="py-3">
                                  <Badge 
                                    className={`text-xs ${
                                      reg.paymentStatus === 'paid'
                                        ? 'bg-primary/10 text-primary border-primary/30'
                                        : 'bg-accent/20 text-accent-foreground border-accent/30'
                                    }`}
                                  >
                                    {reg.paymentStatus}
                                  </Badge>
                                </td>
                                <td className="py-3">
                                  <Badge 
                                    className={`text-xs ${
                                      reg.checkInStatus === 'checked-in'
                                        ? 'bg-primary/10 text-primary border-primary/30'
                                        : 'bg-muted text-muted-foreground border-border'
                                    }`}
                                  >
                                    {reg.checkInStatus === 'checked-in' ? '✓ Checked in' : 'Not checked in'}
                                  </Badge>
                                </td>
                                <td className="py-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                                      View
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                                      QR
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 bg-muted">
                  <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" onClick={() => alert('Export registrations to CSV')}>
                      📊 Export Registrations
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => alert('Send reminder emails')}>
                      📧 Send Reminders
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => alert('Generate room assignments')}>
                      🏠 Room Assignments
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => alert('View payment report')}>
                      💰 Payment Report
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
