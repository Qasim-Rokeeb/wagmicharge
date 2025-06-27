import { UtilityForm } from "@/components/utility-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UtilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="pin-blue-gradient-text">Pay Bills</span>
          </h1>
          <p className="text-lg text-gray-600">Pay your electricity, cable, and water bills with crypto</p>
        </div>

        <Card className="minimal-card border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Utility Payments</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Select your service provider and enter your account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UtilityForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
