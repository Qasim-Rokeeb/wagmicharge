import { UtilityForm } from "@/components/utility-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UtilitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Pay Bills ⚡</h1>
        <p className="text-lg text-muted-foreground">Pay your electricity, cable, and water bills with crypto</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Utility Payments</CardTitle>
          <CardDescription>Select your service provider and enter your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <UtilityForm />
        </CardContent>
      </Card>
    </div>
  )
}
