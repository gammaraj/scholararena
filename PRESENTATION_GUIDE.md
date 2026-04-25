# ScholarArena POC - Presentation Guide

## Pre-Presentation Checklist

- [ ] Start development server: `pnpm dev`
- [ ] Open browser to `http://localhost:3002` (or whatever port it runs on)
- [ ] Open demo login page: `http://localhost:3002/demo`
- [ ] Have all 4 demo accounts ready
- [ ] Close unnecessary browser tabs
- [ ] Set browser zoom to 100% for optimal display

## Presentation Flow (15-20 minutes)

### 1. Introduction (2 minutes)
**Start on Homepage**

> "Today I'm excited to show you a working proof of concept for the ScholarArena platform we proposed. This isn't just mockups or slides—this is a fully functional demo that you can click through and interact with."

**Key Points:**
- Show the homepage
- Point out the "View Live Demo" banner at the top
- Briefly mention: "This demonstrates the four-portal architecture we outlined in the proposal"

### 2. Demo Login (1 minute)
**Click "View Live Demo" → Demo Login Page**

> "The platform has four separate portals, each designed for a specific user role. Let me walk you through each one."

**Show the four role cards:**
- Parent Portal - for managing children's registrations
- Student Portal - for students 14+ to manage their own competitions
- Teacher Portal - for school-based bulk registration
- Admin Portal - for IAC staff to manage everything

### 3. Parent Portal Demo (5 minutes)
**Login as Parent (parent@demo.com)**

> "Let's start with the Parent Portal, which is what most of your registrants will use."

**Dashboard Tour:**
1. **Top Section - Statistics Cards**
   - "Here parents see a quick overview: total children, active registrations, and qualifications"
   
2. **Children Cards**
   - "Each child has their own card showing all their registrations"
   - Point out Emma (7th grade) and Michael (9th grade)
   - "Notice the qualification badge on Michael's profile—he's qualified for Geography Bee Nationals"

3. **Registration Details**
   - Show Emma's registration for History Bee
   - Point out: Date, Location, Question Set, Division
   - Highlight status badges: "Confirmed" and "Paid"
   - Show action buttons: "View Details", "Modify Registration", "QR Code"

4. **Qualification Alert for Michael**
   - "This purple section shows active qualifications"
   - "Michael qualified with a score of 88 on March 15th"
   - Click "Register Now" button
   - > "This would take them directly to registration with pre-filled info"

**Registration Flow:**
5. **Click "Register Child" button**
   - "Let me show you the registration process"
   
6. **Registration Page Tour:**
   - Left side: "Select child dropdown and registration summary"
   - Right side: "Available competitions with real-time capacity"
   - Click on an event card
   - Point out:
     - Capacity indicators (45/120 registered)
     - Badges for Division, Question Set
     - Registration fee and deadline
     - Event description
   - "Click 'Complete Registration' to proceed to payment"

**Key Takeaways:**
- ✅ Parents see all children in one dashboard
- ✅ Qualifications are prominently displayed
- ✅ Registration is simple: select child → select event → pay
- ✅ All status information is clear and accessible

### 4. Student Portal Demo (4 minutes)
**Logout → Login as Student (student@demo.com)**

> "Now let's see what students 14 and older see when they log in."

**Dashboard Tour:**
1. **Profile Card (Top)**
   - "Clean, focused view of their information"
   - Shows grade, birthdate, email
   - Statistics: events participated, qualifications

2. **Qualification Callout (Purple Card)**
   - "Just like parents, students get this prominent alert"
   - "Notice the celebratory language and clear call-to-action"
   - "'You're Qualified!' messaging encourages registration"

3. **Upcoming Competitions Section**
   - Grid view of upcoming events
   - Each card shows key info: date, location, badges
   - QR code and details buttons

4. **Competition History**
   - Shows past and future events
   - Example with placement badge (🥉 Bronze)
   - Score display
   - "Qualified for Nationals" badge

5. **Statistics Bar (Bottom)**
   - Total events, upcoming, qualifications, medals
   - "Visual summary of student's achievement"

**Key Takeaways:**
- ✅ Student-friendly, focused interface
- ✅ Gamification elements (medals, badges)
- ✅ Easy access to QR codes for check-in
- ✅ Complete competition history in one place

### 5. Admin Portal Demo (6 minutes)
**Logout → Login as Admin (admin@demo.com)**

> "Finally, let's look at the Admin Portal—where IAC staff manage everything."

**Dashboard Tour:**
1. **Top Statistics (4 Cards)**
   - Total Events: 4
   - Total Registrations: 2
   - Revenue: $275 (with platform fee calculation)
   - Qualified Students: 2 awaiting registration
   - "These update in real-time as events and registrations change"

2. **Event List (Left Column)**
   - Shows all events with status badges
   - Click different events to switch views
   - Status indicators: Open, Waitlist, Closed
   - Current registrations vs. capacity

3. **Event Details (Right Column)**
   - Selected event overview
   - Date, location, capacity, revenue
   - Division, Question Set, Competition Type badges
   - Action buttons:
     - "Edit Event"
     - "Manage Waitlist"
     - "Download Report"
     - "QR Check-in Mode" (highlighted)

