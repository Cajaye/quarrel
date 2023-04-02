'use client'
import Image from "next/image"
import Link from "next/link"

type Props = {
    avatar: string,
    name:string
}

export default function User({avatar, name}:Props) { 
    return (
        <div className="flex items-center gap-4">
            <Image
                className="rounded-full"
                src={avatar}
                alt="avatar"
                width={32}
                height={32}
            />
            <Link href={"/profile"}>
                <h3 className="text-gray-700">{name}</h3>
            </Link>
        </div>
    )
}