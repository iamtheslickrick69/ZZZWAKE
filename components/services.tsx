"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HighlightedText } from "./highlighted-text"
import { Target, TrendingUp, Megaphone, CheckCircle2 } from "lucide-react"

// --- Service Data ---

const services = [
  {
    id: 1,
    title: "Paid Advertising Management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    icon: Target,
    description: "Cross-platform campaign management for Google, Meta, TikTok, and LinkedIn with measurable ROI. We don't just run ads — we build systematic acquisition engines.",
    features: [
      "Google Ads (Search, Display, YouTube)",
      "Meta Ads (Facebook & Instagram)",
      "TikTok & LinkedIn Campaigns",
      "Real-time ROI Tracking & Optimization",
    ],
  },
  {
    id: 2,
    title: "Full Funnel Marketing Systems",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    icon: TrendingUp,
    description: "Transform scattered campaigns into predictable, scalable lead generation infrastructure. We build the systems that turn strangers into customers on autopilot.",
    features: [
      "Lead Generation & Nurturing Sequences",
      "Marketing Automation Setup",
      "CRM Integration & Pipeline Building",
      "Conversion Rate Optimization",
    ],
  },
  {
    id: 3,
    title: "Content Strategy & Media",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
    icon: Megaphone,
    description: "Ongoing content development that builds authority and drives consistent engagement. Your brand voice, amplified across every channel that matters.",
    features: [
      "Brand Voice & Messaging Development",
      "Social Media Strategy & Management",
      "Video Content Production",
      "Copywriting & Content Creation",
    ],
  },
]

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// --- Component ---

export function Services() {
  const [activeId, setActiveId] = useState<number>(1)
  const [activeImage, setActiveImage] = useState(services[0].image)

  const ActiveIcon = services.find(s => s.id === activeId)?.icon || Target

  return (
    <section id="services" className="relative py-24 md:py-32 bg-neutral-100">

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto max-w-6xl px-6"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            variants={itemVariants}
            className="text-neutral-400 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Our Services
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-neutral-900"
          >
            Three Paths to <HighlightedText>Systematic Growth</HighlightedText>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-neutral-500 max-w-2xl mx-auto"
          >
            Strategic marketing services designed to meet you where you are and take you where you want to go.
          </motion.p>
        </div>

        {/* Accordion + Image Layout */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12"
        >
          {/* Left: Accordion */}
          <div className="w-full lg:w-1/2">
            <Accordion
              type="single"
              defaultValue="item-1"
              className="w-full"
            >
              {services.map((service) => (
                <AccordionItem
                  key={service.id}
                  value={`item-${service.id}`}
                  className="border-neutral-200"
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(service.image)
                      setActiveId(service.id)
                    }}
                    className="py-6 !no-underline hover:no-underline group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        service.id === activeId
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-200 text-neutral-400"
                      }`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xl font-semibold transition-colors ${
                        service.id === activeId ? "text-neutral-900" : "text-neutral-400"
                      }`}>
                        {service.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-neutral-600 mb-4 pl-16">
                      {service.description}
                    </p>
                    <ul className="space-y-2 pl-16">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Mobile Image */}
                    <div className="mt-6 lg:hidden pl-16">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right: Dynamic Image */}
          <div className="hidden lg:block w-1/2 sticky top-32">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200 shadow-lg">
              <img
                src={activeImage}
                alt="Service preview"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Overlay with icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <ActiveIcon className="w-6 h-6 text-neutral-900" />
                </div>
                <span className="text-white font-semibold text-lg">
                  {services.find(s => s.id === activeId)?.title}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
