"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface About3Props {
  sectionLabel?: string
  founderName?: string
  founderTitle?: string
  founderHeadshot?: string
  title?: string
  description?: string
  hookParagraph?: string
  galleryImages?: Array<{
    src: string
    alt: string
  }>
  secondaryImage?: {
    src: string
    alt: string
  }
  breakout?: {
    src: string
    alt: string
    title?: string
    description?: string
    buttonText?: string
    onButtonClick?: () => void
  }
  companiesTitle?: string
  companies?: Array<{
    src: string
    alt: string
  }>
  achievementsTitle?: string
  achievementsDescription?: string
  achievements?: Array<{
    label: string
    value: string
  }>
  galleryInterval?: number
}

const defaultCompanies = [
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
]

const defaultAchievements = [
  { label: "Companies Supported", value: "300+" },
  { label: "Projects Finalized", value: "800+" },
  { label: "Happy Customers", value: "99%" },
  { label: "Recognized Awards", value: "10+" },
]

export const About3 = ({
  sectionLabel = "About Us",
  founderName,
  founderTitle,
  founderHeadshot,
  title = "About Us",
  description = "We are dedicated to creating innovative solutions that empower businesses to thrive.",
  hookParagraph,
  galleryImages,
  secondaryImage = {
    src: "https://shadcnblocks.com/images/block/placeholder-2.svg",
    alt: "placeholder",
  },
  breakout = {
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Our Story",
    description: "Providing businesses with effective tools to improve workflows.",
    buttonText: "Learn more",
    onButtonClick: undefined,
  },
  companiesTitle = "Valued by clients worldwide",
  companies = defaultCompanies,
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = defaultAchievements,
  galleryInterval = 5000,
}: About3Props = {}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const images = galleryImages || [{ src: secondaryImage.src, alt: secondaryImage.alt }]

  const transitionToImage = useCallback((index: number) => {
    if (index === currentImageIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setIsTransitioning(false)
    }, 500)
  }, [currentImageIndex])

  // Auto-rotate gallery
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length
      transitionToImage(nextIndex)
    }, galleryInterval)

    return () => clearInterval(interval)
  }, [currentImageIndex, images.length, galleryInterval, transitionToImage])

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Label + Founder Header */}
        <div className="mb-10">
          <p className="text-muted-foreground text-sm tracking-[0.25em] uppercase mb-6">
            {sectionLabel}
          </p>

          {founderName && (
            <div className="flex items-center gap-4 mb-8">
              {founderHeadshot && (
                <div className="relative">
                  <img
                    src={founderHeadshot}
                    alt={founderName}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-accent/20 shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{founderName}</h3>
                {founderTitle && (
                  <p className="text-muted-foreground text-sm">{founderTitle}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Title + Description Grid */}
        <div className="mb-14 grid gap-6 text-left md:grid-cols-2 md:items-end">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1]">{title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
        </div>

        {/* Image Grid */}
        <div className="grid gap-7 lg:grid-cols-3">
          {/* Main Gallery Image - Fixed aspect ratio */}
          <div className="relative lg:col-span-2 rounded-2xl overflow-hidden bg-muted">
            <div className="aspect-[16/10]">
              {images.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`absolute inset-0 w-full h-full object-contain bg-muted transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex && !isTransitioning
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Gallery Navigation Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => transitionToImage(index)}
                    className={`h-2 rounded-full transition-all duration-300 hover:bg-white/80 ${
                      index === currentImageIndex
                        ? "w-8 bg-accent"
                        : "w-2 bg-white/50"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            {/* Hook Paragraph Card - NEW */}
            {hookParagraph && (
              <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl p-6 border border-accent/20">
                <p className="text-foreground text-base leading-relaxed italic">
                  "{hookParagraph}"
                </p>
              </div>
            )}

            {/* Breakout Card */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-muted p-7 md:w-1/2 lg:w-auto min-h-[240px]">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-10 md:h-12"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{breakout.description}</p>
              </div>
              <Button
                variant="outline"
                className="mr-auto group"
                onClick={breakout.onButtonClick}
              >
                {breakout.buttonText}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="py-24 md:py-32">
          <p className="text-center text-muted-foreground">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-12">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="relative overflow-hidden rounded-2xl bg-muted p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="text-muted-foreground text-sm">{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl text-accent">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          {/* Grid pattern overlay */}
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-10 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  )
}
