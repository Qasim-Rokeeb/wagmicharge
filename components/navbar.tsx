"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Home, Phone, Zap, Wallet, User, Menu, X } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

const AuthModal = dynamic(() => import('./AuthModal'), { ssr: false })

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Airtime", href: "/airtime", icon: Phone },
  { name: "Utilities", href: "/utilities", icon: Zap },
  { name: "Wallet", href: "/wallet", icon: Wallet },
  { name: "Profile", href: "/profile", icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 gentle-shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl pin-blue-gradient flex items-center justify-center hover-lift">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">WagmiCharge</span>
              <span className="text-xs text-gray-500">Crypto Payments</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      isActive
                        ? "pin-blue-gradient text-white gentle-shadow"
                        : "hover:bg-blue-50 hover:text-primary text-gray-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton />
            </div>
            <button className="btn btn-outline" onClick={() => setShowAuth(true)}>
              Sign Up / Login
            </button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-600 hover:text-primary hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start space-x-2 ${
                        isActive ? "pin-blue-gradient text-white" : "hover:bg-blue-50 hover:text-primary text-gray-600"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-gray-200">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </nav>
  )
}

import React from "react";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h2 className="text-lg font-bold mb-4">Sign Up / Login</h2>
        {/* Add your authentication form or content here */}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
