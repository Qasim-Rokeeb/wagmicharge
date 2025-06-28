import { startRegistration, startAuthentication } from "@passwordless-id/webauthn"

export async function registerPasskey(email: string) {
  return startRegistration({ username: email })
}

export async function loginPasskey(email: string) {
  return startAuthentication({ username: email })
}

