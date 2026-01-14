"use client"

import { TestimonialSection, type Testimonial, type Stat } from "@/components/ui/testimonial-card"

const testimonials: Testimonial[] = [
  {
    quote:
      "Partnering with Wake has been a game-changer for our paid social strategy and because of him we've consistently outperformed health industry benchmarks. His expertise in full-funnel optimization and tracking has allowed us to reach tens of millions of people driving hundreds of thousands of content visits and high-quality leads across multiple platforms: Meta, TikTok, and LinkedIn. Wake's data-driven approach ensures our creative and messaging not only resonates but delivers measurable results. Plus, Wake is down to earth and so easy to work with — we're so grateful to have him as part of our extended team.",
    name: "Brian Rhinehart, CEM",
    title: "Director of Marketing",
    company: "Healthcare Organization",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    industry: "healthcare",
  },
  {
    quote:
      "I've had the pleasure of working with Wake both in my current organization and previously, and I can confidently say he's an invaluable partner. Since joining us at the beginning of the year, Wake has elevated our competitive paid social presence and consistently brings fresh, creative ideas to the table. His dedication to the work is clear — he's proactive, thoughtful, and always looking for ways to help us grow. Beyond his professional strengths, Wake is simply a genuine and kind human being.",
    name: "Nicole Bazzinotti",
    title: "VP, Marketing",
    company: "Healthcare Organization",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    industry: "healthcare",
  },
  {
    quote:
      "Wake has been so helpful with helping me set up my first Google Ad. I was a bit intimidated by the whole process, and through his 1:1 coaching, I have a much better grasp on getting my Ads going. I am grateful for his expertise and his willingness to help!",
    name: "Johanna H.",
    title: "Entrepreneur",
    company: "Small Business Owner",
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    industry: "business",
  },
  {
    quote:
      "Wake pretty much taught me everything I know. Once we got that first ad going, I didn't even have to touch it for a year and a half. One change later, and my costs dropped in half.",
    name: "Jeremy Thompson",
    title: "Owner & Operator",
    company: "Window Washing Company",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    industry: "home-services",
  },
  {
    quote:
      "What surprised me most was the conversion rates from our campaigns and the constant leads we could distribute to my other reps. I'd never seen anything like it.",
    name: "Gavin",
    title: "Owner",
    company: "Rain Roofing Pros",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5.0,
    industry: "roofing",
  },
]

const stats: Stat[] = [
  { value: "50+", label: "Happy Clients" },
  { value: "340%", label: "Avg ROI" },
  { value: "5.0", label: "Rating" },
]

export function Testimonials() {
  return (
    <TestimonialSection
      tagLabel="Client Love"
      title="Relationships"
      titleHighlight="Revenue"
      subtitle="Because great marketing starts with trust."
      stats={stats}
      testimonials={testimonials}
      primaryActionLabel="Book a Call"
      secondaryActionLabel="See Results"
      rotationInterval={8000}
    />
  )
}
