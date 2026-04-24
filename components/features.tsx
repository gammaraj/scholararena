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
    title: "Multi-Tournament Management",
    description: "Run 150+ regional tournaments simultaneously with different question sets (Red, White, Blue, Gold) and divisions.",
    icon: Trophy,
  },
  {
    title: "Registration & Payment Processing",
    description: "Streamlined online registration with automated payment handling, waitlists, and confirmation emails.",
    icon: FileSpreadsheet,
  },
  {
    title: "Live Scoring & Brackets",
    description: "Real-time buzzer-based scoring with instant bracket updates that participants and families can follow online.",
    icon: BarChart3,
  },
  {
    title: "Staff & Reader Management",
    description: "Coordinate tournament staff, assign readers and scorekeepers, and manage operational teams efficiently.",
    icon: Users,
  },
  {
    title: "Multi-Stage Competitions",
    description: "Support qualifying exams, regional tournaments, and national championships in one integrated system.",
    icon: Clock,
  },
  {
    title: "Results & Rankings",
    description: "Automatic qualification tracking, national rankings, and comprehensive results reporting for all divisions.",
    icon: QrCode,
  },
  {
    title: "Family Portal",
    description: "Parents and coaches get real-time access to schedules, brackets, and results through dedicated portals.",
    icon: Bell,
  },
  {
    title: "COPPA Compliant",
    description: "Full compliance with COPPA and student data protection regulations for K-12 participants.",
    icon: Shield,
  },
  {
    title: "White-Label Solution",
    description: "Fully customizable branding to match your organization's identity and maintain your reputation.",
    icon: Smartphone,
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            Platform Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Built for Academic Competition Organizations
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-pretty leading-relaxed">
            Everything you need to run History Bee, Science Bee, Geography Bee, and Bowl competitions at scale—from qualifying exams to national championships.
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
