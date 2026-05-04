'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import type { AdminSessionRow, OrqeSubject } from '@/lib/orqe-types';
import { SUBJECT_LABELS, GRADE_BAND_LABELS } from '@/lib/orqe-types';

export default function AdminOrqePage() {
  const [sessions, setSessions] = useState<AdminSessionRow[]>([]);
  const [filtered, setFiltered] = useState<AdminSessionRow[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [overriding, setOverriding] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    const url =
      subjectFilter !== 'all'
        ? `/api/admin/orqe/sessions?subject=${subjectFilter}`
        : '/api/admin/orqe/sessions';
    const res = await fetch(url);
    const data = await res.json();
    setSessions(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [subjectFilter]);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  // Client-side filter by status + search
  useEffect(() => {
    let rows = [...sessions];
    if (statusFilter === 'passed') rows = rows.filter((r) => r.passed || r.overridePassed);
    if (statusFilter === 'failed') rows = rows.filter((r) => r.submittedAt && !r.passed && !r.overridePassed);
    if (statusFilter === 'in_progress') rows = rows.filter((r) => !r.submittedAt);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.studentName.toLowerCase().includes(q) ||
          r.studentEmail.toLowerCase().includes(q),
      );
    }
    setFiltered(rows);
  }, [sessions, statusFilter, search]);

  async function handleOverride(sessionId: string, value: boolean) {
    setOverriding(sessionId);
    await fetch('/api/admin/orqe/override', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, value }),
    });
    await loadSessions();
    setOverriding(null);
  }

  const stats = {
    total: sessions.length,
    passed: sessions.filter((s) => s.passed || s.overridePassed).length,
    failed: sessions.filter((s) => s.submittedAt && !s.passed && !s.overridePassed).length,
    inProgress: sessions.filter((s) => !s.submittedAt).length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ORQE Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Online Regional Qualifying Exam — session results</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: stats.total, color: 'bg-blue-50 text-blue-800' },
          { label: 'Passed', value: stats.passed, color: 'bg-green-50 text-green-800' },
          { label: 'Failed', value: stats.failed, color: 'bg-red-50 text-red-800' },
          { label: 'In Progress', value: stats.inProgress, color: 'bg-yellow-50 text-yellow-800' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {(['science', 'history', 'geography'] as OrqeSubject[]).map((s) => (
              <SelectItem key={s} value={s}>{SUBJECT_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="passed">Passed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={loadSessions} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Student</th>
              <th className="text-left px-4 py-3 font-medium">Grade</th>
              <th className="text-left px-4 py-3 font-medium">Subject</th>
              <th className="text-left px-4 py-3 font-medium">Band</th>
              <th className="text-center px-4 py-3 font-medium">Score</th>
              <th className="text-center px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Started</th>
              <th className="text-center px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400">
                  {loading ? 'Loading sessions…' : 'No sessions found.'}
                </td>
              </tr>
            )}
            {filtered.map((row) => {
              const effectivePassed = row.passed || row.overridePassed;
              const isSubmitted = !!row.submittedAt;
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{row.studentName}</div>
                    <div className="text-gray-500 text-xs">{row.studentEmail}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">Grade {row.studentGrade}</td>
                  <td className="px-4 py-3 text-gray-700 capitalize">{SUBJECT_LABELS[row.subject]}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{GRADE_BAND_LABELS[row.gradeBand]}</td>
                  <td className="px-4 py-3 text-center font-mono">
                    {isSubmitted ? `${row.score ?? '–'}/50` : '–'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {!isSubmitted ? (
                      <Badge variant="outline" className="text-yellow-700 border-yellow-400">In Progress</Badge>
                    ) : effectivePassed ? (
                      <span className="inline-flex items-center gap-1">
                        <Badge className="bg-green-100 text-green-800 border-0">Passed</Badge>
                        {row.overridePassed && !row.passed && (
                          <span className="text-xs text-gray-400">(override)</span>
                        )}
                      </span>
                    ) : (
                      <Badge variant="destructive" className="bg-red-100 text-red-700 border-0">Failed</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(row.startedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isSubmitted && !effectivePassed && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-700 border-green-400 hover:bg-green-50 text-xs"
                        disabled={overriding === row.id}
                        onClick={() => handleOverride(row.id, true)}
                      >
                        Override Pass
                      </Button>
                    )}
                    {isSubmitted && row.overridePassed && !row.passed && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 text-xs ml-1"
                        disabled={overriding === row.id}
                        onClick={() => handleOverride(row.id, false)}
                      >
                        Revoke
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
