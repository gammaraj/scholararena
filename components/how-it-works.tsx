import { Badge } from "@/components/ui/badge"
import { UserPlus, FileText, Trophy, Medal } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Platform Setup",
    description: "We configure the platform with your branding, competition types, divisions (EMS, V/JV), and question sets.",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Open Registration",
    description: "Launch registration portals for qualifying exams and regional competitions. Automated confirmations and payment processing.",
    icon: FileText,
  },
  {
    step: 3,
    title: "Run Competitions",
    description: "Manage live scoring, brackets, and staff assignments. Real-time updates keep participants and families informed.",
    icon: Trophy,
  },
  {
    step: 4,
    title: "Track & Report",
    description: "Automatic qualification tracking, national rankings, and comprehensive reporting for all stakeholders.",
    icon: Medal,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Getting Started
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            How ScholarArena Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From setup to national championships, we handle the technology so you can focus on running great competitions.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-primary via-secondary to-primary lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Step indicator */}
                <div className="mb-6 flex items-center justify-center lg:justify-center">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                    {item.step}
                    <div className="absolute -inset-1 rounded-full border-2 border-primary/30" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
