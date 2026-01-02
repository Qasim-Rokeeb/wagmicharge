"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"

export function SmartWalletDetails({ walletAddress }: { walletAddress: string }) {
  const [balance, setBalance] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true)
      setError(null)
      try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
        const bal = await provider.getBalance(walletAddress)
        setBalance(ethers.utils.formatEther(bal))
      } catch (err: any) {
        setError("Failed to fetch balance")
      }
      setLoading(false)
    }
    if (walletAddress) fetchBalance()
  }, [walletAddress])

  if (!walletAddress) return <div>No smart wallet found.</div>
  if (loading) return <div>Loading wallet...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center mx-auto">
      <h2 className="text-2xl font-bold mb-4">Smart Wallet Details</h2>
      <div className="mb-2">
        <span className="font-medium">Address:</span>
        <span className="ml-2 text-gray-600 break-all">{walletAddress}</span>
      </div>
      <div className="mb-2">
        <span className="font-medium">Balance:</span>
        <span className="ml-2 text-gray-600">{balance} ETH</span>
      </div>
    </div>
  )
}
