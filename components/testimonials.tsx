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
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-2">
            Testimonials
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Trusted by Competition Organizations
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            See what tournament directors and operations managers have to say about ScholarArena
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-xl group">
              <CardContent className="pt-8 pb-6">
                <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <blockquote className="relative">
                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="border-t border-border/50 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-sm shadow-md">
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
        <div className="mt-20 text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide">Competitions available in:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {supportedSubjects.map((subject) => (
              <span
                key={subject}
                className="inline-flex items-center rounded-full border border-border/80 bg-card/50 backdrop-blur-sm px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
              >
                {subject}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full border border-dashed border-muted-foreground/40 bg-muted/30 px-5 py-2.5 text-sm text-muted-foreground">
              + More
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
