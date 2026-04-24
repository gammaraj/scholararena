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
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-2">
            Platform Features
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Built for Academic Competition Organizations
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed">
            Everything you need to run History Bee, Science Bee, Geography Bee, and Bowl competitions at scale—from qualifying exams to national championships.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/80 bg-card/50 backdrop-blur-sm p-8 transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground group-hover:shadow-lg transition-all">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-bold text-lg text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
