import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, CreditCard, Shield, Clock, Globe, Headphones } from "lucide-react"

const features = [
  {
    title: "Multiple Networks",
    description: "Support for all major telecom providers across Nigeria",
    icon: Smartphone,
  },
  {
    title: "Crypto Payments",
    description: "Accept Bitcoin, Ethereum, USDC, and 20+ cryptocurrencies",
    icon: CreditCard,
  },
  {
    title: "Bank-Grade Security",
    description: "Advanced encryption and smart contract protection",
    icon: Shield,
  },
  {
    title: "24/7 Available",
    description: "Round-the-clock service with instant processing",
    icon: Clock,
  },
  {
    title: "Global Access",
    description: "Available worldwide with competitive exchange rates",
    icon: Globe,
  },
  {
    title: "Expert Support",
    description: "Dedicated customer service team ready to help",
    icon: Headphones,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose WagmiCharge?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've built the most reliable and user-friendly platform for cryptocurrency payments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white dark:bg-slate-800 border-0 gradient-shadow hover:gradient-shadow-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary-light mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 bg-white dark:bg-slate-800 rounded-3xl gradient-shadow max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied users making crypto payments simple and secure
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
              <Shield className="h-4 w-4" />
              <span>Fully audited and secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
