import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const { userId, provider, accountNumber, amount, cryptoTx } = req.body
  // Validate input, check payment, call provider API, etc.
  // Respond with payment status
  res.status(200).json({ success: true, message: "Utility payment processed." })
}
