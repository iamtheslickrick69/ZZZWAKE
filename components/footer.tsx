"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Instagram, Mail, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    href: "mailto:hello@makeawake.com",
    label: "Email",
  },
]

const mainLinks = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
]

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
]

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient accent border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />

      <div className="relative pb-8 pt-20 lg:pb-12 lg:pt-28">
        <div className="container mx-auto px-6">
          {/* Top Section: Logo + Social */}
          <div className="md:flex md:items-start md:justify-between mb-12">
            {/* Logo + Tagline */}
            <Link
              href="/"
              className="flex items-center gap-4 group"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              <div className="relative overflow-hidden rounded-xl bg-foreground/5 p-3 transition-all duration-300 group-hover:bg-foreground/10">
                <img
                  src="/images/maw-logo.png"
                  alt="MAW Marketing"
                  className="h-10 w-auto transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="font-bold text-xl block">MAW Marketing</span>
                <span className="text-xs text-muted-foreground">Growth Through Storytelling</span>
              </div>
            </Link>

            {/* Social Icons */}
            <ul className="flex list-none mt-8 md:mt-0 gap-3">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                      "h-11 w-11 rounded-full transition-all duration-300",
                      "hover:scale-110 hover:bg-accent hover:text-accent-foreground",
                      "hover:shadow-lg hover:shadow-accent/20"
                    )}
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                      {link.icon}
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Section: CTA Banner */}
          <div className="mb-12 p-6 md:p-8 rounded-2xl bg-foreground text-background flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to grow?</h3>
              <p className="text-background/70 text-sm md:text-base">
                Let's talk about turning your marketing into predictable revenue.
              </p>
            </div>
            <Link
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 whitespace-nowrap"
            >
              Book a Call
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Links Grid */}
          <div className="border-t border-border pt-8 lg:grid lg:grid-cols-10 gap-8">
            {/* Main Navigation */}
            <nav className="lg:col-[4/11]">
              <ul className="list-none flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
                {mainLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-sm text-foreground font-medium underline-offset-4 hover:underline hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal Links */}
            <div className="mt-4 lg:mt-0 lg:col-[4/11]">
              <ul className="list-none flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
                {legalLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-sm leading-6 text-muted-foreground lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
              <div>© 2026 MAW Marketing</div>
              <div>Wake Schepman. All rights reserved.</div>
            </div>
          </div>

          {/* Bottom flourish */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-3 text-xs text-muted-foreground/50">
              <span className="h-px w-12 bg-border" />
              <span>Made with strategy + storytelling</span>
              <span className="h-px w-12 bg-border" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
