'use client'

import { useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type CoppaAgeBand = 'under-13' | '13-17' | '18-plus'
type VerificationMethod =
	| 'credit-card'
	| 'government-id'
	| 'signed-form'
	| 'knowledge-based'

function getCoppaAgeBand(age: number): CoppaAgeBand {
	if (age < 13) return 'under-13'
	if (age <= 17) return '13-17'
	return '18-plus'
}

function getPolicySummary(ageBand: CoppaAgeBand): string {
	if (ageBand === 'under-13') {
		return 'Verifiable parental consent is required before collecting and processing student data.'
	}
	if (ageBand === '13-17') {
		return 'Parental authorization tracking is recorded for accountability and compliance review.'
	}
	return 'COPPA parental consent is not required for this age band.'
}

const POLICY_VERSION = 'v2026-05-parent-portal'

export function CoppaExamApp() {
	const [studentName, setStudentName] = useState('Jordan Rivera')
	const [studentAge, setStudentAge] = useState(12)
	const [confirmGuardian, setConfirmGuardian] = useState(false)
	const [confirmDataUse, setConfirmDataUse] = useState(false)
	const [confirmTeenTracking, setConfirmTeenTracking] = useState(false)
	const [verificationMethod, setVerificationMethod] =
		useState<VerificationMethod>('credit-card')
	const [submittedPayload, setSubmittedPayload] = useState<string | null>(null)

	const ageBand = useMemo(() => getCoppaAgeBand(studentAge), [studentAge])

	function handleAgeChange(value: string) {
		const parsed = Number(value)
		if (Number.isNaN(parsed)) return
		const bounded = Math.max(1, Math.min(99, parsed))
		setStudentAge(bounded)
		setConfirmGuardian(false)
		setConfirmDataUse(false)
		setConfirmTeenTracking(false)
		setSubmittedPayload(null)
	}

	function handleSubmit() {
		if (ageBand === 'under-13' && (!confirmGuardian || !confirmDataUse)) {
			alert('Under-13 registrations require both guardian and data-use consent.')
			return
		}

		if (ageBand === '13-17' && !confirmTeenTracking) {
			alert('Age 13-17 registrations require parental tracking acknowledgment.')
			return
		}

		const payload = {
			studentName,
			studentAge,
			ageBand,
			coppaConsent: {
				required: ageBand === 'under-13',
				parentalTrackingRequired: ageBand === '13-17',
				granted: ageBand === 'under-13' ? confirmGuardian && confirmDataUse : false,
				trackingAcknowledged: ageBand === '13-17' ? confirmTeenTracking : false,
				verifiedBy: ageBand === 'under-13' ? verificationMethod : undefined,
				grantedAt: new Date().toISOString(),
				consentTextVersion: POLICY_VERSION,
			},
		}

		setSubmittedPayload(JSON.stringify(payload, null, 2))
	}

	return (
		<main className="mx-auto min-h-screen max-w-5xl bg-background px-4 py-10">
			<div className="mb-8">
				<h1 className="text-3xl font-semibold tracking-tight">COPPA Compliance Demo</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Parent-portal style age-band consent workflow for competition registration.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Student Registration</CardTitle>
						<CardDescription>Capture student age and required consent controls.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium" htmlFor="student-name">Student Name</label>
							<input
								id="student-name"
								value={studentName}
								onChange={(event) => setStudentName(event.target.value)}
								className="w-full rounded-md border border-input px-3 py-2 text-sm"
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium" htmlFor="student-age">Student Age</label>
							<input
								id="student-age"
								type="number"
								min={1}
								max={99}
								value={studentAge}
								onChange={(event) => handleAgeChange(event.target.value)}
								className="w-full rounded-md border border-input px-3 py-2 text-sm"
							/>
						</div>

						<div className="rounded-md border border-border bg-muted/30 p-3">
							{ageBand === 'under-13' && (
								<Badge className="mb-2 bg-amber-100 text-amber-900">Under 13 - Consent Required</Badge>
							)}
							{ageBand === '13-17' && (
								<Badge className="mb-2 bg-blue-100 text-blue-900">Age 13-17 - Tracking Required</Badge>
							)}
							{ageBand === '18-plus' && (
								<Badge className="mb-2 bg-emerald-100 text-emerald-900">Age 18+ - No COPPA Consent</Badge>
							)}

							<p className="text-xs text-muted-foreground">{getPolicySummary(ageBand)}</p>
						</div>

						{ageBand === 'under-13' && (
							<div className="space-y-3 rounded-md border border-amber-200 bg-amber-50 p-3">
								<label className="flex items-start gap-2 text-sm">
									<input
										type="checkbox"
										checked={confirmGuardian}
										onChange={(event) => setConfirmGuardian(event.target.checked)}
									/>
									<span>I confirm I am the legal guardian for this student.</span>
								</label>

								<label className="flex items-start gap-2 text-sm">
									<input
										type="checkbox"
										checked={confirmDataUse}
										onChange={(event) => setConfirmDataUse(event.target.checked)}
									/>
									<span>I consent to collection and processing of student data.</span>
								</label>

								<div className="space-y-2">
									<label className="text-sm font-medium" htmlFor="verify-method">Verification Method</label>
									<select
										id="verify-method"
										value={verificationMethod}
										onChange={(event) => setVerificationMethod(event.target.value as VerificationMethod)}
										className="w-full rounded-md border border-input px-3 py-2 text-sm"
									>
										<option value="credit-card">Payment Method Verification</option>
										<option value="government-id">Government ID Verification</option>
										<option value="signed-form">Signed Consent Form</option>
										<option value="knowledge-based">Knowledge-Based Verification</option>
									</select>
								</div>
							</div>
						)}

						{ageBand === '13-17' && (
							<div className="rounded-md border border-blue-200 bg-blue-50 p-3">
								<label className="flex items-start gap-2 text-sm">
									<input
										type="checkbox"
										checked={confirmTeenTracking}
										onChange={(event) => setConfirmTeenTracking(event.target.checked)}
									/>
									<span>I acknowledge parental authorization tracking for this registration.</span>
								</label>
							</div>
						)}

						<div className="text-xs text-muted-foreground">Policy version: {POLICY_VERSION}</div>

						<Button onClick={handleSubmit} className="w-full">
							Save Compliance Record
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Compliance Payload Preview</CardTitle>
						<CardDescription>This payload can be persisted as your consent audit record.</CardDescription>
					</CardHeader>
					<CardContent>
						{submittedPayload ? (
							<pre className="overflow-auto rounded-md border border-border bg-muted/20 p-3 text-xs leading-relaxed">
								{submittedPayload}
							</pre>
						) : (
							<p className="text-sm text-muted-foreground">
								Submit the form to generate a COPPA consent payload preview.
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	)
}
