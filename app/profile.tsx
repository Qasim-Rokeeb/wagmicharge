"use client"

import { useEffect, useState } from "react"
import { SmartWalletDetails } from "@/components/SmartWalletDetails"

export default function Profile() {
  const [user, setUser] = useState<{ name: string; email: string; walletAddress: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user profile from Firestore or your backend
    async function fetchUser() {
      // ...fetch logic here...
      // Example:
      // const userData = await getUserProfileFromFirestore()
      // setUser(userData)
      // For demo, use placeholder:
      setUser({
        name: "User Name",
        email: "user@email.com",
        walletAddress: "0x1234...abcd"
      })
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return <div>Loading profile...</div>
  if (!user) return <div>No user found.</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <div className="mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-2 flex items-center justify-center text-3xl font-bold text-blue-600">
            {/* Placeholder avatar */}
            U
          </div>
          <div className="font-semibold text-lg mb-1">{user.name}</div>
          <div className="text-gray-500 text-sm mb-4">{user.email}</div>
        </div>
        <div className="text-left">
          <SmartWalletDetails walletAddress={user.walletAddress} />
        </div>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  )
}
