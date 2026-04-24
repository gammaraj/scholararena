import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            Trusted by Leading Academic Competition Organizations
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Ready to Transform Your Tournament Operations?
          </h2>
          
          <p className="mt-6 text-lg text-primary-foreground/80 text-pretty">
            See how ScholarArena can help you manage History Bee, Science Bee, Geography Bee, and Bowl competitions
            with the same efficiency as organizations running 150+ tournaments annually.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="gap-2 text-base px-8"
            >
              Schedule a Demo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 text-base px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              View Pricing
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            Custom enterprise solutions available • White-label options • Dedicated support
          </p>
        </div>
      </div>
    </section>
  )
}
