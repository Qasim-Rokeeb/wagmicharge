"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = false // Replace with your auth check
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
