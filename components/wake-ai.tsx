"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Sparkles, Maximize2, Minimize2, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

// Wake AI's knowledge base
const WAKE_KNOWLEDGE = {
  services: {
    paidAds: { name: "Paid Advertising Management", price: "$1,500+/month + ad spend" },
    fullFunnel: { name: "Full Funnel Marketing Systems", price: "Custom pricing" },
    content: { name: "Content Strategy & Media", price: "$1,250+/month" }
  },
  industries: ["Healthcare", "Education", "Automotive", "Home Services"],
  contact: "wake@mawmarketing.com"
}

// Quick reply suggestions
const QUICK_REPLIES = [
  { label: "What services do you offer?", query: "services" },
  { label: "How much does it cost?", query: "pricing" },
  { label: "Tell me about Wake", query: "about" },
  { label: "See case studies", query: "results" },
]

// Wake's responses
const WAKE_RESPONSES: Record<string, string[]> = {
  greeting: [
    "Hey there! 👋 I'm Wake. What brings you to MAW Marketing today?",
    "Hi! I'm Wake - great to meet you! How can I help you out?",
    "Hey! Welcome to MAW. I'm here if you have any questions - no sales pitch, just real answers!"
  ],
  services: [
    "We've got three main ways we help businesses:\n\n• **Paid Ads** ($1,500+/mo) - Google, Meta, LinkedIn campaigns\n• **Full Funnel Marketing** (custom) - complete marketing systems\n• **Content Strategy** ($1,250+/mo) - storytelling that actually works\n\nWhat sounds most relevant to where you're at?",
  ],
  pricing: [
    "Totally fair question! Our services start at $1,250/month for content work, and $1,500/month for paid ads management (plus your ad spend). Full funnel stuff is custom since every business is different.\n\nThe cool thing is we focus on optimizing what you already have - not rebuilding everything from scratch. Usually means faster results and better ROI.",
  ],
  industries: [
    "We work with a bunch of different industries, but we've gotten really good results in:\n\n• Healthcare & HealthTech\n• Education\n• Automotive\n• Home Services\n\nThat said, our approach works for most B2B and service businesses. What industry are you in?",
  ],
  about: [
    "So here's the quick version - I started MAW after years in the marketing world, and honestly? I was frustrated with how most agencies operate. Lots of promises, not much transparency.\n\nWe do things differently. We optimize what's working, cut what isn't, and build systems your team can actually maintain. No fluff, no BS.\n\nOh, and fun fact - I used to be a professional skateboarder before getting into marketing. Life's weird like that! 😄",
  ],
  results: [
    "We've got some pretty solid case studies! A few highlights:\n\n• Healthcare client: 340% increase in qualified leads\n• Auto dealership: Cut cost-per-lead by 60%\n• HealthTech startup: 5x return on ad spend\n\nWant me to go into detail on any of these?",
  ],
  contact: [
    "Best way to connect is booking a free 30-minute strategy call - no pressure, just a real conversation about your marketing.\n\nOr you can email me directly at wake@mawmarketing.com\n\nI personally respond to everything, so you won't get stuck talking to a bot... well, besides me right now 😂",
  ],
  default: [
    "Good question! Let me think about how to best answer that...\n\nIf you want, you can also book a quick call with me (the real me, not AI me) and we can chat through it. No sales pitch - I genuinely just like helping people figure out their marketing.",
    "Hmm, that's a bit outside what I know off the top of my head. But hey - shoot me an email at wake@mawmarketing.com and I'll get back to you personally!",
    "That's a great question! I'd love to dig deeper into that with you. Want to book a free strategy call? It's just 30 minutes and I promise it won't be a sales pitch."
  ]
}

function getWakeResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("pricing")) {
    return WAKE_RESPONSES.pricing[0]
  }
  if (lower.includes("service") || lower.includes("offer") || lower.includes("do you do") || lower.includes("help with")) {
    return WAKE_RESPONSES.services[0]
  }
  if (lower.includes("industry") || lower.includes("work with") || lower.includes("clients")) {
    return WAKE_RESPONSES.industries[0]
  }
  if (lower.includes("about") || lower.includes("who") || lower.includes("story") || lower.includes("background") || lower.includes("wake")) {
    return WAKE_RESPONSES.about[0]
  }
  if (lower.includes("result") || lower.includes("case stud") || lower.includes("success") || lower.includes("roi")) {
    return WAKE_RESPONSES.results[0]
  }
  if (lower.includes("contact") || lower.includes("call") || lower.includes("email") || lower.includes("talk") || lower.includes("meet") || lower.includes("book")) {
    return WAKE_RESPONSES.contact[0]
  }
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("sup") || lower.includes("what's up") || lower.includes("whats up")) {
    return "Hey! 😊 Good to hear from you. What can I help you with today? Feel free to ask about our services, pricing, results - whatever's on your mind!"
  }
  return WAKE_RESPONSES.default[Math.floor(Math.random() * WAKE_RESPONSES.default.length)]
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

type ViewMode = "minimized" | "normal" | "expanded"

