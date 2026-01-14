"use client"

import AnimatedCardStack from "@/components/ui/animate-card-animation"

export function BlogSection() {
  return (
    <section id="blog" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.25em] uppercase mb-4">
            Latest Articles
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Insights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Strategies, tips, and lessons learned from helping businesses grow through authentic marketing.
          </p>
        </div>

        {/* Animated Card Stack */}
        <AnimatedCardStack />
      </div>
    </section>
  )
}
