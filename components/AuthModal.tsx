// ```tsx
// 'use client'

// import { useState } from "react"
// import { auth, firestore } from "@/lib/firebaseClient"
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
// import { doc, setDoc, getDoc } from "firebase/firestore"
// import { registerPasskey, loginPasskey } from "@/utils/webAuthn"
// import { deploySmartWallet } from "@/utils/deploySmartWallet"

// export default function AuthModal({ onClose }: { onClose: () => void }) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [step, setStep] = useState<"email" | "passkey" | "done" | "recovery">("email")
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [mnemonic, setMnemonic] = useState<string | null>(null)

//   // Signup: Email/password, then passkey, then smart wallet
//   async function handleEmailSignUp() {
//     setLoading(true)
//     setError(null)
//     try {
//       await createUserWithEmailAndPassword(auth, email, password)
//       setStep("passkey")
//     } catch (err: any) {
//       setError(err.message)
//     }
//     setLoading(false)
//   }

//   async function handlePasskeyRegister() {
//     setLoading(true)
//     setError(null)
//     try {
//       await registerPasskey(email)
//       const { walletAddress, mnemonic } = await deploySmartWallet(email)
//       setMnemonic(mnemonic)
//       if (auth.currentUser) {
//         await setDoc(doc(firestore, "users", auth.currentUser.uid), {
//           email,
//           walletAddress,
//           mnemonic
//         })
//       }
//       setStep("done")
//       onClose()
//     } catch (err: any) {
//       setError("Passkey registration failed. Try again or use fallback.")
//     }
//     setLoading(false)
//   }

//   async function handlePasskeyLogin() {
//     setLoading(true)
//     setError(null)
//     try {
//       await loginPasskey(email)
//       setStep("done")
//       onClose()
//     } catch (err: any) {
//       // Log the actual error for debugging
//       console.error("Passkey login error:", err)
//       setError(
//         "Passkey login failed. " +
//         (err?.message ? `Details: ${err.message}` : "Try again or use fallback.")
//       )
//     }
//     setLoading(false)
//   }

//   async function handleRecovery() {
//     setLoading(true)
//     setError(null)
//     try {
//       const userSnap = await getDoc(doc(firestore, "users", auth.currentUser?.uid || ""))
//       if (userSnap.exists()) {
//         const data = userSnap.data()
//         setMnemonic(data.mnemonic)
//         setStep("recovery")
//       } else {
//         setError("No recovery info found.")
//       }
//     } catch (err: any) {
//       setError("Recovery failed.")
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-lg w-full max-w-sm relative">
//         <button className="absolute top-2 right-2" onClick={onClose}>✕</button>
//         <h2 className="text-lg font-bold mb-4">Sign Up / Login</h2>
//         {step === "email" && (
//           <>
//             <input
//               className="border p-2 w-full mb-2"
//               placeholder="Email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//             />
//             <input
//               className="border p-2 w-full mb-2"
//               placeholder="Password"
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//             />
//             <button className="btn btn-primary w-full mb-2" onClick={handleEmailSignUp} disabled={loading}>
//               Sign Up with Email
//             </button>
//             <button className="btn btn-secondary w-full mb-2" onClick={() => setStep("passkey")} disabled={loading}>
//               Login with Passkey
//             </button>
//           </>
//         )}
//         {step === "passkey" && (
//           <>
//             <button className="btn btn-outline w-full mb-2" onClick={handlePasskeyLogin} disabled={loading}>
//               Login with Passkey
//             </button>
//             <button className="btn btn-secondary w-full" onClick={handleRecovery} disabled={loading}>
//               Recovery (Mnemonic/Social)
//             </button>
//           </>
//         )}
//         {step === "recovery" && mnemonic && (
//           <div className="mt-4">
//             <div className="font-bold mb-2">Your Recovery Mnemonic:</div>
//             <div className="bg-gray-100 p-2 rounded break-all">{mnemonic}</div>
//           </div>
//         )}
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//         {step === "done" && <div className="text-green-600 mt-2">Success! You are logged in.</div>}
//       </div>
//     </div>
//   )
// }
// ```

"use client"

import React, { useState } from "react"
import { auth, firestore } from "@/lib/firebaseClient"
import { GoogleAuthProvider, signInWithPopup, deleteUser } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { registerPasskey, loginPasskey } from "@/utils/webAuthn"
import { deploySmartWallet } from "@/utils/deploySmartWallet"

