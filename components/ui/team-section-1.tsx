"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Linkedin, Twitter } from "lucide-react"

interface SocialLink {
  icon: React.ElementType
  href: string
}

interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
  socialLinks?: SocialLink[]
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionLabel?: string
  title: string
  titleHighlight?: string
  description: string
  members: TeamMember[]
  showSocialLinks?: boolean
  spotlightInterval?: number // ms between spotlight changes
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  (
    {
      sectionLabel = "The Team",
      title = "Meet the",
      titleHighlight = "Experts",
      description,
      members,
      showSocialLinks = true,
      spotlightInterval = 13000, // 13 seconds
      className,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)

    // Auto-rotate spotlight
    useEffect(() => {
      if (isPaused) return

      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % members.length)
      }, spotlightInterval)

      return () => clearInterval(interval)
    }, [isPaused, members.length, spotlightInterval])

    // Pause rotation on hover
    const handleMouseEnter = useCallback((index: number) => {
      setHoveredIndex(index)
      setIsPaused(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
      setHoveredIndex(null)
      setIsPaused(false)
    }, [])

    // Determine which index is "active" (hovered takes priority)
    const displayActiveIndex = hoveredIndex !== null ? hoveredIndex : activeIndex

    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-background py-24 md:py-32",
          className
        )}
        {...props}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <svg className="h-full w-full" fill="none">
            <defs>
              <pattern
                id="team-grid"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M40 0L0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-muted-foreground"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-grid)" />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto px-6">
          {/* Header Section */}
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
              {sectionLabel}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
              {title}{" "}
              <span className="relative inline-block">
                <span className="text-accent">{titleHighlight}</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,0 100,5 T200,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/40"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {description}
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {members.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                index={index}
                isActive={displayActiveIndex === index}
                isAnyActive={true}
                showSocialLinks={showSocialLinks}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {members.map((member, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setIsPaused(true)
                  setTimeout(() => setIsPaused(false), spotlightInterval)
                }}
                className={cn(
                  "relative h-2 rounded-full transition-all duration-500 overflow-hidden",
                  displayActiveIndex === index
                    ? "w-12 bg-accent"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`View ${member.name}`}
              >
                {/* Progress fill animation */}
                {displayActiveIndex === index && !isPaused && (
                  <div
                    className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                    style={{
                      animation: `progress ${spotlightInterval}ms linear`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar animation keyframes */}
        <style jsx>{`
          @keyframes progress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </section>
    )
  }
)

TeamSection.displayName = "TeamSection"

// Individual Team Member Card with Spotlight Effect
function TeamMemberCard({
  member,
  index,
  isActive,
  isAnyActive,
  showSocialLinks,
  onMouseEnter,
  onMouseLeave,
}: {
  member: TeamMember
  index: number
  isActive: boolean
  isAnyActive: boolean
  showSocialLinks: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center text-center transition-all duration-700 ease-out",
        isActive ? "scale-100" : "scale-95 opacity-50"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Profile Image Container */}
      <div className="relative mb-5">
        {/* Glow ring - only on active */}
        <div
          className={cn(
            "absolute -inset-3 rounded-full blur-2xl transition-all duration-700",
            isActive
              ? "opacity-100 scale-110 bg-accent/30"
              : "opacity-0 scale-100 bg-transparent"
          )}
        />

        {/* Rotating ring animation - only on active */}
        <div
          className={cn(
            "absolute -inset-1 rounded-full transition-all duration-700",
            isActive ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: isActive
              ? "conic-gradient(from 0deg, transparent, hsl(var(--accent)), transparent)"
              : "none",
            animation: isActive ? "spin 3s linear infinite" : "none",
          }}
        />

        {/* Profile image with overlay */}
        <div
          className={cn(
            "relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden",
            "ring-4 transition-all duration-700 ease-out bg-background",
            isActive
              ? "ring-accent shadow-2xl shadow-accent/40 scale-105"
              : "ring-muted shadow-md scale-100"
          )}
        >
          {/* Image */}
          <img
            src={member.image}
            alt={member.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 ease-out",
              isActive ? "scale-110 brightness-[0.35]" : "scale-100 brightness-100"
            )}
          />

          {/* Gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40",
              "transition-opacity duration-700 ease-out",
              isActive ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Bio text overlay */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center p-5",
              "transition-all duration-700 ease-out",
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            )}
          >
            <p className="text-white text-sm md:text-base leading-relaxed text-center">
              {member.bio}
            </p>

            {/* Social links inside overlay */}
            {showSocialLinks && (
              <div
                className={cn(
                  "flex gap-4 mt-4 transition-all duration-500 delay-200",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
              >
                {member.socialLinks?.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                )) || (
                  <>
                    <a
                      href="#"
                      className="text-white/80 hover:text-accent transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-white/80 hover:text-accent transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Name and Title */}
      <h3
        className={cn(
          "text-xl font-semibold transition-all duration-500",
          isActive ? "text-accent scale-105" : "text-foreground/70"
        )}
      >
        {member.name}
      </h3>
      <p
        className={cn(
          "text-sm mt-1 transition-all duration-500",
          isActive ? "text-muted-foreground" : "text-muted-foreground/50"
        )}
      >
        {member.title}
      </p>
    </div>
  )
}

export { TeamMemberCard }
