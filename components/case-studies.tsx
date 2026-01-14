"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HighlightedText } from "./highlighted-text"
import { cn } from "@/lib/utils"
import { ArrowRight, X } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    number: "01",
    title: "Healthcare Practice",
    industry: "Behavioral Health",
    before: { value: "300", label: "visits/month" },
    after: { value: "10M+", label: "impressions" },
    highlight: "99% More Calls",
    challenge: "A behavioral health organization relied almost entirely on organic search and paid search for website traffic. Social channels contributed fewer than 300 visits per month and generated virtually zero leads.",
    solution: "We launched coordinated paid campaigns across Meta, TikTok, and LinkedIn with messaging specifically crafted for healthcare compliance.",
  },
  {
    id: 2,
    number: "02",
    title: "Nomi Health",
    industry: "Health Tech",
    before: { value: "Fragmented", label: "processes" },
    after: { value: "+103%", label: "utilization" },
    highlight: "+74% Revenue",
    challenge: "Nomi Health was scaling rapidly across multiple healthcare products but faced a dual challenge: boost utilization and revenue with fragmented processes.",
    solution: "We designed and executed multi-audience engagement campaigns across digital and traditional channels with dashboards tying performance to outcomes.",
  },
  {
    id: 3,
    number: "03",
    title: "Racecar Company",
    industry: "Automotive",
    before: { value: "0", label: "customer clarity" },
    after: { value: "3", label: "buyer personas" },
    highlight: "Full Journey Map",
    challenge: "The company needed clarity on who their ideal customers were and how to prioritize product development and marketing channels.",
    solution: "We conducted in-depth customer interviews and developed Ideal Customer Profiles with three detailed buyer personas.",
  },
  {
    id: 4,
    number: "04",
    title: "Rain Roofing Pros",
    industry: "Home Services",
    before: { value: "Saturated", label: "channels" },
    after: { value: "40+", label: "leads in 30min" },
    highlight: "$1M+ Revenue",
    challenge: "Scaling quickly with plans to expand into five major Texas metroplexes. Traditional lead-gen channels were saturated and expensive.",
    solution: "We designed non-traditional outreach campaigns including voicemail drops and targeted email campaigns for high-conversion.",
  },
  {
    id: 5,
    number: "05",
    title: "Window Washing Co",
    industry: "Local Services",
    before: { value: "$4,500", label: "struggling" },
    after: { value: "$50K+", label: "revenue" },
    highlight: "10x ROAS",
    challenge: "Struggling to make Facebook ads profitable with costs adding up and little return. Needed a simple, effective strategy.",
    solution: "We built a single high-performing Facebook ad that ran profitably for over a year, cutting cost per lead in half.",
  },
  {
    id: 6,
    number: "06",
    title: "Google Ads Coaching",
    industry: "Education",
    before: { value: "0", label: "trained" },
    after: { value: "300+", label: "entrepreneurs" },
    highlight: "400+ Hours",
    challenge: "Business owners wanted to run Google Ads but felt overwhelmed. Most wasted money on poorly structured campaigns.",
    solution: "We coached 3-5 entrepreneurs every week for 2.5-3 years — totaling 300-400+ hours of hands-on training.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null)

  return (
    <section id="results" className="py-24 md:py-32 bg-neutral-950">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-4">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
            Real Results. <HighlightedText>Measurable Growth.</HighlightedText>
          </h2>
          <p className="text-lg text-neutral-400">
            See the transformation we've driven for our clients.
          </p>
        </motion.div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer"
              onClick={() => setSelectedStudy(study)}
            >
              {/* Card */}
              <div className="relative p-8 rounded-2xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900 hover:bg-neutral-800/50 transition-all duration-300 h-full">
                {/* Large Number */}
                <span className="text-8xl font-bold text-neutral-800 absolute top-4 right-6 select-none">
                  {study.number}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  {/* Industry Tag */}
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-6 block">
                    {study.industry}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {study.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-800">
                    <div className="flex-1">
                      <p className="text-2xl font-semibold text-neutral-500">{study.before.value}</p>
                      <p className="text-xs text-neutral-600 mt-1">{study.before.label}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600" />
                    <div className="flex-1">
                      <p className="text-2xl font-semibold text-white">{study.after.value}</p>
                      <p className="text-xs text-neutral-600 mt-1">{study.after.label}</p>
                    </div>
                  </div>

                  {/* Highlight + CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      {study.highlight}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-neutral-500 group-hover:text-white transition-colors">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedStudy(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 pb-0">
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>

                {/* Large Number */}
                <span className="text-[120px] font-bold text-neutral-800 leading-none">
                  {selectedStudy.number}
                </span>

                <div className="mt-[-40px] relative z-10">
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 block mb-2">
                    {selectedStudy.industry}
                  </span>
                  <h3 className="text-3xl font-bold text-white">
                    {selectedStudy.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Stats */}
                <div className="flex items-center justify-center gap-8 p-6 rounded-xl bg-neutral-800/50 border border-neutral-800 mb-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-neutral-500">{selectedStudy.before.value}</p>
                    <p className="text-sm text-neutral-600 mt-1">{selectedStudy.before.label}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{selectedStudy.after.value}</p>
                    <p className="text-sm text-neutral-600 mt-1">{selectedStudy.after.label}</p>
                  </div>
                </div>

                {/* Highlight */}
                <div className="text-center mb-8">
                  <span className="inline-block px-6 py-3 rounded-full text-lg font-bold text-neutral-900 bg-white">
                    {selectedStudy.highlight}
                  </span>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                      The Challenge
                    </h4>
                    <p className="text-neutral-400 leading-relaxed">{selectedStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                      Our Solution
                    </h4>
                    <p className="text-neutral-400 leading-relaxed">{selectedStudy.solution}</p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={() => setSelectedStudy(null)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-neutral-900 font-semibold bg-white hover:bg-neutral-100 transition-colors"
                >
                  Start Your Success Story
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
