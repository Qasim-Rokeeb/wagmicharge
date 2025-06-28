"use client"

import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import dynamic from "next/dynamic"

const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false })

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <div className="flex justify-center gap-4 py-8">
        <Button size="lg" onClick={() => setShowOverlay(true)}>
          Get Started
        </Button>
      </div>
      {showOverlay && (
        <AuthModal onClose={() => setShowOverlay(false)} />
      )}
    </div>
  )
}
