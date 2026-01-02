import { ethers } from "ethers"

export async function deploySmartWallet(email: string): Promise<{ walletAddress: string, mnemonic: string }> {
  // Generate a new mnemonic and wallet
  const generatedMnemonic = ethers.Wallet.createRandom().mnemonic;
  if (!generatedMnemonic) {
    throw new Error("Failed to generate mnemonic");
  }
  const mnemonic = generatedMnemonic.phrase;
  const wallet = ethers.Wallet.fromPhrase(mnemonic)
  // TODO: Use Safe SDK to deploy a smart wallet and get its address
  // For now, return EOA address as placeholder
  return {
    walletAddress: wallet.address,
    mnemonic
  }
}
