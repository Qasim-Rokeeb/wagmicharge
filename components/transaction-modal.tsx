"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, X } from "lucide-react"
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
    if (isProcessing) return <div className="w-8 h-8 pin-blue-spinner mx-auto" />
    return <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
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
      <DialogContent className="sm:max-w-md bg-white border-0 gentle-shadow">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-gray-900">
            Transaction Status
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Icon */}
          <div className="flex flex-col items-center text-center space-y-4">
            {getStatusIcon()}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{getStatusText()}</h3>
              <p className="text-sm text-gray-600 mt-1">{getStatusDescription()}</p>
            </div>
          </div>

          {/* Transaction Details */}
          <Card className="bg-blue-50 border border-blue-200">
            <CardContent className="p-4 space-y-3">
              <h4 className="font-semibold text-sm text-gray-900">Transaction Details</h4>

              {type === "airtime" ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Network:</span>
                    <span className="text-gray-900 font-medium">{details.network}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900 font-medium">{details.phone}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="text-gray-900 font-medium">{details.service}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Account:</span>
                    <span className="text-gray-900 font-medium">{details.accountNumber}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="text-gray-900 font-medium">
                  ₦{details.amount ? Number.parseFloat(details.amount).toLocaleString() : "0"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Crypto Paid:</span>
                <span className="pin-blue-gradient-text font-medium">{details.cryptoAmount} USDC</span>
              </div>

              {!isProcessing && (
                <div className="flex justify-between text-sm pt-2 border-t border-blue-200">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs text-gray-900">0x1234...5678</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {!isProcessing && (
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 bg-white hover:bg-gray-50 border-gray-300" onClick={onClose}>
                Close
              </Button>
              <Button className="flex-1 pin-blue-gradient hover:opacity-90">View Receipt</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