4. **Registration Table**
   - Detailed list of all registrants
   - Columns: Student, Grade, School, Status, Payment, Check-in
   - Color-coded badges for each status
   - Individual action buttons (View, QR)
   - "During event day, you'd use QR Check-in Mode to scan students in"

5. **Quick Actions Card (Bottom)**
   - Export Registrations (CSV)
   - Send Reminders (automated emails)
   - Room Assignments (auto-generate)
   - Payment Report
   - Click one: "This would generate the report instantly"

**Key Takeaways:**
- ✅ Complete operational control in one dashboard
- ✅ Real-time visibility into all events
- ✅ Streamlined check-in process (QR codes)
- ✅ One-click reports and exports
- ✅ Automated communication tools

### 6. Key Features Summary (2 minutes)

> "Let me summarize what we've demonstrated:"

**Technical Achievements:**
1. ✅ **Four-Portal Architecture** - Role-specific interfaces working seamlessly
2. ✅ **Real-Time Updates** - Data syncs across portals
3. ✅ **Qualification Intelligence** - Automated tracking and prominent alerts
4. ✅ **Streamlined Registration** - Simple 3-step process
5. ✅ **Operational Efficiency** - Admin tools for event day and reporting

**Business Impact:**
- **Time Savings**: Manual registration → Digital self-service
- **Accuracy**: Automated payments and tracking (zero reconciliation errors)
- **User Experience**: Intuitive interfaces for all user types
- **Scalability**: Handles 190+ events and 12,000+ registrants

**What's Next:**
- This POC proves feasibility
- Phase 0 Discovery (2 weeks): Validate all requirements with IAC team
- Phase 1 (12 weeks): Build production platform with real payments, email, database
- Go-live target: July 31, 2026

## Q&A Preparation

### Expected Questions & Answers

**Q: "Is this using real data?"**
A: "This is mock data for demonstration. In production, all data will be stored securely in a database with encryption."

**Q: "How does payment processing work?"**
A: "The POC simulates payments. Production will integrate Stripe for secure payment processing with automatic receipts and reconciliation."

**Q: "Can parents modify registrations?"**
A: "Yes—the 'Modify Registration' button allows changes before the deadline. Refunds, transfers, and cancellations are all supported."

**Q: "What about COPPA compliance for minors?"**
A: "The parent portal ensures all minor registrations go through verified parent accounts. The production system will include verifiable parental consent mechanisms."

**Q: "How long would it take to build the full platform?"**
A: "Phase 1 (core platform) is 12 weeks. With a May 6 start, we hit the July 31 go-live date for fall registrations."

**Q: "What if we need changes during development?"**
A: "The phased approach with Phase 0 Discovery ensures we validate everything before building. Each sub-phase has a checkpoint where you can provide feedback."

**Q: "Can we export data?"**
A: "Absolutely. Click 'Export Registrations' in the admin portal. You can export in CSV/JSON format. IAC owns all data—no vendor lock-in."

**Q: "What about teacher bulk registration?"**
A: "That's in the Teacher Portal. Teachers can upload CSV files with student rosters and register entire teams with one action. We'll build that in Phase 1B."

**Q: "How does QR check-in work?"**
A: "Each registration generates a unique QR code. On event day, admins use tablets to scan students in. Takes seconds vs. manual sign-in sheets."

**Q: "What if an event sells out?"**
A: "The system automatically moves to waitlist mode 12 days before the event. When spots open, the next person on the waitlist gets auto-notified with 48 hours to accept."

## Technical Notes (If Asked)

**Stack:**
- Next.js 14 (React framework)
- TypeScript (type safety)
- Tailwind CSS (modern styling)
- shadcn/ui (component library)
- Production will add: Supabase (database), Stripe (payments), SendGrid (email)

**Hosting:**
- Vercel (automatic scaling, 99.9% uptime)
- Global CDN (fast worldwide)
- Automatic security updates

**Timeline:**
- POC built in 1 day (proof of concept speed)
- Phase 0: 2 weeks
- Phase 1: 12 weeks
- Total: ~3.5 months to production

## Post-Demo Actions

1. **If Interest is High:**
   - Schedule Phase 0 Discovery kickoff
   - Propose start date: May 6, 2026
   - Discuss Phase 0 scope and workshops

2. **If Questions Remain:**
   - Offer follow-up demo for stakeholders
   - Provide access to live demo URL
   - Schedule technical deep-dive session

3. **Next Steps:**
   - Send proposal recap email
   - Include POC screenshots
   - Outline decision timeline
   - Emphasize May 6 deadline for July 31 launch

---

## Demo URLs (Quick Reference)

- **Homepage**: http://localhost:3002
- **Demo Login**: http://localhost:3002/demo
- **Parent Portal**: http://localhost:3002/parent/dashboard
- **Student Portal**: http://localhost:3002/student/dashboard
- **Teacher Portal**: http://localhost:3002/teacher/dashboard
- **Admin Portal**: http://localhost:3002/admin/dashboard

## Demo Accounts (Quick Reference)

```
Parent:  parent@demo.com         (John Smith - 3 children)
Student: michael.smith@email.com (Michael Smith - Grade 10)
Teacher: teacher@demo.com        (Sarah Williams - Lincoln Middle School)
Admin:   admin@demo.com          (IAC Admin - Full access)
```

---

**Good luck with your presentation! 🚀**
