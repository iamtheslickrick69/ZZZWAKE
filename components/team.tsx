"use client"

import { TeamSection } from "@/components/ui/team-section-1"
import { Linkedin, Twitter, Instagram } from "lucide-react"

const teamMembers = [
  {
    name: "Sam Olsen",
    title: "Social Media & Content Strategist",
    bio: "Creative storyteller who brings brands to life across platforms. Specializes in social media, video, and content strategies that engage and convert. Partner in driving consistent digital presence and audience growth.",
    image: "/images/sam.png",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Instagram, href: "#" },
    ],
  },
  {
    name: "Zach Coder",
    title: "SEO & Website Strategist",
    bio: "Teacher at heart with 17+ years helping people connect the dots. Runs a digital agency focused on SEO, websites, and Google Business Profiles. Builds systems that drive measurable growth — not just quick tactics.",
    image: "/images/zac.png",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Twitter, href: "#" },
    ],
  },
  {
    name: "Chanler Godfrey",
    title: "AI & Automations Specialist",
    bio: "Known for figuring it out when no one else can. Deep background in business development and sales, scaling startups to new heights. Expert in mapping customer journeys and building automation systems that scale.",
    image: "/images/chanler.png",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Twitter, href: "#" },
    ],
  },
  {
    name: "Savanna Schepman",
    title: "Director of Finance & Operations",
    bio: "Adventurous soul with an organized mind that keeps the team on track. Balances creativity and structure to make sure projects run smoothly. Brings warmth, clarity, and focus that grounds the entire operation.",
    image: "/images/savanna.png",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Instagram, href: "#" },
    ],
  },
]

export function Team() {
  return (
    <div id="team">
      <TeamSection
        sectionLabel="The Team"
        title="Meet the"
        titleHighlight="Experts"
        description="A team of specialists aligned to grow your business. Each brings unique expertise to ensure your marketing success."
        members={teamMembers}
        showSocialLinks={true}
      />
    </div>
  )
}
