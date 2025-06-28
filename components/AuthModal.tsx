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
//       setError("Passkey login failed. Try again or use fallback.")
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
//             <button className="btn btn-primary w-full mb-2" onClick={handlePasskeyRegister} disabled={loading}>
//               Register Passkey (Recommended)
//             </button>
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

import React, { useState } from "react"
import { auth, firestore } from "@/lib/firebaseClient"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { registerPasskey, loginPasskey } from "@/utils/webAuthn"
import { deploySmartWallet } from "@/utils/deploySmartWallet"

type AuthModalProps = {
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [step, setStep] = useState<"email" | "passkey" | "done" | "recovery">("email")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mnemonic, setMnemonic] = useState<string | null>(null)

  // Signup: Email/password, then passkey, then smart wallet
  async function handleEmailSignUp() {
    setLoading(true)
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setStep("passkey")
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  async function handlePasskeyRegister() {
    setLoading(true)
    setError(null)
    try {
      await registerPasskey(email)
      const { walletAddress, mnemonic } = await deploySmartWallet(email)
      setMnemonic(mnemonic)
      if (auth.currentUser) {
        await setDoc(doc(firestore, "users", auth.currentUser.uid), {
          email,
          walletAddress,
          mnemonic
        })
      }
      setStep("done")
      onClose()
    } catch (err: any) {
      setError("Passkey registration failed. Try again or use fallback.")
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
      setError("Passkey login failed. Try again or use fallback.")
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Welcome</h2>
        {step === "email" && (
          <>
            <input
              className="border p-2 w-full mb-2"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-full mb-2" onClick={handleEmailSignUp} disabled={loading}>
              Sign Up with Email
            </button>
            <button className="btn btn-secondary w-full mb-2" onClick={() => setStep("passkey")} disabled={loading}>
              Login with Passkey
            </button>
          </>
        )}
        {step === "passkey" && (
          <>
            <button className="btn btn-primary w-full mb-2" onClick={handlePasskeyRegister} disabled={loading}>
              Register Passkey (Recommended)
            </button>
            <button className="btn btn-outline w-full mb-2" onClick={handlePasskeyLogin} disabled={loading}>
              Login with Passkey
            </button>
            <button className="btn btn-secondary w-full" onClick={handleRecovery} disabled={loading}>
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
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {step === "done" && <div className="text-green-600 mt-2">Success! You are logged in.</div>}
        <button
          className="mt-6 text-blue-600 hover:underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AuthModal
// ```