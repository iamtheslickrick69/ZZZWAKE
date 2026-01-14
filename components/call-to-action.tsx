"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { HighlightedText } from "./highlighted-text"

export function CallToAction() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // Autoplay failed, user interaction required
      })
    }
  }, [])

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
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
          <source src="https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/0000wakewater.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Let's Talk</p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight mb-8 text-balance text-primary-foreground">
            Ready to Be Our Next <HighlightedText>Success Story</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Every successful campaign starts with understanding your unique story and goals. Let's discuss how we can
            create similar results for your business.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/60 mb-10">
            <span>Complete campaign audit</span>
            <span>•</span>
            <span>ROI improvement roadmap</span>
            <span>•</span>
            <span>No obligation</span>
            <span>•</span>
            <span>Implementable insights</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="mailto:wake@makeawakemarketing.com"
              className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide hover:bg-accent/90 transition-colors duration-300 group"
            >
              Discuss Your Goals
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="text-sm text-primary-foreground/50">
            Direct contact:{" "}
            <a href="mailto:wake@makeawakemarketing.com" className="text-accent hover:underline">
              wake@makeawakemarketing.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
