"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="px-6 py-2 bg-teal-700 text-white text-sm font-bold rounded-md"
    >
      Sign out
    </button>
  );
}
