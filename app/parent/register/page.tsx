'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEvents, mockStudents, getStudentsByParent } from '@/lib/mockData';
import { Event, Student } from '@/lib/types';

export default function ParentRegisterPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');

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
    
    // In a real app, this would create a registration
    alert(`Registration created! This would process payment and send confirmation email.`);
    router.push('/parent/dashboard');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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
              </div>

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
                disabled={!selectedChild || !selectedEvent}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Complete Registration
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
