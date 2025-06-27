import { startRegistration, startAuthentication } from "@passwordless-id/webauthn"

export async function registerPasskey(email: string) {
  return startRegistration(email)
}

export async function loginPasskey(email: string) {
  return startAuthentication(email)
}
