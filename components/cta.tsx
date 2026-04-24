import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Built on Brakto's Proven Infrastructure</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Ready to Transform Your Organization's Operations?
          </h2>
          
          <p className="mt-6 text-xl text-white/90 text-pretty leading-relaxed max-w-3xl mx-auto">
            See how ScholarArena's four-portal platform streamlines every aspect of academic competition management—from registration to real-time results.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 text-base px-8 py-6 font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Schedule a Demo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 text-base px-8 py-6 font-semibold border-2 border-white/80 bg-transparent text-white hover:bg-white/10 hover:border-white"
            >
              View Proposal
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70 font-medium">
            Custom enterprise solutions available • White-label options • Dedicated support
          </p>
        </div>
      </div>
    </section>
  )
}
