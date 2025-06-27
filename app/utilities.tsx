"use client"

import { useState } from "react"

export default function Utilities() {
  const [service, setService] = useState("")
  const [account, setAccount] = useState("")
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
      <h1 className="text-3xl font-bold mb-4">Utilities</h1>
      <p className="text-gray-600 mb-8">Pay for utilities (electricity, water, etc.) using crypto.</p>
      <form
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Service</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={service}
            onChange={e => setService(e.target.value)}
            required
          >
            <option value="">Select service</option>
            <option value="electricity">Electricity</option>
            <option value="water">Water</option>
            <option value="cable">Cable TV</option>
            <option value="internet">Internet</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Account/Customer Number</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter account or meter number"
            value={account}
            onChange={e => setAccount(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Amount (₦)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 5000"
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
          {loading ? "Processing..." : "Pay Utility"}
        </button>
        {success && (
          <div className="mt-4 text-green-600 font-medium text-center">
            Utility payment successful!
          </div>
        )}
      </form>
    </div>
  )
}
