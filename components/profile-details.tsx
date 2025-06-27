"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "wagmi"
import { Shield, Key, Users, Download, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

export function ProfileDetails() {
  const { address, isConnected } = useAccount()
  const [email, setEmail] = useState("user@example.com")
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const mockMnemonic = "abandon ability able about above absent absorb abstract absurd abuse access accident"

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 max-w-md mx-auto">Please connect your wallet to access your profile</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Account Information */}
      <Card className="minimal-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-gray-900">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-semibold text-gray-900">
              Email Address
            </Label>
            <div className="flex space-x-3">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="minimal-input pin-blue-focus border-gray-300 flex-1"
              />
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Wallet Address</Label>
            <div className="font-mono text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-900">
              {address}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Account Status</Label>
            <div className="flex items-center space-x-3">
              <Badge className="success-state border flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Verified</span>
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                Smart Wallet Enabled
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="minimal-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-gray-900">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Passkey */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold flex items-center space-x-2 text-gray-900">
                <Key className="h-4 w-4 text-primary" />
                <span>Passkey Authentication</span>
              </div>
              <p className="text-sm text-gray-600">Secure login with biometric authentication</p>
            </div>
            <Badge className="success-state border flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Active</span>
            </Badge>
          </div>

          <Separator className="bg-gray-200" />

          {/* Mnemonic Backup */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-semibold text-gray-900">Recovery Phrase</div>
                <p className="text-sm text-gray-600">Your 12-word recovery phrase for wallet access</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
              >
                {showMnemonic ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show
                  </>
                )}
              </Button>
            </div>

            {showMnemonic && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <strong>Warning:</strong> Never share your recovery phrase with anyone. Store it securely offline.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm">
                  {mockMnemonic.split(" ").map((word, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-gray-500 w-6">{index + 1}.</span>
                      <span className="text-gray-900">{word}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup
                </Button>
              </div>
            )}
          </div>

          <Separator className="bg-gray-200" />

          {/* Social Recovery */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold flex items-center space-x-2 text-gray-900">
                <Users className="h-4 w-4 text-primary" />
                <span>Social Recovery</span>
              </div>
              <p className="text-sm text-gray-600">Recover your wallet with trusted friends</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-blue-50 hover:text-primary hover:border-primary border-gray-300"
            >
              Setup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-white border border-red-200 rounded-2xl gentle-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-red-600">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold text-gray-900">Delete Account</div>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm" className="hover:bg-red-600">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
