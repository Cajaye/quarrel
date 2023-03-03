import Link from "next/link"
import SignIn from "./SignIn"
import SignOut from "./SignOut"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import User from "./User"

export default async function Nav() {
    const session = await getServerSession(authOptions)

    return (
        <nav className="flex items-center justify-between my-4">
            <Link href="/">
                <h1 className="text-lg font-medium">
                Quarrel
                </h1>
            </Link>
            <ul className="flex items-center gap-6">
                <li>
                    {session && (
                        <Link href={""}>
                            <User avatar={ session.user?.image as string} name={session.user?.name as string} />
                        </Link>
                    )}
                </li>
                <li>
                    {!session && <SignIn />}
                    {session && <SignOut />}
                </li>
            </ul>
        </nav>
    )
}