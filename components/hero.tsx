"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Zap, Wallet, ArrowRight, CheckCircle } from "lucide-react"
import { useAccount } from "wagmi"

const howItWorksSteps = [
  {
    step: "01",
    title: "Connect Wallet",
    description: "Link your crypto wallet securely in one click",
    icon: Wallet,
  },
  {
    step: "02",
    title: "Choose Network & Amount",
    description: "Select your telecom provider and airtime value",
    icon: Phone,
  },
  {
    step: "03",
    title: "Confirm & Top-Up",
    description: "Complete your transaction instantly and securely",
    icon: Zap,
  },
]

const supportedNetworks = [
  { name: "MTN", logo: "📱", color: "text-yellow-600" },
  { name: "Airtel", logo: "📞", color: "text-red-500" },
  { name: "Glo", logo: "🌐", color: "text-green-500" },
  { name: "9mobile", logo: "📲", color: "text-blue-500" },
]

const cryptoTokens = [
  { name: "ETH", symbol: "Ξ", color: "text-blue-600" },
  { name: "USDT", symbol: "₮", color: "text-green-600" },
  { name: "BNB", symbol: "◆", color: "text-yellow-600" },
  { name: "MATIC", symbol: "◇", color: "text-purple-600" },
]

export function Hero() {
  const { isConnected } = useAccount()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl pin-blue-gradient mb-8 gentle-shadow">
              <span className="text-white font-bold text-2xl">W</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="pin-blue-gradient-text">WagmiCharge</span>
            </h1>

            {/* Tagline */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Top-Up Airtime Instantly Using Crypto
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Send airtime to anyone, anywhere — powered by Web3.
              <br />
              <span className="font-medium text-gray-700">Fast, secure, and always available.</span>
            </p>

            {/* CTA Button */}
            <Link href="/airtime">
              <Button
                size="lg"
                className="text-lg px-8 py-6 pin-blue-gradient hover:opacity-90 transition-all duration-200 hover-lift font-semibold"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to top up airtime with cryptocurrency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={step.step} className="minimal-card minimal-card-hover border-0">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full pin-blue-gradient text-white font-bold text-lg mb-6">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Supported Networks Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Supported Networks</h2>
            <p className="text-lg text-gray-600">Top up airtime for all major Nigerian telecom providers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {supportedNetworks.map((network) => (
              <Card key={network.name} className="minimal-card minimal-card-hover border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{network.logo}</div>
                  <h3 className={`font-semibold ${network.color}`}>{network.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Accepted Cryptocurrencies</h3>
            <p className="text-gray-600">Pay with your preferred cryptocurrency</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cryptoTokens.map((token) => (
              <Card key={token.name} className="minimal-card minimal-card-hover border-0">
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl mb-3 font-bold ${token.color}`}>{token.symbol}</div>
                  <h3 className="font-semibold text-gray-700">{token.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connected State */}
      {isConnected && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center space-x-3 px-6 py-3 bg-white rounded-full gentle-shadow border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-700 font-medium">Wallet Connected</p>
          </div>
        </div>
      )}
    </div>
  )
}
