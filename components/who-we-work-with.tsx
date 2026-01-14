"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, GraduationCap, Car, Home, ArrowRight, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HighlightedText } from "./highlighted-text"
import { cn } from "@/lib/utils"
import Link from "next/link"

const industries = [
  {
    title: "Behavioral Health & Healthcare",
    shortTitle: "Healthcare",
    description: "Deep experience navigating compliance requirements, HIPAA considerations, and the unique conversion challenges in treatment center marketing.",
    icon: Heart,
    image: "/images/industries/1.jpg",
    stats: "95% retention",
    color: "from-rose-500 to-pink-600",
    size: "large",
  },
  {
    title: "Education & EdTech",
    shortTitle: "Education",
    description: "From K-12 institutions to higher education and online learning platforms, we build campaigns that speak to students, parents, and administrators.",
    icon: GraduationCap,
    image: "/images/industries/2.jpg",
    stats: "200% enrollment",
    color: "from-blue-500 to-cyan-500",
    size: "small",
  },
  {
    title: "Automotive & Motorsports",
    shortTitle: "Automotive",
    description: "High-consideration purchases require sophisticated full-funnel strategies. We map complex buyer journeys from awareness to advocacy.",
    icon: Car,
    image: "/images/industries/4.jpg",
    stats: "$2.5M+ revenue",
    color: "from-orange-500 to-amber-500",
    size: "small",
  },
  {
    title: "Home Services & Local Business",
    shortTitle: "Home Services",
    description: "Roofing, contracting, cleaning services — we've generated over $1.5M in tracked revenue through hyper-targeted local campaigns.",
    icon: Home,
    image: "/images/industries/3.jpg",
    stats: "$1.5M+ tracked",
    color: "from-emerald-500 to-teal-500",
    size: "large",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function WhoWeWorkWith() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="max-w-3xl mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Who We Work With
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
            Built for Marketing Leaders Who Demand <HighlightedText>Results</HighlightedText>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We partner with companies that have existing marketing budgets and established operations. Our clients aren't looking for flashy campaigns — they want systematic improvements backed by data.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            const isHovered = hoveredIndex === index
            const isLarge = industry.size === "large"

            return (
              <motion.div
                key={industry.title}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={cn(
                  "relative group cursor-pointer",
                  isLarge ? "lg:col-span-2" : ""
                )}
              >
                <Link href="#contact" className="block">
                  <motion.div
                    className={cn(
                      "relative overflow-hidden rounded-3xl shadow-lg",
                      isLarge ? "h-80 lg:h-[420px]" : "h-80 lg:h-[420px]"
                    )}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-700",
                          isHovered ? "scale-110" : "scale-100"
                        )}
                      />
                      {/* Always-visible gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
                      {/* Top Row: Icon + Stats (ALWAYS VISIBLE) */}
                      <div className="flex items-start justify-between">
                        {/* Icon with glow */}
                        <div className="relative">
                          <div className={cn(
                            "absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300",
                            `bg-gradient-to-br ${industry.color}`,
                            isHovered ? "opacity-60" : "opacity-30"
                          )} />
                          <motion.div
                            className={cn(
                              "relative w-16 h-16 rounded-2xl flex items-center justify-center",
                              `bg-gradient-to-br ${industry.color}`
                            )}
                            animate={{ rotate: isHovered ? 10 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>

                        {/* Stats Badge (ALWAYS VISIBLE) */}
                        <div className="bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                          {industry.stats}
                        </div>
                      </div>

                      {/* Bottom: Title + Description (ALWAYS VISIBLE) */}
                      <div>
                        {/* Industry short label */}
                        <span className={cn(
                          "inline-block text-xs font-bold uppercase tracking-wider mb-2 px-2 py-1 rounded",
                          `bg-gradient-to-r ${industry.color} text-white`
                        )}>
                          {industry.shortTitle}
                        </span>

                        {/* Title - ALWAYS VISIBLE */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {industry.title}
                        </h3>

                        {/* Description - ALWAYS VISIBLE but more visible on hover */}
                        <p className={cn(
                          "text-white/70 leading-relaxed mb-4 transition-all duration-300 line-clamp-2",
                          isHovered && "text-white/90 line-clamp-none"
                        )}>
                          {industry.description}
                        </p>

                        {/* CTA Button - Appears on hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 20
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Button
                            size="sm"
                            className={cn(
                              "text-white border-0",
                              `bg-gradient-to-r ${industry.color} hover:opacity-90`
                            )}
                          >
                            View Case Study
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover border glow */}
                    <motion.div
                      className={cn(
                        "absolute inset-0 rounded-3xl border-2 transition-opacity duration-300 pointer-events-none",
                        isHovered ? "opacity-100" : "opacity-0"
                      )}
                      style={{
                        borderImage: `linear-gradient(135deg, ${industry.color.includes('rose') ? '#f43f5e' : industry.color.includes('blue') ? '#3b82f6' : industry.color.includes('orange') ? '#f97316' : '#10b981'}, transparent) 1`
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Don't see your industry? We work with businesses across all sectors.</p>
          <Button asChild variant="outline" size="lg">
            <Link href="#contact">
              Let's Talk About Your Business
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
