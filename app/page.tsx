"use client"

import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">Welcome</h2>
            <Button
              variant="outline"
              size="lg"
              className="mb-4 w-60"
              onClick={() => {
                // handle Google signup and passkey creation
                setShowOverlay(false)
              }}
            >
              Sign up with Google
            </Button>
            <Button
              variant="default"
              size="lg"
              className="w-60"
              onClick={() => {
                // handle passkey login
                setShowOverlay(false)
              }}
            >
              Login with Passkey
            </Button>
            <Button
              variant="ghost"
              className="mt-6"
              onClick={() => setShowOverlay(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
