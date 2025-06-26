"use client"

import type { ReactNode } from "react"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains"
import { injected } from "wagmi/connectors"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

/* ------------------------------------------------------------------ */
/*  ↓ 1. Wagmi config without remote analytics calls ----------------- */
/* ------------------------------------------------------------------ */

const chains = [mainnet, polygon, optimism, arbitrum, base]

const wagmiConfig = createConfig({
  chains,
  transports: chains.reduce(
    (acc, chain) => ({ ...acc, [chain.id]: http() }),
    {} as Record<number, ReturnType<typeof http>>,
  ),
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

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
