import { client } from "@passwordless-id/webauthn"

// You must provide a "challenge" (from your backend) for WebAuthn registration.
// This is a security requirement of the WebAuthn protocol.

export async function registerPasskey(email: string) {
  // Ensure the API endpoint exists and returns JSON, not HTML
  const response = await fetch("/api/webauthn/register-challenge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email }),
  })

  // If the endpoint is missing or errors, you'll get HTML (like a 404 page)
  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Registration endpoint did not return JSON. Check if /api/webauthn/register-challenge exists and works.")
  }

  const options = await response.json()
  return client.register(options)
}

export async function loginPasskey(email: string) {
  const response = await fetch("/api/webauthn/login-challenge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email }),
  })

  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Login endpoint did not return JSON. Check if /api/webauthn/login-challenge exists and works.")
  }

  const options = await response.json()
  return client.authenticate(options)
}

