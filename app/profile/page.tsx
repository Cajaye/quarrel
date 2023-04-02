import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import UserArguments from "../components/UserArguments"


export default async function Profile() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('api/auth/signin')
    }
    
    return (
        <main>
            <h1 className="text-xl font-bold pt-2">Welcome back {session.user?.name}</h1>
            <UserArguments/>
        </main>
    )
}