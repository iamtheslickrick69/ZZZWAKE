"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Clock, Video, Mail, Gift, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"
import { HighlightedText } from "./highlighted-text"

const benefits = [
  {
    title: "Free Strategy Insights",
    description: "Walk away with actionable recommendations you can implement immediately.",
    icon: Gift,
  },
  {
    title: "No Pressure Approach",
    description: "Our conversation is about understanding your needs, not making a sale.",
    icon: Shield,
  },
  {
    title: "Personalized Analysis",
    description: "Get specific feedback on your current marketing approach and opportunities.",
    icon: BarChart3,
  },
]

export function StrategySession() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/0000d.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">

          {/* Header Glass Panel */}
          <div
            className={`bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12 mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-6">Get Started</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance text-white">
                Book Your Free 30-Minute <HighlightedText>Strategy Session</HighlightedText>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
                Every engagement starts with understanding your unique situation. In your free strategy session, we'll
                discuss your business goals, current marketing challenges, and opportunities for growth.
              </p>
            </div>
          </div>

          {/* Benefits Glass Cards */}
          <div
            className={`grid md:grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 text-center"
                >
                  <Icon className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.25} />
                  <h3 className="text-lg font-medium text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>

          {/* CTA Glass Panel */}
          <div
            className={`bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-10 text-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>30 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Video className="w-5 h-5" />
                <span>Via Google Meet</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-5 h-5" />
                <span>Response within 24 hours</span>
              </div>
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-neutral-900 px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-300 group rounded-full mb-6"
            >
              Book Your Strategy Session
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-white/60 mb-2">Prefer Direct Contact?</p>
              <p className="text-sm text-white/60">
                Feel free to reach out directly for quick questions or immediate needs.
              </p>
              <a href="mailto:wake@makeawakemarketing.com" className="text-white font-medium hover:underline text-sm">
                wake@makeawakemarketing.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
