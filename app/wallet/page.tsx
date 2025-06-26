import { WalletDetails } from "@/components/wallet-details"

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Wallet 💳</h1>
        <p className="text-lg text-muted-foreground">View your balance and transaction history</p>
      </div>

      <WalletDetails />
    </div>
  )
}
