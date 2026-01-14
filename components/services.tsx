"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, TrendingUp, Target, Megaphone } from "lucide-react"
import { HighlightedText } from "./highlighted-text"
import Link from "next/link"

// --- Animation Variants ---

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
}

const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// --- Service Data ---

const services = [
  {
    id: "paid-ads",
    number: "01",
    title: "Paid Advertising Management",
    description: "Cross-platform campaign management for Google, Meta, TikTok, and LinkedIn with measurable ROI.",
    icon: Target,
    features: ["Google Ads", "Meta Ads", "TikTok", "LinkedIn"],
    href: "#contact",
  },
  {
    id: "full-funnel",
    number: "02",
    title: "Full Funnel Marketing Systems",
    description: "Transform scattered campaigns into predictable, scalable lead generation infrastructure.",
    icon: TrendingUp,
    features: ["Lead Gen", "Automation", "CRM Setup", "Analytics"],
    href: "#contact",
  },
  {
    id: "content-strategy",
    number: "03",
    title: "Content Strategy & Media",
    description: "Ongoing content development that builds authority and drives consistent engagement.",
    icon: Megaphone,
    features: ["Brand Voice", "Social Media", "Video Content", "Copywriting"],
    href: "#contact",
  },
]

// --- Component ---

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://pub-7824dae2ffd24193b52760c54972be1d.r2.dev/111peachbaby.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={STAGGER_CONTAINER_VARIANTS}
        className="relative z-10 container mx-auto max-w-6xl px-6"
      >
        {/* Header - Centered */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <motion.p
            variants={FADE_UP_VARIANTS}
            className="text-white/70 text-sm tracking-[0.3em] uppercase mb-6"
          >
            Our Services
          </motion.p>

          <motion.h2
            variants={FADE_UP_VARIANTS}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            Three Paths to <HighlightedText>Systematic Growth</HighlightedText>
          </motion.h2>

          <motion.p
            variants={FADE_UP_VARIANTS}
            className="text-lg text-white/80 leading-relaxed"
          >
            Strategic marketing services designed to meet you where you are and take you where you want to go.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <motion.div
          variants={STAGGER_CONTAINER_VARIANTS}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={FADE_UP_VARIANTS}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={service.href} className="block h-full group">
                {/* Glassmorphism Card */}
                <div className="relative h-full rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl">
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                    {service.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
