import startRegistration from "@passwordless-id/webauthn/startRegistration"
import startAuthentication from "@passwordless-id/webauthn/startAuthentication"

export async function registerPasskey(email: string) {
  return startRegistration({ username: email })
}

export async function loginPasskey(email: string) {
  return startAuthentication({ username: email })
}

