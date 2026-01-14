"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const VIDEO_SOURCES = [
  "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/000yuh.mp4",
  "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/000MAWW.mp4",
  "https://pub-82e4016d6e17421ebc1eaa174644bee3.r2.dev/00hehehe.mp4",
]

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [nextVideoIndex, setNextVideoIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([false, false, false])

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoLoaded = useCallback((index: number) => {
    setVideosLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }, [])

  const handleVideoEnd = useCallback(() => {
    const nextIndex = (currentVideoIndex + 1) % VIDEO_SOURCES.length
    const afterNextIndex = (nextIndex + 1) % VIDEO_SOURCES.length

    setIsTransitioning(true)
    setNextVideoIndex(nextIndex)

    setTimeout(() => {
      setCurrentVideoIndex(nextIndex)
      setIsTransitioning(false)

      const nextVideo = videoRefs.current[afterNextIndex]
      if (nextVideo) {
        nextVideo.currentTime = 0
        nextVideo.load()
      }
    }, 1000)
  }, [currentVideoIndex])

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo && videosLoaded[currentVideoIndex]) {
      currentVideo.play().catch(() => {})
    }
  }, [currentVideoIndex, videosLoaded])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.load()
        if (index === 0) {
          video.play().catch(() => {})
        }
      }
    })
  }, [])

  // Smooth scroll-based parallax and fade
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const heroHeight = heroRef.current.offsetHeight
      const scrollY = window.scrollY
      const progress = Math.min(1, scrollY / (heroHeight * 0.6))

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate transforms based on scroll
  const textOpacity = 1 - scrollProgress * 1.5
  const textTranslateY = scrollProgress * -80
  const textScale = 1 - scrollProgress * 0.1

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {VIDEO_SOURCES.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            src={src}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => handleVideoLoaded(index)}
            onEnded={index === currentVideoIndex ? handleVideoEnd : undefined}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentVideoIndex
                ? isTransitioning
                  ? "opacity-0"
                  : "opacity-100"
                : index === nextVideoIndex && isTransitioning
                  ? "opacity-100"
                  : "opacity-0"
            }`}
          />
        ))}

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-primary/70 animate-gradient-shift"
          style={{
            backgroundSize: "400% 400%",
          }}
        />

        {/* Static overlay for consistent readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Video progress indicators */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        {VIDEO_SOURCES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setNextVideoIndex(index)
              setTimeout(() => {
                setCurrentVideoIndex(index)
                setIsTransitioning(false)
              }, 500)
            }}
            className={`h-1.5 rounded-full transition-all duration-500 hover:bg-white/50 ${
              index === currentVideoIndex ? "w-8 bg-accent" : "w-2 bg-white/30"
            }`}
            aria-label={`Play video ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content with Parallax + Fade + Float */}
      <div
        className="container mx-auto px-6 md:px-12 relative z-10"
        style={{
          opacity: Math.max(0, textOpacity),
          transform: `translateY(${textTranslateY}px) scale(${textScale})`,
          willChange: "transform, opacity",
        }}
      >
        {/* Floating animation wrapper */}
        <div className="max-w-4xl mx-auto text-center animate-float">
          {/* GROWTH AGENCY - First to appear */}
          <p
            className={`text-sm tracking-[0.3em] uppercase text-accent mb-6 transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: "200ms",
              opacity: mounted ? Math.max(0, 1 - scrollProgress * 2) : 0,
              transform: `translateY(${mounted ? scrollProgress * -20 : 4}px)`,
            }}
          >
            Growth Agency
          </p>

          {/* Main Headline - Second to appear */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-medium text-balance text-primary-foreground mb-6 tracking-tight leading-[1.1] transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: "400ms",
              opacity: mounted ? Math.max(0, 1 - scrollProgress * 1.8) : 0,
              transform: `translateY(${mounted ? scrollProgress * -40 : 6}px)`,
            }}
          >
            We Turn Marketing Spend Into{" "}
            <span className="relative inline-block">
              <span className="text-accent italic relative z-10">Predictable Revenue</span>
              {/* Animated underline */}
              <svg
                className={`absolute -bottom-2 left-0 w-full h-3 transition-all duration-1000 ease-out ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1000ms" }}
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,5 Q50,0 100,5 T200,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent/50"
                  strokeDasharray="200"
                  strokeDashoffset={mounted ? "0" : "200"}
                  style={{ transition: "stroke-dashoffset 1.5s ease-out 1s" }}
                />
              </svg>
            </span>
          </h1>

          {/* Subtext - Third to appear */}
          <p
            className={`text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: "600ms",
              opacity: mounted ? Math.max(0, 1 - scrollProgress * 2.2) : 0,
              transform: `translateY(${mounted ? scrollProgress * -30 : 6}px)`,
            }}
          >
            MAW Marketing helps established companies optimize their existing marketing investments.
            We eliminate waste, amplify what works, and build systematic growth your team can maintain and scale.
          </p>

          {/* CTAs - Last to appear */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: "800ms",
              opacity: mounted ? Math.max(0, 1 - scrollProgress * 2.5) : 0,
              transform: `translateY(${mounted ? scrollProgress * -20 : 6}px)`,
            }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm tracking-wide hover:bg-accent/90 transition-all duration-300 group rounded-full hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Book Your Free Strategy Session
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#results"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-all duration-300 rounded-full backdrop-blur-sm"
            >
              See Our Results
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator - only visible when at top */}
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          transitionDelay: "1200ms",
          opacity: mounted ? Math.max(0, 1 - scrollProgress * 5) : 0,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-primary-foreground/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
