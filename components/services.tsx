"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { HighlightedText } from "./highlighted-text"
import Link from "next/link"

// --- Animation Variants ---

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
}

const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

// --- Service Data ---

const services = [
  {
    id: "paid-ads",
    title: "Paid Advertising Management",
    description: "Cross-platform campaign management for Google, Meta, TikTok, and LinkedIn with measurable ROI.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    href: "#contact",
  },
  {
    id: "full-funnel",
    title: "Full Funnel Marketing Systems",
    description: "Transform scattered campaigns into predictable, scalable lead generation infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    href: "#contact",
  },
  {
    id: "content-strategy",
    title: "Content Strategy & Media",
    description: "Ongoing content development that builds authority and drives consistent engagement.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    href: "#contact",
  },
]

// --- Component ---

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/30">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={STAGGER_CONTAINER_VARIANTS}
        className="container mx-auto max-w-6xl px-6"
      >
        {/* Header - Centered */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <motion.p
            variants={FADE_UP_VARIANTS}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6"
          >
            Our Services
          </motion.p>

          <motion.h2
            variants={FADE_UP_VARIANTS}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          >
            Three Paths to <HighlightedText>Systematic Growth</HighlightedText>
          </motion.h2>

          <motion.p
            variants={FADE_UP_VARIANTS}
            className="text-lg text-muted-foreground leading-relaxed"
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
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={service.href}
                className="block h-full"
              >
                <Card className="group h-full overflow-hidden rounded-2xl border-border/50 p-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/30">
                  {/* Card Image */}
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-accent-foreground group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
