"use client"

import type { ReactNode } from "react"
import { useState } from "react"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/wagmi"
import { base } from "wagmi/chains"
import { injected } from "wagmi/connectors"
import { createConfig, http } from "wagmi"

/* ------------------------------------------------------------------ */
/*  ↓ 1. Wagmi config without remote analytics calls ----------------- */
/* ------------------------------------------------------------------ */

const chains = [base] as const

const wagmiConfig = createConfig({
  chains,
  transports: {
    [base.id]: http(),
  },
  connectors: [
    injected({
      shimDisconnect: true, // keeps “disconnect” button working in RainbowKit
    }),
  ],
  ssr: true,
})

/* ------------------------------------------------------------------ */
/*  ↓ 2. Providers component ---------------------------------------- */
/* ------------------------------------------------------------------ */

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
