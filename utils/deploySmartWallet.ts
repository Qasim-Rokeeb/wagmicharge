import { ethers } from "ethers"

export async function deploySmartWallet(email: string): Promise<{ walletAddress: string, mnemonic: string }> {
  // Generate a new mnemonic and wallet
  const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase
  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  // TODO: Use Safe SDK to deploy a smart wallet and get its address
  // For now, return EOA address as placeholder
  return {
    walletAddress: wallet.address,
    mnemonic
  }
}
