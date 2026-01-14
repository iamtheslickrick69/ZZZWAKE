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
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function WhoWeWorkWith() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="max-w-2xl mb-10">
          <Badge className="mb-3 bg-accent/10 text-accent border-accent/20 text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Who We Work With
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight mb-4">
            Built for Marketing Leaders Who Demand <HighlightedText>Results</HighlightedText>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We partner with companies that have existing marketing budgets and established operations. Our clients aren't looking for flashy campaigns — they want systematic improvements backed by data.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      "relative overflow-hidden rounded-2xl shadow-md",
                      isLarge ? "h-56 lg:h-[280px]" : "h-56 lg:h-[280px]"
                    )}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-500",
                          isHovered ? "scale-105" : "scale-100"
                        )}
                      />
                      {/* Always-visible gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-5 flex flex-col justify-between">
                      {/* Top Row: Icon + Stats */}
                      <div className="flex items-start justify-between">
                        {/* Icon with glow */}
                        <div className="relative">
                          <div className={cn(
                            "absolute inset-0 rounded-xl blur-lg transition-opacity duration-300",
                            `bg-gradient-to-br ${industry.color}`,
                            isHovered ? "opacity-60" : "opacity-30"
                          )} />
                          <motion.div
                            className={cn(
                              "relative w-11 h-11 rounded-xl flex items-center justify-center",
                              `bg-gradient-to-br ${industry.color}`
                            )}
                            animate={{ rotate: isHovered ? 8 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>

                        {/* Stats Badge */}
                        <div className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          {industry.stats}
                        </div>
                      </div>

                      {/* Bottom: Title + Description */}
                      <div>
                        {/* Industry short label */}
                        <span className={cn(
                          "inline-block text-[10px] font-bold uppercase tracking-wider mb-1.5 px-2 py-0.5 rounded",
                          `bg-gradient-to-r ${industry.color} text-white`
                        )}>
                          {industry.shortTitle}
                        </span>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                          {industry.title}
                        </h3>

                        {/* Description */}
                        <p className={cn(
                          "text-white/70 text-sm leading-relaxed line-clamp-2 transition-all duration-300",
                          isHovered && "text-white/90"
                        )}>
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center mt-10">
          <p className="text-muted-foreground text-sm mb-3">Don't see your industry? We work with businesses across all sectors.</p>
          <Button asChild variant="outline" size="sm">
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
