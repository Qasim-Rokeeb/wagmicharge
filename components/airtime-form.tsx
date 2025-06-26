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
        <div className="space-y-2">
          <Label htmlFor="network" className="text-base font-semibold">
            Select Network
          </Label>
          <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
            <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500">
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
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-semibold">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="08012345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="h-12 text-lg bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500"
          />
        </div>

        {/* Amount Selection */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Select Amount (NGN)</Label>
          <div className="grid grid-cols-3 gap-3">
            {amounts.map((amt) => (
              <Button
                key={amt}
                type="button"
                variant={amount === amt.toString() ? "default" : "outline"}
                onClick={() => setAmount(amt.toString())}
                className={`h-12 ${
                  amount === amt.toString()
                    ? "gradient-primary text-white"
                    : "bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border-2"
                }`}
              >
                ₦{amt.toLocaleString()}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant={amount === "custom" ? "default" : "outline"}
              onClick={() => setAmount("custom")}
              className={`whitespace-nowrap ${
                amount === "custom" ? "gradient-primary text-white" : "bg-white dark:bg-slate-800 border-2"
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
                className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500"
              />
            )}
          </div>
        </div>

        {/* Conversion Display */}
        {finalAmount && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-0">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Amount (NGN):</span>
                  <span className="font-bold text-lg">₦{Number.parseFloat(finalAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Crypto Amount (USDC):</span>
                  <span className="font-bold text-lg gradient-text">{cryptoAmount} USDC</span>
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
        <Button
          type="submit"
          className="w-full h-14 text-lg gradient-primary hover:gradient-shadow-hover transition-all duration-300 transform hover:scale-[1.02]"
          disabled={!isFormValid || !isConnected || isProcessing}
        >
          {!isConnected
            ? "Connect Wallet First"
            : isProcessing
              ? "Processing..."
              : `Buy ₦${finalAmount ? Number.parseFloat(finalAmount).toLocaleString() : "0"} Airtime`}
        </Button>

        {!isConnected && (
          <p className="text-center text-sm text-muted-foreground">Please connect your wallet to continue</p>
        )}
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
