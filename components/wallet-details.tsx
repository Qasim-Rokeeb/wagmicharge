"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAccount, useBalance } from "wagmi"
import { Copy, ExternalLink, Plus, Send } from "lucide-react"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTransactionIcon = (type: string) => {
    return type === "airtime" ? "📱" : "⚡"
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
        <p className="text-muted-foreground mb-6">Please connect your wallet to view your balance and transactions</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>💰</span>
              <span>Balance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold">
                  {balance ? `${Number.parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "0.0000 ETH"}
                </div>
                <div className="text-sm text-muted-foreground">≈ $2,450.00 USD</div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Top Up
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏠</span>
              <span>Wallet Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-mono text-sm bg-muted p-3 rounded-lg">
                  {address ? formatAddress(address) : "Not connected"}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={copyAddress} className="flex-1 bg-transparent">
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedAddress ? "Copied!" : "Copy"}
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Explorer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span>Transaction History</span>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((tx, index) => (
              <div key={tx.id}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getTransactionIcon(tx.type)}</div>
                    <div>
                      <div className="font-semibold">{tx.type === "airtime" ? "Airtime Purchase" : "Bill Payment"}</div>
                      <div className="text-sm text-muted-foreground">
                        {tx.type === "airtime" ? `${tx.network} - ${tx.phone}` : `${tx.service} - ${tx.account}`}
                      </div>
                      <div className="text-xs text-muted-foreground">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{tx.amount}</div>
                    <div className="text-sm text-muted-foreground">{tx.cryptoAmount}</div>
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(tx.status)} text-white`}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
                {index < mockTransactions.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
