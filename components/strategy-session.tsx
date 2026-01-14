"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Clock, Video, Mail, Gift, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"
import { HighlightedText } from "./highlighted-text"

const benefits = [
  {
    title: "Free Strategy Insights",
    description: "Walk away with actionable recommendations you can implement immediately.",
    icon: Gift,
  },
  {
    title: "No Pressure Approach",
    description: "Our conversation is about understanding your needs, not making a sale.",
    icon: Shield,
  },
  {
    title: "Personalized Analysis",
    description: "Get specific feedback on your current marketing approach and opportunities.",
    icon: BarChart3,
  },
]

export function StrategySession() {
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
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Get Started</p>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Book Your Free 30-Minute <HighlightedText>Strategy Session</HighlightedText>
            </h2>
            <p
              className={`text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Every engagement starts with understanding your unique situation. In your free strategy session, we'll
              discuss your business goals, current marketing challenges, and opportunities for growth. You'll walk away
              with actionable recommendations — whether we work together or not.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-3 gap-8 mb-12 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="text-center">
                  <Icon className="w-10 h-10 mx-auto mb-4 text-accent" strokeWidth={1.25} />
                  <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          <div
            className={`bg-card p-8 md:p-10 border border-border text-center transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span>30 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Video className="w-5 h-5" />
                <span>Via Google Meet</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span>Response within 24 hours</span>
              </div>
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide hover:bg-accent/90 transition-colors duration-300 group mb-6"
            >
              Book Your Strategy Session
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Prefer Direct Contact?</p>
              <p className="text-sm text-muted-foreground">
                Feel free to reach out directly for quick questions or immediate needs.
              </p>
              <a href="mailto:wake@makeawakemarketing.com" className="text-accent hover:underline text-sm">
                wake@makeawakemarketing.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
