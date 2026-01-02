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
import { CheckCircle } from "lucide-react"

const services = [
  {
    category: "Electricity",
    providers: [
      { id: "eko", name: "Eko Electric (EKEDC)", icon: "⚡" },
      { id: "ikeja", name: "Ikeja Electric (IE)", icon: "💡" },
      { id: "abuja", name: "Abuja Electric (AEDC)", icon: "🔌" },
    ],
  },
  {
    category: "Cable TV",
    providers: [
      { id: "dstv", name: "DStv", icon: "📺" },
      { id: "gotv", name: "GOtv", icon: "📻" },
      { id: "startimes", name: "StarTimes", icon: "🎬" },
    ],
  },
  {
    category: "Internet",
    providers: [
      { id: "mtn-data", name: "MTN Data", icon: "🌐" },
      { id: "airtel-data", name: "Airtel Data", icon: "📡" },
      { id: "spectranet", name: "Spectranet", icon: "💻" },
    ],
  },
]

export function UtilityForm() {
  const { isConnected } = useAccount()
  const [selectedService, setSelectedService] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const selectedProvider = services.flatMap((s) => s.providers).find((p) => p.id === selectedService)

  const usdRate = 0.0006
  const cryptoAmount = amount ? (Number.parseFloat(amount) * usdRate).toFixed(6) : "0"

  const handleVerifyAccount = async () => {
    if (!accountNumber || !selectedService) return

    setIsVerifying(true)
    // Simulate account verification
    setTimeout(() => {
      setCustomerName("John Doe") // Mock customer name
      setIsVerifying(false)
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) return

    setIsProcessing(true)
    setShowModal(true)

    setTimeout(() => {
      setIsProcessing(false)
    }, 3000)
  }

  const isFormValid = selectedService && accountNumber && amount && Number.parseFloat(amount) > 0

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Selection */}
        <div className="space-y-3">
          <Label htmlFor="service" className="text-base font-semibold text-gray-900">
            Select Service
          </Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="minimal-input pin-blue-focus border-gray-300">
              <SelectValue placeholder="Choose service provider" />
            </SelectTrigger>
            <SelectContent>
              {services.map((category) => (
                <div key={category.category}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-gray-600">{category.category}</div>
                  {category.providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      <div className="flex items-center space-x-2">
                        <span>{provider.icon}</span>
                        <span>{provider.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Account Number */}
        <div className="space-y-3">
          <Label htmlFor="account" className="text-base font-semibold text-gray-900">
            Account Number / Smart Card Number
          </Label>
          <div className="flex space-x-3">
            <Input
              id="account"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="minimal-input pin-blue-focus border-gray-300 flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleVerifyAccount}
              disabled={!accountNumber || !selectedService || isVerifying}
              className="bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300 transition-all duration-200"
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 pin-blue-spinner"></div>
                  <span>Verify</span>
                </div>
              ) : (
                "Verify"
              )}
            </Button>
          </div>
          {customerName && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-700 font-medium">Account verified: {customerName}</p>
            </div>
          )}
        </div>

        {/* Amount */}
        <div className="space-y-3">
          <Label htmlFor="amount" className="text-base font-semibold text-gray-900">
            Amount (NGN)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            max="100000"
            className="minimal-input pin-blue-focus border-gray-300 text-lg"
          />
        </div>

        {/* Conversion Display */}
        {amount && selectedProvider && (
          <Card className="bg-blue-50 border border-blue-200">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Service:</span>
                  <span className="font-semibold text-gray-900">{selectedProvider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Amount (NGN):</span>
                  <span className="font-bold text-lg text-gray-900">₦{Number.parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
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
            `Pay Bill • ₦${amount ? Number.parseFloat(amount).toLocaleString() : "0"}`
          )}
        </Button>

        {!isConnected && <p className="text-center text-sm text-gray-500">Please connect your wallet to continue</p>}
      </form>

      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isProcessing={isProcessing}
        type="utility"
        details={{
          service: selectedProvider?.name || "",
          accountNumber,
          amount,
          cryptoAmount,
        }}
      />
    </>
  )
}
