"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowRight, TrendingUp, DollarSign, Users, Zap } from "lucide-react"
import { HighlightedText } from "./highlighted-text"
import { cn } from "@/lib/utils"
import Link from "next/link"

const tabs = [
  { id: "compare", label: "Compare Approaches" },
  { id: "results", label: "Our Results" },
  { id: "process", label: "How We Work" },
]

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

const stats = [
  { number: "340%", label: "Avg ROI", desc: "Return on ad spend", icon: TrendingUp },
  { number: "$2M+", label: "Saved", desc: "In wasted ad spend", icon: DollarSign },
  { number: "95%", label: "Retention", desc: "Client satisfaction", icon: Users },
  { number: "2 Weeks", label: "To Start", desc: "Time to first results", icon: Zap },
]

const process = [
  { step: "01", title: "Audit", desc: "We analyze your current marketing spend, channels, and performance data to find what's working and what's wasting money." },
  { step: "02", title: "Optimize", desc: "We eliminate waste, double down on winners, and implement quick wins that show results within weeks." },
  { step: "03", title: "Scale", desc: "Once we've proven what works, we build systems to scale your success predictably and sustainably." },
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
  const [activeTab, setActiveTab] = useState("compare")

  return (
    <section className="relative py-24 md:py-32 bg-neutral-100">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-4">
            The Problem We Solve
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-neutral-900">
            Most Agencies Want to Rebuild Everything.
            <br />
            <HighlightedText>We Don't.</HighlightedText>
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Established companies face a frustrating reality: agencies want to tear everything down.
            We take a different approach.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-neutral-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-3 text-sm font-medium rounded-full transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-neutral-900 text-white shadow-md"
                    : "text-neutral-500 hover:text-neutral-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {/* Compare Tab */}
          {activeTab === "compare" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Old Way Card */}
              <div className="relative p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                <span className="text-8xl font-bold text-neutral-100 absolute top-4 right-6 select-none">
                  01
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <X className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">The Old Way</h3>
                      <p className="text-sm text-neutral-400">Traditional agencies</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {oldWay.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* MAW Way Card */}
              <div className="relative p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg">
                <div className="absolute -top-3 right-6">
                  <span className="bg-white text-neutral-900 text-xs font-bold px-4 py-1.5 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
                <span className="text-8xl font-bold text-neutral-800 absolute top-4 right-6 select-none">
                  02
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                      <Check className="w-6 h-6 text-neutral-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">The MAW Way</h3>
                      <p className="text-sm text-neutral-400">Our approach</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {mawWay.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Tab */}
          {activeTab === "results" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm text-center"
                >
                  <span className="text-6xl font-bold text-neutral-100 absolute top-2 right-4 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10">
                    <stat.icon className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
                    <p className="text-3xl font-bold text-neutral-900 mb-1">{stat.number}</p>
                    <p className="text-sm font-medium text-neutral-900">{stat.label}</p>
                    <p className="text-xs text-neutral-400 mt-1">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {process.map((step) => (
                <div
                  key={step.step}
                  className="relative p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm"
                >
                  <span className="text-8xl font-bold text-neutral-100 absolute top-4 right-6 select-none">
                    {step.step}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                    <p className="text-neutral-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-neutral-500 mb-6">
            Ready for marketing that builds on your success instead of tearing it down?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors"
          >
            Get Your Free Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
