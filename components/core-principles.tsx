"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, BarChart3, Handshake, Heart, Lightbulb, Users, Check, ArrowRight, X } from "lucide-react"
import { HighlightedText } from "./highlighted-text"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const principles = [
  {
    title: "Authentic Storytelling",
    description: "Every business has a unique story. We help you identify and communicate yours in a way that resonates with your ideal customers.",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    details: [
      "Discover your brand's unique voice",
      "Connect emotionally with customers",
      "Stand out from competitors",
      "Build lasting brand loyalty",
    ],
  },
  {
    title: "Data-Driven Decisions",
    description: "Every strategy is backed by performance data and clear ROI analysis. We focus on sustainable growth, not vanity metrics.",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
    details: [
      "Real-time performance tracking",
      "Clear ROI on every dollar spent",
      "A/B testing everything",
      "Actionable insights, not reports",
    ],
  },
  {
    title: "Flexible Partnership",
    description: "Whether you need ongoing support, a specific project, or team training, we adapt to your business needs and growth stage.",
    icon: Handshake,
    color: "from-green-500 to-emerald-500",
    details: [
      "Scale up or down as needed",
      "Project-based or retainer",
      "Team training & enablement",
      "Transparent communication",
    ],
  },
]

const beyondMarketing = [
  {
    title: "Family Man",
    description: "Husband and father, focused on building something meaningful for the future.",
    icon: Heart,
    emoji: "👨‍👩‍👧",
  },
  {
    title: "Creative Problem Solver",
    description: "Always looking for innovative solutions that merge creativity with strategy.",
    icon: Lightbulb,
    emoji: "💡",
  },
  {
    title: "Community Focused",
    description: "Believes in building relationships and helping others grow in business and life.",
    icon: Users,
    emoji: "🤝",
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

export function CorePrinciples() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [hoveredBeyond, setHoveredBeyond] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Core Principles Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-32"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-3xl mb-16">
            <Badge variant="outline" className="mb-4">Core Principles</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
              The Core Principles Behind Every <HighlightedText>Strategy</HighlightedText>
            </h2>
            <p className="text-lg text-muted-foreground">
              These aren't just words on a wall — they're the foundation of every campaign we build.
            </p>
          </motion.div>

          {/* Interactive Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              const isExpanded = expandedCard === index

              return (
                <motion.div
                  key={principle.title}
                  variants={itemVariants}
                  onClick={() => setExpandedCard(isExpanded ? null : index)}
                  className="cursor-pointer"
                >
                  <motion.div
                    className={cn(
                      "relative h-full rounded-2xl border-2 p-6 transition-all duration-300",
                      isExpanded
                        ? "bg-slate-900 border-slate-800 text-white shadow-2xl"
                        : "bg-white border-slate-200 hover:border-accent/50 hover:shadow-xl"
                    )}
                    whileHover={{ y: -5 }}
                    layout
                  >
                    {/* Gradient Icon Background */}
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all",
                      isExpanded
                        ? `bg-gradient-to-br ${principle.color}`
                        : "bg-accent/10"
                    )}>
                      <Icon className={cn(
                        "w-7 h-7 transition-colors",
                        isExpanded ? "text-white" : "text-accent"
                      )} />
                    </div>

                    {/* Title */}
                    <h3 className={cn(
                      "text-xl font-bold mb-3 transition-colors",
                      isExpanded ? "text-white" : "text-slate-900"
                    )}>
                      {principle.title}
                    </h3>

                    {/* Description */}
                    <p className={cn(
                      "leading-relaxed mb-4 transition-colors",
                      isExpanded ? "text-slate-300" : "text-muted-foreground"
                    )}>
                      {principle.description}
                    </p>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-slate-700 space-y-3">
                            {principle.details.map((detail, i) => (
                              <motion.div
                                key={detail}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <Check className="w-4 h-4 text-accent flex-shrink-0" />
                                <span className="text-sm text-slate-300">{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand Indicator */}
                    <div className={cn(
                      "flex items-center gap-2 text-sm font-medium mt-4 transition-colors",
                      isExpanded ? "text-accent" : "text-accent"
                    )}>
                      {isExpanded ? (
                        <>
                          <span>Close</span>
                          <X className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Learn more</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Beyond Marketing Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-3xl mb-16">
            <Badge variant="outline" className="mb-4">Beyond Marketing</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
              The Person Behind the <HighlightedText>Work</HighlightedText>
            </h2>
            <p className="text-lg text-muted-foreground">
              When I'm not crafting campaigns, here's what drives me.
            </p>
          </motion.div>

          {/* Interactive Beyond Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {beyondMarketing.map((item, index) => {
              const Icon = item.icon
              const isHovered = hoveredBeyond === index

              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredBeyond(index)}
                  onHoverEnd={() => setHoveredBeyond(null)}
                  className="relative"
                >
                  <motion.div
                    className="relative h-full rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all duration-300 hover:border-accent hover:shadow-xl overflow-hidden"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Emoji + Icon */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                          isHovered ? "bg-accent text-white" : "bg-slate-100 text-accent"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Closing Statement */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 md:p-12 text-white overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-3xl">
              <p className="text-lg md:text-xl leading-relaxed text-slate-300">
                When I'm not developing strategies or analyzing campaigns, you'll find me with family, outdoors, or finding new ways to help business owners achieve their goals.
              </p>
              <p className="text-xl md:text-2xl font-bold mt-4 text-white">
                The same drive that fueled my skating career now fuels my work helping businesses reach new heights.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
