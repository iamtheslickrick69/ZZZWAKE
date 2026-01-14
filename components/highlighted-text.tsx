"use client"

import type React from "react"

export function HighlightedText({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-accent italic">
      {children}
    </span>
  )
}
