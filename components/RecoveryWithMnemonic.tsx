import { useState } from "react"
import { ethers } from "ethers"

export function RecoveryWithMnemonic({ onRecovered }: { onRecovered: (walletAddress: string) => void }) {
  const [mnemonic, setMnemonic] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleRecover() {
    try {
      const wallet = ethers.Wallet.fromPhrase(mnemonic.trim())
      const walletAddress = wallet.address
      // Send walletAddress to backend to check if it exists
      const res = await fetch("/api/recover-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress }),
      })
      const data = await res.json()
      if (data.exists) {
        onRecovered(walletAddress)
      } else {
        setError("No account found for this secret phrase.")
      }
    } catch (err) {
      setError("Invalid secret phrase.")
    }
  }

  return (
    <div>
      <textarea
        className="w-full border rounded p-2"
        placeholder="Enter your secret phrase"
        value={mnemonic}
        onChange={e => setMnemonic(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleRecover}>
        Recover Account
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  )
}
