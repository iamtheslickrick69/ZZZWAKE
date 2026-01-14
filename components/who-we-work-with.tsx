"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, GraduationCap, Car, Home, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HighlightedText } from "./highlighted-text"
import { cn } from "@/lib/utils"
import Link from "next/link"

const industries = [
  {
    title: "Behavioral Health & Healthcare",
    description: "Deep experience navigating compliance requirements, HIPAA considerations, and the unique conversion challenges in treatment center marketing.",
    icon: Heart,
    image: "/images/industries/1.jpg",
    stats: "95% client retention",
    size: "large",
  },
  {
    title: "Education & EdTech",
    description: "From K-12 institutions to higher education and online learning platforms, we build campaigns that speak to students, parents, and administrators.",
    icon: GraduationCap,
    image: "/images/industries/2.jpg",
    stats: "200% avg enrollment lift",
    size: "small",
  },
  {
    title: "Automotive & Motorsports",
    description: "High-consideration purchases require sophisticated full-funnel strategies. We map complex buyer journeys from awareness to advocacy.",
    icon: Car,
    image: "/images/industries/4.jpg",
    stats: "$2.5M+ revenue generated",
    size: "small",
  },
  {
    title: "Home Services & Local Business",
    description: "Roofing, contracting, cleaning services — we've generated over $1.5M in tracked revenue through hyper-targeted local campaigns.",
    icon: Home,
    image: "/images/industries/3.jpg",
    stats: "$1.5M+ tracked revenue",
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
    <section className="py-24 md:py-32 bg-slate-50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4">Who We Work With</Badge>
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
                      "relative overflow-hidden rounded-2xl",
                      isLarge ? "h-80 lg:h-96" : "h-80 aspect-square lg:aspect-auto"
                    )}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
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
                      {/* Gradient Overlay */}
                      <div className={cn(
                        "absolute inset-0 transition-all duration-500",
                        isHovered
                          ? "bg-gradient-to-t from-black/90 via-black/60 to-black/30"
                          : "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      )} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">
                      {/* Top: Icon + Stats */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300",
                            isHovered ? "bg-accent" : "bg-white/20 backdrop-blur-sm"
                          )}
                          animate={{ rotate: isHovered ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-accent text-white text-sm font-bold px-3 py-1.5 rounded-full"
                        >
                          {industry.stats}
                        </motion.div>
                      </div>

                      {/* Bottom: Title + Description */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {industry.title}
                        </h3>

                        <motion.p
                          className="text-white/80 leading-relaxed mb-4"
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: isHovered ? 1 : 0.7 }}
                        >
                          {industry.description}
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                          className="flex items-center gap-2 text-accent font-semibold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
