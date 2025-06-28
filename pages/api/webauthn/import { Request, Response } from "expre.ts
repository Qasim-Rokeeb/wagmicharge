import { Request, Response } from "express"
import { server } from "@passwordless-id/webauthn"
// ...import your user DB/model...

// Replace with persistent store in production
const challengeStore: Record<string, string> = {}

export async function verifyLoginHandler(req: Request, res: Response) {
  const { username, credential } = req.body
  if (!username || !credential) return res.status(400).json({ error: "Missing data" })

  const expectedChallenge = challengeStore[username]
  if (!expectedChallenge) return res.status(400).json({ error: "No challenge found" })

  // Fetch credential info from user DB here
  // const credentialInfo = await getCredentialForUser(username)

  try {
    const verification = await server.verifyAuthenticationResponse({
      credential,
      expectedChallenge,
      expectedOrigin: req.headers.origin || "", // set your frontend origin
      expectedRPID: req.hostname,
      // credential: credentialInfo
    })
    if (verification.verified) {
      // Optionally set session/cookie here
      return res.status(200).json({ success: true })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification failed" })
  }
}
