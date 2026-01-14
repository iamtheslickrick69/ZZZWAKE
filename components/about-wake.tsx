"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Globe, Phone, MapPin, BookOpen, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Photo gallery images
const galleryImages = [
  "/images/skate.png",
  "/images/wake2.png",
  "/professional-skateboarder-in-action-performing-tri.jpg",
]

// Tab configuration
const tabs = [
  { id: "story", label: "My Story", icon: BookOpen },
  { id: "approach", label: "My Approach", icon: Target },
  { id: "results", label: "Track Record", icon: TrendingUp },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeIn" }
  },
}

export function AboutWake() {
  const [activeTab, setActiveTab] = useState("story")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-advance gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="w-full">
      {/* ===== HERO HEADER - Centered Layout ===== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="bg-slate-50"
      >
        <div className="container mx-auto px-6 py-12 md:py-16 text-center">
          {/* Label */}
          <motion.p
            variants={itemVariants}
            className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-6"
          >
            Meet the Founder
          </motion.p>

          {/* Title + Avatar Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4">
            {/* Avatar + Name */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/wake-headshot.png"
                  alt="Wake Schepman"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-50" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900">Wake Schepman</p>
                <p className="text-sm text-slate-500">Founder & Growth Strategist</p>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] text-slate-900"
            >
              From Pro Skater to{" "}
              <span className="text-accent">Growth Marketing</span>
            </motion.h1>
          </div>

          {/* Accent line - centered */}
          <motion.div variants={itemVariants} className="h-1 w-20 bg-accent mx-auto mb-4" />

          {/* Subtitle + CTA - centered */}
          <motion.p
            variants={itemVariants}
            className="max-w-lg mx-auto text-slate-600 leading-relaxed mb-4"
          >
            How professional skating taught me that success comes from authentic storytelling and relentless execution.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-accent transition-colors hover:text-accent/80"
            >
              LET'S WORK TOGETHER
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== TABS SECTION - Side by side with Gallery ===== */}
      <div className="relative bg-foreground text-background border-t border-background/10">
        <div className="flex flex-col lg:flex-row min-h-[550px]">
          {/* LEFT SIDE - Tabs with Scrollable Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="flex-1 flex flex-col px-6 py-10 md:px-12 lg:px-16 xl:px-24"
          >
            {/* Tab Navigation */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-6 shrink-0"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 text-sm",
                      isActive
                        ? "bg-background text-foreground shadow-lg"
                        : "bg-background/10 text-background/70 hover:bg-background/20 hover:text-background"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive && "text-accent")} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </motion.div>

            {/* Scrollable Tab Content */}
            <motion.div
              variants={itemVariants}
              className="flex-1 overflow-y-auto pr-2 lg:pr-4 max-h-[400px] lg:max-h-[420px]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.2) transparent'
              }}
            >
              <AnimatePresence mode="wait">
                {/* MY STORY TAB */}
                {activeTab === "story" && (
                  <motion.div
                    key="story"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-5"
                  >
                    <p className="text-xl md:text-2xl text-background font-medium leading-relaxed">
                      The adrenaline was real. Standing at the top of a massive ramp with thousands of people watching, cameras rolling, and everything on the line — that was my world as a professional skater.
                    </p>

                    <div className="space-y-4 text-background/70 leading-relaxed">
                      <p>
                        Every performance required complete focus, creative problem-solving, and the ability to execute under pressure. You had one shot to land the trick, and if you fell, you got back up and tried again. There was no room for excuses, only results.
                      </p>
                      <p>
                        But it was the stories that mattered most. Behind every stunt and every show, authentic human stories connected with audiences worldwide.
                      </p>
                      <p>
                        When I transitioned into marketing, I realized businesses face the same challenge: capturing attention in a crowded space, building genuine connections, and turning those connections into lasting success.
                      </p>
                      <p>
                        Today, as a husband and father, I'm driven by the same values that guided me through skating: authenticity, creativity, and relentless execution.
                      </p>
                    </div>

                    <div className="bg-background/10 rounded-xl p-5 border-l-4 border-accent">
                      <p className="text-background italic text-lg">
                        "The answer is always storytelling. Authentic stories backed by strategy, execution, and measurable results."
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* MY APPROACH TAB */}
                {activeTab === "approach" && (
                  <motion.div
                    key="approach"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-background mb-3">
                        The MAW Difference
                      </h3>
                      <p className="text-background/70 text-base">
                        Most agencies promise the world and deliver spreadsheets. We focus on what actually moves the needle.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-background/5 rounded-xl p-5 border border-background/10">
                        <h4 className="font-bold text-background mb-4 text-lg flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-sm">✗</span>
                          The Old Way
                        </h4>
                        <ul className="space-y-2.5 text-background/70 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold">✗</span>
                            <span>Chase vanity metrics that look good in reports</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold">✗</span>
                            <span>Generic templated campaigns for every client</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold">✗</span>
                            <span>Burn budget on vague "brand awareness"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-400 font-bold">✗</span>
                            <span>Hope something sticks eventually</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-accent/20 rounded-xl p-5 border-2 border-accent/40">
                        <h4 className="font-bold text-background mb-4 text-lg flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-accent/30 flex items-center justify-center text-accent text-sm">✓</span>
                          The MAW Way
                        </h4>
                        <ul className="space-y-2.5 text-background/80 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">✓</span>
                            <span>Focus on revenue-driving metrics that matter</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">✓</span>
                            <span>Authentic story-driven campaigns unique to you</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">✓</span>
                            <span>Strategic spend with clear, trackable ROI</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent font-bold">✓</span>
                            <span>Build systems that scale predictably</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TRACK RECORD TAB */}
                {activeTab === "results" && (
                  <motion.div
                    key="results"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-background mb-3">
                        Numbers That Matter
                      </h3>
                      <p className="text-background/70 text-base">
                        Real results from real partnerships. These aren't vanity metrics — they're business outcomes.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "95%", label: "Client Retention", desc: "They stay because it works" },
                        { value: "340%", label: "Average ROI", desc: "Return on ad spend" },
                        { value: "500+", label: "Campaigns", desc: "Launched and optimized" },
                        { value: "12+", label: "Industries", desc: "Deep expertise" },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="bg-background/10 rounded-xl p-4 text-center hover:bg-background/15 transition-colors group border border-background/10"
                        >
                          <p className="text-2xl md:text-3xl font-bold text-accent mb-1 group-hover:scale-105 transition-transform">
                            {stat.value}
                          </p>
                          <p className="font-semibold text-background text-sm mb-0.5">{stat.label}</p>
                          <p className="text-xs text-background/50">{stat.desc}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-background/10 rounded-xl p-4 text-center border border-background/10">
                      <p className="font-semibold text-background mb-1.5">
                        Want to see specific case studies?
                      </p>
                      <p className="text-background/60 text-sm mb-3">
                        Check out our results section for detailed breakdowns.
                      </p>
                      <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="#results">
                          View Case Studies
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info Footer */}
            <motion.footer className="mt-5 pt-5 border-t border-background/10 shrink-0" variants={itemVariants}>
              <div className="grid grid-cols-3 gap-2 text-xs text-background/50">
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-accent" />
                  <span>makeawake.com</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  <span>Book a Call</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  <span>Atlanta, GA</span>
                </div>
              </div>
            </motion.footer>
          </motion.div>

          {/* RIGHT SIDE - Photo Gallery */}
          <div className="relative w-full lg:w-[45%] h-64 sm:h-80 lg:h-auto overflow-hidden">
            {/* Angled overlay on left edge (desktop only) */}
            <div
              className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-foreground z-10"
              style={{
                clipPath: "polygon(0 0, 100% 0, 0 100%, 0 100%)",
              }}
            />

            {/* Image slideshow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tabs-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={galleryImages[currentImageIndex]}
                  alt="Wake Schepman"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent lg:from-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent lg:hidden" />
              </motion.div>
            </AnimatePresence>

            {/* Image indicators */}
            <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 flex gap-2 z-20">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === currentImageIndex
                      ? "w-6 bg-accent"
                      : "bg-background/50 hover:bg-background/70"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== LET'S CONNECT SECTION - Light Background ===== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="py-16 md:py-24 bg-secondary/30"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Discover Your Story?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Whether it's helping a PMI franchise owner connect with property owners or a treatment center reach families in crisis, the formula remains the same: identify the authentic story, tell it compellingly, and support it with data-driven marketing systems.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-8">
            <div className="bg-card rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 border border-border hover:border-accent/30">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Visit Our Site</h4>
              <p className="text-sm text-muted-foreground">makeawake.com</p>
            </div>

            <div className="bg-accent rounded-xl p-5 text-center text-accent-foreground hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-1">Book a Call</h4>
              <p className="text-sm opacity-80">Free 15-min strategy session</p>
            </div>

            <div className="bg-card rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 border border-border hover:border-accent/30">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Location</h4>
              <p className="text-sm text-muted-foreground">Atlanta, GA</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button asChild size="lg" className="px-8">
              <Link href="#contact">
                Start a Conversation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
