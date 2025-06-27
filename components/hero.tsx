"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Zap, Wallet, ArrowRight, Sparkles } from "lucide-react"
import { useAccount } from "wagmi"

const mainActions = [
  {
    title: "Connect Wallet",
    description: "Link your crypto wallet securely",
    icon: Wallet,
    step: "01",
  },
  {
    title: "Choose Network & Amount",
    description: "Select telecom provider and airtime value",
    icon: Phone,
    step: "02",
  },
  {
    title: "Confirm & Top-Up",
    description: "Complete transaction instantly",
    icon: Zap,
    step: "03",
  },
]

const supportedNetworks = [
  { name: "MTN", icon: "📱", color: "text-yellow-400" },
  { name: "Airtel", icon: "📞", color: "text-red-400" },
  { name: "Glo", icon: "🌐", color: "text-green-400" },
  { name: "9mobile", icon: "📲", color: "text-blue-400" },
]

const cryptoTokens = [
  { name: "ETH", icon: "⟠", color: "text-blue-400" },
  { name: "USDT", icon: "₮", color: "text-green-400" },
  { name: "BNB", icon: "◆", color: "text-yellow-400" },
  { name: "MATIC", icon: "◇", color: "text-purple-400" },
]

export function Hero() {
  const { isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-background african-pattern">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl afro-gradient mb-8 floating-animation electric-glow">
              <Sparkles className="h-10 w-10 text-background" />
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="afro-gradient-text">WagmiCharge</span> 🔋
            </h1>

            {/* Tagline */}
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
              Top-Up Airtime Instantly Using Crypto
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Send airtime to anyone, anywhere — powered by Web3.
              <br />
              <span className="afro-gradient-text font-semibold">Fast, secure, and always available.</span>
            </p>

            {/* CTA Button */}
            <Link href="/airtime">
              <Button
                size="lg"
                className="text-lg px-8 py-6 afro-gradient hover:electric-glow transition-all duration-300 transform hover:scale-105 pulse-green"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 afro-gradient-text">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to top up airtime with cryptocurrency</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mainActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card
                  key={action.title}
                  className="afro-card hover:electric-glow transition-all duration-500 hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg mb-4">
                      {action.step}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{action.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{action.description}</p>
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
            <h2 className="text-4xl font-bold mb-4 afro-gradient-text">Supported Networks</h2>
            <p className="text-lg text-muted-foreground">Top up airtime for all major Nigerian telecom providers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {supportedNetworks.map((network) => (
              <Card key={network.name} className="afro-card hover:gold-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{network.icon}</div>
                  <h3 className={`font-semibold ${network.color}`}>{network.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Accepted Cryptocurrencies</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cryptoTokens.map((token) => (
              <Card key={token.name} className="afro-card hover:electric-glow transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`text-4xl mb-3 ${token.color}`}>{token.icon}</div>
                  <h3 className="font-semibold text-foreground">{token.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connected State */}
      {isConnected && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center space-x-3 px-6 py-3 afro-card rounded-full electric-glow">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <p className="text-primary font-medium">🟢 Wallet Connected</p>
          </div>
        </div>
      )}
    </div>
  )
}
