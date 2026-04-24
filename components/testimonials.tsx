import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "ScholarArena transformed how we run our regional competitions. The live brackets and instant scoring keep everyone engaged and excited.",
    author: "Dr. Sarah Chen",
    role: "Competition Director",
    organization: "Northeast Academic League",
  },
  {
    quote: "My students love tracking their progress and seeing how they stack up nationally. It&apos;s made competition prep so much more motivating!",
    author: "Michael Torres",
    role: "History Teacher & Coach",
    organization: "Lincoln Middle School",
  },
  {
    quote: "As a parent, I appreciate being able to follow along with live results. It&apos;s wonderful to see my daughter&apos;s achievements in real-time.",
    author: "Jennifer Williams",
    role: "Parent",
    organization: "Science Bee Participant",
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
            Trusted by Educators & Students
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
