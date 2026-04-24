"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, X } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Competitions", href: "#competitions" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Resources", href: "#resources" },
  { name: "Results", href: "#results" },
  { name: "Pricing", href: "#pricing" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent group-hover:bg-accent/90 transition-colors">
            <GraduationCap className="h-6 w-6 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Scholar<span className="text-accent">Arena</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-muted transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button variant="ghost" size="sm" className="font-medium">
            Sign In
          </Button>
          <Button size="sm" className="font-semibold">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-primary">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-white/20">
              <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">Sign In</Button>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
