import { ProfileDetails } from "@/components/profile-details"
import { SmartWalletDetails } from "@/components/SmartWalletDetails"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="pin-blue-gradient-text">Profile Settings</span>
          </h1>
          <p className="text-lg text-gray-600">Manage your account settings and security</p>
        </div>

        <ProfileDetails />
        {/* Show wallet details */}
        <SmartWalletDetails walletAddress={""} />
      </div>
    </div>
  )
}
