import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Problem } from "@/components/problem"
import { WhoWeWorkWith } from "@/components/who-we-work-with"
import { Services } from "@/components/services"
import { CaseStudies } from "@/components/case-studies"
import { Testimonials } from "@/components/testimonials"
import { AboutWake } from "@/components/about-wake"
import { CorePrinciples } from "@/components/core-principles"
import { Team } from "@/components/team"
import { StrategySession } from "@/components/strategy-session"
import { BlogSection } from "@/components/blog-section"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"
import { WakeAI } from "@/components/wake-ai"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <WhoWeWorkWith />
      <Services />
      <CaseStudies />
      <Testimonials />
      <AboutWake />
      <CorePrinciples />
      <Team />
      <StrategySession />
      <BlogSection />
      <FAQ />
      <CallToAction />
      <Footer />
      <WakeAI />
    </main>
  )
}
