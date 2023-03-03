'use client'

import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <button onClick={() => signIn()} className="px-6 py-2 bg-teal-700 text-white text-sm font-bold rounded-md">Sign in</button>
    )
}