"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, GraduationCap, Car, Home } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const industries = [
  {
    title: "Behavioral Health & Healthcare",
    description:
      "Deep experience navigating compliance requirements, HIPAA considerations, and the unique conversion challenges in treatment center marketing. We understand the sensitivity required when reaching families in crisis.",
    icon: Heart,
  },
  {
    title: "Education & EdTech",
    description:
      "From K-12 institutions to higher education and online learning platforms, we build campaigns that speak to students, parents, and administrators with distinct messaging tracks.",
    icon: GraduationCap,
  },
  {
    title: "Automotive & Motorsports",
    description:
      "High-consideration purchases require sophisticated full-funnel strategies. We've helped racing companies identify ideal customer profiles and map complex buyer journeys from awareness to advocacy.",
    icon: Car,
  },
  {
    title: "Home Services & Local Business",
    description:
      "Roofing, contracting, cleaning services — we've generated over $1.5M in tracked revenue for service businesses through non-traditional outreach and hyper-targeted local campaigns.",
    icon: Home,
  },
]

export function WhoWeWorkWith() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Who We Work With</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
            Built for Marketing Leaders Who Demand <HighlightedText>Results</HighlightedText>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We partner with companies that have existing marketing budgets and established operations. Our clients
            aren't looking for flashy campaigns — they want systematic improvements backed by data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <div
                key={industry.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                >
                  <Icon className="w-10 h-10 mb-4 text-accent" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-3">{industry.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
