import { AirtimeForm } from "@/components/airtime-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AirtimePage() {
  return (
    <div className="min-h-screen bg-background african-pattern">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 afro-gradient-text">Buy Airtime</h1>
          <p className="text-lg text-muted-foreground">Top up your phone with cryptocurrency in seconds</p>
        </div>

        <Card className="afro-card electric-glow">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl afro-gradient-text">Purchase Airtime</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
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
