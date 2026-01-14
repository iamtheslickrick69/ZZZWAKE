"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Instagram } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HighlightedText } from "./highlighted-text"
import { cn } from "@/lib/utils"

const teamMembers = [
  {
    name: "Sam Olsen",
    title: "Social Media & Content Strategist",
    bio: "Creative storyteller who brings brands to life across platforms. Specializes in social media, video, and content strategies that engage and convert. Partner in driving consistent digital presence and audience growth.",
    image: "/images/sam.png",
    color: "text-pink-500",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Instagram, href: "#" },
    ],
  },
  {
    name: "Zach Coder",
    title: "SEO & Website Strategist",
    bio: "Teacher at heart with 17+ years helping people connect the dots. Runs a digital agency focused on SEO, websites, and Google Business Profiles. Builds systems that drive measurable growth—not just quick tactics.",
    image: "/images/zac.png",
    color: "text-blue-500",
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
    color: "text-purple-500",
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
    color: "text-emerald-500",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Instagram, href: "#" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="container mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">Our Team</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Meet the <HighlightedText>Experts</HighlightedText>
          </h2>
          <p className="text-lg text-slate-600">
            A team of specialists aligned to grow your business.
          </p>
        </motion.div>

        {/* Team Grid - Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                {/* Profile Image */}
                <div className="relative mb-5 inline-block">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden ring-4 ring-slate-100 group-hover:ring-slate-200 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>

                {/* Title - Colored */}
                <p className={cn("text-sm font-medium mb-4", member.color)}>
                  {member.title}
                </p>

                {/* Bio - Always visible */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-2 pt-4 border-t border-slate-100">
                  {member.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
