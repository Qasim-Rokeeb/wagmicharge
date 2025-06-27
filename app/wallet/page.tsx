import { WalletDetails } from "@/components/wallet-details"

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="pin-blue-gradient-text">Your Wallet</span>
          </h1>
          <p className="text-lg text-gray-600">View your balance and transaction history</p>
        </div>

        <WalletDetails />
      </div>
    </div>
  )
}
