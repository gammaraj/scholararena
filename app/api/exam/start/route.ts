import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkExamAvailability,
  createExamSession,
  getClientQuestions,
} from '@/lib/orqe-data';
import { gradeToGradeBand } from '@/lib/orqe-types';

const schema = z.object({
  subject: z.enum(['science', 'history', 'geography']),
  grade: z.number().int().min(1).max(12),
  studentName: z.string().min(2).max(100),
  studentEmail: z.string().email().max(255),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const { subject, grade, studentName, studentEmail } = parsed.data;

    const gradeBand = gradeToGradeBand(grade);
    if (!gradeBand) {
      return NextResponse.json({ error: 'Invalid grade' }, { status: 400 });
    }

    const availability = await checkExamAvailability(subject, grade, studentEmail);

    if (availability.status === 'not_found') {
      return NextResponse.json({ error: 'Exam not found for this subject and grade' }, { status: 404 });
    }
    if (availability.status === 'not_yet_open') {
      return NextResponse.json({ error: 'Exam has not opened yet', status: 'not_yet_open' }, { status: 403 });
    }
    if (availability.status === 'closed') {
      return NextResponse.json({ error: 'Exam window has closed', status: 'closed' }, { status: 403 });
    }
    if (availability.alreadyQualified) {
      return NextResponse.json(
        { error: 'Already qualified', status: 'already_qualified', subject },
        { status: 409 },
      );
    }

    const examId = availability.examId!;
    const questions = await getClientQuestions(examId);

    const sessionId = await createExamSession({
      examId,
      studentName,
      studentEmail,
      studentGrade: grade,
    });

    return NextResponse.json({
      sessionId,
      exam: {
        id: examId,
        timeLimitMinutes: 20,
        totalQuestions: questions.length,
      },
      questions,
      startedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[/api/exam/start]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
