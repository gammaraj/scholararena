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
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement banner */}
          <Link href="#competitions" className="inline-flex items-center gap-2 mb-8 group">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
              <span className="mr-2">🎓</span>
              National Championships 2026
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Badge>
          </Link>

          {/* Main headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Where Knowledge</span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Becomes Victory
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
            The premier platform for academic competitions. Create tournaments, manage brackets, 
            and compete with students from elementary to high school across History, Science, Geography, and more.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 text-base px-8">
              <Trophy className="h-5 w-5" />
              Create Competition
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-8">
              <Users className="h-5 w-5" />
              Browse Events
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-10">
            <div>
              <p className="text-3xl font-bold text-primary">10,000+</p>
              <p className="mt-1 text-sm text-muted-foreground">Students Competing</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Competitions Hosted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="mt-1 text-sm text-muted-foreground">Schools Nationwide</p>
            </div>
          </div>

          {/* Subject pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.label}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm"
              >
                <subject.icon className="h-4 w-4 text-primary" />
                {subject.label}
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-full border border-dashed border-muted-foreground/50 px-4 py-2 text-sm text-muted-foreground">
              + More
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