type AuthModalProps = {
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<"start" | "passkey" | "done" | "recovery">("start")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [mnemonic, setMnemonic] = useState<string | null>(null)
  const [mnemonicBackedUp, setMnemonicBackedUp] = useState(false)
  const [showBackupWarning, setShowBackupWarning] = useState(false)

  async function handleGoogleSignup() {
    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      setEmail(user.email || "")
      // Immediately try to register passkey after Google signup
      try {
        await registerPasskey(user.email || "")
        const { walletAddress, mnemonic } = await deploySmartWallet(user.email || "")
        setMnemonic(mnemonic)
        // Do NOT store mnemonic in Firestore for best security
        if (auth.currentUser) {
          await setDoc(doc(firestore, "users", auth.currentUser.uid), {
            email: user.email,
            walletAddress
            // mnemonic is NOT stored
          })
        }
        setStep("done")
        // Do NOT close modal yet; let user back up mnemonic
      } catch (err: any) {
        // Log the actual error for debugging
        console.error("Passkey registration error:", err)
        if (auth.currentUser) {
          try {
            await deleteUser(auth.currentUser)
          } catch (deleteErr) {
            console.error("Failed to delete Firebase user after passkey failure:", deleteErr)
          }
        }
        setError(
          "Passkey registration failed. Your account was not created. " +
          (err?.message ? `Details: ${err.message}` : "Please try again and ensure you complete passkey setup.")
        )
        setStep("start")
      }
    } catch (err: any) {
      console.error("Google sign-in error:", err)
      setError("Google sign-in failed.")
    }
    setLoading(false)
  }

  async function handlePasskeyLogin() {
    setLoading(true)
    setError(null)
    try {
      await loginPasskey(email)
      setStep("done")
      onClose()
    } catch (err: any) {
      // Log the actual error for debugging
      console.error("Passkey login error:", err)
      setError(
        "Passkey login failed. " +
        (err?.message ? `Details: ${err.message}` : "Try again or use fallback.")
      )
    }
    setLoading(false)
  }

  async function handleRecovery() {
    setLoading(true)
    setError(null)
    try {
      const userSnap = await getDoc(doc(firestore, "users", auth.currentUser?.uid || ""))
      if (userSnap.exists()) {
        const data = userSnap.data()
        setMnemonic(data.mnemonic)
        setStep("recovery")
      } else {
        setError("No recovery info found.")
      }
    } catch (err: any) {
      setError("Recovery failed.")
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Glassmorphism background with animated moving blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-3xl animate-blob1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-blue-600 opacity-30 rounded-full blur-3xl animate-blob2" />
        <div className="absolute top-[30%] left-[60%] w-[200px] h-[200px] bg-blue-300 opacity-20 rounded-full blur-2xl animate-blob3" />
      </div>
      <div
        className="relative rounded-2xl shadow-2xl p-8 min-w-[320px] flex flex-col items-center"
        style={{
          background: "rgba(30, 64, 175, 0.45)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white drop-shadow">Welcome</h2>
        {step === "start" && (
          <>
            <button
              className="mb-4 w-60 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign up with Google"}
            </button>
            <button
              className="w-60 bg-gray-900 text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
              onClick={() => setStep("passkey")}
              disabled={loading}
            >
              Login with Passkey
            </button>
          </>
        )}
        {step === "passkey" && (
          <>
            <button
              className="btn btn-outline w-full mb-2"
              onClick={handlePasskeyLogin}
              disabled={loading}
            >
              Login with Passkey
            </button>
            <button
              className="btn btn-secondary w-full"
              onClick={handleRecovery}
              disabled={loading}
            >
              Recovery (Mnemonic/Social)
            </button>
          </>
        )}
        {step === "recovery" && mnemonic && (
          <div className="mt-4">
            <div className="font-bold mb-2">Your Recovery Mnemonic:</div>
            <div className="bg-gray-100 p-2 rounded break-all">{mnemonic}</div>
          </div>
        )}
        {step === "done" && mnemonic && !mnemonicBackedUp && (
          <div className="w-full">
            <div className="text-yellow-200 bg-yellow-700/80 p-3 rounded mb-4 text-center font-semibold">
              ⚠️ Important: This is your secret recovery phrase (mnemonic).<br />
              <span className="font-bold">Never share it with anyone.</span><br />
              If you lose this phrase, you will lose access to your wallet.<br />
              You can import this phrase into any BIP39/BIP44 compatible wallet (e.g. MetaMask, Trust Wallet).
            </div>
            <div className="bg-gray-100 p-3 rounded text-gray-900 font-mono text-center mb-4 break-all select-all">
              {mnemonic}
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
              onClick={() => setMnemonicBackedUp(true)}
            >
              I've backed up my secret phrase
            </button>
            <button
              className="w-full mt-3 bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
              onClick={() => setShowBackupWarning(true)}
            >
              Skip for now
            </button>
            {showBackupWarning && (
              <div className="mt-4 text-red-200 bg-red-700/80 p-3 rounded text-center font-semibold">
                <div>
                  <strong>Warning:</strong> If you close this window without backing up your secret phrase, you will not be able to recover your wallet in the future.
                </div>
                <button
                  className="mt-3 w-full bg-gray-800 text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
                  onClick={() => {
                    setMnemonicBackedUp(true)
                  }}
                >
                  I understand, close anyway
                </button>
                <button
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                  onClick={() => setShowBackupWarning(false)}
                >
                  Go back
                </button>
              </div>
            )}
          </div>
        )}
        {step === "done" && (mnemonicBackedUp || !mnemonic) && (
          <div className="text-green-600 mt-2 text-center">
            Success! You are logged in.
            <button
              className="mt-6 text-blue-100 hover:underline block mx-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {step !== "done" && (
          <button
            className="mt-6 text-blue-100 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
      <style jsx global>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.1); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -30px) scale(1.15); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.08); }
        }
        .animate-blob1 { animation: blob1 12s ease-in-out infinite; }
        .animate-blob2 { animation: blob2 14s ease-in-out infinite; }
        .animate-blob3 { animation: blob3 10s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default AuthModal