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

  const selectedProvider = services.flatMap((s) => s.providers).find((p) => p.id === selectedService)

  const usdRate = 0.0006
  const cryptoAmount = amount ? (Number.parseFloat(amount) * usdRate).toFixed(6) : "0"

  const handleVerifyAccount = async () => {
    if (!accountNumber || !selectedService) return

    // Simulate account verification
    setTimeout(() => {
      setCustomerName("John Doe") // Mock customer name
    }, 1000)
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
        <div className="space-y-2">
          <Label htmlFor="service">Select Service</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Choose service provider" />
            </SelectTrigger>
            <SelectContent>
              {services.map((category) => (
                <div key={category.category}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category.category}</div>
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
        <div className="space-y-2">
          <Label htmlFor="account">Account Number / Smart Card Number</Label>
          <div className="flex space-x-2">
            <Input
              id="account"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleVerifyAccount}
              disabled={!accountNumber || !selectedService}
            >
              Verify
            </Button>
          </div>
          {customerName && <p className="text-sm text-green-600">✓ Account verified: {customerName}</p>}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (NGN)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="100"
            max="100000"
            className="text-lg"
          />
        </div>

        {/* Conversion Display */}
        {amount && selectedProvider && (
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-semibold">{selectedProvider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount (NGN):</span>
                  <span className="font-semibold">₦{Number.parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crypto Amount (USDC):</span>
                  <span className="font-semibold">{cryptoAmount} USDC</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Network Fee:</span>
                  <span>~$0.50</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12 text-lg" disabled={!isFormValid || !isConnected || isProcessing}>
          {!isConnected
            ? "Connect Wallet First"
            : isProcessing
              ? "Processing..."
              : `Pay ₦${amount ? Number.parseFloat(amount).toLocaleString() : "0"}`}
        </Button>
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
