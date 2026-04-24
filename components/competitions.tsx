"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const competitions = [
  {
    id: 1,
    title: "National History Bee",
    subject: "History",
    date: "May 21-25, 2026",
    location: "Orlando, FL",
    participants: 1250,
    status: "registration",
    statusLabel: "Registration Open",
    level: "Middle & Elementary",
    description: "Test your knowledge of world and American history in this prestigious national competition.",
  },
  {
    id: 2,
    title: "National Science Bee",
    subject: "Science",
    date: "April 23-26, 2026",
    location: "Arlington, VA",
    participants: 890,
    status: "registration",
    statusLabel: "Registration Open",
    level: "Varsity & JV",
    description: "Compete in biology, chemistry, physics, and earth science at the national level.",
  },
  {
    id: 3,
    title: "Geography Championships",
    subject: "Geography",
    date: "June 15-18, 2026",
    location: "Bangkok, Thailand",
    participants: 450,
    status: "upcoming",
    statusLabel: "Coming Soon",
    level: "International",
    description: "Join students from around the world for the International Geography Championships.",
  },
  {
    id: 4,
    title: "Regional History Bowl",
    subject: "History",
    date: "March 28, 2026",
    location: "Multiple Locations",
    participants: 2100,
    status: "live",
    statusLabel: "LIVE",
    level: "All Levels",
    description: "Team-based competition featuring buzzer rounds and collaborative problem-solving.",
  },
  {
    id: 5,
    title: "Online Qualifying Exam",
    subject: "Multi-Subject",
    date: "April 1-15, 2026",
    location: "Online",
    participants: 5000,
    status: "registration",
    statusLabel: "Open Now",
    level: "All Levels",
    description: "Take the qualifying exam from anywhere to earn your spot at Nationals.",
  },
  {
    id: 6,
    title: "Citizenship Bee",
    subject: "Civics",
    date: "May 10, 2026",
    location: "Washington, D.C.",
    participants: 320,
    status: "upcoming",
    statusLabel: "Coming Soon",
    level: "Middle School",
    description: "Demonstrate your understanding of American government and civic principles.",
  },
]

const statusStyles = {
  live: "bg-secondary text-secondary-foreground",
  registration: "bg-primary text-primary-foreground",
  upcoming: "bg-muted text-muted-foreground",
}

export function Competitions() {
  return (
    <section id="competitions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Platform Capabilities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Competition Examples We Support
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Browse our upcoming academic competitions for students of all grade levels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {competitions.map((competition) => (
            <Card key={competition.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge className={statusStyles[competition.status as keyof typeof statusStyles]}>
                    {competition.status === "live" && (
                      <span className="mr-1.5 h-2 w-2 rounded-full bg-current animate-pulse" />
                    )}
                    {competition.statusLabel}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {competition.level}
                  </Badge>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {competition.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {competition.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 pb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {competition.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {competition.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    {competition.participants.toLocaleString()} registered
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button className="w-full gap-2 group/btn" variant={competition.status === "live" ? "default" : "outline"}>
                  {competition.status === "live" ? "View Live" : "Learn More"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            View All Competitions
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
