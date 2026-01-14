"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BookCallButton } from "@/components/ui/book-call-button"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ]

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle scroll direction and progress
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

      // Calculate scroll progress
      const progress = (currentScrollY / scrollHeight) * 100
      setScrollProgress(progress)

      // Determine if scrolled past hero (for glass → blue transition)
      setScrolled(currentScrollY > 100)

      // Hide/show based on scroll direction (only when scrolled past 200px)
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          setHidden(true)
        } else if (lastScrollY > currentScrollY && lastScrollY - currentScrollY > 10) {
          setHidden(false)
        }
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Track active section with Intersection Observer
  useEffect(() => {
    const sectionIds = ["services", "results", "about", "team", "faq"]

    const observerOptions = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    closeMobileMenu()
  }

  return (
    <header
      className={cn(
        // Base styles - always floating pill
        "fixed z-50 top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl",
        "rounded-2xl border transition-all duration-700 ease-out overflow-hidden",
        // Page load animation
        mounted
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4",
        // LIQUID GLASS at top → SOLID BLUE when scrolled
        scrolled
          ? "bg-accent/95 backdrop-blur-xl border-accent/20 shadow-2xl shadow-accent/20"
          : "bg-white/[0.08] backdrop-blur-2xl border-white/[0.15] shadow-xl shadow-black/10",
        // Hide on scroll down
        hidden && !mobileMenuOpen && "-translate-y-[150%] opacity-0",
      )}
    >
      {/* Frosted glass inner glow - only in glass state */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 pointer-events-none",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Top inner glow */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/[0.12] to-transparent" />
        {/* Bottom subtle shadow */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/[0.05] to-transparent" />
        {/* Left edge highlight */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/[0.08] to-transparent" />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Blue state inner glow */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 pointer-events-none",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/[0.08] to-transparent" />
      </div>

      {/* Scroll Progress Bar - only when scrolled (blue state) */}
      <div
        className={cn(
          "absolute bottom-0 left-4 right-4 h-[2px] rounded-full overflow-hidden transition-opacity duration-300 z-10",
          scrolled ? "bg-white/20" : "bg-white/10",
          scrolled && !mobileMenuOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className="h-full bg-white/80 rounded-full transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Subtle top highlight */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px rounded-t-2xl transition-all duration-700 z-10",
          scrolled
            ? "bg-gradient-to-r from-transparent via-white/30 to-transparent"
            : "bg-gradient-to-r from-transparent via-white/50 to-transparent"
        )}
      />

      <nav className="relative z-10 mx-auto px-5 lg:px-6 py-3 flex items-center justify-between">
        {/* Logo with micro-interaction */}
        <Link
          href="/"
          className="flex items-center gap-3 group relative"
          onClick={scrollToTop}
        >
          <div className="overflow-hidden rounded-xl relative">
            {/* Glow effect on hover */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300 rounded-xl blur-xl scale-150 opacity-0 group-hover:opacity-100",
                scrolled ? "group-hover:bg-white/30" : "group-hover:bg-accent/20"
              )}
            />
            <img
              src="/images/maw-logo-white.png"
              alt="MAW Marketing"
              className="h-9 w-auto relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "")
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative px-3 py-2 text-[15px] font-medium transition-all duration-300 group",
                  isActive
                    ? scrolled ? "text-white" : "text-accent"
                    : scrolled
                      ? "text-white/70 hover:text-white"
                      : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
                {/* Underline indicator */}
                <span
                  className={cn(
                    "absolute bottom-1 left-3 right-3 h-[2px] rounded-full transition-all duration-300 origin-left",
                    scrolled ? "bg-white" : "bg-accent",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <BookCallButton
            variant="header"
            scrolled={scrolled}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2 transition-colors duration-300 text-white hover:text-white/80"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="relative w-6 h-6">
            <span
              className={cn(
                "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
                mobileMenuOpen ? "top-3 rotate-45" : "top-1.5",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-3 h-0.5 w-6 bg-current transition-all duration-300",
                mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-0.5 w-6 bg-current transition-all duration-300",
                mobileMenuOpen ? "top-3 -rotate-45" : "top-[18px]",
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-out relative z-10",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="mx-auto px-6 pb-6">
          {/* Logo in mobile menu */}
          <div className="flex justify-center mb-4">
            <img
              src="/images/maw-logo-white.png"
              alt="MAW Marketing"
              className="h-8 w-auto opacity-40"
            />
          </div>

          <div className="h-px bg-white/10 mb-4" />

          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <li
                  key={item.label}
                  style={{ transitionDelay: mobileMenuOpen ? `${index * 75}ms` : "0ms" }}
                  className={cn(
                    "transition-all duration-300",
                    mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                  )}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "flex items-center gap-3 py-2.5 text-xl font-light transition-colors duration-300",
                      isActive
                        ? scrolled ? "text-white" : "text-accent"
                        : "text-white hover:text-white/80"
                    )}
                  >
                    {isActive && (
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full animate-pulse",
                          scrolled ? "bg-white" : "bg-accent"
                        )}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className={cn(
              "mt-6 transition-all duration-300 flex justify-center",
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: mobileMenuOpen ? "400ms" : "0ms" }}
          >
            <BookCallButton
              variant="header"
              scrolled={scrolled}
              onClick={closeMobileMenu}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
