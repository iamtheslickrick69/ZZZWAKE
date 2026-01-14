"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, BarChart3, Handshake, Heart, Lightbulb, Users } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const principles = [
  {
    title: "Authentic Storytelling",
    description:
      "Every business has a unique story. We help you identify and communicate yours in a way that resonates with your ideal customers.",
    icon: Sparkles,
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Every strategy is backed by performance data and clear ROI analysis. We focus on sustainable growth, not vanity metrics.",
    icon: BarChart3,
  },
  {
    title: "Flexible Partnership",
    description:
      "Whether you need ongoing support, a specific project, or team training, we adapt to your business needs and growth stage.",
    icon: Handshake,
  },
]

const beyondMarketing = [
  {
    title: "Family Man",
    description: "Husband and father, focused on building something meaningful for the future.",
    icon: Heart,
  },
  {
    title: "Creative Problem Solver",
    description: "Always looking for innovative solutions that merge creativity with strategy.",
    icon: Lightbulb,
  },
  {
    title: "Community Focused",
    description: "Believes in building relationships and helping others grow in business and life.",
    icon: Users,
  },
]

export function CorePrinciples() {
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
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        {/* Core Principles */}
        <div className="mb-24">
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Core Principles</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
              The Core Principles Behind Every <HighlightedText>Strategy</HighlightedText>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <div
                  key={principle.title}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  data-index={index}
                  className={`relative pl-8 border-l border-border transition-all duration-700 ${
                    visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Icon className="w-10 h-10 mb-4 text-accent" strokeWidth={1.25} />
                  <h3 className="text-xl font-medium mb-3">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Beyond Marketing */}
        <div>
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Beyond Marketing</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-balance">
              Beyond Marketing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {beyondMarketing.map((item, index) => {
              const Icon = item.icon
              const adjustedIndex = index + 3
              return (
                <div
                  key={item.title}
                  ref={(el) => {
                    itemRefs.current[adjustedIndex] = el
                  }}
                  data-index={adjustedIndex}
                  className={`relative pl-8 border-l border-border transition-all duration-700 ${
                    visibleItems.includes(adjustedIndex) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Icon className="w-10 h-10 mb-4 text-accent" strokeWidth={1.25} />
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            When I'm not developing strategies or analyzing campaigns, you'll find me with family, outdoors, or finding
            new ways to help business owners achieve their goals. The same drive that fueled my skating career now fuels
            my work helping businesses reach new heights.
          </p>
        </div>
      </div>
    </section>
  )
}
