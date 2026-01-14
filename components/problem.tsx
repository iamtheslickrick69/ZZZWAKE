"use client"

import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./highlighted-text"

export function Problem() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">The Problem We Solve</p>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-8 text-balance transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Most Agencies Want to Rebuild Everything. <HighlightedText>We Don't.</HighlightedText>
          </h2>

          <div
            className={`space-y-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p>
              Established companies with dedicated marketing budgets face a frustrating reality: agencies want to tear
              everything down and start fresh. They dismiss your existing campaigns, ignore your institutional
              knowledge, and charge premium fees to "reimagine your brand."
            </p>

            <p className="text-foreground font-medium">We take a different approach.</p>

            <p>
              MAW Marketing specializes in optimization over reconstruction. We audit your current spend, identify
              what's already working, eliminate the waste, and systematically improve performance — all while training
              your team to maintain the systems we build together.
            </p>

            <p>
              The result? Better ROAS, predictable lead flow, and marketing infrastructure that actually scales with
              your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
