"use client"

import { useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookCallButtonProps {
  href?: string
  subtitle?: string
  className?: string
  showLines?: boolean
  variant?: "default" | "compact" | "header"
  label?: string
  /** For header: colors adapt when scrolled */
  scrolled?: boolean
  onClick?: () => void
}

export function BookCallButton({
  href = "#contact",
  subtitle,
  className,
  showLines = true,
  variant = "default",
  label = "Book a call",
  scrolled = false,
  onClick,
}: BookCallButtonProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const handleBookCall = () => {
    if (onClick) {
      onClick()
      return
    }
    if (href.startsWith("http")) {
      window.open(href, "_blank")
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Header variant has special colors that adapt to scroll state
  const isHeader = variant === "header"
  const isCompact = variant === "compact" || variant === "header"

  // Color logic
  const getBorderColor = () => {
    if (isHeader) {
      if (isButtonHovered) return scrolled ? "rgba(255,255,255,0.9)" : "var(--accent)"
      return scrolled ? "rgba(255,255,255,0.3)" : "var(--border)"
    }
    return isButtonHovered ? "var(--foreground)" : "var(--border)"
  }

  const getBackgroundColor = () => {
    if (isHeader) {
      if (isButtonHovered) return scrolled ? "rgba(255,255,255,1)" : "var(--accent)"
      return "transparent"
    }
    return isButtonHovered ? "var(--foreground)" : "transparent"
  }

  const getTextColor = () => {
    if (isHeader) {
      if (isButtonHovered) return scrolled ? "var(--accent)" : "var(--accent-foreground)"
      return "white"
    }
    return isButtonHovered ? "var(--background)" : "var(--foreground)"
  }

  return (
    <div className={cn(
      "flex items-center",
      !isCompact && "flex-col gap-4",
      className
    )}>
      <button
        onClick={handleBookCall}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={cn(
          "group relative flex items-center transition-all duration-500 cursor-pointer",
          showLines && !isCompact && "gap-4"
        )}
        style={{
          transform: isButtonHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        {/* Left line - only for default variant */}
        {showLines && !isCompact && (
          <div
            className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
            style={{
              transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
              opacity: isButtonHovered ? 0 : 0.5,
            }}
          />
        )}

        {/* Button content */}
        <div
          className={cn(
            "relative flex items-center overflow-hidden rounded-full border transition-all duration-500",
            isCompact
              ? "gap-2 px-4 py-2 text-xs"
              : "gap-3 px-6 py-3 sm:px-8 sm:py-4"
          )}
          style={{
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            boxShadow: isButtonHovered && !isHeader
              ? "0 0 30px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)"
              : isButtonHovered && isHeader
              ? scrolled ? "0 0 20px rgba(255,255,255,0.2)" : "0 0 20px rgba(var(--accent),0.3)"
              : "none",
          }}
        >
          <Calendar
            className={cn(
              "transition-all duration-500",
              isCompact ? "size-3.5" : "size-4 sm:size-5"
            )}
            strokeWidth={1.5}
            style={{
              color: getTextColor(),
            }}
          />
          <span
            className={cn(
              "font-medium tracking-wide transition-all duration-500",
              isCompact ? "text-xs" : "text-sm sm:text-base"
            )}
            style={{
              color: getTextColor(),
            }}
          >
            {label}
          </span>
          <ArrowUpRight
            className={cn(
              "transition-all duration-500",
              isCompact ? "size-3.5" : "size-4 sm:size-5"
            )}
            strokeWidth={1.5}
            style={{
              color: getTextColor(),
              transform: isButtonHovered
                ? "translate(2px, -2px) scale(1.1)"
                : "translate(0, 0) scale(1)",
            }}
          />
        </div>

        {/* Right line - only for default variant */}
        {showLines && !isCompact && (
          <div
            className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
            style={{
              transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)",
              opacity: isButtonHovered ? 0 : 0.5,
            }}
          />
        )}
      </button>

      {/* Subtle subtext - only for default variant with subtitle */}
      {subtitle && !isCompact && (
        <span className="text-xs tracking-widest uppercase text-muted-foreground/50">
          {subtitle}
        </span>
      )}
    </div>
  )
}
