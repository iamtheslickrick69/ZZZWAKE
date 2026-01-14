"use client"

import { useState, useEffect, useRef } from "react"
import { HighlightedText } from "./highlighted-text"

const caseStudies = [
  {
    id: 1,
    title: "Healthcare Practice — Multi-Channel Dominance",
    tags: ["Paid Social", "Multi-Channel", "Healthcare"],
    industry: "Behavioral Health",
    challenge:
      "A behavioral health organization relied almost entirely on organic search and paid search for website traffic. Social channels contributed fewer than 300 visits per month and generated virtually zero leads. Leadership needed to diversify acquisition channels without sacrificing lead quality.",
    solution:
      "We launched coordinated paid campaigns across Meta, TikTok, and LinkedIn with messaging specifically crafted for healthcare compliance. Creative assets focused on clinically valuable content that resonated with families seeking treatment options.",
    metrics: [
      { value: "10M+", label: "Total Impressions" },
      { value: "264K", label: "Content Visits" },
      { value: "7.6%", label: "Click-Through Rate" },
      { value: "$0.10", label: "Cost Per Click" },
      { value: "99%", label: "Increase in Calls" },
      { value: "25%", label: "YoY Growth" },
    ],
  },
  {
    id: 2,
    title: "Nomi Health — Growth & Product Marketing",
    tags: ["Health Tech", "Enterprise", "Multi-Channel", "Performance Marketing"],
    industry: "Health Tech",
    challenge:
      "Nomi Health was scaling rapidly across multiple healthcare products but faced a dual challenge: boost utilization and revenue. With multiple audiences (patients, providers, and partners) and fragmented processes, they needed unified strategies, clearer measurement, and scalable systems.",
    solution:
      "We designed and executed multi-audience engagement campaigns across digital and traditional channels. Developed a multi-channel content strategy to strengthen product visibility and brand awareness. Built dashboards to measure marketing effectiveness, tying campaign performance directly to business outcomes.",
    metrics: [
      { value: "+103%", label: "Utilization Growth" },
      { value: "+74%", label: "Revenue Growth" },
      { value: "$37M", label: "Ad Spend Managed" },
    ],
  },
  {
    id: 3,
    title: "Racecar Company — Customer Research That Shaped Product Roadmap",
    tags: ["Customer Research", "Product Strategy", "ICP Development"],
    industry: "Automotive/Motorsports",
    challenge:
      "The company needed clarity on who their ideal customers were, what truly mattered to them in ownership, and how to prioritize product development and marketing channels.",
    solution:
      "We conducted in-depth customer interviews with current owners, waitlist customers, and potential buyers. Analyzed website and social engagement data to uncover buying process insights. Developed Ideal Customer Profiles and three detailed buyer personas.",
    metrics: [
      { value: "3", label: "Buyer Personas Created" },
      { value: "5", label: "High-Demand Features" },
      { value: "Full", label: "Journey Mapping" },
    ],
  },
  {
    id: 4,
    title: "Rain Roofing Pros — $500K+ Campaign Performance",
    tags: ["Lead Generation", "Outreach", "Home Services"],
    industry: "Home Services",
    challenge:
      "Rain Roofing Pros was scaling quickly with plans to expand into five major Texas metroplexes. The challenge was generating enough quality leads to fuel rapid growth. Traditional lead-gen channels were saturated and expensive.",
    solution:
      "We designed and executed non-traditional outreach campaigns that leveraged untapped contact opportunities. Built and launched voicemail drop campaigns. Integrated targeted email campaigns and developed a strategy to repurpose an underutilized contact list into a high-conversion pipeline.",
    metrics: [
      { value: "40+", label: "Leads in 30 Min" },
      { value: "$500K+", label: "Single Campaign" },
      { value: "$1M+", label: "Total Revenue" },
    ],
  },
  {
    id: 5,
    title: "Window Washing Service — $4,500 → $50K Revenue Growth",
    tags: ["Facebook Ads", "Local Business", "ROI"],
    industry: "Local Services",
    challenge:
      "Jeremy was running ads but struggling to make them profitable. Facebook campaigns felt discouraging, with costs adding up and little return. He needed a simple, effective ad strategy that could reliably bring in customers.",
    solution:
      "We built and launched a single high-performing Facebook ad that ran profitably for over a year with no major changes. Provided ongoing coaching to help Jeremy understand his ads. Optimized creative and targeting when performance began to slip, cutting his cost per lead in half.",
    metrics: [
      { value: "$50K+", label: "Revenue Generated" },
      { value: "10x", label: "Return on Ad Spend" },
      { value: "459", label: "Messages at $9.86" },
    ],
  },
  {
    id: 6,
    title: "Google Ads Coaching — Training 300+ Entrepreneurs",
    tags: ["Coaching", "Google Ads", "Training"],
    industry: "Education/Coaching",
    challenge:
      "Many business owners wanted to run Google Ads but felt overwhelmed. Most wasted money on poorly structured campaigns or lacked the skills to scale.",
    solution:
      "For the past 2.5-3 years, we coached 3-5 entrepreneurs every week — totaling 300-400+ hours of hands-on training. Sessions covered launching first-ever ad campaigns, troubleshooting, building repeatable systems, and real-time coaching to cut wasted spend.",
    metrics: [
      { value: "300+", label: "Entrepreneurs Trained" },
      { value: "400+", label: "Hours of Coaching" },
      { value: "Nationwide", label: "Program Reach" },
    ],
  },
]

export function CaseStudies() {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedCards((prev) => new Set(prev).add(caseStudies[index].id))
            }
          }
        })
      },
      { threshold: 0.15 },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="results" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Proof of Performance</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
            Real Challenges. Systematic Solutions. <HighlightedText>Measurable Results.</HighlightedText>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`bg-card border border-border p-8 transition-all duration-700 ${
                revealedCards.has(study.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index % 2) * 150}ms` }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {study.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-2">Industry: {study.industry}</p>
              <h3 className="text-xl font-medium mb-4">{study.title}</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">The Challenge:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">The Solution:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">The Results:</p>
                <div className="grid grid-cols-3 gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-2xl font-medium text-accent">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
