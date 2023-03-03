'use client'
import Link from "next/link"

export default function Nav() {
    return (
        <nav className="flex items-center justify-between my-4">
            <Link href="/">
                <h1 className="text-lg font-medium">
                Quarrel
                </h1>
            </Link>
            <ul className="flex items-center gap-6">
                <li>
                    <Link href={""}>Profile</Link>
                </li>
                <li>
                    <button className="px-6 py-2 bg-teal-700 text-white text-sm font-bold rounded-md">Sign in</button>
                </li>
            </ul>
        </nav>
    )
}