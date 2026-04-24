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
    title: "Live Bracket Management",
    description: "Real-time tournament brackets that update automatically as competitions progress.",
    icon: Trophy,
  },
  {
    title: "Comprehensive Analytics",
    description: "Track student performance across subjects, competitions, and years with detailed statistics.",
    icon: BarChart3,
  },
  {
    title: "Team Management",
    description: "Organize school teams, manage rosters, and coordinate group registrations easily.",
    icon: Users,
  },
  {
    title: "Smart Scheduling",
    description: "Automated scheduling handles conflicts and optimizes event timing across venues.",
    icon: Clock,
  },
  {
    title: "Excel/CSV Import",
    description: "Bulk upload student rosters and registration data from your existing spreadsheets.",
    icon: FileSpreadsheet,
  },
  {
    title: "QR Check-In",
    description: "Contactless check-in with QR codes for fast and accurate attendance tracking.",
    icon: QrCode,
  },
  {
    title: "Real-Time Notifications",
    description: "Instant updates for schedule changes, results, and important announcements.",
    icon: Bell,
  },
  {
    title: "Secure & Compliant",
    description: "COPPA-compliant platform with robust data protection for student information.",
    icon: Shield,
  },
  {
    title: "Mobile Friendly",
    description: "Full functionality on any device so students and coaches can access info anywhere.",
    icon: Smartphone,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Platform Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Built for Academic Competition Organizers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need to run professional academic competitions at any scale.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">{feature.title}</h3>
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
