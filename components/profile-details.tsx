"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "wagmi"
import { Shield, Key, Users, Download, Eye, EyeOff, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function ProfileDetails() {
  const { address, isConnected } = useAccount()
  const [email, setEmail] = useState("user@example.com")
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const mockMnemonic = "abandon ability able about above absent absorb abstract absurd abuse access accident"

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
        <p className="text-muted-foreground">Please connect your wallet to access your profile</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>👤</span>
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex space-x-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="flex-1"
              />
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Wallet Address</Label>
            <div className="font-mono text-sm bg-muted p-3 rounded-lg">{address}</div>
          </div>

          <div className="space-y-2">
            <Label>Account Status</Label>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-500 text-white">
                Verified
              </Badge>
              <Badge variant="outline">Smart Wallet Enabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Passkey */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold flex items-center space-x-2">
                <Key className="h-4 w-4" />
                <span>Passkey Authentication</span>
              </div>
              <p className="text-sm text-muted-foreground">Secure login with biometric authentication</p>
            </div>
            <Badge variant="secondary" className="bg-green-500 text-white">
              Active
            </Badge>
          </div>

          <Separator />

          {/* Mnemonic Backup */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-semibold">Recovery Phrase</div>
                <p className="text-sm text-muted-foreground">Your 12-word recovery phrase for wallet access</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowMnemonic(!showMnemonic)}>
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
              <div className="space-y-3">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Warning:</strong> Never share your recovery phrase with anyone. Store it securely offline.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-4 bg-muted rounded-lg font-mono text-sm">
                  {mockMnemonic.split(" ").map((word, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-muted-foreground w-6">{index + 1}.</span>
                      <span>{word}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Backup
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Social Recovery */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Social Recovery</span>
              </div>
              <p className="text-sm text-muted-foreground">Recover your wallet with trusted friends</p>
            </div>
            <Button variant="outline" size="sm">
              Setup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-semibold">Delete Account</div>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
