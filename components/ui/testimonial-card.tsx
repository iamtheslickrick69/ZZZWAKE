"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Star, ArrowRight, X, Quote, Heart, Briefcase, Home, Wrench, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { BookCallButton } from "@/components/ui/book-call-button"
import Link from "next/link"

// --- Type Definitions ---
export interface Stat {
  value: string
  label: string
}

export interface Testimonial {
  name: string
  title: string
  company: string
  quote: string
  avatarSrc: string
  rating: number
  industry?: "healthcare" | "business" | "home-services" | "roofing" | "other"
}

export interface TestimonialSectionProps {
  tagLabel?: string
  title: string
  titleHighlight?: string
  subtitle: string
  stats: Stat[]
  testimonials: Testimonial[]
  primaryActionLabel?: string
  secondaryActionLabel?: string
  className?: string
}

// Character limits for truncation
const QUOTE_CHAR_LIMIT = 150
const FEATURED_QUOTE_CHAR_LIMIT = 350

// Industry icon mapping
const industryConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  healthcare: { icon: Heart, label: "Healthcare", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  business: { icon: Briefcase, label: "Business", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  "home-services": { icon: Home, label: "Home Services", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  roofing: { icon: Wrench, label: "Roofing", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  other: { icon: Building2, label: "Business", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
}

// --- Testimonial Card ---
const TestimonialCard = ({
  testimonial,
  isFeatured = false,
  onExpand,
  isVisible,
  index,
}: {
  testimonial: Testimonial
  isFeatured?: boolean
  onExpand: () => void
  isVisible: boolean
  index: number
}) => {
  const charLimit = isFeatured ? FEATURED_QUOTE_CHAR_LIMIT : QUOTE_CHAR_LIMIT
  const isLongQuote = testimonial.quote.length > charLimit
  const displayQuote = isLongQuote
    ? testimonial.quote.slice(0, charLimit).trim() + "..."
    : testimonial.quote

  const industry = industryConfig[testimonial.industry || "other"]
  const IndustryIcon = industry.icon

  return (
    <div
      className={cn(
        "group relative bg-card border border-border rounded-xl p-5 h-full flex flex-col transition-all duration-500",
        "hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1",
        isFeatured && "md:col-span-2 bg-gradient-to-br from-accent/5 via-card to-card border-accent/20",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute -top-3 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
          Featured Review
        </div>
      )}

      {/* Header: Avatar + Info */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={testimonial.avatarSrc}
          alt={testimonial.name}
          className={cn(
            "rounded-full object-cover ring-2 transition-all duration-300",
            isFeatured
              ? "w-14 h-14 ring-accent/30"
              : "w-12 h-12 ring-border group-hover:ring-accent/30"
          )}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground truncate">{testimonial.title}</p>
          <p className="text-sm text-accent truncate">{testimonial.company}</p>
        </div>
        {/* Industry Badge */}
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium",
          industry.color
        )}>
          <IndustryIcon className="w-3 h-3" />
          <span className="hidden sm:inline">{industry.label}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4 transition-colors",
              i < Math.floor(testimonial.rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground/30"
            )}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-muted-foreground">
          {testimonial.rating.toFixed(1)}
        </span>
      </div>

      {/* Quote */}
      <blockquote className={cn(
        "text-muted-foreground leading-relaxed flex-1",
        isFeatured ? "text-base" : "text-sm"
      )}>
        "{displayQuote}"
      </blockquote>

      {/* Expand Button - only for long quotes */}
      {isLongQuote && (
        <button
          onClick={onExpand}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors group/btn"
        >
          Read Full
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      )}
    </div>
  )
}

// --- Full Testimonial Modal ---
const TestimonialModal = ({
  testimonial,
  isOpen,
  onClose,
}: {
  testimonial: Testimonial | null
  isOpen: boolean
  onClose: () => void
}) => {
  if (!testimonial) return null

  const industry = industryConfig[testimonial.industry || "other"]
  const IndustryIcon = industry.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden" showCloseButton={false}>
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-background/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-start gap-4">
            <img
              src={testimonial.avatarSrc}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-accent/20"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-foreground">{testimonial.name}</h3>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium",
                  industry.color
                )}>
                  <IndustryIcon className="w-3 h-3" />
                  <span>{industry.label}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.title}</p>
              <p className="text-accent font-medium">{testimonial.company}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-lg font-bold text-foreground">{testimonial.rating.toFixed(1)}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.floor(testimonial.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="p-6 pt-2">
          <Quote className="w-10 h-10 text-accent/20 mb-2" strokeWidth={1} />
          <blockquote className="text-lg text-foreground/90 leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Main Component: Bento Grid + Expand ---
export const TestimonialSection = ({
  tagLabel = "Client Love",
  title = "Relationships",
  titleHighlight = "Revenue",
  subtitle = "Because great marketing starts with trust.",
  stats,
  testimonials,
  primaryActionLabel = "Book a Call",
  secondaryActionLabel = "See Results",
  className,
}: TestimonialSectionProps) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the card animations
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])])
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [testimonials])

  const handleExpand = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedTestimonial(null), 200)
  }

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full overflow-hidden py-24 md:py-32", className)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          {/* Title Section */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm mb-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">{tagLabel}</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
              {title}{" "}
              <span className="text-accent">
                &gt; {titleHighlight}
              </span>
            </h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {/* Stats Pills */}
          <div className="flex gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center bg-card border border-border rounded-xl px-5 py-3 transition-all duration-300 hover:border-accent/30 hover:shadow-lg"
              >
                <span className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              isFeatured={index === 0}
              onExpand={() => handleExpand(testimonial)}
              isVisible={visibleCards.includes(index)}
              index={index}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button variant="outline" size="lg" className="rounded-full px-8 transition-all duration-300 hover:shadow-lg" asChild>
            <Link href="#results">{secondaryActionLabel}</Link>
          </Button>
          <BookCallButton
            variant="compact"
            label={primaryActionLabel}
          />
        </div>
      </div>

      {/* Modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </section>
  )
}
