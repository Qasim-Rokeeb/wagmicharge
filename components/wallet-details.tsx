"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAccount, useBalance } from "wagmi"
import { Copy, ExternalLink, Plus, Send, CheckCircle, Clock, XCircle } from "lucide-react"
import { useState } from "react"

const mockTransactions = [
  {
    id: "1",
    type: "airtime",
    amount: "₦2,000",
    cryptoAmount: "1.2 USDC",
    status: "completed",
    date: "2024-01-15",
    network: "MTN",
    phone: "080****5678",
  },
  {
    id: "2",
    type: "utility",
    amount: "₦15,000",
    cryptoAmount: "9.0 USDC",
    status: "completed",
    date: "2024-01-14",
    service: "Eko Electric",
    account: "123****789",
  },
  {
    id: "3",
    type: "airtime",
    amount: "₦1,000",
    cryptoAmount: "0.6 USDC",
    status: "pending",
    date: "2024-01-13",
    network: "Airtel",
    phone: "081****1234",
  },
]

export function WalletDetails() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success-state"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "failed":
        return "error-state"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getTransactionIcon = (type: string) => {
    return type === "airtime" ? "📱" : "⚡"
  }

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Please connect your wallet to view your balance and transactions
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Wallet Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="minimal-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <span>Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {balance ? `${Number.parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "0.0000 ETH"}
                </div>
                <div className="text-sm text-gray-600">≈ $2,450.00 USD</div>
              </div>
              <div className="flex space-x-3">
                <Button size="sm" className="flex-1 pin-blue-gradient hover:opacity-90 transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Top Up
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="minimal-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <span>Wallet Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-900">
                  {address ? formatAddress(address) : "Not connected"}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyAddress}
                  className="flex-1 bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedAddress ? "Copied!" : "Copy"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explorer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="minimal-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <span>Transaction History</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((tx, index) => (
              <div key={tx.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <span className="text-xl">{getTransactionIcon(tx.type)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {tx.type === "airtime" ? "Airtime Purchase" : "Bill Payment"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {tx.type === "airtime" ? `${tx.network} - ${tx.phone}` : `${tx.service} - ${tx.account}`}
                      </div>
                      <div className="text-xs text-gray-500">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{tx.amount}</div>
                    <div className="text-sm text-gray-600">{tx.cryptoAmount}</div>
                    <div className="flex items-center justify-end space-x-2 mt-1">
                      {getStatusIcon(tx.status)}
                      <Badge className={`text-xs ${getStatusColor(tx.status)} border`}>{tx.status}</Badge>
                    </div>
                  </div>
                </div>
                {index < mockTransactions.length - 1 && <Separator className="bg-gray-200" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
