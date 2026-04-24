import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  BarChart3, 
  Users, 
  Clock, 
  FileSpreadsheet, 
  QrCode,
  Bell,
  Shield,
  Smartphone
} from "lucide-react"

const features = [
  {
    title: "Parent Portal (COPPA-Compliant)",
    description: "Register minor children with required consent, view all registrations, schedules, results, and qualification status in unified dashboard.",
    icon: Users,
  },
  {
    title: "Student Portal (Ages 14+)",
    description: "Self-registration, personal dashboard with competition history, QR code access for check-in, and qualification tracking.",
    icon: Smartphone,
  },
  {
    title: "Teacher Portal",
    description: "Bulk student registration via CSV, manage Bowl team rosters (4+2), view school-wide participation and statistics.",
    icon: FileSpreadsheet,
  },
  {
    title: "Organization Admin Portal",
    description: "Create and manage events, process registrations, QR check-in, score entry, room assignments, comprehensive reporting.",
    icon: Trophy,
  },
  {
    title: "Multi-Organization Architecture",
    description: "Each organization gets isolated workspace with custom branding while sharing proven platform infrastructure.",
    icon: Shield,
  },
  {
    title: "Proven at Scale",
    description: "Supporting History Bee, Science Bee, Geography Bee, and Bowl competitions with enterprise-grade reliability.",
    icon: BarChart3,
  },
  {
    title: "Qualification Intelligence",
    description: "Upload qualification exam results, enforce eligibility for Nationals, track Regional → National → International pathways.",
    icon: QrCode,
  },
  {
    title: "Real-Time Operations",
    description: "QR check-in on tablets, room assignments, live score entry by moderators, real-time leaderboards and standings.",
    icon: Clock,
  },
  {
    title: "Enterprise-Grade Reliability",
    description: "99.9% uptime SLA, SOC 2 Type II compliant infrastructure, automatic backups, and dedicated support.",
    icon: Bell,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            Coming Soon - Four Specialized Portals
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Built for Every Stakeholder
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed">
            Parent Portal, Student Portal (14+), Teacher Portal, and Organization Admin Portal—each will be tailored 
            to specific needs with role-based access and unified data across all portals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-lg border border-border bg-white p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold text-lg text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
