import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "ScholarArena transformed our operations. Managing multiple events with thousands of students used to be overwhelming. Now it's streamlined and efficient.",
    author: "David Morrison",
    role: "Operations Director",
    organization: "International Academic Competitions",
  },
  {
    quote: "The four-portal architecture is brilliant. Parents, students, teachers, and our staff each get exactly what they need. No more confusion or duplicate work.",
    author: "Lisa Chen",
    role: "Technology Coordinator",
    organization: "National Quiz Bowl Association",
  },
  {
    quote: "Built on Brakto's infrastructure means proven reliability. We've had zero downtime during our busiest competition season. The platform just works.",
    author: "Robert Williams",
    role: "Executive Director",
    organization: "Academic Olympiad Foundation",
  },
]

const supportedSubjects = [
  "📚 History",
  "🔬 Science", 
  "🌍 Geography",
  "🏛️ Civics",
  "📐 Mathematics",
  "📖 Humanities",
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            Testimonials
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Trusted by Competition Organizations
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            See what competition directors and operations managers have to say about ScholarArena
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6 pb-6">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                <blockquote className="relative">
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground font-medium">{testimonial.role}</p>
                        <p className="text-xs text-primary font-medium">{testimonial.organization}</p>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported subjects */}
        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Competitions available in:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {supportedSubjects.map((subject) => (
              <span
                key={subject}
                className="inline-flex items-center rounded-md border border-border bg-white px-4 py-2 text-sm font-medium hover:border-primary/50 hover:bg-muted transition-all"
              >
                {subject}
              </span>
            ))}
            <span className="inline-flex items-center rounded-md border border-dashed border-muted-foreground/40 px-4 py-2 text-sm text-muted-foreground">
              + More
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
