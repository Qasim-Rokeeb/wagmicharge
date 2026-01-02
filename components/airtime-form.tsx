"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "wagmi"
import { TransactionModal } from "./transaction-modal"

const networks = [
  { id: "mtn", name: "MTN", logo: "📱" },
  { id: "airtel", name: "Airtel", logo: "📞" },
  { id: "glo", name: "Glo", logo: "🌐" },
  { id: "9mobile", name: "9mobile", logo: "📲" },
]

const amounts = [100, 200, 500, 1000, 2000, 5000]

export function AirtimeForm() {
  const { isConnected } = useAccount()
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const finalAmount = amount === "custom" ? customAmount : amount
  const usdRate = 0.0006
  const cryptoAmount = finalAmount ? (Number.parseFloat(finalAmount) * usdRate).toFixed(6) : "0"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) return

    setIsProcessing(true)
    setShowModal(true)

    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  const isFormValid = selectedNetwork && phoneNumber && finalAmount && Number.parseFloat(finalAmount) > 0

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Network Selection */}
        <div className="space-y-3">
          <Label htmlFor="network" className="text-base font-semibold text-gray-900">
            Select Network
          </Label>
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger className="minimal-input pin-blue-focus border-gray-300">
              <SelectValue placeholder="Choose your network provider" />
            </SelectTrigger>
            <SelectContent>
              {networks.map((network) => (
                <SelectItem key={network.id} value={network.id}>
                  <div className="flex items-center space-x-2">
                    <span>{network.logo}</span>
                    <span>{network.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Phone Number */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="08012345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="minimal-input pin-blue-focus text-lg border-gray-300"
          />
        </div>

        {/* Amount Selection */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-900">Select Amount (NGN)</Label>
          <div className="grid grid-cols-3 gap-3">
            {amounts.map((amt) => (
              <Button
                key={amt}
                type="button"
                variant={amount === amt.toString() ? "default" : "outline"}
                onClick={() => setAmount(amt.toString())}
                className={`h-12 transition-all duration-200 ${
                  amount === amt.toString()
                    ? "pin-blue-gradient text-white gentle-shadow"
                    : "bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
                }`}
              >
                ₦{amt.toLocaleString()}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant={amount === "custom" ? "default" : "outline"}
              onClick={() => setAmount("custom")}
              className={`whitespace-nowrap transition-all duration-200 ${
                amount === "custom"
                  ? "pin-blue-gradient text-white"
                  : "bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
              }`}
            >
              Custom
            </Button>
            {amount === "custom" && (
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="50"
                max="50000"
                className="minimal-input pin-blue-focus border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Conversion Display */}
        {finalAmount && (
          <Card className="bg-blue-50 border border-blue-200">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Amount (NGN):</span>
                  <span className="font-bold text-lg text-gray-900">
                    ₦{Number.parseFloat(finalAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Crypto Amount (USDC):</span>
                  <span className="font-bold text-lg pin-blue-gradient-text">{cryptoAmount} USDC</span>
                </div>
                <Separator className="bg-blue-200" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Network Fee:</span>
                  <span>~$0.50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-14 text-lg pin-blue-gradient hover:opacity-90 transition-all duration-200 hover-lift font-semibold"
          disabled={!isFormValid || !isConnected || isProcessing}
        >
          {!isConnected ? (
            "Connect Wallet First"
          ) : isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 pin-blue-spinner"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Secure your airtime • ₦${finalAmount ? Number.parseFloat(finalAmount).toLocaleString() : "0"}`
          )}
        </Button>

        {!isConnected && <p className="text-center text-sm text-gray-500">Please connect your wallet to continue</p>}
      </form>

      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isProcessing={isProcessing}
        type="airtime"
        details={{
          network: networks.find((n) => n.id === selectedNetwork)?.name || "",
          phone: phoneNumber,
          amount: finalAmount,
          cryptoAmount,
        }}
      />
    </>
  )
}
