"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowRight, TrendingUp, DollarSign, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HighlightedText } from "./highlighted-text"
import { cn } from "@/lib/utils"
import Link from "next/link"

const oldWay = [
  "Tear down everything & start fresh",
  "Ignore your institutional knowledge",
  "Charge premium fees to 'reimagine'",
  "Cookie-cutter solutions",
  "6+ month rebuilds",
]

const mawWay = [
  "Optimize what's already working",
  "Build on your existing foundation",
  "Eliminate waste, maximize ROI",
  "Custom strategies for your business",
  "Results in weeks, not months",
]

const benefits = [
  { icon: TrendingUp, label: "340% Avg ROI", desc: "Return on ad spend" },
  { icon: DollarSign, label: "$2M+ Saved", desc: "In wasted ad spend" },
  { icon: Users, label: "95% Retention", desc: "Client satisfaction" },
  { icon: Zap, label: "2 Week Start", desc: "Time to first results" },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Problem() {
  const [hoveredCard, setHoveredCard] = useState<"old" | "maw" | null>(null)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Accent glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">The Problem We Solve</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
            Most Agencies Want to Rebuild Everything.
            <br />
            <span className="text-accent">We Don't.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Established companies face a frustrating reality: agencies want to tear everything down.
            We take a different approach.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Old Way Card */}
          <motion.div
            onHoverStart={() => setHoveredCard("old")}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -5 }}
            className={cn(
              "relative rounded-2xl p-8 transition-all duration-300 border-2",
              hoveredCard === "old"
                ? "bg-red-500/10 border-red-500/50"
                : "bg-white/5 border-white/10"
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                hoveredCard === "old" ? "bg-red-500" : "bg-red-500/20"
              )}>
                <X className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The Old Way</h3>
                <p className="text-sm text-slate-400">Traditional agencies</p>
              </div>
            </div>

            <ul className="space-y-4">
              {oldWay.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* MAW Way Card */}
          <motion.div
            onHoverStart={() => setHoveredCard("maw")}
            onHoverEnd={() => setHoveredCard(null)}
            whileHover={{ y: -5 }}
            className={cn(
              "relative rounded-2xl p-8 transition-all duration-300 border-2",
              hoveredCard === "maw"
                ? "bg-accent/20 border-accent"
                : "bg-white/5 border-white/10"
            )}
          >
            {/* Recommended badge */}
            <div className="absolute -top-3 right-6">
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                hoveredCard === "maw" ? "bg-accent" : "bg-accent/20"
              )}>
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The MAW Way</h3>
                <p className="text-sm text-slate-400">Our approach</p>
              </div>
            </div>

            <ul className="space-y-4">
              {mawWay.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-accent/50 transition-colors"
            >
              <benefit.icon className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{benefit.label}</p>
              <p className="text-xs text-slate-400">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-slate-400 mb-6">
            Ready for marketing that builds on your success instead of tearing it down?
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
            <Link href="#contact">
              Get Your Free Audit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
