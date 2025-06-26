"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  isProcessing: boolean
  type: "airtime" | "utility"
  details: {
    network?: string
    phone?: string
    amount?: string
    cryptoAmount?: string
    service?: string
    accountNumber?: string
  }
}

export function TransactionModal({ isOpen, onClose, isProcessing, type, details }: TransactionModalProps) {
  const getStatusIcon = () => {
    if (isProcessing) return <Clock className="h-8 w-8 text-yellow-500 animate-spin" />
    return <CheckCircle className="h-8 w-8 text-green-500" />
  }

  const getStatusText = () => {
    if (isProcessing) return "Processing Transaction..."
    return "Transaction Successful!"
  }

  const getStatusDescription = () => {
    if (isProcessing) {
      return "Please wait while we process your transaction. This may take a few moments."
    }
    return type === "airtime"
      ? "Your airtime has been successfully topped up!"
      : "Your bill payment has been processed successfully!"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Transaction Status
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Icon */}
          <div className="flex flex-col items-center text-center space-y-4">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold">{getStatusText()}</h3>
              <p className="text-sm text-muted-foreground mt-1">{getStatusDescription()}</p>
            </div>
          </div>

          {/* Transaction Details */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h4 className="font-semibold text-sm">Transaction Details</h4>

              {type === "airtime" ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Network:</span>
                    <span>{details.network}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phone:</span>
                    <span>{details.phone}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Service:</span>
                    <span>{details.service}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Account:</span>
                    <span>{details.accountNumber}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span>₦{details.amount ? Number.parseFloat(details.amount).toLocaleString() : "0"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Crypto Paid:</span>
                <span>{details.cryptoAmount} USDC</span>
              </div>

              {!isProcessing && (
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-xs">0x1234...5678</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!isProcessing && (
              <>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
                  Close
                </Button>
                <Button className="flex-1">View Receipt</Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
