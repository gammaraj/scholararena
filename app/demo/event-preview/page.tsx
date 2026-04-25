'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const DEMO_EVENT = {
  name: 'National Science, History & Geography Bee Championship 2026',
  location: 'Washington, DC - Walter E. Washington Convention Center',
  date: 'November 15, 2026',
  fee: 130,
  capacity: 500,
  registered: 287,
  description: 'Our biggest competition! Register for 1, 2, or all 3 Bees. Choose from 12 written exams. Compete up to 4 times with different question sets. Top 1/2 qualify for Nationals, Top 1/3 qualify for Internationals.',
};

const AVAILABLE_BEES = [
  { id: 'science', name: 'Science Bee', description: 'Biology, Chemistry, Physics, Earth Science', icon: '🔬' },
  { id: 'history', name: 'History Bee', description: 'World History, U.S. History, Ancient Civilizations', icon: '📚' },
  { id: 'geography', name: 'Geography Bee', description: 'World Geography, Physical Geography, Cultural Geography', icon: '🌍' },
];

const WRITTEN_EXAMS = [
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
  'Cultural Geography Exam',
];

const QUESTION_SETS = [
  { id: 'red', name: 'Red Set', color: 'bg-red-100 text-red-700 border-red-300' },
  { id: 'white', name: 'White Set', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  { id: 'blue', name: 'Blue Set', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'gold', name: 'Gold Set', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
];

export default function EventPreviewDemo() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedBees, setSelectedBees] = useState<string[]>([]);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState('');

  const toggleBee = (beeId: string) => {
    setSelectedBees(prev => 
      prev.includes(beeId) 
        ? prev.filter(id => id !== beeId)
        : [...prev, beeId]
    );
  };

  const toggleExam = (exam: string) => {
    setSelectedExams(prev =>
      prev.includes(exam)
        ? prev.filter(e => e !== exam)
        : prev.length < 12 ? [...prev, exam] : prev
    );
  };

  const canProceed = () => {
    if (step === 1) return selectedBees.length > 0;
    if (step === 2) return true; // Optional exams
    if (step === 3) return selectedQuestionSet !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/demo')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Demo Login
            </Button>
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
              Interactive Demo - No Login Required
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Event Header */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{DEMO_EVENT.name}</h1>
              <div className="space-y-1 text-sm text-slate-600">
                <div>📍 {DEMO_EVENT.location}</div>
                <div>📅 {DEMO_EVENT.date}</div>
                <div>💰 ${DEMO_EVENT.fee} per student</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-700">{DEMO_EVENT.registered}/{DEMO_EVENT.capacity}</div>
              <div className="text-xs text-slate-500">Spots Available</div>
              <Badge className="mt-2 bg-primary/10 text-primary border-primary/30">Open</Badge>
            </div>
          </div>
        </Card>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                  step > num ? 'bg-primary text-white border-primary' :
                  step === num ? 'bg-primary text-white border-primary' :
                  'bg-white text-slate-400 border-slate-300'
                }`}>
                  {step > num ? '✓' : num}
                </div>
                {num < 4 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step > num ? 'bg-primary' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-2 text-xs text-slate-600 font-medium">
            <span>Select Bees</span>
            <span>Choose Exams</span>
            <span>Question Set</span>
            <span>Summary</span>
          </div>
        </div>

        {/* Step 1: Select Bees */}
        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Step 1: Select Your Bees</h2>
            <p className="text-sm text-slate-600 mb-6">Choose 1, 2, or all 3 Bee competitions to participate in</p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {AVAILABLE_BEES.map(bee => (
                <Card 
                  key={bee.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedBees.includes(bee.id)
                      ? 'border-2 border-primary bg-primary/5'
                      : 'border hover:border-primary/50'
                  }`}
                  onClick={() => toggleBee(bee.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{bee.icon}</span>
                    <Checkbox checked={selectedBees.includes(bee.id)} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{bee.name}</h3>
                  <p className="text-sm text-slate-600">{bee.description}</p>
                </Card>
              ))}
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-sm">
              <div className="font-semibold text-slate-900 mb-1">💡 Did you know?</div>
              <p className="text-slate-700">
                Students who register for all 3 Bees have historically shown 40% higher qualification rates for Nationals!
              </p>
            </div>
          </Card>
        )}

        {/* Step 2: Select Written Exams */}
        {step === 2 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Step 2: Choose Written Exams (Optional)</h2>
            <p className="text-sm text-slate-600 mb-6">
              Select up to 12 written exams to complement your Bee competitions • 
              <span className="font-semibold text-primary ml-1">
                {selectedExams.length}/12 selected
              </span>
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {WRITTEN_EXAMS.map(exam => (
                <div
                  key={exam}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedExams.includes(exam)
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-primary/50'
                  }`}
                  onClick={() => toggleExam(exam)}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedExams.includes(exam)} />
                    <span className="text-sm font-medium text-slate-900">{exam}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
              <strong>Pro Tip:</strong> Written exams can boost your qualification score and demonstrate comprehensive knowledge across subjects.
            </div>
          </Card>
        )}

        {/* Step 3: Select Question Set */}
        {step === 3 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Step 3: Choose Your Question Set</h2>
            <p className="text-sm text-slate-600 mb-6">
              Select one question set for this registration. You can compete up to 4 times with different sets!
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {QUESTION_SETS.map(set => (
                <Card
                  key={set.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedQuestionSet === set.id
                      ? 'border-2 border-primary bg-primary/5'
                      : 'border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedQuestionSet(set.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${set.color} flex items-center justify-center font-bold`}>
                        {set.id.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{set.name}</h3>
                        <p className="text-sm text-slate-600">Difficulty: Balanced</p>
                      </div>
                    </div>
                    <Checkbox checked={selectedQuestionSet === set.id} />
                  </div>
                </Card>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-900">
              <strong>Compete Multiple Times:</strong> After this registration, you can register again with a different question set (Red, White, Blue, or Gold) to maximize your chances!
            </div>
          </Card>
        )}

        {/* Step 4: Summary */}
        {step === 4 && (
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Summary</h2>
              <p className="text-slate-600">Review your selections below</p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="border-b pb-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">Event</div>
                <div className="font-bold text-slate-900">{DEMO_EVENT.name}</div>
                <div className="text-sm text-slate-600">{DEMO_EVENT.date} • {DEMO_EVENT.location}</div>
              </div>

              <div className="border-b pb-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">Selected Bees ({selectedBees.length})</div>
                <div className="flex gap-2 flex-wrap">
                  {selectedBees.map(beeId => {
                    const bee = AVAILABLE_BEES.find(b => b.id === beeId);
                    return (
                      <Badge key={beeId} className="bg-accent/20 text-accent-foreground border-accent/30">
                        {bee?.icon} {bee?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="border-b pb-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">Written Exams ({selectedExams.length})</div>
                {selectedExams.length > 0 ? (
                  <div className="text-sm text-slate-600">
                    {selectedExams.join(', ')}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic">None selected</div>
                )}
              </div>

              <div className="border-b pb-4">
                <div className="text-sm font-semibold text-slate-700 mb-2">Question Set</div>
                <Badge className={QUESTION_SETS.find(s => s.id === selectedQuestionSet)?.color}>
                  {QUESTION_SETS.find(s => s.id === selectedQuestionSet)?.name}
                </Badge>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-900">Registration Fee</span>
                  <span className="text-2xl font-bold text-primary">${DEMO_EVENT.fee}</span>
                </div>
                <div className="text-xs text-slate-600">Includes all selected Bees and written exams</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <div className="font-semibold text-blue-900 mb-2">🎯 What Happens Next?</div>
                <ul className="space-y-1 text-blue-800 text-xs">
                  <li>• QR code generated for event check-in</li>
                  <li>• Email confirmation with event details</li>
                  <li>• Access to study materials and practice questions</li>
                  <li>• Compete in your selected Bees on event day</li>
                  <li>• Top 1/2 qualify for Nationals, Top 1/3 for Internationals</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => router.push('/demo')}
              >
                Return to Demo • Login to Register
              </Button>
              <p className="text-xs text-slate-500 mt-2">
                This is a demo preview. Login as Parent or Student to complete actual registration.
              </p>
            </div>
          </Card>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90"
            >
              {step === 3 ? 'Review Summary' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
