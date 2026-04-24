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
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/[0.02] to-background py-24 lg:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/8 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/8 blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Announcement banner */}
          <Link href="#features" className="inline-flex items-center gap-2 mb-10 group">
            <Badge variant="secondary" className="px-5 py-2 text-sm font-semibold shadow-sm border border-border/50 hover:shadow-md transition-all">
              <span className="mr-2">🚀</span>
              Trusted by Leading Competition Organizers
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Badge>
          </Link>

          {/* Main headline */}
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-foreground">Tournament Management</span>
            <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-xl text-muted-foreground leading-relaxed font-light">
            The complete platform for academic competition organizers. Manage registrations, brackets, scoring, 
            and results for History Bee, Science Bee, Geography Bee, and more—all in one place.
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 text-base px-10 py-6 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <Trophy className="h-5 w-5" />
              Schedule a Demo
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base px-10 py-6 font-semibold border-2 hover:bg-muted hover:border-primary/50 transition-all">
              <Users className="h-5 w-5" />
              View Case Studies
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/50 pt-12">
            <div className="group">
              <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">150+</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Regional Tournaments</p>
            </div>
            <div className="group">
              <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-secondary to-primary bg-clip-text text-transparent">2,000+</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Participants per Event</p>
            </div>
            <div className="group">
              <p className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent">99.9%</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Platform Uptime</p>
            </div>
          </div>

          {/* Subject pills */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            {subjects.map((subject) => (
              <div
                key={subject.label}
                className="flex items-center gap-2 rounded-full border border-border/80 bg-card/50 backdrop-blur-sm px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5 transition-all"
              >
                <subject.icon className="h-4 w-4 text-primary" />
                <span className="text-foreground/90">{subject.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-full border border-dashed border-muted-foreground/40 bg-card/30 px-5 py-2.5 text-sm text-muted-foreground hover:border-muted-foreground/60 transition-all">
              + More
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
