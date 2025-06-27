import { AirtimeForm } from "@/components/airtime-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AirtimePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="pin-blue-gradient-text">Buy Airtime</span>
          </h1>
          <p className="text-lg text-gray-600">Top up your phone with cryptocurrency in seconds</p>
        </div>

        <Card className="minimal-card border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Purchase Airtime</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Select your network, enter your phone number, and choose the amount
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AirtimeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
