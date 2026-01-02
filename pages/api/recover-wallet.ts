import type { NextApiRequest, NextApiResponse } from "next"
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { firestore } from "@/lib/firebaseClient"

// For production, add CORS, logging, and stricter validation as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { walletAddress } = req.body
  if (
    !walletAddress ||
    typeof walletAddress !== "string" ||
    !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)
  ) {
    // Basic Ethereum address validation
    return res.status(400).json({ exists: false })
  }

  try {
    const usersRef = collection(firestore, "users")
    const q = query(usersRef, where("walletAddress", "==", walletAddress))
    const snapshot = await getDocs(q)
    if (!snapshot.empty) {
      // Do not leak user info, just existence
      return res.status(200).json({ exists: true })
    } else {
      return res.status(200).json({ exists: false })
    }
  } catch (err) {
    // Optionally log error to monitoring service
    return res.status(500).json({ error: "Internal server error" })
  }
}
