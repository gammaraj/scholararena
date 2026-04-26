'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const demoAccounts = [
  { email: 'parent@demo.com', role: 'Parent', description: 'View and manage your children\'s registrations', path: '/parent/dashboard' },
  { email: 'michael.smith@email.com', role: 'Student', description: 'View your competitions and results (Michael Smith, Grade 10)', path: '/student/dashboard' },
  { email: 'teacher@demo.com', role: 'Teacher', description: 'Manage school registrations', path: '/teacher/dashboard' },
  { email: 'admin@demo.com', role: 'IAC Admin', description: 'Manage events and operations', path: '/admin/dashboard' },
];

export default function DemoLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (email: string, path: string) => {
    setIsLoading(true);
    const success = login(email);
    if (success) {
      router.push(path);
    } else {
      alert('Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/20 border-l-4 border-accent rounded text-sm font-semibold text-accent-foreground">
            🎯 PROOF OF CONCEPT DEMO
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">ScholarArena Platform</h1>
          <p className="text-lg text-slate-600">Academic Competition Management System</p>
          <p className="text-sm text-slate-500 mt-2">Select a role to explore the platform</p>
        </div>

        {/* Featured Event Highlight */}
        <div className="mb-6">
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
            <Link href="/demo/event-preview" className="block">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏆</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      Try Interactive Event Demo →
                    </h3>
                  </div>
                  <h4 className="font-semibold text-primary mb-1">
                    National Science, History & Geography Bee Championship 2026
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    Washington, DC • November 15, 2026 • $130 Registration
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded border border-accent/30">
                      ✓ Multi-Bee: Science, History, Geography
                    </span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded border border-accent/30">
                      ✓ 12 Written Exams Available
                    </span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded border border-accent/30">
                      ✓ 4 Question Sets (Red, White, Blue, Gold)
                    </span>
                    <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded border border-accent/30">
                      ✓ All Grade Levels
                    </span>
                  </div>
                </div>
                <div className="text-right">
                <div className="text-sm font-semibold text-slate-700 mb-1">498/500</div>
                  <div className="text-xs text-slate-500">Registered</div>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mt-4">
                <p className="text-sm font-semibold text-primary">
                  🎯 Click to experience the full registration flow • No login required!
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Interactive walkthrough: Select bees → Choose exams → Pick question set → See summary
                </p>
              </div>
            </Link>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoAccounts.map((account) => (
            <Card key={account.email} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{account.role}</h3>
                  <p className="text-sm text-slate-600">{account.description}</p>
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded font-mono">
                  {account.email}
                </div>
                <Button 
                  onClick={() => handleLogin(account.email, account.path)}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Access {account.role} Portal
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-card border border-border rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-semibold mb-2">About This Demo</p>
            <p className="text-xs leading-relaxed">
              This is a functional proof of concept demonstrating the four-portal architecture outlined in the proposal.
              All data is mock data for demonstration purposes. The demo showcases the registration system, 
              qualification tracking, and role-based access control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
