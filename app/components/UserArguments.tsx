"use client"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Profile } from "../types/arguments"
import Arguments from "./Argument"

async function getUsersArguments():Promise<Profile>{
    const res = await axios.get("api/argument/usersArguments")
    return res.data
}

export default function UserArguments() {
    const { data, isLoading, error } = useQuery({
        queryFn: getUsersArguments,
        queryKey: ["auth-arguments"]
    })

    if (isLoading) return <div>Loading...</div>

    if (error && axios.isAxiosError(error)) return <div>{error.message}</div>
    
    return (
        <div>
            {data?.Argument.map((argument) => <Arguments
        userId={argument.userId}
        name={data.name}
        avatar={data.image}
        id={argument.id}
        key={argument.id}
        title={argument.title}
        createdAt={argument.createdAt}
        votes={argument.Vote}
      />)}
        </div>
    )
}