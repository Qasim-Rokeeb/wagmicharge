import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsSection />
      <FeaturesSection />
    </div>
  )
}
