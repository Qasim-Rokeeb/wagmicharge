import type { NextApiRequest, NextApiResponse } from "next"
import { client, server } from "@passwordless-id/webauthn"

// In-memory challenge store for demo (replace with persistent store in production)
const challengeStore: Record<string, string> = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const { username } = req.body
  if (!username) return res.status(400).json({ error: "Missing username" })

  // Standard way: use server.generateAuthenticationOptions
  const options = server.generateAuthenticationOptions({
    rpID: req.headers.host?.split(":")[0] || "localhost",
    userID: username,
  })

  // Store challenge for later verification (use session/db in production)
  challengeStore[username] = options.challenge

  res.status(200).json(options)
}

// (Remove this file from your frontend repo. It is backend-related.)
