"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Phone, Wifi, Settings, Wallet } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/profile">
          <Button className="w-64 h-24 flex items-center justify-center text-lg font-semibold">
            <User className="mr-3" /> Profile
          </Button>
        </Link>
        <Link href="/airtime">
          <Button className="w-64 h-24 flex items-center justify-center text-lg font-semibold">
            <Phone className="mr-3" /> Airtime
          </Button>
        </Link>
        <Link href="/data">
          <Button className="w-64 h-24 flex items-center justify-center text-lg font-semibold">
            <Wifi className="mr-3" /> Data
          </Button>
        </Link>
        <Link href="/utilities">
          <Button className="w-64 h-24 flex items-center justify-center text-lg font-semibold">
            <Settings className="mr-3" /> Utilities
          </Button>
        </Link>
        <Link href="/wallet">
          <Button className="w-64 h-24 flex items-center justify-center text-lg font-semibold">
            <Wallet className="mr-3" /> Wallet
          </Button>
        </Link>
      </div>
    </div>
  )
}
