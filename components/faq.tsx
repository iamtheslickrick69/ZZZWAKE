"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What happens during the strategy session?",
    answer:
      "We'll discuss your business goals, current marketing challenges, and identify opportunities for growth. You'll receive specific recommendations regardless of whether we work together.",
  },
  {
    question: "Is there any cost for the initial consultation?",
    answer:
      "No, the 30-minute strategy session is completely free. It's designed to provide you with value while helping us understand if we're a good fit to work together.",
  },
  {
    question: "How quickly can we start working together?",
    answer:
      "Depending on the service, we can typically start within 1-2 weeks of our initial conversation. Full funnel projects may have a longer setup time.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We have deep experience in behavioral health, healthcare, education, automotive/motorsports, and home services. Our optimization methodology applies across industries, but these verticals benefit from our compliance knowledge and conversion pattern expertise.",
  },
  {
    question: "Do you replace our existing marketing team?",
    answer:
      "No. We train and support your existing team rather than replacing them. Our goal is building internal capabilities while delivering immediate performance improvements.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">FAQ</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight mb-6 text-balance">
            Questions & Answers
          </h2>
        </div>

        <div className="max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
