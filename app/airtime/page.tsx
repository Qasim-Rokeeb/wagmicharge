import { AirtimeForm } from "@/components/airtime-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AirtimePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Buy Airtime</h1>
          <p className="text-lg text-muted-foreground">Top up your phone with cryptocurrency in seconds</p>
        </div>

        <Card className="bg-white dark:bg-slate-800 border-0 gradient-shadow">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl gradient-text">Purchase Airtime</CardTitle>
            <CardDescription className="text-base">
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