export function WakeAI() {
  const [hasAppeared, setHasAppeared] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("normal")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [chatSize, setChatSize] = useState({ width: 400, height: 550 })
  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null)

  // Scroll detection - once Wake appears, he stays forever
  useEffect(() => {
    const handleScroll = () => {
      if (hasAppeared) return // Already appeared, don't hide
      const scrollY = window.scrollY
      const threshold = window.innerHeight * 0.4
      if (scrollY > threshold) {
        setHasAppeared(true)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasAppeared])

  // Show greeting bubble
  useEffect(() => {
    if (hasAppeared && !showBubble && !isOpen) {
      const timer = setTimeout(() => setShowBubble(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [hasAppeared, showBubble, isOpen])

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Initial greeting
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true)
      setIsTyping(true)
      setTimeout(() => {
        setMessages([{
          id: "greeting",
          role: "assistant",
          content: WAKE_RESPONSES.greeting[0]
        }])
        setIsTyping(false)
      }, 1000)
    }
  }, [isOpen, hasGreeted])

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: chatSize.width,
      startHeight: chatSize.height
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current) return
      const deltaX = resizeRef.current.startX - e.clientX
      const deltaY = resizeRef.current.startY - e.clientY
      setChatSize({
        width: Math.max(320, Math.min(600, resizeRef.current.startWidth + deltaX)),
        height: Math.max(400, Math.min(800, resizeRef.current.startHeight + deltaY))
      })
    }
    const handleMouseUp = () => {
      setIsResizing(false)
      resizeRef.current = null
    }
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const response = getWakeResponse(userMessage.content)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response
      }])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    setShowBubble(false)
    setViewMode("normal")
  }

  const handleMinimize = () => {
    setIsOpen(false)
  }

  const toggleExpand = () => {
    setViewMode(viewMode === "expanded" ? "normal" : "expanded")
  }

  if (!hasAppeared) return null

  const isExpanded = viewMode === "expanded"

  return (
    <>
      {/* Floating Avatar Button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out",
          isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"
        )}
      >
        {/* Greeting Bubble */}
        <div
          className={cn(
            "absolute bottom-full right-0 mb-3 transition-all duration-300",
            showBubble && !isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          <div className="bg-white rounded-2xl rounded-br-sm px-4 py-3 shadow-xl border border-gray-100">
            <p className="text-sm text-gray-700 font-medium">Hey! I'm Wake 👋</p>
          </div>
        </div>

        {/* Avatar Button */}
        <button
          onClick={handleOpen}
          className={cn(
            "relative group",
            "w-28 h-28 rounded-full overflow-hidden",
            "shadow-2xl shadow-accent/30 hover:shadow-accent/50",
            "ring-4 ring-white/80 hover:ring-accent/30",
            "transition-all duration-300 hover:scale-105",
            "animate-fade-in-up"
          )}
        >
          <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
          <img
            src="/images/wake-ai-avatar.png"
            alt="Chat with Wake"
            className="w-full h-full object-cover relative z-10"
          />
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-[3px] border-white z-20" />
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-500 ease-out",
          isExpanded
            ? "inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
            : "bottom-6 right-6",
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClick={isExpanded ? (e) => e.target === e.currentTarget && toggleExpand() : undefined}
      >
        <div
          className={cn(
            "bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300",
            isExpanded ? "w-full max-w-2xl h-[80vh]" : ""
          )}
          style={!isExpanded ? { width: chatSize.width, height: chatSize.height } : undefined}
        >
          {/* Resize Handle (top-left corner) - only in normal mode */}
          {!isExpanded && (
            <div
              className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize z-20 group"
              onMouseDown={handleResizeStart}
            >
              <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-gray-300 group-hover:border-accent transition-colors rounded-tl" />
            </div>
          )}

          {/* Header */}
          <div className="relative bg-gradient-to-br from-accent via-accent to-accent/80 px-4 py-4 flex items-center gap-3 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "20px 20px"
              }} />
            </div>

            <div className="relative flex items-center gap-3 flex-1">
              <div className="relative">
                <img
                  src="/images/wake-ai-avatar.png"
                  alt="Wake"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  Wake AI
                  <Sparkles className="w-4 h-4 text-white/70" />
                </h3>
                <p className="text-white/70 text-xs">Your friendly marketing guide</p>
              </div>
            </div>

            {/* Controls */}
            <div className="relative flex items-center gap-1">
              <button
                onClick={handleMinimize}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                title="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={toggleExpand}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                title={isExpanded ? "Shrink" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <img
                    src="/images/wake-ai-avatar.png"
                    alt="Wake"
                    className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 ring-2 ring-gray-100"
                  />
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    message.role === "user"
                      ? "bg-accent text-white rounded-br-md"
                      : "bg-white text-gray-700 shadow-md border border-gray-100 rounded-bl-md"
                  )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>
                      }
                      return part
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <img
                  src="/images/wake-ai-avatar.png"
                  alt="Wake"
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 ring-2 ring-gray-100"
                />
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies - show when few messages */}
            {messages.length <= 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply.query}
                    onClick={() => handleSend(reply.label)}
                    className="px-3 py-1.5 text-xs bg-accent/10 hover:bg-accent/20 text-accent rounded-full transition-colors border border-accent/20"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:bg-white transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={cn(
                  "p-3 rounded-xl transition-all duration-200",
                  input.trim()
                    ? "bg-accent text-white hover:bg-accent/90 hover:scale-105 shadow-lg shadow-accent/25"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Wake AI is here to help, not sell. Real answers only.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
