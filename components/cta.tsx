import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold mb-8 border border-white/20">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-white">Trusted by Leading Academic Competition Organizations</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-balance text-white">
            Ready to Transform Your Tournament Operations?
          </h2>
          
          <p className="mt-6 text-xl text-white/90 text-pretty leading-relaxed max-w-2xl mx-auto">
            See how ScholarArena can help you manage History Bee, Science Bee, Geography Bee, and Bowl competitions
            with the same efficiency as organizations running 150+ tournaments annually.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="gap-2 text-base px-10 py-6 font-semibold shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
            >
              Schedule a Demo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="gap-2 text-base px-10 py-6 font-semibold border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all"
            >
              View Pricing
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
