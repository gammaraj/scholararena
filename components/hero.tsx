"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy, Users, Globe, BookOpen, Beaker, MapPin } from "lucide-react"
import Link from "next/link"

const subjects = [
  { icon: BookOpen, label: "History Bee", color: "bg-primary" },
  { icon: Beaker, label: "Science Bee", color: "bg-secondary" },
  { icon: Globe, label: "Geography Bee", color: "bg-accent" },
  { icon: MapPin, label: "Civics Bee", color: "bg-primary" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Announcement banner */}
          <Link href="https://brakto.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mb-8 group">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary/50 transition-all">
              <span className="mr-2">🚀</span>
              Coming Soon - Built on Brakto's Proven Infrastructure
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Badge>
          </Link>

          {/* Main headline */}
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-foreground">
            <span className="block">Competition Management</span>
            <span className="block mt-3 text-primary">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-3xl text-pretty text-xl text-muted-foreground leading-relaxed">
            An upcoming digital platform for academic competitions — designed to serve debate competitions, academic bowls, 
            olympiads, and knowledge competitions. Powered by Brakto's proven competition infrastructure.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 text-base px-8 py-6 font-semibold bg-accent text-accent-foreground hover:bg-accent/90">
              <Users className="h-5 w-5" />
              Join the Waitlist
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 font-semibold border-2">
              <Trophy className="h-5 w-5" />
              Learn More
            </Button>
          </div>

          {/* Subject pills */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.label}
                className="flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-muted transition-all"
              >
                <subject.icon className="h-4 w-4 text-primary" />
                <span className="text-foreground">{subject.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-md border border-dashed border-muted-foreground/40 px-4 py-2.5 text-sm text-muted-foreground">
              + More
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
