"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Zap, Wallet, ArrowRight, Sparkles } from "lucide-react"
import { useAccount } from "wagmi"

const mainActions = [
  {
    title: "Buy Airtime",
    description: "Top up your phone instantly with crypto",
    icon: Phone,
    href: "/airtime",
  },
  {
    title: "Pay Bills",
    description: "Electricity, cable, and utility payments",
    icon: Zap,
    href: "/utilities",
  },
  {
    title: "Smart Wallet",
    description: "Manage your crypto assets securely",
    icon: Wallet,
    href: "/wallet",
  },
]

export function Hero() {
  const { isConnected } = useAccount()

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-8 floating-animation gradient-shadow">
            <Sparkles className="h-10 w-10 text-white" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">WagmiCharge</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The simplest way to use cryptocurrency for everyday payments.
            <br />
            <span className="gradient-text font-semibold">Fast, secure, and always available.</span>
          </p>

          {/* CTA Button */}
          {!isConnected && (
            <div className="mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-6 gradient-primary hover:gradient-shadow-hover transition-all duration-300 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {mainActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer bg-white dark:bg-slate-800 border-0 gradient-shadow hover:gradient-shadow-hover">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary-light mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{action.description}</p>

                    {/* Hover Effect */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-full h-1 gradient-primary rounded-full"></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Connected State */}
        {isConnected && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-600 dark:text-green-400 font-medium">Wallet Connected • Ready to Go</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
