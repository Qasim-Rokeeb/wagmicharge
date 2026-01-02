"use client"

import { useState } from "react"

export default function Airtime() {
  const [phone, setPhone] = useState("")
  const [network, setNetwork] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Buy Airtime</h1>
      <p className="text-gray-600 mb-8">Buy or send airtime using crypto.</p>
      <form
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter recipient's phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Network</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={network}
            onChange={e => setNetwork(e.target.value)}
            required
          >
            <option value="">Select network</option>
            <option value="MTN">MTN</option>
            <option value="Airtel">Airtel</option>
            <option value="Glo">Glo</option>
            <option value="9mobile">9mobile</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Amount (₦)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 1000"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            min={1}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Airtime"}
        </button>
        {success && (
          <div className="mt-4 text-green-600 font-medium text-center">
            Airtime purchase successful!
          </div>
        )}
      </form>
    </div>
  )
}
