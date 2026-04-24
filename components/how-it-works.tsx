import { Badge } from "@/components/ui/badge"
import { UserPlus, FileText, Trophy, Medal } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Create Your Account",
    description: "Sign up as a student, parent, or school administrator. Connect with your school or create an independent profile.",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Register for Events",
    description: "Browse competitions by subject, grade level, and location. Register online and receive instant confirmation.",
    icon: FileText,
  },
  {
    step: 3,
    title: "Compete & Track Progress",
    description: "Participate in regional and national events. View live brackets, scores, and standings in real-time.",
    icon: Trophy,
  },
  {
    step: 4,
    title: "Earn Recognition",
    description: "Win medals, certificates, and scholarships. Build your academic profile for college applications.",
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
            Your Path to Academic Excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join thousands of students competing in prestigious academic competitions.
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
