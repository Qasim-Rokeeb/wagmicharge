"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Shield } from "lucide-react"

const stats = [
  {
    title: "Total Transactions",
    value: "2.5M+",
    icon: TrendingUp,
    description: "Successfully processed",
  },
  {
    title: "Active Users",
    value: "150K+",
    icon: Users,
    description: "Trust our platform",
  },
  {
    title: "Uptime",
    value: "99.9%",
    icon: Zap,
    description: "Service reliability",
  },
  {
    title: "Security",
    value: "Bank-Grade",
    icon: Shield,
    description: "Military encryption",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Trusted Worldwide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join millions of users who trust WagmiCharge for their crypto payment needs
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="text-center bg-white dark:bg-slate-800 border-0 gradient-shadow hover:gradient-shadow-hover transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary-light mb-6">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>

                  {/* Stats */}
                  <div className="text-3xl font-bold mb-2 gradient-text">{stat.value}</div>
                  <h3 className="font-semibold mb-2">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
