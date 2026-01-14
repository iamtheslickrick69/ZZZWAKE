"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { HighlightedText } from "./highlighted-text"

const principles = [
  {
    title: "Authentic Storytelling",
    description: "Every business has a unique story. We help you identify and communicate yours in a way that resonates with your ideal customers.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Data-Driven Decisions",
    description: "Every strategy is backed by performance data and clear ROI analysis. We focus on sustainable growth, not vanity metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Flexible Partnership",
    description: "Whether you need ongoing support, a specific project, or team training, we adapt to your business needs and growth stage.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CorePrinciples() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="max-w-2xl mb-16">
          <Badge variant="outline" className="mb-4">Core Principles</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            The Foundation Behind Every <HighlightedText>Strategy</HighlightedText>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            These aren't just words on a wall — they're the foundation of every campaign we build.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle) => (
            <motion.div
              key={principle.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <div className="flex flex-col gap-4">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100">
                  <img
                    src={principle.image}
                    alt={principle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
