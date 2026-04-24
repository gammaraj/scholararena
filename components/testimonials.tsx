import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "ScholarArena streamlined our entire tournament operation. Managing 150+ regional events used to require a team of 10+ people. Now we do it with 3.",
    author: "Dr. Sarah Chen",
    role: "Competition Director",
    organization: "National Academic League",
  },
  {
    quote: "The real-time bracket updates and family portal were game-changers. Parents love following along, and we get 90% fewer 'where's my kid?' phone calls.",
    author: "Michael Torres",
    role: "Tournament Operations Manager",
    organization: "Regional Quiz Bowl Association",
  },
  {
    quote: "Moving from spreadsheets to ScholarArena saved us countless hours. Registration, qualification tracking, and national rankings all happen automatically now.",
    author: "Jennifer Williams",
    role: "Executive Director",
    organization: "History Bee Federation",
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Trusted by Competition Organizations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="pt-6">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                <blockquote className="relative">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
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
          <p className="text-sm text-muted-foreground mb-4">Competitions available in:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {supportedSubjects.map((subject) => (
              <span
                key={subject}
                className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
              >
                {subject}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full border border-dashed border-muted-foreground/50 px-4 py-2 text-sm text-muted-foreground">
              + More
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
