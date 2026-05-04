# ScholarArena × IACompetitions
## Founding SaaS Partner Engagement Proposal

**Prepared by**: ScholarArena  
**Prepared for**: IACompetitions (IAC)  
**Date**: May 1, 2026  
**Proposal Reference**: SAR-2026-IAC-001  
**Validity**: 30 days from date of issue

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Engagement Context](#2-engagement-context)
3. [Scope of Work](#3-scope-of-work)
4. [COPPA Compliance Workstream](#4-coppa-compliance-workstream)
5. [Delivery Timeline](#5-delivery-timeline)
6. [Pricing & Investment](#6-pricing--investment)
7. [Commercial Terms](#7-commercial-terms)
8. [Founding Partner Program](#8-founding-partner-program)
9. [Assumptions & Exclusions](#9-assumptions--exclusions)
10. [Next Steps](#10-next-steps)

---

## 1. Executive Summary

ScholarArena invites IACompetitions to become its **first Founding SaaS Partner**, co-shaping the platform that will power academic competition management for K-12 organizations nationwide.

This proposal covers **Phase 1: Online Exam Module** — a four-week accelerated build delivering a production-ready qualifying exam system with full COPPA compliance. In exchange for early adoption and a multi-year SaaS commitment, IAC receives preferential pricing, direct product input, and locked SaaS rates for 24 months.

| | |
|---|---|
| **Total Engagement Investment** | **$82,500 – $97,500** |
| **Founding Partner Discount** | 15% off list (conditions apply) |
| **Effective Investment Range** | **$70,125 – $82,875** |
| **SaaS Rate Lock** | 24 months from go-live |
| **Delivery Window** | 4 calendar weeks from signed SOW |

---

## 2. Engagement Context

### Why This Engagement Exists

IAC currently conducts qualifying rounds through manual or fragmented tools. ScholarArena has built the tournament management, registration, and family portal layers. The missing piece — **an integrated online exam module** — is the linchpin that completes the qualifying pipeline:

```
Student Registers → Takes Qualifying Exam → Score Thresholds Applied
     → Qualified Students Notified → Regional Tournament Registration Opens
```

Building this module in partnership with IAC, rather than speculatively, eliminates wasted product investment and ensures real operational fit from day one.

### IAC's Profile Requires COPPA-First Architecture

IAC's participant base spans K-8 (Elementary/Middle) and 9-12 divisions, meaning a significant percentage of test-takers are **under 13 years of age**. This triggers mandatory compliance requirements under the **Children's Online Privacy Protection Act (COPPA)**. Any exam system that collects student data — even just a name and answer set — requires:

- Verifiable parental consent before data collection for students under 13
- Age verification at the point of registration
- A parental authorization portal with audit-grade consent records
- Data minimization and retention policies
- Documented breach response procedures

This is not optional. It is a legal prerequisite. This proposal treats COPPA compliance as a **first-class, separately scoped, separately priced workstream** — not a checkbox.

---

## 3. Scope of Work

### Phase 1 Deliverables (4-Week Build)

#### 3.1 Online Exam Module

| Feature | Description |
|---|---|
| **Exam Authoring** | Admin interface to create question banks, set time limits, randomize question order per subject area (History, Science, Geography, etc.) |
| **Exam Delivery** | Secure, browser-based exam interface with countdown timer, question navigation, auto-save, and graceful timeout handling |
| **Division Routing** | Automatic routing to correct question sets based on participant division (K-8 vs 9-12, Varsity vs Junior Varsity) |
| **Anti-Cheat Controls** | Tab-switch detection, single active session enforcement, IP logging, no right-click / copy-paste on question text |
| **Auto-Grading** | Instant scoring for multiple-choice; admin review queue for free-response items |
| **Score Thresholds** | Configurable cut-scores per division/subject; automatic qualification flag generation |
| **Results Interface** | Student: personal score + pass/fail notification. Admin: exportable score roster with qualification status |
| **Integration with Registration** | Qualified students auto-populate eligibility for regional tournament registration |

#### 3.2 Parent Portal — Exam Management Extensions

| Feature | Description |
|---|---|
| **Exam Authorization** | Parent approves child sitting an exam (COPPA flow — see Section 4) |
| **Result Visibility** | Parent dashboard shows child's exam result, score, and qualification status |
| **Consent Receipt** | Printable/downloadable PDF consent record linked to each exam session |

#### 3.3 Admin Exam Dashboard

| Feature | Description |
|---|---|
| **Exam Configuration** | Create/edit/publish exams; set open and close windows; manage question banks |
| **Monitoring** | Live view of active sessions (count, progress, flagged sessions) |
| **Results Management** | Review free-response queue; override scores with audit note; export full results to CSV |
| **COPPA Audit Report** | Pull consent records by exam, date range, or student; required for regulatory response |

#### 3.4 Student Exam Portal

| Feature | Description |
|---|---|
| **Exam Lobby** | Student sees available exams, status (available / locked / completed), and countdown to open window |
| **Exam Interface** | Clean, distraction-reduced interface with progress indicator and timer |
| **Post-Exam** | Immediate result (pass/fail + score) upon submission; blocked from re-entry |

### Out of Scope — Phase 1

The following are explicitly **not** included in this engagement and may be addressed in future phases:

- Live proctoring or video surveillance integrations
- Free-response AI grading
- Mobile native applications (iOS/Android)
- SSO / third-party identity federation (e.g., Clever, ClassLink)
- Payment processing for exam fees
- Buzzer system integrations
- Historical data migration from prior exam systems

---

## 4. COPPA Compliance Workstream

This workstream is scoped, priced, and delivered **independently** of the core exam module. It can be purchased separately if IAC already has a compliant consent system, but is strongly recommended as a bundled workstream for new exam system deployments.

### What COPPA Requires for This System

| Requirement | Implementation |
|---|---|
| **Age determination at registration** | Date-of-birth capture with age-band classification (Under 13 / 13–17 / 18+) |
| **Verifiable parental consent (Under-13)** | Parent email verification + explicit consent capture with timestamped record |
| **Consent versioning** | All consent records tied to policy version; re-consent triggered on policy changes |
| **Data minimization** | Exam sessions for under-13 students collect only data necessary for scoring; no behavioral tracking |
| **Parental rights portal** | Parents can view, download, and request deletion of their child's data |
| **Breach response procedures** | Documented internal process; not a software deliverable but required for compliance claim |
| **Audit records** | Immutable consent log exportable to CSV for regulatory or legal requests |

### COPPA Deliverables

1. **Age-Gated Registration Flow** — Date-of-birth capture, age-band routing, under-13 consent gate
2. **Parental Consent Interface** — Email-based consent request, explicit consent form (version-stamped), confirmation email to parent
3. **Consent Record Storage** — Immutable records with: student ID, parent email, consent version, timestamp, IP address, action taken
4. **Consent Receipt Component** — Printable/downloadable receipt for each consent event
5. **Admin COPPA Dashboard** — View consent rates by event, flag missing consents, pull audit reports
6. **Parental Data Rights Portal** — Parent self-service view of stored data; deletion request workflow (admin-reviewed)
7. **Policy Documentation Templates** — Privacy notice template and COPPA disclosure language for IAC's legal review (ScholarArena provides template; IAC legal finalizes)

### COPPA Scope Boundary (Critical)

> **This workstream covers the ScholarArena exam module only.** IAC is responsible for ensuring that any other systems handling student data (existing registration tools, email platforms, third-party scoring software) are independently COPPA-compliant. ScholarArena makes no representation regarding IAC's compliance posture outside the ScholarArena platform.

> **Legal counsel**: IAC must engage independent legal counsel to review and approve all COPPA-related policy language, consent text, and data handling procedures. ScholarArena's templates are a starting point, not legal advice.

---

## 5. Delivery Timeline

All timelines commence from **Signed SOW + 50% deposit received**.

### Week-by-Week Milestone Plan

| Week | Milestone | Deliverables | Acceptance Criteria |
|------|-----------|--------------|---------------------|
| **Week 1** | Foundation | Exam data model finalized; question bank authoring UI; COPPA age-gate registration; parent consent flow (email + form) | IAC admin can create a question bank; parent can complete consent flow end-to-end |
| **Week 2** | Core Exam Engine | Exam delivery interface; timer + auto-save; anti-cheat controls; COPPA consent records stored; parent data portal (view only) | Student can take a timed exam; consent record created and retrievable |
| **Week 3** | Grading & Qualification | Auto-grading; score thresholds; qualification flags; parent result visibility; admin monitoring dashboard | Admin can configure cut-score; student receives pass/fail; parent sees result |
| **Week 4** | Integration + Hardening | Regional registration eligibility integration; COPPA audit report; admin COPPA dashboard; security testing; UAT with IAC staff; deployment to production | IAC conducts UAT sign-off; no open P0/P1 bugs; production deployment verified |

### Post-Launch Hypercare (Weeks 5–6)

- Dedicated Slack channel with ScholarArena engineering on-call
- Same-day response SLA for any exam-day incidents
- One round of minor adjustments (up to 8 engineering hours) at no additional cost
- Handover to standard SaaS support at end of Week 6

---

## 6. Pricing & Investment

### 6.1 Line-Item Breakdown (List Price)

| Line Item | Scope | List Price |
|---|---|---|
| **Exam Module Build** | All items in Section 3 | $52,000 |
| **COPPA Compliance Workstream** | All items in Section 4 | $28,500 |
| **Accelerated Delivery Buffer** | 4-week timeline risk premium (15%) | $12,075 |
| **Hypercare (Weeks 5–6)** | Post-launch on-call + 8h adjustment hours | $5,000 |
| **List Price Total** | | **$97,575** |

### 6.2 Founding Partner Pricing

| Adjustment | Condition | Amount |
|---|---|---|
| **Founding Partner Discount** | 24-month SaaS commitment at standard tier or above | −$14,625 (15%) |
| **Co-Marketing Credit** | IAC agrees to be named as reference customer + 1 case study | −$2,500 |
| **Effective Engagement Total** | | **$80,450** |

> Rounded billing figure: **$80,000** (fixed-fee engagement)

### 6.3 Ongoing SaaS Pricing (Post Phase 1)

Platform access fees apply from the month following Phase 1 go-live:

| Tier | Annual Participants | Monthly Rate | Founding Partner Lock-In |
|---|---|---|---|
| **Growth** | Up to 1,000 | $1,200/mo | Locked 24 months |
| **Scale** | Up to 5,000 | $2,800/mo | Locked 24 months |
| **Enterprise** | Unlimited | Custom | Negotiated at signing |

IAC's current scale (150+ regional tournaments, 2,000+ nationals participants) likely places IAC in the **Scale** tier. Rate is locked for 24 months; no mid-contract increases.

### 6.4 What Is Not Included in SaaS Fees

- Additional phase builds (separate SOW)
- On-site support at national championships (quoted separately, typically $2,500–$5,000/event)
- Custom integrations outside the platform (separate SOW)
- Legal or regulatory counsel

---

## 7. Commercial Terms

### 7.1 Payment Schedule

| Milestone | % of Engagement Fee | Amount | Trigger |
|---|---|---|---|
| **Deposit** | 40% | $32,000 | Signed SOW |
| **Mid-Point** | 40% | $32,000 | Week 2 milestone accepted by IAC |
| **Final** | 20% | $16,000 | Production deployment + UAT sign-off |

Payment terms: Net 14 days from invoice. Late payments accrue interest at 1.5%/month.

### 7.2 Change Order Process

Scope changes requested after SOW signing are subject to a formal Change Order:

1. IAC submits written change request
2. ScholarArena responds with impact assessment (scope, cost, timeline) within 3 business days
3. Both parties sign Change Order addendum before work begins
4. No verbal or email-only change authorizations are binding

Minor clarifications within existing scope do not require a Change Order.

### 7.3 Intellectual Property

- ScholarArena retains ownership of all platform code, architecture, and proprietary components
- IAC receives a perpetual, non-exclusive license to use the platform during active subscription
- IAC retains ownership of its own data (question banks, student records, competition results)
- Upon subscription termination, IAC data is exportable in CSV/JSON within 30 days; then deleted per retention policy

### 7.4 Liability

- ScholarArena's total liability under this engagement is capped at the **total fees paid** in the preceding 12 months
- ScholarArena is not liable for IAC's independent COPPA compliance posture outside the ScholarArena platform
- Each party indemnifies the other for claims arising from its own negligence or willful misconduct
- IAC indemnifies ScholarArena for claims arising from IAC's exam content, scoring disputes, or student data it supplies

### 7.5 Data Processing

A Data Processing Agreement (DPA) covering FERPA, COPPA, and applicable state student privacy laws will be executed concurrently with the SOW. The DPA governs:

- Categories of student data processed
- Sub-processors used by ScholarArena
- Data retention and deletion schedules
- Breach notification obligations (72-hour notice to IAC)
- Jurisdiction-specific requirements (state student privacy laws vary; IAC confirms applicable states)

### 7.6 Termination

- Either party may terminate for convenience with 30 days written notice
- Work completed and milestones accepted prior to termination are invoiced and due
- Work in progress at termination: ScholarArena invoices for pro-rated hours; IAC receives deliverables completed to date
- Termination for cause (material breach, uncured within 14 days of notice) releases the non-breaching party from further obligation

---

## 8. Founding Partner Program

### What IAC Gets as a Founding Partner

| Benefit | Detail |
|---|---|
| **Product Roadmap Input** | Quarterly calls with ScholarArena product team; IAC feature requests receive priority queue placement |
| **Pricing Lock** | SaaS tier pricing locked for 24 months from go-live, regardless of general price increases |
| **Dedicated Onboarding** | Named Customer Success Manager for first 6 months |
| **Early Access** | Beta access to new features (Phase 2 candidate: live scoring, bracket management) before general release |
| **Reference Revenue Share** | If IAC refers a paying customer, IAC receives a 10% referral fee on that customer's first-year SaaS contract |
| **Co-Marketing** | Mutual announcement; IAC featured in ScholarArena marketing materials (with IAC approval of content) |

### What ScholarArena Asks of IAC as a Founding Partner

| Commitment | Detail |
|---|---|
| **24-Month SaaS Subscription** | Minimum Scale tier ($2,800/mo) for 24 months from go-live |
| **Reference Customer** | Agreement to be named publicly as a ScholarArena customer |
| **Case Study** | One written case study (co-authored, IAC approval required before publication) within 6 months of go-live |
| **Feedback Participation** | Participation in two product feedback sessions per year |

---

## 9. Assumptions & Exclusions

### Assumptions

The pricing and timeline in this proposal are based on the following assumptions. If any assumption proves incorrect, ScholarArena reserves the right to issue a Change Order.

| # | Assumption |
|---|---|
| A1 | IAC will provide a dedicated point of contact available for daily async communication during the 4-week build |
| A2 | IAC will provide question bank content (or sample content) by the end of Week 1 for integration testing |
| A3 | IAC will complete UAT within 3 business days of ScholarArena's UAT deployment notification |
| A4 | ScholarArena's current cloud infrastructure (Vercel + managed Postgres) is acceptable to IAC; no on-premise deployment is required |
| A5 | IAC's legal counsel will review and approve COPPA policy text within the 4-week window; delays extend timeline but do not reduce scope |
| A6 | Exam content is English-language only; no translation or localization is required in Phase 1 |
| A7 | No custom SSO or identity federation is required; students and parents authenticate via email + password |
| A8 | Maximum concurrent exam-takers per event does not exceed 500 in the first 6 months; capacity planning will be reviewed at Month 4 |

### Exclusions

The following are explicitly excluded and not priced:

| Exclusion | Note |
|---|---|
| Legal advice on COPPA, FERPA, or state privacy laws | IAC must engage independent counsel |
| Compliance audits or third-party certifications (SOC 2, etc.) | Available as a future engagement |
| Penetration testing by a third-party firm | Available as an add-on |
| Training beyond two 1-hour onboarding sessions | Additional sessions at $250/hour |
| Data migration from existing IAC systems | Scoped separately if needed |
| Feature work beyond Phase 1 scope | Requires a new SOW |

---

## 10. Next Steps

To proceed with this engagement, the following steps are required:

| Step | Owner | Target |
|---|---|---|
| 1. IAC reviews proposal and raises questions | IAC | Within 5 business days |
| 2. Clarification call (if needed) | Both | Within 7 business days |
| 3. ScholarArena issues formal SOW + DPA documents | ScholarArena | Within 2 business days of IAC go-ahead |
| 4. IAC legal reviews SOW + DPA | IAC | Within 7 business days |
| 5. Both parties sign SOW + DPA | Both | Day 0 |
| 6. IAC remits 40% deposit ($32,000) | IAC | Within 3 business days of signing |
| 7. Development begins | ScholarArena | Day 1 (deposit received) |

### To Accept This Proposal

Email acceptance to: **[contact@scholararena.com]** referencing **Proposal SAR-2026-IAC-001**

Or execute the Statement of Work when issued. Proposal is valid for **30 days** from the date above.

---

## Appendix A: Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| COPPA legal review delays policy finalization | Medium | Medium | Exam module can go live with consent placeholders; policy text swapped in once approved |
| IAC UAT feedback requires significant rework | Low | High | Weekly check-ins reduce surprise; Change Order process handles scope additions |
| IAC content (question banks) delayed | Medium | High | Use ScholarArena sample content for development; swap in IAC content for UAT |
| Concurrent exam load exceeds infrastructure capacity | Low | High | Load testing in Week 3; auto-scaling configured; IAC provides event schedule in advance |
| COPPA regulatory change during engagement | Very Low | Medium | All consent logic is versioned; policy version updates are a low-effort swap |

---

## Appendix B: Reference Architecture

The exam module will be built as an extension to the existing ScholarArena platform:

```
┌─────────────────────────────────────────────────────┐
│                  ScholarArena Platform               │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐ │
│  │  Parent  │  │ Student  │  │       Admin        │ │
│  │  Portal  │  │  Portal  │  │     Dashboard      │ │
│  └────┬─────┘  └────┬─────┘  └────────┬───────────┘ │
│       │             │                  │             │
│  ┌────▼─────────────▼──────────────────▼───────────┐ │
│  │              Exam Module (Phase 1)               │ │
│  │  ┌──────────┐ ┌──────────┐ ┌─────────────────┐  │ │
│  │  │  Exam    │ │  Grading │ │  Qualification  │  │ │
│  │  │ Delivery │ │  Engine  │ │    Pipeline     │  │ │
│  │  └──────────┘ └──────────┘ └─────────────────┘  │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │           COPPA Compliance Layer                 │ │
│  │  Age Gate │ Consent Records │ Data Rights Portal │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │          Registration + Tournament Core          │ │
│  │         (Existing — Not in Phase 1 scope)        │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

*This proposal is confidential and prepared exclusively for IACompetitions. Unauthorized distribution is prohibited.*

*ScholarArena · scholararena.com · [contact@scholararena.com]*
