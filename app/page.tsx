import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Competitions } from "@/components/competitions"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import faqSchema from "./faq-schema"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Competitions />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
